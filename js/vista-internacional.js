/* Vista "Compromisos internacionales" — página explicativa (categoría 3 del nav).
   Sin links directos a documentos: para eso están las demás categorías y el panel
   de detalle. Los textos citados se extraen de la data en tiempo de render
   (app.nodos.get(...).descripcion), para que queden sincronizados con el acervo.
   Lo que no consta en la data se marca "por verificar". */
const VistaInternacional = {

  /* Texto de un nodo con respaldo si no existe */
  desc(app, id) {
    const n = app.nodos.get(id);
    return n && n.descripcion ? n.descripcion : null;
  },

  render(cont, arg, app) {
    cont.innerHTML = `
      <section class="seccion-int">
        <h2 class="titulo-vista">Compromisos internacionales</h2>
        <p class="ayuda">Chile ha firmado tratados, se ha unido a alianzas y se ha puesto
        metas globales que obligan al Estado a ser más abierto. Aquí te explicamos por qué
        un país hace eso, cómo se adoptan esos compromisos y cuáles son los principales.</p>

        <h3>¿Por qué un país se ata las manos a propósito?</h3>
        <p>Si un país se limita solo —en pesca, emisiones o anticorrupción— pierde
        competitividad: asume costos que otros no asumen. El tratado resuelve eso haciendo
        la limitación <strong>recíproca y verificable</strong>: todos se limitan a la vez y
        el costo se reparte entre todos.</p>
        <p>Y Chile no solo adhiere: <strong>también propone</strong>. Fue país fundador de la
        Alianza para el Gobierno Abierto (OGP) con su Carta de Intención de septiembre de 2011,
        y su 6° Plan incluye el Compromiso 10 sobre transparencia pesquera (estándar FiTI),
        que existe precisamente porque la transparencia pesquera unilateral no era viable:
        solo tiene sentido si otros países la adoptan también.</p>

        <h3>¿Cómo se adopta un compromiso internacional en Chile?</h3>
        <p>No hay una sola vía: depende de la materia y de lo que manda la Constitución.</p>
        <div class="vias">
          <div class="via">
            <h4>1. Aprobación legislativa + promulgación</h4>
            <p>Los tratados importantes pasan por el Congreso y luego el Presidente los
            promulga por decreto, incorporándolos al derecho interno. Ejemplo: el
            <strong>Decreto 1.879/1998</strong> promulgó la Convención Interamericana
            contra la Corrupción y ordenó publicarla "como Ley" en el Diario Oficial.</p>
          </div>
          <div class="via">
            <h4>2. Ratificación</h4>
            <p>El Estado confirma formalmente el tratado y queda obligado ante la comunidad
            internacional. Ejemplo: el <strong>Acuerdo de Escazú</strong>, suscrito en 2018
            y ratificado por Chile en 2021.</p>
          </div>
          <div class="via">
            <h4>3. Decreto supremo</h4>
            <p>Ciertos compromisos se formalizan directamente por decreto del Presidente,
            sin trámite legislativo, cuando la materia lo permite.</p>
          </div>
          <div class="via">
            <h4>4. Reforma constitucional</h4>
            <p>Cuando el compromiso toca derechos constitucionales, se requiere reformar la
            Constitución. Ejemplo: la <strong>Ley 21.096</strong> elevó la protección de
            datos personales a garantía constitucional (art. 19 N° 4).</p>
          </div>
        </div>
        <p class="mensaje-clave"><strong>Mensaje clave:</strong> son nuestros propios poderes
        del Estado los que deciden adherir, con el procedimiento que manda la Constitución.
        No hay imposición externa: cada compromiso entró por la puerta que Chile mismo abrió.</p>

        <h3>Los tres grandes paraguas</h3>
        <div id="tarjetas-int"></div>
      </section>`;

    const zona = cont.querySelector('#tarjetas-int');
    zona.appendChild(this.tarjetaODS(app));
    zona.appendChild(this.tarjetaOGP(app));
    zona.appendChild(this.tarjetaTratados(app));
  },

  /* --- ODS: redacción oficial de las metas, desde la data --- */
  tarjetaODS(app) {
    const metas = [
      ['ods-16-5', '16.5'], ['ods-16-6', '16.6'],
      ['ods-16-7', '16.7'], ['ods-16-10', '16.10'],
    ];
    let items = metas.map(([id, num]) => {
      const d = this.desc(app, id);
      return `<div class="meta-ods"><span class="num">Meta ${num}</span> — ${d || '⚠️ Redacción oficial por verificar.'}</div>`;
    }).join('');
    // La meta 10.2 no consta en la data del proyecto (verificado 09-10-2026)
    items += `<div class="meta-ods"><span class="num">Meta 10.2</span> — ⚠️ Redacción oficial
      por verificar: no consta en la base de datos del proyecto.</div>`;

    return this.desplegable(
      '🌐 ODS — Objetivos de Desarrollo Sostenible (Agenda 2030, ONU 2015)',
      `<p>Los 17 Objetivos de Desarrollo Sostenible son metas globales que los países de la
      ONU —incluido Chile— se comprometieron a alcanzar a 2030. El Objetivo 16 ("paz, justicia
      e instituciones sólidas") es el corazón del gobierno abierto. Estas son las metas más
      ligadas a este mapa, con su redacción oficial:</p>
      ${items}
      <p class="intro">Puedes seguir cómo va Chile en estas metas: los compromisos del mapa
      que dicen "ODS" muestran su estado de avance evaluado.</p>`,
      '#/relaciones/ods-16');
  },

  /* --- OGP: qué es y cómo funciona (textos desde la data) --- */
  tarjetaOGP(app) {
    const ogp = this.desc(app, 'inst-ogp');
    const mnea = this.desc(app, 'inst-mnea');
    const irm = this.desc(app, 'irm-2025');
    return this.desplegable(
      '🤝 OGP — Alianza para el Gobierno Abierto',
      `<p><strong>Qué es:</strong> ${ogp || '⚠️ Por verificar.'}</p>
      <p><strong>Cómo funciona:</strong> cada país elabora un plan de acción de 4 años con
      compromisos concretos, con una actualización obligatoria a mitad de camino. El plan
      vigente de Chile es el 6° Plan de Estado Abierto 2023-2027, con 12 compromisos.</p>
      <p><strong>Quién lo cocrea:</strong> ${mnea || '⚠️ Por verificar.'}</p>
      <p><strong>Quién evalúa:</strong> ${irm || '⚠️ Por verificar.'}</p>`,
      '#/relaciones/plan-6');
  },

  /* --- Tratados: Escazú, UNCAC, Convención Interamericana --- */
  tarjetaTratados(app) {
    const escazu = this.desc(app, 'escazu');
    const uncac = this.desc(app, 'uncac');
    const inter = this.desc(app, 'convencion-interamericana');
    return this.desplegable(
      '📜 Tratados anticorrupción y de acceso ambiental',
      `<p><strong>Acuerdo de Escazú:</strong> ${escazu || '⚠️ Por verificar.'}</p>
      <p><strong>Convención de la ONU contra la Corrupción (Mérida, 2003):</strong> ${uncac || '⚠️ Por verificar.'}</p>
      <p><strong>Convención Interamericana contra la Corrupción (1996):</strong> ${inter || '⚠️ Por verificar.'}</p>
      <p class="intro">Estos tratados ya son parte del derecho chileno: entraron por las vías
      explicadas arriba y hoy obligan a las instituciones del país.</p>`,
      '#/relaciones/escazu');
  },

  desplegable(titulo, cuerpoHTML, ctaHref) {
    const d = document.createElement('details');
    d.className = 'desplegable';
    d.innerHTML = `<summary>${titulo}</summary>
      <div class="cuerpo-des">${cuerpoHTML}
        <a class="cta-implementa" href="${ctaHref}">¿Qué normas chilenas implementan esto? →</a>
      </div>`;
    return d;
  },
};
