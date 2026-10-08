/* guiado.js — "Quiero resolver algo": navegación guiada por necesidad.
   Las rutas son curaduría de IDs existentes de la data + textos introductorios
   que parafrasean la descripción de cada nodo. No agregan contenido normativo
   nuevo; si un ID dejara de existir en la data, el paso se marca "por verificar". */
const Guiado = {
  RUTAS: {
    informacion: {
      titulo: 'Quiero pedir información al Estado',
      icono: '📄',
      resumen: 'Qué compró tu municipalidad, cuánto gastó un servicio público, qué estudios respaldan una decisión: tienes derecho a pedirlo.',
      pasos: [
        { id: 'ley-20285', porque: 'Es la ley que te da el derecho a pedir información a los órganos del Estado y regula cómo deben responderte.' },
        { id: 'ds-13-2009', porque: 'Es el reglamento de esa ley: detalla a qué instituciones les puedes pedir y bajo qué procedimiento.' },
        { id: 'inst-cplt', porque: 'Es el organismo que vela por este derecho: si una institución te niega información, aquí puedes reclamar.' },
      ],
    },
    participar: {
      titulo: 'Quiero participar en decisiones públicas',
      icono: '🗳️',
      resumen: 'Desde organizarte con tus vecinos hasta opinar en decisiones ambientales: hay normas que te abren la puerta.',
      pasos: [
        { id: 'ley-20500', porque: 'Es la ley que reconoce el derecho a participar y ordena a los órganos del Estado crear mecanismos para ello.' },
        { id: 'ley-19418', porque: 'Regula las juntas de vecinos y organizaciones comunitarias: la forma más directa de participar en tu comuna.' },
        { id: 'escazu', porque: 'Tratado internacional que garantiza tu derecho a participar y acceder a información en temas ambientales.' },
      ],
    },
    denunciar: {
      titulo: 'Quiero denunciar corrupción o irregularidades',
      icono: '🛡️',
      resumen: 'Si viste un mal uso de recursos públicos o un conflicto de interés, hay normas que te protegen al denunciar.',
      pasos: [
        { id: 'ley-21592', porque: 'Protege a quienes denuncian delitos económicos y de corrupción, incluyendo esquemas de anonimato.' },
        { id: 'ley-20205', porque: 'Protege específicamente a los funcionarios públicos que denuncian irregularidades dentro de su institución.' },
        { id: 'inst-cgr', porque: 'La Contraloría fiscaliza el actuar de los órganos del Estado: es uno de los lugares donde puedes denunciar.' },
      ],
    },
    contratar: {
      titulo: 'Quiero venderle o prestarle servicios al Estado',
      icono: '🤝',
      resumen: 'El Estado compra bienes y servicios por reglas públicas: si tienes un emprendimiento o empresa, esto te interesa.',
      pasos: [
        { id: 'ley-19886', porque: 'Es la ley de compras públicas: fija las reglas de cómo el Estado contrata, con igualdad de condiciones.' },
        { id: 'ley-21634', porque: 'Moderniza ese sistema: simplifica procesos y amplía la participación de mipymes y cooperativas.' },
        { id: 'inst-chilecompra', porque: 'Es la plataforma donde se publican las licitaciones: ahí ves qué está comprando el Estado y cómo postular.' },
      ],
    },
  },

  render(cont, arg, app) {
    if (arg && this.RUTAS[arg]) return this.renderRuta(cont, arg, app);
    this.renderMenu(cont, app);
  },

  renderMenu(cont, app) {
    cont.innerHTML = `
      <h2 class="titulo-vista">¿Qué necesitas resolver?</h2>
      <p class="ayuda">No hace falta saber de leyes para usar tus derechos. Elige lo que
      quieres hacer y te mostramos las normas e instituciones que te sirven, explicadas
      una por una.</p>
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
    cont.innerHTML = `
      <p><a href="#/resolver" class="volver">← Todas las necesidades</a></p>
      <h2 class="titulo-vista">${ruta.icono} ${ruta.titulo}</h2>
      <p class="ayuda">${ruta.resumen} Estas son las piezas del sistema que te sirven,
      en el orden en que conviene conocerlas. Toca cada una para ver su detalle.</p>
      <div class="pasos"></div>
      <p style="margin-top:1.2rem">
        <a class="btn-tecnico" style="text-decoration:none" href="#/relaciones/${ruta.pasos[0].id}">
          Ver estas piezas en el mapa →</a>
      </p>`;
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
};
