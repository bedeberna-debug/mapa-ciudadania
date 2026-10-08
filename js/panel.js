/* panel.js — Panel de detalle ciudadano.
   Estructura: nombre en lenguaje claro + descripción existente +
   "¿Y esto en qué me afecta?" (derivado por plantilla SOLO de campos de la data)
   + botón discreto "Ver detalle técnico" (ficha completa, bajo demanda). */
const Panel = {

  /* Frases ciudadanas por tema. Solo recombinan hechos de la data
     (el tema está declarado en cada nodo); no agregan contenido normativo nuevo. */
  FRASES_TEMA: {
    transparencia: 'sirve para pedir y recibir información pública',
    participacion: 'te abre puertas para participar en decisiones públicas',
    integridad: 'busca prevenir la corrupción y el mal uso de recursos públicos',
    digital: 'facilita hacer trámites y gestiones en línea',
    datos: 'protege y regula el uso de tus datos personales',
  },

  mostrar(nodo, app) {
    app.abrirPanel();
    const cont = document.getElementById('panel-contenido');
    cont.innerHTML = '';
    const div = document.createElement('div');
    div.className = 'detalle';

    const chips = [`<span class="chip">${app.etiquetaTipoNodo(nodo.tipo)}</span>`];
    if (nodo.subtipo) chips.push(`<span class="chip">${nodo.subtipo === 'ods' ? 'Objetivo global (ONU)' : 'Compromiso del Estado'}</span>`);
    if (nodo.nivel && nodo.nivel !== 'nacional') chips.push(`<span class="chip">${nodo.nivel === 'municipal' ? 'Tu comuna' : 'Tu región'}</span>`);

    let html = `
      <p class="meta" style="margin:0 0 .2rem">${chips.join('')}</p>
      <h2>${nodo.nombre}${app.badgeAlerta(nodo)}</h2>
      ${nodo.alerta ? `<p class="alerta">⚠️ ${nodo.alerta}</p>` : ''}`;

    if (nodo.descripcion) {
      html += `<p class="desc">${nodo.descripcion}</p>`;
      if (nodo.fuente_descripcion) html += `<span class="ev">Fuente: ${nodo.fuente_descripcion}</span>`;
    } else {
      html += `<p class="alerta">⚠️ Descripción por verificar.</p>`;
    }

    div.innerHTML = html;
    div.appendChild(this.bloqueAfecta(nodo, app));
    div.appendChild(this.bloqueDatos(nodo, app));
    div.appendChild(this.listaConexiones(nodo, app));

    // Botón discreto "Ver detalle técnico": solo normas con ficha compilada
    if (nodo.tipo === 'norma' && nodo.ficha_html) {
      const btn = document.createElement('button');
      btn.className = 'btn-tecnico';
      btn.textContent = 'Ver detalle técnico';
      btn.onclick = () => this.cargarFicha(nodo, div, btn);
      div.appendChild(btn);
    }
    cont.appendChild(div);
  },

  /* "¿Y esto en qué me afecta?" — plantilla paramétrica alimentada solo
     con campos existentes (temas, aristas opera, nivel, subtipo). */
  bloqueAfecta(nodo, app) {
    const box = document.createElement('div');
    box.className = 'afecta';
    const frases = [];

    if (nodo.tipo === 'norma') {
      const temas = (nodo.temas || []).map(t => this.FRASES_TEMA[t]).filter(Boolean);
      if (temas.length) frases.push(`Esta norma ${temas.join(' y ')}.`);
      if (nodo.nivel === 'municipal') frases.push('Se aplica en tu comuna, a través de la municipalidad.');
      else if (nodo.nivel === 'regional') frases.push('Se aplica en tu región, a través del gobierno regional.');
      const operan = app.grafo.aristas
        .filter(a => a.tipo === 'opera' && a.origen === nodo.id)
        .map(a => app.nodos.get(a.destino)).filter(Boolean);
      if (operan.length) {
        frases.push(`La hace cumplir: ${operan.map(i => `<strong>${i.nombre}</strong>`).join(', ')} — ahí puedes acudir si necesitas ejercer lo que esta norma te da.`);
      }
    } else if (nodo.tipo === 'institucion') {
      const haceCumplir = app.grafo.aristas
        .filter(a => a.tipo === 'opera' && a.destino === nodo.id)
        .map(a => app.nodos.get(a.origen)).filter(Boolean);
      if (haceCumplir.length) {
        frases.push(`Es la institución a la que puedes acudir en temas de: ${haceCumplir.slice(0, 4).map(n => `<strong>${app.nombreCorto(n)}</strong>`).join(', ')}${haceCumplir.length > 4 ? ', entre otras' : ''}.`);
      }
      const responsableDe = app.grafo.aristas
        .filter(a => a.tipo === 'responsable_de' && a.origen === nodo.id)
        .map(a => app.nodos.get(a.destino)).filter(Boolean);
      if (responsableDe.length) {
        frases.push(`Es responsable del cumplimiento de: ${responsableDe.map(c => `<strong>${app.nombreCorto(c)}</strong>`).join(', ')} — puedes pedirle cuentas de su avance.`);
      }
    } else if (nodo.tipo === 'horizonte') {
      if (nodo.subtipo === 'compromiso') frases.push('Es un compromiso que el Estado chileno asumió públicamente: puedes seguir su cumplimiento.');
      else if (nodo.subtipo === 'ods') frases.push('Es una meta global de la Agenda 2030 de la ONU que Chile se comprometió a alcanzar.');
      const responsables = app.grafo.aristas
        .filter(a => a.tipo === 'responsable_de' && a.destino === nodo.id)
        .map(a => app.nodos.get(a.origen)).filter(Boolean);
      if (responsables.length && !nodo.responsable) {
        frases.push(`La institución responsable de su cumplimiento es: ${responsables.map(i => `<strong>${i.nombre}</strong>`).join(', ')}.`);
      }
      if (nodo.estado_avance) frases.push(`Estado de avance evaluado: ${nodo.estado_avance}.`);
    } else if (nodo.tipo === 'nivel') {
      frases.push('Marca el territorio donde se aplican las normas conectadas a él.');
    }

    box.innerHTML = `<h3>¿Y esto en qué me afecta?</h3>` +
      (frases.length
        ? frases.map(f => `<p>${f}</p>`).join('')
        : '<p>⚠️ Por verificar: aún no hay suficiente información en la base de datos para explicarlo en lenguaje claro.</p>');
    return box;
  },

  /* Datos clave en lenguaje claro (solo campos existentes) */
  bloqueDatos(nodo, app) {
    const div = document.createElement('div');
    let html = '';
    if (nodo.anio) html += `<dt>Año</dt><dd>${nodo.anio}</dd>`;
    if (nodo.estado) html += `<dt>Estado actual</dt><dd>${nodo.estado}</dd>`;
    if (nodo.responsable) html += `<dt>Institución responsable</dt><dd>${nodo.responsable}</dd>`;
    if (nodo.avance_2026) html += `<dt>Avance registrado (2026)</dt><dd>${nodo.avance_2026}</dd>`;
    if (nodo.nota) html += `<dt>Nota del acervo</dt><dd>${nodo.nota}</dd>`;
    if (!html) return div;
    div.innerHTML = `<dl>${html}</dl>`;
    return div;
  },

  listaConexiones(nodo, app) {
    const conex = app.conexiones(nodo.id);
    const div = document.createElement('div');
    if (!conex.length) return div;
    const items = conex.map(a => {
      const saliente = a.origen === nodo.id;
      const otro = app.nodos.get(saliente ? a.destino : a.origen);
      if (!otro) return '';
      // Orden ciudadano: «Esta norma» + relación + otra
      const rel = saliente ? app.etiquetaArista(a.tipo) : this.invertirRelacion(a.tipo, app);
      return `<li>${rel} <a href="#/${app.vista}/${otro.id}">${app.nombreCorto(otro)}</a>${app.badgeAlerta(otro)}</li>`;
    }).join('');
    div.innerHTML = `<h3 style="font-size:1rem;margin:1rem 0 .3rem">Se conecta con (${conex.length})</h3><ul class="conexiones">${items}</ul>`;
    return div;
  },

  /* La etiqueta ciudadana está redactada en voz saliente («la modifica»);
     para aristas entrantes se invierte a voz pasiva («la modifica» → «es modificada por»). */
  invertirRelacion(tipo, app) {
    const pasiva = {
      modifica: 'es modificada por',
      desarrolla_reglamenta: 'es reglamentada por',
      complementa: 'es complementada por',
      opera: 'es hecha cumplir por',
      da_soporte_a: 'recibe aporte de',
      se_aplica_a: 'es territorio de',
      responsable_de: 'tiene como responsable a',
    };
    return pasiva[tipo] || app.etiquetaArista(tipo);
  },

  /* Detalle técnico bajo demanda: carga la ficha compilada dentro del panel */
  async cargarFicha(nodo, div, btn) {
    btn.disabled = true;
    btn.textContent = 'Cargando detalle técnico…';
    try {
      const r = await fetch(nodo.ficha_html);
      const htmlText = await r.text();
      const doc = new DOMParser().parseFromString(htmlText, 'text/html');
      const cuerpo = doc.querySelector('main.ficha');
      if (!cuerpo) throw new Error('ficha sin <main.ficha>');
      const env = document.createElement('div');
      env.className = 'ficha-tecnica';
      const inner = document.createElement('div');
      inner.className = 'ficha';
      inner.innerHTML = cuerpo.innerHTML;
      env.appendChild(inner);
      div.appendChild(env);
      btn.textContent = 'Detalle técnico cargado ↓';
    } catch (e) {
      btn.disabled = false;
      btn.textContent = 'Ver detalle técnico (reintentar)';
    }
  },
};
