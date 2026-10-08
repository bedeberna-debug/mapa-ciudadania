/* Vista "¿Qué ha cambiado en el tiempo?" — slider de vigencia.
   COPIA RE-ETIQUETADA del componente de la versión Estudio (vista-temporal.js):
   mismo slider y agrupación por año; textos en lenguaje claro y rango traducido. */
const VistaTemporal = {
  render(cont, arg, app) {
    const normas = app.grafo.nodos.filter(n => n.tipo === 'norma' && n.anio);
    const anioMin = Math.min(...normas.map(n => n.anio));
    const ANIO_MAX = 2027;

    cont.innerHTML = `
      <h2 class="titulo-vista">¿Qué ha cambiado en el tiempo?</h2>
      <p class="ayuda">Este sistema no nació de un día para otro: desliza el control para ver
      qué normas ya existían en cada año y cómo se fue construyendo. Los nodos con ⚠️ tienen
      datos de vigencia por verificar.</p>
      <div class="slider-fila">
        <input type="range" id="slider-anio" min="${anioMin}" max="${ANIO_MAX}" value="${ANIO_MAX}" step="1"
          aria-label="Elegir año">
        <span class="anio-actual" id="anio-actual">${ANIO_MAX}</span>
      </div>
      <div id="timeline"></div>`;

    const slider = cont.querySelector('#slider-anio');
    const etiqueta = cont.querySelector('#anio-actual');
    const timeline = cont.querySelector('#timeline');

    const pintar = (anio) => {
      etiqueta.textContent = anio;
      timeline.innerHTML = '';
      const visibles = normas.filter(n => n.anio <= anio)
        .sort((a, b) => b.anio - a.anio);
      const resumen = document.createElement('p');
      resumen.className = 'meta';
      resumen.textContent = `${visibles.length} de ${normas.length} normas ya existían en ${anio}.`;
      timeline.appendChild(resumen);

      let anioGrupo = null, grupo = null;
      visibles.forEach(n => {
        if (n.anio !== anioGrupo) {
          anioGrupo = n.anio;
          grupo = document.createElement('div');
          grupo.className = 'grupo-anio';
          grupo.innerHTML = `<h3>${n.anio}</h3>`;
          timeline.appendChild(grupo);
        }
        const t = document.createElement('div');
        t.className = 'tarjeta';
        t.innerHTML = `<div class="nombre">${n.nombre}${app.badgeAlerta(n)}</div>
          <div class="meta">${app.etiquetaRango(n)} · ${n.estado}</div>`;
        t.onclick = () => app.irANodo(n.id);
        grupo.appendChild(t);
      });
    };

    slider.oninput = () => pintar(+slider.value);
    pintar(ANIO_MAX);
  },
};
