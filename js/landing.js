/* landing.js — Portada (vista Inicio). Beta 0.9: estructura y textos
   TEXTUALES de plataforma/data-guias/landing-v2.md (hero + bajada secundaria +
   grilla numerada 01–07), con la gramática visual "Territorio Vivo"
   (clases tv- de css/territorio-vivo.css).

   Cifras re-verificadas el 20-10-2026 contra la data compilada:
   - grafo.json: 98 nodos / 310 aristas ✓ (tarjeta 03)
   - portales-municipios.json: 345 municipalidades ✓ (tarjeta 02)
   - subnacional.json: 1 gobierno regional + 5 municipalidades (NO 3+3 como
     decía el borrador de landing-v2.md: tarjeta 02 corregida y avisada).
   El orden de la grilla sigue el orden de navegación de Beta 0.9. */
const Landing = {
  TARJETAS: [
    { num: '01', titulo: 'Resolver algo', href: '#/resolver',
      texto: 'Guías paso a paso para ejercer tus derechos ante el Estado: pedir información pública, presentar una solicitud ciudadana, proteger tus datos personales y fiscalizar la gestión. Con plazos, canales y qué hacer si la respuesta no llega.' },
    { num: '02', titulo: 'Tu comuna', href: '#/tu-comuna',
      texto: 'Quiénes aplican planes de Gobierno Abierto en los territorios: un gobierno regional y cinco municipalidades, con sus compromisos, informes y plataformas. Incluye un directorio de los portales de transparencia de las 345 municipalidades del país.' },
    { num: '03', titulo: 'Mapa / Relaciones', href: '#/relaciones',
      texto: 'Un grafo interactivo con 98 nodos y 310 conexiones: leyes, reglamentos, tratados, planes, instituciones y objetivos de desarrollo sostenible, y cómo se sostienen entre sí. Toca cualquier punto para ver qué es, por qué importa y dónde leerlo.' },
    { num: '04', titulo: 'Temas', href: '#/temas',
      texto: 'El sistema explicado por materias: transparencia y acceso a la información, participación ciudadana, integridad y probidad, transformación digital y datos personales. Cada tema con sus normas, explicación en lenguaje simple y conexión al resto del sistema.' },
    { num: '05', titulo: 'Tiempo', href: '#/tiempo',
      texto: 'La línea de tiempo del Estado abierto chileno: de la Constitución de 1980 a la ley de datos personales de 2024, pasando por la Ley de Transparencia, la Ley de Participación, la Agenda 2030 y los seis planes de acción nacional.' },
    { num: '06', titulo: 'Orden', href: '#/orden',
      texto: 'Todo el marco normativo en orden jerárquico: Constitución, leyes, decretos y normas municipales, con su texto oficial y fichas resumen. Para consultar la fuente primaria sin intermediarios.' },
    { num: '07', titulo: 'Internacional', href: '#/internacional',
      texto: 'Los compromisos que Chile asumió ante el mundo: la Alianza para el Gobierno Abierto, el Acuerdo de Escazú, la Agenda 2030 y los convenios contra la corrupción, y por qué importan también a nivel local.' },
  ],

  render(cont, arg, app) {
    let html = `
      <section class="tv-hero">
        <h2>El Estado abierto, explicado</h2>
        <p>Una plataforma educativa que reúne, ordena y explica el marco completo del Gobierno Abierto en Chile: su Constitución, sus leyes y reglamentos, los tratados internacionales que lo comprometen, los objetivos de desarrollo sostenible que lo orientan, los planes de acción que lo concretan —incluidos los que hoy se aplican en gobiernos locales— y las instrucciones paso a paso para usarlo como ciudadanía.</p>
        <p class="tv-bajada-secundaria">Todo el contenido proviene del acervo documental del proyecto: cada afirmación verificable está ligada a su fuente, y lo que aún no se ha podido confirmar aparece marcado como "por verificar", para que sepas qué mirar con lupa.</p>
      </section>

      <p class="tv-grilla-intro">Elige por dónde partir — todo está conectado entre sí.</p>
      <div class="tv-grilla">`;
    for (const t of this.TARJETAS) {
      html += `
        <a class="tv-tarjeta" href="${t.href}">
          <span class="tv-num">${t.num}</span>
          <h3>${t.titulo}</h3>
          <p>${t.texto}</p>
          <span class="tv-ir">Entrar</span>
        </a>`;
    }
    html += `</div>`;
    cont.innerHTML = html;
  },
};
