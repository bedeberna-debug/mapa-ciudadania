/* vista-subnacional.js — Sección "Gobierno abierto en tu comuna y región".
   ADITIVA: no toca el grafo, la línea de tiempo, la pirámide ni las demás vistas.
   Datos: data/subnacional.json (construido solo desde el dossier plataforma/data-subnacional/).
   Textos T1–T7: verbatim de plataforma/data-subnacional/textos-seccion.md
   (solo se ajusta el formato: ** → <strong>, saltos de línea → párrafos).
   Rutas: #/tu-comuna (portada) · #/tu-comuna/region-<id> (regional) · #/tu-comuna/inst-<id> (ficha).

   Beta 0.8 (aditivo): selector de modos D6 — "Planes de gobierno abierto" (actual, sin
   cambios) / "Portales de transparencia" (nuevo). Modo portales: data/portales-municipios.json
   (copia de plataforma/data-portales/10-municipios.json); las 16 regiones quedan activas.
   Textos D6–D8: verbatim de plataforma/data-portales/textos-directorio.md.
   Rutas nuevas: #/tu-comuna/portales · #/tu-comuna/portales-region-<id>. */
const VistaSubnacional = {

  datos: null,
  _promesa: null,

  /* --- Beta 0.8: datos del modo portales (carga perezosa, igual que subnacional.json) --- */
  portales: null,
  _promesaPortales: null,

  /* --- Textos verbatim de la sección (T1–T7) --- */
  T1_BAJADA: `El gobierno abierto no vive solo en Santiago. También —aunque todavía poquito— vive en
    comunas y regiones. Acá puedes ver qué municipios y gobiernos regionales de Chile tienen planes de
    gobierno abierto, qué se comprometieron a hacer y cómo puedes participar o exigir que exista uno en
    tu territorio.`,

  T2: `Cuando hablamos de gobierno abierto en un municipio o en un gobierno regional, hablamos de lo mismo
    que a nivel nacional, pero más cerca: que las autoridades <strong>informen</strong> lo que hacen con recursos
    públicos, que <strong>dejen participar</strong> a las personas en las decisiones que les afectan y que <strong>rindan
    cuentas</strong> de verdad, no solo en un papel.||
    La diferencia es la distancia. En lo local, la consulta ciudadana puede terminar en un plan de
    barrio, en una plaza o en la prioridad de un presupuesto comunal. En lo regional, puede terminar en
    una política de datos abiertos o en mecanismos de participación vinculante que obligan al gobierno
    regional a responder. Cuando funciona, el gobierno abierto deja de ser una idea abstracta y se vuelve
    algo que se toca en el territorio.`,

  T3: `Chile tiene <strong>16 regiones</strong> y <strong>345 comunas</strong>. Al revisar cada una con fuentes oficiales (al
    15 de octubre de 2026), el resultado es claro: <strong>solo 2 regiones tienen gobiernos con planes de
    gobierno abierto declarados</strong> —la Región Metropolitana y la Región del Biobío— y dentro de ellas,
    <strong>6 instituciones</strong>:@@
    <strong>5 gobiernos forman parte de OGP Local</strong>, la alianza internacional de gobierno abierto:
    las municipalidades de <strong>Peñalolén, Maipú, San Joaquín y Renca</strong>, y el <strong>Gobierno Regional
    Metropolitano de Santiago</strong> (este último en alianza —"consorcio"— con Renca, con quien comparte
    su plan de acción 2026–2028).@@
    <strong>1 municipalidad tiene un plan propio sin ser miembro de OGP</strong>: <strong>Concepción</strong>, que lanzó su
    primer plan en mayo de 2026 y es la primera comuna fuera de la Región Metropolitana en hacerlo.||
    Si tu región aparece en gris en el mapa, no es un error: significa que <strong>aún no se ha declarado
    ningún plan de gobierno abierto</strong> ahí. Ese vacío también es información útil —es el punto de
    partida para preguntarle a tu municipio o gobierno regional por qué no tiene uno.`,

  T4: `No todos los municipios que hablan de "transparencia" o "participación" tienen un plan de gobierno
    abierto. Para ordenar el panorama, esta sección clasifica a cada institución en una de tres
    categorías. Fíjate en el sello de cada ficha:@@
    <strong>Miembro de OGP Local.</strong> OGP (Open Government Partnership) es la alianza internacional de
    gobierno abierto. Ser miembro de su rama local significa que el municipio o gobierno regional
    asumió un compromiso formal ante observadores internacionales: cocrear su plan con la ciudadanía,
    publicarlo, implementarlo y rendir cuentas de hito en hito. Es la categoría con exigencias más
    altas y con seguimiento externo.@@
    <strong>Plan propio declarado.</strong> Algunos municipios diseñan y lanzan su propio plan de acción de
    gobierno abierto sin ser miembros de OGP. Es un esfuerzo valioso —el primer plan de este tipo en
    Chile, el de Renca en 2019, nació así—, pero el estándar de verificación es distinto: el
    seguimiento depende del propio municipio y no de un ente internacional.@@
    <strong>Solo transparencia municipal.</strong> La gran mayoría de los municipios chilenos (más de 300 de 345)
    participa en programas de <strong>transparencia</strong> del Consejo para la Transparencia: publican
    información exigida por la ley y atienden solicitudes de acceso a la información. Eso es
    importante, pero <strong>no es gobierno abierto</strong>: no incluye compromisos cocreados con la ciudadanía
    ni foros donde la gente participe en las decisiones. Por eso esta categoría aparece solo como
    referencia comparativa, no como plan.||
    <strong>En resumen:</strong> transparencia = te informan. Gobierno abierto = te informan, te dejan participar
    y rinden cuentas por compromisos concretos acordados contigo.`,

  T5_INTRO: `Cada municipio o gobierno regional con plan tiene una ficha con:@@
    <strong>Sus compromisos:</strong> lo que se comprometió a hacer, priorizado con la ciudadanía en procesos de
    cocreación (diálogos, consultas, votaciones).@@
    <strong>Sus plataformas:</strong> dónde participar, dónde seguir el avance, dónde hacer solicitudes.@@
    <strong>Sus mecanismos de seguimiento:</strong> foros multiactor, consejos, entes evaluadores independientes.@@
    <strong>Sus documentos oficiales:</strong> el plan y sus informes, cuando el documento completo está publicado.`,

  T5_SELLOS: `Presta atención a los sellos de verificación. Cada dato indica qué tan sólida es su fuente:@@
    [documento] proviene del plan, un informe o un registro de OGP/órgano estatal.@@
    [institucional] proviene del sitio web del propio municipio o gobierno regional.@@
    [prensa] proviene de medios de comunicación.@@
    [por_verificar] aún no hay fuente pública que lo confirme; se muestra con honestidad en
    lugar de inventarse un dato.`,

  T5_BOTON: `Y en el botón de documento pueden pasar tres cosas: que el PDF oficial esté disponible, que se
    enlace al documento en su sitio de origen, o que conste un aviso de <strong>"documento no publicado"</strong> —
    que significa que la institución aún no ha puesto el documento completo a disposición pública, y
    la ficha enlaza la mejor evidencia oficial disponible (noticia, micrositio o registro de evento).`,

  T6: `Un detalle que vale la pena conocer: el Gobierno Regional Metropolitano de Santiago y la
    Municipalidad de Renca <strong>presentaron juntos su plan de acción 2026–2028</strong> a OGP Local, en lo que se
    llama un "consorcio". Renca —que elaboró el primer plan comunal de gobierno abierto de Chile en
    2019— es institución líder de la implementación, y el GORE aporta la escala regional.||
    Es el primer ejemplo en Chile de un plan de gobierno abierto <strong>compartido entre niveles de gobierno</strong>:
    el municipio y la región cocreando y rindiendo cuentas por el mismo conjunto de compromisos. En las
    fichas de ambos verás marcada esta conexión.`,

  T7: `El gobierno abierto subnacional chileno tiene historia corta pero intensa:@@
    <strong>2012–2014:</strong> el Consejo para la Transparencia lanza el Modelo de Gestión en Transparencia
    Municipal, que hoy cubre a la mayoría de los municipios del país (transparencia, no gobierno
    abierto).@@
    <strong>2016–2019:</strong> un compromiso del 3er Plan de Acción Nacional de OGP trabaja planes locales de
    gobierno abierto con 7 comunas piloto; el programa se interrumpe por la pandemia en 2020.@@
    <strong>2019:</strong> Renca presenta el primer plan comunal de gobierno abierto de Chile.@@
    <strong>2020:</strong> Peñalolén se convierte en la primera comuna miembro de OGP Local.@@
    <strong>2022–2024:</strong> entran Maipú (2022) y, en 2024, San Joaquín y el consorcio Santiago + Renca,
    que hace al GORE de Santiago el primer —y hasta ahora único— gobierno regional del país en OGP.@@
    <strong>2026:</strong> Concepción lanza el primer plan comunal fuera de la Región Metropolitana.`,

  /* --- Beta 0.8, modo portales: textos D6–D8 verbatim (textos-directorio.md) --- */
  D6_PLANES: 'Planes de gobierno abierto',
  D6_PORTALES: 'Portales de transparencia',

  D7_CABECERA: 'Portales de transparencia',
  D7_TEXTO: `Aquí el mapa se enciende completo: la transparencia activa es obligación de
    <strong>todas</strong> las municipalidades (recuerda: transparencia ≠ gobierno abierto — la primera te
    informa; el segundo también te deja participar). Elige tu región y busca tu comuna: verás
    dónde revisa lo que debe publicar y dónde presentar solicitudes. Ojo con los estados: un
    enlace que no respondió al chequeo también te lo decimos.`,

  /* Estados de verificación del directorio (D4 mapeado a la paleta Ciudadanía) */
  ESTADOS_PORTAL: {
    verificado_ok:    { etiqueta: 'Verificado', clase: 'ok' },
    por_verificar:    { etiqueta: 'Por verificar', clase: 'pv' },
    verificado_caido: { etiqueta: 'No respondió al chequeo', clase: 'caido' },
  },

  /* Nombre de región en portales-municipios.json → id de banda del mapa
     (los nombres difieren de subnacional.json: la tabla hace de puente) */
  REG_PORTAL_ID: {
    'Arica y Parinacota': 'arica-parinacota',
    'Tarapacá': 'tarapaca',
    'Antofagasta': 'antofagasta',
    'Atacama': 'atacama',
    'Coquimbo': 'coquimbo',
    'Valparaíso': 'valparaiso',
    'Metropolitana de Santiago': 'metropolitana',
    "Libertador General Bernardo O'Higgins": 'ohiggins',
    'Maule': 'maule',
    'Ñuble': 'nuble',
    'Biobío': 'biobio',
    'La Araucanía': 'araucania',
    'Los Ríos': 'los-rios',
    'Los Lagos': 'los-lagos',
    'Aysén del General Carlos Ibáñez del Campo': 'aysen',
    'Magallanes y de la Antártica Chilena': 'magallanes',
  },
  /* Nombre largo para la cabecera D8 ("Región de [nombre]") */
  REG_PORTAL_LARGO: {
    'Metropolitana de Santiago': 'Región Metropolitana de Santiago',
    "Libertador General Bernardo O'Higgins": "Región del Libertador General Bernardo O'Higgins",
    'Maule': 'Región del Maule',
    'Biobío': 'Región del Biobío',
  },

  SELLOS: {
    documento: { etiqueta: 'Documento oficial' },
    institucional: { etiqueta: 'Plataforma institucional' },
    prensa: { etiqueta: 'Prensa' },
    por_verificar: { etiqueta: 'Por verificar' },
  },

  /* Geometría del mapa esquemático: silueta estilizada de Chile en 16 bandas
     norte→sur (x, ancho por banda). No es una representación geográfica a escala. */
  _GEO: [
    [104, 96], [94, 116], [86, 126], [94, 112], [101, 100], [106, 92], [109, 86], [111, 83],
    [112, 81], [113, 79], [113, 80], [114, 77], [115, 74], [116, 70], [117, 60], [118, 50],
  ],
  _BANDA_H: 42, _BANDA_GAP: 5, _MAPA_Y0: 14,

  /* ============================================================
     Entrada del router
     ============================================================ */
  render(cont, arg, app) {
    this._delegar(cont);
    if (this.datos) return this._pintar(cont, arg);
    cont.innerHTML = '<p class="intro">Cargando la sección…</p>';
    if (!this._promesa) {
      this._promesa = fetch('data/subnacional.json').then(r => {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      });
    }
    this._promesa.then(d => {
      this.datos = d;
      if (app.vista === 'tu-comuna') this._pintar(cont, arg);
    }).catch(() => {
      cont.innerHTML = '<p class="alerta">⚠️ No se pudo cargar la información de esta sección. ' +
        'Si abriste el archivo directamente, prueba con un servidor local (npm run dev).</p>';
    });
  },

  _pintar(cont, arg) {
    /* Beta 0.8: rutas del modo portales (aditivas; las rutas previas no cambian) */
    if (arg === 'portales') return this._entrarPortales(cont, null, arg);
    const mPRegion = arg && arg.match(/^portales-region-(.+)$/);
    if (mPRegion) return this._entrarPortales(cont, mPRegion[1], arg);
    if (!arg) return this._portada(cont);
    const mRegion = arg.match(/^region-(.+)$/);
    if (mRegion) {
      const region = this.datos.regiones_mapa.find(r => r.id === mRegion[1] && r.activa);
      if (region) return this._region(cont, region);
    }
    const mInst = arg.match(/^inst-(.+)$/);
    if (mInst) {
      const inst = this.datos.instituciones.find(i => i.id === mInst[1]);
      if (inst) return this._ficha(cont, inst);
    }
    return this._portada(cont);
  },

  /* Delegación de eventos (una sola vez por contenedor) para las ayudas emergentes */
  _delegar(cont) {
    if (cont._snDelegado) return;
    cont._snDelegado = true;
    cont.addEventListener('click', e => {
      const btn = e.target.closest('[data-sn-toggle]');
      if (!btn) return;
      const caja = document.getElementById(btn.getAttribute('data-sn-toggle'));
      if (!caja) return;
      const abierto = !caja.hidden;
      caja.hidden = abierto;
      btn.setAttribute('aria-expanded', String(!abierto));
    });
  },

  /* ============================================================
     Nivel 1: portada de la sección (T1 + T2 + T3 + mapa + C + T7)
     ============================================================ */
  _portada(cont) {
    const d = this.datos;
    cont.innerHTML = `
      <section class="seccion-int sn">
        <h2 class="titulo-vista">Gobierno abierto en tu comuna y región</h2>
        <p class="sn-bajada">${this.T1_BAJADA}</p>
        ${this._selectorModos('planes')}
        ${this._parrafos(this.T2, 'sn-prosa')}

        <div class="sn-mapa-grid">
          <div class="sn-mapa-texto">
            <h3>El estado real en Chile</h3>
            ${this._parrafos(this.T3, 'sn-prosa')}
            <p class="sn-mapa-pista">Toca una región en azul para ver sus instituciones.</p>
          </div>
          <figure class="sn-mapa-fig">
            ${this._svgMapa()}
            <figcaption class="sn-mapa-leyenda">
              <span class="sn-ley-item"><span class="sn-ley-muestra activa"></span> Con plan de gobierno abierto declarado</span>
              <span class="sn-ley-item"><span class="sn-ley-muestra inactiva"></span> Sin plan de gobierno abierto declarado (dato al ${d.fecha_corte})</span>
              <span class="sn-ley-nota">Mapa esquemático: no representa la geografía a escala.</span>
            </figcaption>
          </figure>
        </div>

        ${this._bloqueCategoriaC()}
        ${this._bloqueT7()}
        <p class="meta sn-corte">Datos verificados al ${d.fecha_corte}.</p>
      </section>`;
  },

  /* Mapa SVG esquemático de Chile: 16 regiones; solo las activas son clicables */
  _svgMapa() {
    const regiones = this.datos.regiones_mapa;
    const h = this._MAPA_Y0 * 2 + regiones.length * (this._BANDA_H + this._BANDA_GAP) - this._BANDA_GAP;
    let bandas = '';
    regiones.forEach((r, i) => {
      const [x, w] = this._GEO[i];
      const y = this._MAPA_Y0 + i * (this._BANDA_H + this._BANDA_GAP);
      const yTexto = y + this._BANDA_H / 2;
      if (r.activa) {
        const n = r.instituciones.length;
        bandas += `
        <a href="#/tu-comuna/region-${r.id}" class="sn-reg activa" data-region="${r.id}">
          <title>${r.nombre} — ${n} ${n === 1 ? 'institución' : 'instituciones'} con plan de gobierno abierto</title>
          <rect x="${x}" y="${y}" width="${w}" height="${this._BANDA_H}" rx="9"></rect>
          <text class="sn-reg-nombre" x="${x + w + 10}" y="${yTexto - 3}">${r.nombre}</text>
          <text class="sn-reg-conteo" x="${x + w + 10}" y="${yTexto + 13}">${n} ${n === 1 ? 'institución' : 'instituciones'}</text>
        </a>`;
      } else {
        bandas += `
        <g class="sn-reg inactiva">
          <rect x="${x}" y="${y}" width="${w}" height="${this._BANDA_H}" rx="9"></rect>
          <text class="sn-reg-nombre" x="${x + w + 10}" y="${yTexto + 4}">${r.nombre}</text>
        </g>`;
      }
    });
    return `
      <svg class="sn-mapa-svg" viewBox="0 0 340 ${h}" role="img"
           aria-label="Mapa esquemático de Chile: solo las regiones Metropolitana y Biobío tienen instituciones con plan de gobierno abierto declarado">
        ${bandas}
      </svg>`;
  },

  /* Categoría C: solo contenido explicativo (ficha 07), sin tarjetas interactivas */
  _bloqueCategoriaC() {
    const c = this.datos.categoria_c;
    return `
      <div class="sn-catc">
        <h3>${c.titulo}</h3>
        ${c.parrafos.map(p => `<p>${p}</p>`).join('')}
        <p class="meta">Fuente: ${c.fuente} Programa:
          <a href="${c.enlace.url}" target="_blank" rel="noopener">${c.enlace.nombre} ↗</a></p>
      </div>`;
  },

  _bloqueT7() {
    const partes = this.T7.split('@@');
    const intro = partes.shift();
    return `
      <div class="sn-t7">
        <h3>Antecedentes que explican el presente</h3>
        ${this._parrafos(intro, 'sn-prosa')}
        <ul class="sn-t7-lista">
          ${partes.map(p => `<li>${p.trim()}</li>`).join('')}
        </ul>
      </div>`;
  },

  /* ============================================================
     Nivel 2: vista regional (cabecera + T4 + T5 + tarjetas)
     ============================================================ */
  _region(cont, region) {
    const d = this.datos;
    const insts = region.instituciones.map(id => d.instituciones.find(i => i.id === id));
    cont.innerHTML = `
      <section class="seccion-int sn">
        <p><a class="volver" href="#/tu-comuna">← Volver al mapa de Chile</a></p>
        <h2 class="titulo-vista">${region.nombre_largo || 'Región ' + region.nombre}</h2>
        <p class="ayuda">${region.instituciones.length}
          ${region.instituciones.length === 1 ? 'institución tiene' : 'instituciones tienen'}
          plan de gobierno abierto declarado en esta región (dato al ${d.fecha_corte}).</p>

        <details class="desplegable" open>
          <summary>¿Qué significa cada categoría?</summary>
          <div class="cuerpo-des">${this._parrafos(this.T4)}</div>
        </details>
        <details class="desplegable">
          <summary>¿Cómo leer cada ficha?</summary>
          <div class="cuerpo-des">${this._htmlT5()}</div>
        </details>

        <div class="sn-tarjetas">
          ${insts.map(i => this._tarjeta(i)).join('')}
        </div>
        <p class="meta sn-corte">Datos verificados al ${d.fecha_corte}.</p>
      </section>`;
  },

  _tarjeta(inst) {
    const cat = this.datos.categorias[inst.categoria];
    const ayudaId = `ayuda-cat-${inst.id}`;
    return `
      <article class="tarjeta institucion sn-tarjeta">
        <div class="nombre">${inst.nombre}</div>
        <div class="meta">
          <span class="chip">${inst.tipo}</span>
          <button type="button" class="sn-sello cat-${inst.categoria.toLowerCase()}"
                  data-sn-toggle="${ayudaId}" aria-expanded="false"
                  title="Toca para ver qué significa esta categoría">${cat.nombre} ⓘ</button>
          ${inst.consorcio ? `<a class="chip sn-chip-consorcio" href="#/tu-comuna/inst-${inst.consorcio.con}"
              title="Plan compartido con otra institución">🤝 Plan compartido 2026–2028</a>` : ''}
        </div>
        <div id="${ayudaId}" class="sn-ayuda-cat" hidden>${cat.ayuda}</div>
        <p class="sn-estado">${inst.estado_plan}</p>
        <a class="btn-pdf" href="#/tu-comuna/inst-${inst.id}">Ver ficha →</a>
      </article>`;
  },

  /* ============================================================
     Nivel 3: ficha de institución
     ============================================================ */
  _ficha(cont, inst) {
    const d = this.datos;
    const cat = d.categorias[inst.categoria];
    const region = d.regiones_mapa.find(r => r.id === inst.region);
    const ayudaId = `ayuda-cat-ficha-${inst.id}`;

    cont.innerHTML = `
      <section class="seccion-int sn">
        <p><a class="volver" href="#/tu-comuna/region-${region.id}">← Volver a ${region.nombre_largo || 'Región ' + region.nombre}</a></p>
        <h2 class="titulo-vista">${inst.nombre}</h2>
        <p class="meta">
          <span class="chip">${inst.tipo}</span>
          <span class="chip">${region.nombre_largo || 'Región ' + region.nombre}</span>
          <button type="button" class="sn-sello cat-${inst.categoria.toLowerCase()}"
                  data-sn-toggle="${ayudaId}" aria-expanded="false"
                  title="Toca para ver qué significa esta categoría">${cat.nombre} ⓘ</button>
        </p>
        <div id="${ayudaId}" class="sn-ayuda-cat" hidden>${cat.ayuda}</div>
        <p class="sn-cat-detalle">${inst.categoria_detalle}</p>

        <div class="detalle sn-estado-plan">
          <div class="afecta">
            <h3>Estado del plan</h3>
            <p>${inst.estado_plan}</p>
          </div>
        </div>

        ${inst.consorcio ? this._bloqueConsorcio(inst) : ''}

        <details class="desplegable">
          <summary>¿Cómo leer esta ficha?</summary>
          <div class="cuerpo-des">${this._htmlT5()}</div>
        </details>

        ${this._bloqueDatos('Compromisos principales', inst.bloques.compromisos)}
        ${this._bloqueDatos('Plataformas y canales', inst.bloques.plataformas)}
        ${this._bloqueDatos('Mecanismos de seguimiento y rendición', inst.bloques.mecanismos)}
        ${this._bloqueDatos('Fechas clave', inst.bloques.fechas)}

        ${inst.por_verificar.length ? `
          <div class="sn-porverificar">
            <h3>⚠️ Datos aún por verificar</h3>
            <ul>${inst.por_verificar.map(p => `<li>${p}</li>`).join('')}</ul>
          </div>` : ''}

        <div class="sn-docs">
          <h3>Documentos oficiales</h3>
          ${inst.documentos.map(doc => this._botonDocumento(doc)).join('')}
        </div>

        <p class="meta sn-corte">Verificación general: ${inst.verificacion_general}<br>
        Datos verificados al ${d.fecha_corte}.</p>
      </section>`;
  },

  /* Bloque de datos con su sello de verificación predominante */
  _bloqueDatos(titulo, bloque) {
    const sello = this.SELLOS[bloque.sello];
    let items;
    if (titulo.startsWith('Plataformas')) {
      items = bloque.items.map(p => {
        let html = p.url
          ? `<a href="${p.url}" target="_blank" rel="noopener">${p.nombre} ↗</a>`
          : p.nombre;
        if (p.por_verificar) html += ` <span class="sn-inline-pv">⚠️ ${p.por_verificar}</span>`;
        return `<li>${html}</li>`;
      }).join('');
    } else {
      items = bloque.items.map(t => `<li>${t}</li>`).join('');
    }
    return `
      <section class="sn-bloque">
        <div class="sn-bloque-cab">
          <h3>${titulo}</h3>
          <span class="sello-verif ${bloque.sello}" title="Nivel de verificación de este bloque">${sello.etiqueta}</span>
        </div>
        ${bloque.intro ? `<p class="sn-bloque-intro">${bloque.intro}</p>` : ''}
        <ul>${items}</ul>
        ${bloque.nota ? `<p class="sn-bloque-nota">${bloque.nota}</p>` : ''}
      </section>`;
  },

  /* Nota T6 + enlace mutuo Renca ↔ GORE Santiago */
  _bloqueConsorcio(inst) {
    const otra = this.datos.instituciones.find(i => i.id === inst.consorcio.con);
    return `
      <div class="sn-consorcio">
        <p class="sn-consorcio-titulo">🤝 Plan compartido 2026–2028</p>
        ${this._parrafos(this.T6)}
        <p class="sn-consorcio-rol">${inst.consorcio.rol}</p>
        <a class="btn-tecnico" href="#/tu-comuna/inst-${otra.id}">Ver la ficha de ${otra.nombre_corto} →</a>
      </div>`;
  },

  /* Botón de documento con sus 3 estados */
  _botonDocumento(doc) {
    if (doc.estado === 'local') {
      const esPdf = doc.archivo.toLowerCase().endsWith('.pdf');
      return `
        <div class="sn-doc">
          <a class="btn-pdf" href="${doc.archivo}" target="_blank" rel="noopener">${esPdf ? '📄' : '🗂️'} ${doc.titulo}</a>
          <span class="meta">Disponible localmente${esPdf ? ' (PDF)' : ' (respaldo HTML)'}.${doc.nota ? ' ' + doc.nota : ''}</span>
        </div>`;
    }
    if (doc.estado === 'externo') {
      return `
        <div class="sn-doc">
          <a class="btn-tecnico" href="${doc.url}" target="_blank" rel="noopener">${doc.titulo} ↗</a>
          <span class="meta">Solo disponible en línea, en su sitio oficial.${doc.nota ? ' ' + doc.nota : ''}</span>
        </div>`;
    }
    /* no-publicado */
    return `
      <div class="sn-doc sn-doc-np">
        <p class="sn-doc-np-titulo">⚠️ <strong>${doc.titulo}:</strong> ${doc.aviso}</p>
        ${doc.evidencia.map(ev => `
          <a class="btn-tecnico" href="${ev.url}" target="_blank" rel="noopener">${ev.nombre} ↗</a>`).join('')}
      </div>`;
  },

  /* ============================================================
     Beta 0.8: modo "Portales de transparencia" (D6–D8, aditivo)
     ============================================================ */
  /* Selector de modos D6: visible en la portada de ambos modos */
  _selectorModos(activo) {
    return `
      <nav class="sn-modos" aria-label="Modo de la sección">
        <a class="sn-modo ${activo === 'planes' ? 'activo' : ''}" href="#/tu-comuna">${this.D6_PLANES}</a>
        <a class="sn-modo ${activo === 'portales' ? 'activo' : ''}" href="#/tu-comuna/portales">${this.D6_PORTALES}</a>
      </nav>`;
  },

  /* Entrada del modo portales: carga perezosa de portales-municipios.json */
  _entrarPortales(cont, regionId, arg) {
    if (this.portales) {
      return regionId ? this._regionPortales(cont, regionId) : this._portadaPortales(cont);
    }
    cont.innerHTML = '<p class="intro">Cargando los portales de transparencia…</p>';
    if (!this._promesaPortales) {
      this._promesaPortales = fetch('data/portales-municipios.json').then(r => {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      });
    }
    this._promesaPortales.then(d => {
      this.portales = d;
      if (location.hash.replace(/^#\/?/, '').split('/')[0] === 'tu-comuna') {
        this._pintar(cont, arg);
      }
    }).catch(() => {
      cont.innerHTML = '<p class="alerta">⚠️ No se pudo cargar el directorio de portales. ' +
        'Si abriste el archivo directamente, prueba con un servidor local (npm run dev).</p>';
    });
  },

  _comunasPorRegion() {
    if (this._comunasCache) return this._comunasCache;
    const mapa = new Map();
    this.portales.municipios.forEach(m => {
      const id = this.REG_PORTAL_ID[m.region];
      if (!id) return;
      if (!mapa.has(id)) mapa.set(id, []);
      mapa.get(id).push(m);
    });
    this._comunasCache = mapa;
    return mapa;
  },

  _fechaCorta(iso) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
    return m ? `${m[3]}-${m[2]}-${m[1]}` : (iso || 'por verificar');
  },

  _nombreLargoRegion(nombre) {
    return this.REG_PORTAL_LARGO[nombre] || 'Región de ' + nombre;
  },

  /* Portada del modo portales: selector + D7 + mapa con las 16 regiones activas */
  _portadaPortales(cont) {
    const comunas = this._comunasPorRegion();
    const total = this.portales.municipios.length;
    const fecha = this._fechaCorta(this.portales.municipios[0].fecha_verificacion);
    cont.innerHTML = `
      <section class="seccion-int sn">
        <h2 class="titulo-vista">${this.D7_CABECERA}</h2>
        ${this._selectorModos('portales')}

        <div class="sn-mapa-grid">
          <div class="sn-mapa-texto">
            <p class="sn-prosa">${this.D7_TEXTO}</p>
            <p class="sn-mapa-pista">Toca tu región para buscar tu comuna.</p>
          </div>
          <figure class="sn-mapa-fig">
            ${this._svgMapaPortales(comunas)}
            <figcaption class="sn-mapa-leyenda">
              <span class="sn-ley-item"><span class="sn-ley-muestra activa"></span> ${total} municipalidades — las 16 regiones activas</span>
              <span class="sn-ley-nota">Mapa esquemático: no representa la geografía a escala.</span>
            </figcaption>
          </figure>
        </div>

        <p class="meta sn-corte">Datos verificados el ${fecha}.</p>
      </section>`;
  },

  /* Mapa del modo portales: misma geometría, pero las 16 bandas activas
     y con el conteo de comunas calculado desde los datos */
  _svgMapaPortales(comunas) {
    const regiones = this.datos.regiones_mapa;
    const h = this._MAPA_Y0 * 2 + regiones.length * (this._BANDA_H + this._BANDA_GAP) - this._BANDA_GAP;
    let bandas = '';
    regiones.forEach((r, i) => {
      const [x, w] = this._GEO[i];
      const y = this._MAPA_Y0 + i * (this._BANDA_H + this._BANDA_GAP);
      const yTexto = y + this._BANDA_H / 2;
      const n = (comunas.get(r.id) || []).length;
      bandas += `
        <a href="#/tu-comuna/portales-region-${r.id}" class="sn-reg activa" data-region="${r.id}">
          <title>${r.nombre} — ${n} ${n === 1 ? 'comuna' : 'comunas'}</title>
          <rect x="${x}" y="${y}" width="${w}" height="${this._BANDA_H}" rx="9"></rect>
          <text class="sn-reg-nombre" x="${x + w + 10}" y="${yTexto - 3}">${r.nombre}</text>
          <text class="sn-reg-conteo" x="${x + w + 10}" y="${yTexto + 13}">${n} ${n === 1 ? 'comuna' : 'comunas'}</text>
        </a>`;
    });
    return `
      <svg class="sn-mapa-svg" viewBox="0 0 340 ${h}" role="img"
           aria-label="Mapa esquemático de Chile: las 16 regiones están activas; elige una para ver los portales de transparencia de sus comunas">
        ${bandas}
      </svg>`;
  },

  /* Vista regional D8: cabecera + conteos calculados + buscador + tarjetas */
  _regionPortales(cont, regionId) {
    const region = this.datos.regiones_mapa.find(r => r.id === regionId);
    const comunas = this._comunasPorRegion().get(regionId) || [];
    if (!region || !comunas.length) return this._portadaPortales(cont);
    const nombre = comunas[0].region;
    const n = comunas.length;
    const propio = comunas.filter(m => m.urls.activa !== m.urls.ptransparencia).length;
    const viaPortal = n - propio;
    const fecha = this._fechaCorta(comunas[0].fecha_verificacion);
    cont.innerHTML = `
      <section class="seccion-int sn">
        <p><a class="volver" href="#/tu-comuna/portales">← Volver al mapa de portales</a></p>
        <h2 class="titulo-vista">${this.D7_CABECERA} — ${this._nombreLargoRegion(nombre)}</h2>
        <p class="ayuda">${n} ${n === 1 ? 'comuna' : 'comunas'}. ${propio} ${propio === 1 ? 'tiene' : 'tienen'}
          portal propio; ${viaPortal} ${viaPortal === 1 ? 'publica' : 'publican'} vía Portal del Estado.
          Datos verificados el ${fecha}.</p>

        <input type="search" class="sn-buscar" id="sn-buscar-portal"
               placeholder="Buscar tu comuna…" aria-label="Buscar comuna por nombre" autocomplete="off">
        <p class="sn-contador" id="sn-contador-portal" role="status"></p>
        <div class="sn-tarjetas" id="sn-lista-portal"></div>

        <p class="meta sn-corte">Datos verificados el ${fecha}.</p>
      </section>`;

    const norm = s => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const listar = texto => {
      const lista = comunas.filter(m => !texto || norm(m.nombre).includes(texto));
      document.getElementById('sn-contador-portal').textContent =
        `${lista.length} de ${n} ${n === 1 ? 'comuna' : 'comunas'}`;
      document.getElementById('sn-lista-portal').innerHTML = lista.length
        ? lista.map(m => this._tarjetaPortal(m)).join('')
        : '<p class="meta">Ninguna comuna coincide con la búsqueda.</p>';
    };
    document.getElementById('sn-buscar-portal').addEventListener('input', e => listar(norm(e.target.value)));
    listar('');
  },

  /* Tarjeta de comuna (D8): badges de estado y tipo de portal, accesos D3, fecha */
  _tarjetaPortal(m) {
    const est = this.ESTADOS_PORTAL[m.estado] || { etiqueta: m.estado, clase: 'pv' };
    const propio = m.urls.activa !== m.urls.ptransparencia;
    return `
      <article class="tarjeta institucion sn-tarjeta sn-tarjeta-portal">
        <div class="nombre">Municipalidad de ${m.nombre}</div>
        <div class="meta">
          <span class="sn-badge ${est.clase}">${est.etiqueta}</span>
          ${propio
            ? '<span class="chip sn-chip-propio">Portal propio</span>'
            : '<span class="chip">Vía Portal del Estado</span>'}
        </div>
        <div class="sn-accesos">
          <a class="btn-pdf" href="${m.urls.activa}" target="_blank" rel="noopener">Transparencia activa ↗</a>
          ${m.urls.partes === 'por_verificar'
            ? '<span class="sn-acceso-pv" title="Sin fuente oficial con URL de su canal propio de solicitudes">Solicitudes: por verificar</span>'
            : `<a class="btn-tecnico" href="${m.urls.partes}" target="_blank" rel="noopener">Solicitudes ↗</a>`}
          <a class="btn-tecnico" href="${m.urls.ptransparencia}" target="_blank" rel="noopener">Ficha Portal ↗</a>
        </div>
        <div class="meta sn-fecha">Verificado el ${this._fechaCorta(m.fecha_verificacion)}</div>
      </article>`;
  },

  /* ============================================================
     Utilidades de texto
     ============================================================ */
  /* "||" separa párrafos; "@@" separa ítems de lista dentro del primer párrafo */
  _parrafos(texto, clase) {
    return texto.split('||').map(bloque => {
      const partes = bloque.split('@@');
      const primero = `<p class="${clase || ''}">${partes[0].trim()}</p>`;
      if (partes.length === 1) return primero;
      return primero + '<ul>' + partes.slice(1).map(p => `<li>${p.trim()}</li>`).join('') + '</ul>';
    }).join('');
  },

  _htmlT5() {
    const intro = this._parrafos(this.T5_INTRO);
    const lineas = this.T5_SELLOS.split('@@');
    const cabeza = `<p><strong>${lineas[0].trim()}</strong></p>`;
    const filas = lineas.slice(1).map(l => {
      const m = l.trim().match(/^\[(\w+)\]\s*(.*)$/s);
      if (!m) return '';
      const sello = this.SELLOS[m[1]];
      return `<li><span class="sello-verif ${m[1]}">${sello.etiqueta}</span> — ${m[2].trim()}</li>`;
    }).join('');
    return `${intro}${cabeza}<ul class="sn-sellos-guia">${filas}</ul>${this._parrafos(this.T5_BOTON)}`;
  },
};
