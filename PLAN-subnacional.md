# PLAN — Sección "Gobierno abierto en tu comuna y región" (modo Ciudadanía)

**Fecha:** 15-10-2026 · **Alcance:** solo `plataforma/mapa-ciudadania/`. No se toca `mapa-del-sistema/`,
`data/grafo.json` ni ninguna otra carpeta. Todo el trabajo es LOCAL (sin despliegue).

## 1. Archivos

### Nuevos
| Archivo | Contenido |
|---|---|
| `data/subnacional.json` | Módulo de datos de la sección, construido EXCLUSIVAMENTE desde las fichas 01–07 y el resumen 00 del dossier `plataforma/data-subnacional/`. Incluye `fecha_corte` y, por institución: identificación, categoría, estado del plan, compromisos, plataformas, mecanismos, fechas clave, documentos (con estado local/externo/no-publicado), nivel de verificación por bloque y lista de datos "por verificar". |
| `js/vista-subnacional.js` | Vista `VistaSubnacional` (objeto global con `render(cont, arg, app)`, igual que las demás vistas). Tres niveles: portada de sección (T1+T2+T3+mapa+categoría C+T7), vista regional (T4+T5+tarjetas+T6 si aplica) y ficha de institución (bloques con sellos de verificación + documentos). |
| `docs-subnacional/` | Copia local de los PDF usados por los botones de documento (desde `plataforma/data-subnacional/docs/`): 5 de Peñalolén, 3 de San Joaquín, `contexto-voces-gobierno-abierto-chile-2022.pdf` (evidencia del plan histórico de Renca) y `maipu-plan-2023-2024-archivo-web.html` (respaldo; el botón principal de Maipú usa el estado (b) con la página OGP viva). |
| `PLAN-subnacional.md` | Este archivo. |

### Modificados (aditivos; nada existente cambia de comportamiento)
| Archivo | Cambio |
|---|---|
| `index.html` | 1 entrada nueva en el nav (`Tu comuna`, al final, para no desplazar las existentes), 1 `<script>` nuevo, pie: `Beta 0.4` → `Beta 0.5`. |
| `js/app.js` | 1 línea: `tu-comuna: VistaSubnacional` en el mapa `vistas` del router. El resto del núcleo intacto. Los `arg` de la sección (`region-*`, `inst-*`) no existen en `App.nodos`, por lo que `abrirNodo(arg)` es no-op seguro. |
| `css/app.css` | Bloque nuevo al final (`/* --- sección subnacional --- */`), clases con prefijo `sn-` para no colisionar; reutiliza tokens y clases existentes (`titulo-vista`, `ayuda`, `desplegable`, `btn-pdf`, `chip`). |
| `CHANGELOG.md` | Entrada `Beta 0.5` al inicio describiendo la sección. |

## 2. Decisiones

1. **Ruteo:** se usa el router hash existente. `#/tu-comuna` (portada), `#/tu-comuna/region-metropolitana` y `#/tu-comuna/region-biobio` (vista regional), `#/tu-comuna/inst-<id>` (ficha). Navegación con botones "volver" y enlaces mutuos Renca ↔ GORE Santiago.
2. **Mapa de Chile:** SVG esquemático (silueta estilizada en 16 bandas norte→sur, no a escala geográfica — se declara). Sin geometría real para no falsear geografía. Solo Metropolitana (5 instituciones) y Biobío (1) activas: acento azul, clicables (SVG `<a>`, teclado incluido), con `<title>` (tooltip) + etiqueta visible con nombre y conteo. Las 14 restantes en gris, sin hover interactivo, con leyenda "Sin plan de gobierno abierto declarado (dato al 15-10-2026)". Sin mapa comunal (decisión del encargo).
3. **Textos T1–T7 verbatim:** T1+T2 en portada; T3 acompaña al mapa en la portada (la vista regional lleva solo cabecera contextual); T4 como bloque desplegable junto a las tarjetas y su significado como ayuda emergente en cada sello A/B; T5 como ayuda desplegable "Cómo leer cada ficha"; T6 como nota en las fichas de Renca y GORE + indicador "Plan compartido 2026–2028" con enlace mutuo; T7 al final de la portada (línea de antecedentes). Categoría C: solo bloque explicativo en portada (ficha 07 + parte C de T4), sin tarjetas.
4. **Sellos de verificación** (mapeo de 🟢🟡🟠⚪ a la paleta): Documento oficial → verde `--c-horizonte`; Plataforma institucional → azul `--acento`; Prensa → ámbar `--c-nivel`; Por verificar → `--alerta` con ⚠️, visible nunca como hecho. Cada bloque de la ficha (compromisos, plataformas, mecanismos, fechas) lleva su sello predominante y los datos dudosos se marcan en línea.
5. **Botón de documento (3 estados):** (a) PDF local → `docs-subnacional/...` en pestaña nueva; (b) solo en línea → enlace externo (Maipú → página OGP viva; GORE Santiago → página OGP del plan 2026–2028); (c) no publicado → aviso "Documento completo no publicado por la institución" + enlace a la mejor evidencia oficial (Renca → micrositio + libro Voces local; Concepción → noticia municipal + evento Open Gov Week).
6. **Fecha de corte visible:** "Datos verificados al 15-10-2026" en la portada de la sección y en el pie de cada ficha.
7. **Responsive:** mapa SVG escalable (viewBox), tarjetas en columna en móvil, grillas solo ≥700px (mismo breakpoint de la app).

## 3. Verificación antes de entregar

- `node --check` en los JS tocados; JSON parseable.
- Servidor temporal (`node server.js --port <puerto>`): 200 en `/`, `/data/subnacional.json`, un PDF de `docs-subnacional/` y el HTML de respaldo; rutas existentes intactas. Servidor detenido al terminar.
- Confirmar que el nav/router/vistas previas (inicio, resolver, internacional, orden, relaciones, temas, tiempo) no cambiaron.

## 4. Datos que quedarán marcados "por verificar" en la UI

- Maipú: estado del segundo plan (ficha OGP al 15-10-2026 aún muestra el plan 2023–2024).
- San Joaquín: número exacto de compromisos del plan 2023 (CEPAL dice 4, carta OGP lista 3).
- GORE Santiago: URL pública de la Plataforma de Rendición de Cuentas (entregable anunciado del Compromiso 2).
- Concepción: tramitación ante CPLT/MNEA (autodeclarado), URL de la consulta digital, micrositio permanente, composición del Foro Multisectorial, vigencia formal del plan.
- Peñalolén: publicación del II Plan (en cocreación; ficha OGP muestra aún el I Plan como en implementación).
