/* Vista "¿Qué normas cuidan lo que a ti te importa?" — filtros por principio.
   COPIA RE-ETIQUETADA del componente de la versión Estudio (vista-tematica.js):
   misma lógica de filtrado por tema; los botones muestran una glosa ciudadana
   y las tarjetas usan el rango traducido (se elimina la referencia interna
   "grupo A–F", que solo tiene sentido en el acervo). */
const VistaTematica = {
  /* Glosas ciudadanas por tema (el tema como dato viene de meta.json;
     aquí solo se explica qué significa para la persona usuaria) */
  GLOSAS_TEMA: {
    transparencia: 'Ver lo que hace el Estado y pedir información',
    participacion: 'Opinar y participar en las decisiones públicas',
    integridad: 'Prevenir la corrupción y los conflictos de interés',
    digital: 'Hacer trámites en línea',
    datos: 'Proteger tus datos personales',
  },

  render(cont, arg, app) {
    cont.innerHTML = `
      <h2 class="titulo-vista">¿Qué normas cuidan lo que a ti te importa?</h2>
      <p class="ayuda">Cada norma del mapa está clasificada según lo que protege o habilita.
      Elige lo que te interesa y verás solo las normas de ese tema.</p>`;

    const filtros = document.createElement('div');
    filtros.className = 'filtros';
    cont.appendChild(filtros);
    const lista = document.createElement('div');
    cont.appendChild(lista);

    let activo = null;
    const pintar = () => {
      lista.innerHTML = '';
      const normas = app.grafo.nodos.filter(n =>
        n.tipo === 'norma' && (!activo || (n.temas || []).includes(activo)));
      const aviso = document.createElement('p');
      aviso.className = 'meta';
      aviso.textContent = activo
        ? `${normas.length} normas sobre «${app.meta.temas.find(t => t.id === activo).etiqueta}». Toca una para ver su detalle.`
        : 'Elige un tema arriba para filtrar las normas.';
      lista.appendChild(aviso);
      normas.sort((a, b) => (a.anio || 0) - (b.anio || 0));
      normas.forEach(n => {
        const t = document.createElement('div');
        t.className = 'tarjeta';
        t.innerHTML = `<div class="nombre">${n.nombre}${app.badgeAlerta(n)}</div>
          <div class="meta">${n.anio || 's/a'} · ${app.etiquetaRango(n)}</div>`;
        t.onclick = () => app.irANodo(n.id);
        lista.appendChild(t);
      });
    };

    app.meta.temas.forEach(t => {
      const b = document.createElement('button');
      b.innerHTML = `<strong>${t.etiqueta}</strong><span>${this.GLOSAS_TEMA[t.id] || ''}</span>`;
      b.onclick = () => {
        activo = activo === t.id ? null : t.id;
        filtros.querySelectorAll('button').forEach(x => x.classList.remove('activo'));
        if (activo) b.classList.add('activo');
        pintar();
      };
      filtros.appendChild(b);
    });
    pintar();
  },
};
