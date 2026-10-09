/* app.js — Núcleo de la versión Ciudadanía: carga de datos, router, estado global.
   Mantiene la MISMA API pública que el App de la versión Estudio
   (grafo, meta, nodos, abrirNodo, etiquetaArista, nombreCorto, badgeAlerta…)
   para que los componentes reutilizados funcionen sin cambios funcionales. */
const App = {
  grafo: null, meta: null, nodos: new Map(), vista: null,

  /* Re-etiquetado en lenguaje claro de los 6 tipos de arista.
     meta.json (dato generado) NO se modifica: la traducción vive aquí. */
  ETIQUETAS_ARISTA: {
    modifica: 'la modifica',
    desarrolla_reglamenta: 'la reglamenta',
    complementa: 'la complementa',
    opera: 'la hace cumplir',
    da_soporte_a: 'aporta a un compromiso',
    se_aplica_a: 'se aplica en',
    responsable_de: 'es responsable de',
  },

  /* Re-etiquetado de tipos de nodo para leyendas y chips */
  ETIQUETAS_TIPO_NODO: {
    norma: 'Norma',
    institucion: 'Institución',
    horizonte: 'Compromiso u objetivo',
    nivel: 'Territorio',
  },

  async iniciar() {
    const [grafo, meta] = await Promise.all([
      fetch('data/grafo.json').then(r => r.json()),
      fetch('data/meta.json').then(r => r.json()),
    ]);
    this.grafo = grafo; this.meta = meta;
    grafo.nodos.forEach(n => this.nodos.set(n.id, n));
    document.getElementById('pie-stats').textContent =
      `${grafo.total_nodos} elementos · ${grafo.total_aristas} relaciones verificadas contra las fichas del acervo`;

    document.getElementById('panel-cerrar').onclick = () => this.cerrarPanel();
    window.addEventListener('hashchange', () => this.ruta());
    this.ruta();
  },

  ruta() {
    const hash = location.hash.replace(/^#\/?/, '') || 'inicio';
    const [vista, arg] = hash.split('/');
    this.vista = vista;
    document.querySelectorAll('#nav-vistas a').forEach(a =>
      a.classList.toggle('activa', a.dataset.vista === vista));
    this.cerrarPanel();
    const cont = document.getElementById('vista');
    cont.innerHTML = '';
    window.scrollTo(0, 0);
    const vistas = {
      inicio: Landing,
      resolver: Guiado,
      internacional: VistaInternacional,
      orden: VistaPiramide,
      relaciones: VistaGrafo,
      temas: VistaTematica,
      tiempo: VistaTemporal,
    };
    (vistas[vista] || Landing).render(cont, arg, this);
    if (arg) this.abrirNodo(arg);
  },

  irANodo(id) { location.hash = `#/${this.vista}/${id}`; },

  abrirNodo(id) {
    const nodo = this.nodos.get(id);
    if (!nodo) return;
    Panel.mostrar(nodo, this);
  },

  cerrarPanel() {
    document.getElementById('panel').classList.add('oculto');
  },

  abrirPanel() {
    document.getElementById('panel').classList.remove('oculto');
  },

  // Conexiones de un nodo (entrantes y salientes) para el panel de detalle
  conexiones(id) {
    return this.grafo.aristas.filter(a => a.origen === id || a.destino === id);
  },

  etiquetaArista(tipo) {
    return this.ETIQUETAS_ARISTA[tipo] || tipo;
  },

  etiquetaTipoNodo(tipo) {
    return this.ETIQUETAS_TIPO_NODO[tipo] || tipo;
  },

  /* Rango normativo traducido a lenguaje claro (el dato crudo no se toca) */
  etiquetaRango(nodo) {
    if (!nodo.rango) return '';
    if (nodo.rango.startsWith('internacional')) return 'Acuerdo internacional';
    return {
      'constitucional': 'Constitución',
      'orgánica constitucional': 'Ley orgánica constitucional',
      'ley': 'Ley',
      'DFL': 'Decreto con fuerza de ley',
      'DS': 'Reglamento',
      'soft law': 'Plan o compromiso',
    }[nodo.rango] || nodo.rango;
  },

  nombreCorto(nodo) {
    return nodo.nombre.length > 60 ? nodo.nombre.slice(0, 57) + '…' : nodo.nombre;
  },

  badgeAlerta(nodo) {
    return nodo.alerta ? ' <span class="alerta" title="' + nodo.alerta + '">⚠️</span>' : '';
  },
};
