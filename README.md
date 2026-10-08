# El Estado abierto, explicado — Versión Ciudadanía

Versión para **público general no experto** del Mapa del Sistema: el marco normativo
chileno de Gobierno Abierto (transparencia, participación, integridad) en lenguaje
claro y con navegación guiada. Proyecto independiente que **consume la misma base de
datos** que la versión Estudio (`plataforma/mapa-del-sistema/`).

Brief de diseño: `plataforma/02 - brief modo ciudadania.md`.

## a) Cómo correrlo localmente

Requisito: Node.js (sin dependencias npm).

```bash
cd plataforma/mapa-ciudadania
npm run sync   # copia la data y fichas desde mapa-del-sistema/ (solo lectura allá)
npm run dev    # sirve en http://localhost:7100/ por defecto
```

El sitio es 100% estático y desplegable tal cual en GitHub Pages / Netlify /
Cloudflare Pages. Si se despliega junto a la versión Estudio (carpetas hermanas),
el enlace "versión académica" de la landing (`../mapa-del-sistema/`) funciona tal cual.

## b) Reglas de datos

- `data/grafo.json`, `data/meta.json` y `fichas/*.html` son **COPIAS GENERADAS**:
  llegan solo vía `npm run sync` (script `scripts/sync-data.js`). **Nunca se editan
  a mano.** Si se detecta un error de datos, se reporta; la corrección se hace en
  el acervo (`marco normativo/`) y se recompila con `plataforma/tools/compilar_grafo.py`.
- Las 6 alertas ⚠️ de vigencia declaradas en `meta.json` se muestran como
  "por verificar" en la interfaz.
- El bloque "¿Y esto en qué me afecta?" del panel se genera por **plantilla
  paramétrica** alimentada solo con campos existentes (`temas`, aristas `opera`,
  `nivel`, `subtipo`, `estado_avance`). Si un nodo no permite derivar nada,
  se muestra "por verificar".

## c) Estructura

```
mapa-ciudadania/
├── index.html              # shell + router de vistas
├── css/tokens.css          # gramática visual compartida con Estudio (mismos hex
│                           #   por tipo de nodo/arista) + paleta de mayor contraste
├── css/app.css             # chrome ciudadano, mobile-first
├── js/app.js               # núcleo: carga de datos, router hash, estado global
│                           #   (misma API pública que el App de Estudio)
├── js/landing.js           # inicio: qué es el Estado abierto + 2 entradas
├── js/guiado.js            # "Quiero resolver algo": 4 rutas por necesidad
├── js/panel.js             # detalle ciudadano + "Ver detalle técnico" (ficha)
├── js/vista-piramide.js    # "¿Cómo está ordenado el sistema?"
├── js/vista-grafo.js       # "¿Qué normas se tocan entre sí?" (D3-force)
├── js/vista-tematica.js    # "¿Qué normas cuidan lo que a ti te importa?"
├── js/vista-temporal.js    # "¿Qué ha cambiado en el tiempo?" (slider 1986–2027)
├── data/                   # GENERADO — copia sincronizada, no editar
├── fichas/                 # GENERADO — 37 fichas pre-compiladas, no editar
├── vendor/d3.v7.min.js     # copia del vendor de Estudio
├── scripts/sync-data.js    # npm run sync
├── server.js               # servidor estático de desarrollo (sin deps)
└── package.json            # npm run dev / npm run sync
```

## d) Re-etiquetado: dónde vive

La data (`meta.json`) mantiene las etiquetas técnicas. La traducción a lenguaje
claro vive en código, nunca en los JSON:

- Tipos de arista: `App.ETIQUETAS_ARISTA` (js/app.js)
- Tipos de nodo: `App.ETIQUETAS_TIPO_NODO` (js/app.js)
- Rango normativo: `App.etiquetaRango()` (js/app.js)
- Glosas de temas: `VistaTematica.GLOSAS_TEMA` (js/vista-tematica.js)
- Glosas de capas: `VistaPiramide.ORDEN_CAPAS` (js/vista-piramide.js)
- Frases "en qué me afecta": `Panel.FRASES_TEMA` (js/panel.js)
- Rutas guiadas: `Guiado.RUTAS` (js/guiado.js)

## e) Propiedad de carpetas (trabajo paralelo)

Esta carpeta (`plataforma/mapa-ciudadania/`) es de la versión Ciudadanía.
`mapa-del-sistema/`, `tools/` y `marco normativo/` pertenecen a otros flujos:
aquí solo se **lee** de ellos (sync de datos). Nunca se escribe en ellos.

## f) Pendientes (fase 2, no incluida)

- Campo opcional `descripcion_ciudadana` por nodo (redactado en el acervo);
  mientras no exista, se usa `descripcion` con su fuente citada.
- Los componentes de grafo y temporal son copias re-etiquetadas de Estudio:
  si el chat de Estudio corrige un bug funcional en los originales, hay que
  portarlo aquí a mano (déficit conocido y aceptado del copiado).
  Último port: 08-10-2026 (mayor dispersión, atracción de satélites, filtros
  por tipo de nodo con "Territorio" oculto de inicio, nuevo tipo de arista
  `responsable_de` — 83 nodos / 271 aristas tras el re-sync).
