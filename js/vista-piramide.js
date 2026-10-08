/* Vista "¿Cómo está ordenado el sistema?" — capas por jerarquía normativa.
   COPIA RE-ETIQUETADA del componente de la versión Estudio (vista-piramide.js):
   misma lógica de capas y tarjetas; se agregan glosas en lenguaje claro por capa
   y el rango se muestra traducido (app.etiquetaRango). */
const VistaPiramide = {
  ORDEN_CAPAS: [
    { id: 'constitucional', titulo: 'La Constitución',
      glosa: 'La base de todo: está por encima de cualquier ley.' },
    { id: 'orgánica constitucional', titulo: 'Leyes orgánicas constitucionales',
      glosa: 'Leyes "reforzadas": regulan instituciones clave del Estado y necesitan más votos para cambiar.' },
    { id: 'ley', titulo: 'Leyes',
      glosa: 'Aprobadas por el Congreso: son el grueso del sistema.' },
    { id: 'DFL', titulo: 'Decretos con fuerza de ley',
      glosa: 'Los emite el Presidente, pero valen como ley.' },
    { id: 'DS', titulo: 'Reglamentos',
      glosa: 'Detallan cómo se aplica una ley en la práctica. Ejemplo: plazos y formularios para pedir información.' },
    { id: 'internacional', titulo: 'Acuerdos internacionales',
      glosa: 'Tratados y compromisos que Chile firmó con otros países.' },
    { id: 'soft law', titulo: 'Planes y compromisos',
      glosa: 'No son leyes, pero el Estado se compromete públicamente a cumplirlos.' },
  ],

  render(cont, arg, app) {
    const normas = app.grafo.nodos.filter(n => n.tipo === 'norma');
    cont.innerHTML = `
      <h2 class="titulo-vista">¿Cómo está ordenado el sistema?</h2>
      <p class="ayuda">Las normas de más arriba mandan sobre las de abajo: la Constitución encabeza,
      luego vienen las leyes, y abajo los reglamentos y planes. Sirve para entender qué pesa más
      cuando dos normas tratan el mismo tema. Toca cualquier tarjeta para ver su detalle.</p>`;
    for (const capa of this.ORDEN_CAPAS) {
      const nodos = normas.filter(n =>
        capa.id === 'internacional' ? n.rango.startsWith('internacional') : n.rango === capa.id);
      if (!nodos.length) continue;
      const div = document.createElement('div');
      div.className = 'capa';
      div.innerHTML = `<div class="capa-titulo">${capa.titulo} (${nodos.length})</div>
        <p class="capa-glosa">${capa.glosa}</p>`;
      const grid = document.createElement('div');
      grid.className = 'capa-nodos';
      nodos.sort((a, b) => (a.anio || 0) - (b.anio || 0));
      nodos.forEach(n => grid.appendChild(this.tarjeta(n, app)));
      div.appendChild(grid);
      cont.appendChild(div);
    }
  },

  tarjeta(n, app) {
    const t = document.createElement('div');
    t.className = 'tarjeta';
    const nivel = n.nivel === 'municipal' ? `<span class="chip">Tu comuna</span>`
      : n.nivel === 'regional' ? `<span class="chip">Tu región</span>` : '';
    t.innerHTML = `<div class="nombre">${n.nombre}${app.badgeAlerta(n)}</div>
      <div class="meta">${n.anio || 's/a'} · ${app.etiquetaRango(n)} ${nivel}</div>`;
    t.onclick = () => app.irANodo(n.id);
    return t;
  },
};
