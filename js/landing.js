/* landing.js — Página de inicio introductoria: qué es el Estado abierto,
   para qué sirve la herramienta y los dos caminos de entrada. */
const Landing = {
  render(cont, arg, app) {
    cont.innerHTML = `
      <section class="hero">
        <h2>Tus derechos frente al Estado, en un solo mapa</h2>
        <p>Un <strong>Estado abierto</strong> es uno que te muestra lo que hace, te deja
        participar y se somete a reglas de probidad. En Chile eso está escrito en decenas de
        leyes, reglamentos y acuerdos — esta herramienta los junta en un mapa y te los explica
        en lenguaje claro.</p>

        <div class="tres-principios">
          <div class="principio">
            <h3>🔍 Transparencia</h3>
            <p>El Estado te muestra lo que hace. Ejemplo: puedes pedirle a tu municipalidad
            cuánto gastó en la plaza de tu barrio.</p>
          </div>
          <div class="principio">
            <h3>🗣️ Participación</h3>
            <p>Tu opinión cuenta antes de decidir. Ejemplo: puedes organizarte con tus vecinos
            y opinar sobre proyectos de tu comuna.</p>
          </div>
          <div class="principio">
            <h3>⚖️ Integridad</h3>
            <p>Reglas para que los funcionarios actúen con probidad. Ejemplo: quien trabaja
            en el Estado no puede decidir contratos donde tenga un conflicto de interés.</p>
          </div>
        </div>

        <div class="entradas">
          <a class="entrada" href="#/relaciones">
            <strong>Explorar el mapa</strong>
            <span>Navega libremente por las normas, las instituciones y los compromisos del
            Estado: puedes verlas ordenadas por jerarquía, por tema, por año o conectadas
            entre sí.</span>
          </a>
          <a class="entrada" href="#/resolver">
            <strong>Quiero resolver algo</strong>
            <span>Cuéntanos qué necesitas —pedir información, participar, denunciar o
            contratar con el Estado— y te llevamos paso a paso a lo que te sirve.</span>
          </a>
        </div>

        <p class="intro" style="margin-top:1.2rem">Versión para público general del
        <em>Mapa del Sistema</em>: ${app.grafo.total_nodos} elementos del marco normativo de
        Gobierno Abierto, todos verificados contra sus fichas documentales.</p>
        <a class="enlace-estudio" href="../mapa-del-sistema/" title="Versión con fichas técnicas y citas completas">
          ¿Buscas el detalle técnico? Ir a la versión académica →</a>
      </section>`;
  },
};
