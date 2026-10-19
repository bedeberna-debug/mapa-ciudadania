/* guiado.js — "Quiero resolver algo": guías de procedimientos ciudadanos (Beta 0.7).
   Cada ruta muestra una guía construida EXCLUSIVAMENTE desde data/guias.json
   (dossier plataforma/data-guias/, fecha de corte 19-10-2026) y, al final, la
   sección original de pasos-norma (curaduría de IDs existentes de la data).
   Regla dura: nada se inventa; lo no confirmado va marcado "por verificar". */
const Guiado = {
  RUTAS: {
    informacion: {
      titulo: 'Quiero pedir información al Estado',
      icono: '📄',
      resumen: 'Qué compró tu municipalidad, cuánto gastó un servicio público, qué estudios respaldan una decisión: tienes derecho a pedirlo. Aquí va el paso a paso, con plazos y a quién reclamar.',
      pasos: [
        { id: 'ley-20285', porque: 'Es la ley que te da el derecho a pedir información a los órganos del Estado y regula cómo deben responderte.' },
        { id: 'ds-13-2009', porque: 'Es el reglamento de esa ley: detalla a qué instituciones les puedes pedir y bajo qué procedimiento.' },
        { id: 'inst-cplt', porque: 'Es el organismo que vela por este derecho: si una institución te niega información, aquí puedes reclamar.' },
      ],
    },
    participar: {
      titulo: 'Quiero participar en decisiones públicas',
      icono: '🗳️',
      resumen: 'Desde organizarte con tus vecinos hasta opinar en decisiones ambientales: hay normas que te abren la puerta. Aquí va el paso a paso para usarlas.',
      pasos: [
        { id: 'ley-20500', porque: 'Es la ley que reconoce el derecho a participar y ordena a los órganos del Estado crear mecanismos para ello.' },
        { id: 'ley-19418', porque: 'Regula las juntas de vecinos y organizaciones comunitarias: la forma más directa de participar en tu comuna.' },
        { id: 'escazu', porque: 'Tratado internacional que garantiza tu derecho a participar y acceder a información en temas ambientales.' },
      ],
    },
    denunciar: {
      titulo: 'Quiero denunciar corrupción o irregularidades',
      icono: '🛡️',
      resumen: 'Si viste un mal uso de recursos públicos o un conflicto de interés, hay canales concretos y normas que te protegen al denunciar. Aquí va el paso a paso.',
      pasos: [
        { id: 'ley-21592', porque: 'Protege a quienes denuncian delitos económicos y de corrupción, incluyendo esquemas de anonimato.' },
        { id: 'ley-20205', porque: 'Protege específicamente a los funcionarios públicos que denuncian irregularidades dentro de su institución.' },
        { id: 'inst-cgr', porque: 'La Contraloría fiscaliza el actuar de los órganos del Estado: es uno de los lugares donde puedes denunciar.' },
      ],
    },
    contratar: {
      titulo: 'Quiero venderle o prestarle servicios al Estado',
      icono: '🤝',
      resumen: 'El Estado compra bienes y servicios por reglas públicas: si tienes un emprendimiento o empresa, aquí va el paso a paso para inscribirte, ofertar y reclamar.',
      pasos: [
        { id: 'ley-19886', porque: 'Es la ley de compras públicas: fija las reglas de cómo el Estado contrata, con igualdad de condiciones.' },
        { id: 'ley-21634', porque: 'Moderniza ese sistema: simplifica procesos y amplía la participación de mipymes y cooperativas.' },
        { id: 'inst-chilecompra', porque: 'Es la plataforma donde se publican las licitaciones: ahí ves qué está comprando el Estado y cómo postular.' },
      ],
    },
  },

  ETIQUETAS_SELLO: {
    documento: 'Documento oficial',
    institucional: 'Plataforma institucional',
    prensa: 'Prensa',
    por_verificar: 'Por verificar',
  },

  /* Referencias cruzadas entre guías → enlaces internos #/resolver/<ruta> */
  GUIA_A_RUTA: { '01': 'informacion', '02': 'participar', '03': 'denunciar', '04': 'contratar' },

  escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  },

  /* Mini-markup del dossier: escape → **negrita** → URLs externas →
     referencias "guía 01..04" → enlaces internos → "por verificar" resaltado. */
  md(s) {
    let h = this.escapeHtml(s);
    h = h.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    h = h.replace(/(?<![\w/>"=])((?:https?:\/\/|www\.)[\w.-]+(?:\.[a-z]{2,})(?:\/[\w.\-\/]*)?)/gi,
      (m, url) => {
        const href = url.startsWith('http') ? url : 'https://' + url;
        return `<a href="${href}" target="_blank" rel="noopener">${url}</a>`;
      });
    h = h.replace(/gu[íi]as?\s*0([1-4])/gi, (m, n) =>
      `<a href="#/resolver/${this.GUIA_A_RUTA['0' + n]}">${m}</a>`);
    h = h.replace(/por verificar/gi, '<span class="rg-pv">por verificar</span>');
    return h;
  },

  sellos(niveles) {
    return (niveles || []).map(n =>
      `<span class="sello-verif ${n}">${this.ETIQUETAS_SELLO[n] || n}</span>`).join(' ');
  },

  render(cont, arg, app) {
    if (arg && this.RUTAS[arg]) return this.renderRuta(cont, arg, app);
    this.renderMenu(cont, app);
  },

  renderMenu(cont, app) {
    cont.innerHTML = `
      <h2 class="titulo-vista">¿Qué necesitas resolver?</h2>
      <p class="ayuda">No hace falta saber de leyes para usar tus derechos. Elige lo que
      quieres hacer y te mostramos el paso a paso: qué hacer, ante quién, en qué plazo
      y qué sigue si te dicen que no.</p>
      <div class="rutas"></div>`;
    const grid = cont.querySelector('.rutas');
    for (const [id, r] of Object.entries(this.RUTAS)) {
      const a = document.createElement('a');
      a.className = 'entrada ruta';
      a.href = `#/resolver/${id}`;
      a.innerHTML = `<strong>${r.icono} ${r.titulo}</strong><span>${r.resumen}</span>`;
      grid.appendChild(a);
    }
  },

  renderRuta(cont, clave, app) {
    const ruta = this.RUTAS[clave];
    const guia = app.guias && app.guias.rutas[clave];

    let html = `
      <p><a href="#/resolver" class="volver">← Todas las necesidades</a></p>
      <h2 class="titulo-vista">${ruta.icono} ${ruta.titulo}</h2>
      <p class="ayuda">${ruta.resumen}</p>`;

    if (!guia) {
      html += `<p class="intro">La guía de procedimientos de esta ruta no está disponible en la
        base de datos actual. Abajo mantenemos las normas clave de la ruta.</p>`;
    } else {
      html += `<p class="rg-corte">📅 Procedimientos verificados al ${app.guias.fecha_corte}.</p>`;
      html += this.renderGuia(guia, app);
    }

    /* Sección de normas (se mantiene intacta, debajo de la guía) */
    html += `
      <div class="rg-normas">
        <h3 class="rg-normas-titulo">Las normas que te protegen, en el orden en que conviene conocerlas</h3>
        <p class="intro">Toca cada una para ver su detalle.</p>
        <div class="pasos"></div>
        <p style="margin-top:1.2rem">
          <a class="btn-tecnico" style="text-decoration:none" href="#/relaciones/${ruta.pasos[0].id}">
            Ver estas piezas en el mapa →</a>
        </p>
      </div>`;

    cont.innerHTML = html;

    const lista = cont.querySelector('.pasos');
    ruta.pasos.forEach((paso, i) => {
      const nodo = app.nodos.get(paso.id);
      const t = document.createElement('div');
      t.className = 'tarjeta paso' + (nodo ? ' ' + nodo.tipo : '');
      if (!nodo) {
        t.innerHTML = `<div class="nombre">⚠️ Paso ${i + 1}: por verificar</div>
          <div class="meta">Este elemento no está en la base de datos actual.</div>`;
      } else {
        t.innerHTML = `<div class="nombre">${i + 1}. ${nodo.nombre}${app.badgeAlerta(nodo)}</div>
          <div class="meta">${app.etiquetaTipoNodo(nodo.tipo)}${nodo.anio ? ' · ' + nodo.anio : ''}</div>
          <p class="paso-porque">${paso.porque}</p>`;
        t.onclick = () => app.abrirNodo(nodo.id);
      }
      lista.appendChild(t);
    });
  },

  renderGuia(guia, app) {
    let html = '<div class="rg-guia">';

    /* A. Resumen general */
    html += `<section class="rg-bloque">
      <h3>En síntesis</h3>
      <p>${this.md(guia.resumen_general)}</p>
    </section>`;

    /* B. Instituciones */
    html += `<section class="rg-bloque">
      <h3>Ante quién: las instituciones clave</h3>
      <div class="rg-insts">`;
    for (const inst of guia.instituciones) {
      html += `<div class="rg-inst">
        <div class="rg-inst-nombre">${this.md(inst.nombre)}</div>
        <p class="rg-inst-rol">${this.md(inst.rol)}</p>
        <div class="rg-inst-links">`;
      for (const url of inst.urls || []) {
        const visible = url.replace(/^https?:\/\//, '');
        html += `<a href="${url}" target="_blank" rel="noopener">${visible} ↗</a>`;
      }
      if (inst.nota_url) html += `<span class="meta">${this.md(inst.nota_url)}</span>`;
      if (inst.nodo_grafo && app.nodos.get(inst.nodo_grafo)) {
        html += `<a class="rg-mapa" href="#/relaciones/${inst.nodo_grafo}">Ver en el mapa →</a>`;
      }
      html += `</div></div>`;
    }
    html += `</div></section>`;

    /* C. Obligaciones */
    html += `<section class="rg-bloque">
      <div class="rg-bloque-cab">
        <h3>Lo que la ley les exige</h3>
        <span class="rg-sellos">${this.sellos(guia.nivel_obligaciones)}</span>
      </div>
      <ul>${guia.obligaciones.map(o => `<li>${this.md(o)}</li>`).join('')}</ul>
    </section>`;

    /* D. Ámbito */
    html += `<section class="rg-bloque">
      <h3>A quiénes alcanza</h3>
      <ul>${guia.ambito_obligados.map(o => `<li>${this.md(o)}</li>`).join('')}</ul>`;
    if (guia.ambito_excepciones && guia.ambito_excepciones.length) {
      html += `<p class="rg-subtitulo">Reglas especiales y qué queda fuera:</p>
        <ul>${guia.ambito_excepciones.map(o => `<li>${this.md(o)}</li>`).join('')}</ul>`;
    }
    html += `</section>`;

    /* E. Procedimientos en acordeón */
    html += `<section class="rg-bloque">
      <h3>Procedimientos paso a paso</h3>`;
    for (const p of guia.procedimientos) {
      html += `<details class="desplegable rg-proc">
        <summary><span class="rg-proc-nombre">${this.md(p.nombre)}</span>
          <span class="rg-sellos">${this.sellos(p.nivel_verificacion)}</span></summary>
        <div class="cuerpo-des">
          <p><strong>Cuándo usarlo:</strong> ${this.md(p.cuando_usar)}</p>
          <p class="rg-subtitulo">Pasos:</p>
          <ol class="rg-pasos">${p.pasos.map(s => `<li>${this.md(s)}</li>`).join('')}</ol>
          <p class="rg-plazo">⏱️ <strong>Plazo:</strong> ${this.md(p.plazo)}</p>
          <p><strong>Costo:</strong> ${this.md(p.costo)}</p>
          <div class="rg-sino">
            <strong>Si te dicen que no / no responden:</strong>
            <p>${this.md(p.si_no)}</p>
          </div>
          ${p.advertencia ? `<p class="rg-adv-proc">⚠️ ${this.md(p.advertencia)}</p>` : ''}
          <p class="rg-fuente"><strong>Fuente:</strong> ${this.md(p.fuente)}
            <span class="rg-sellos">${this.sellos(p.nivel_verificacion)}</span></p>
        </div>
      </details>`;
    }
    html += `</section>`;

    /* F. Advertencias */
    html += `<section class="rg-advertencias">
      <h3>⚠️ Advertencias y datos vivos</h3>
      <ul>${guia.advertencias.map(a => `<li>${this.md(a)}</li>`).join('')}</ul>
    </section>`;

    /* Disclaimer obligatorio */
    html += `<p class="rg-disclaimer">${this.md(app.guias.disclaimer)}</p>`;

    html += '</div>';
    return html;
  },
};
