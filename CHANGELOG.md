# Changelog — El Estado abierto, explicado (versión Ciudadanía)

Versión para público general del [Mapa del Sistema](https://github.com/bedeberna-debug/mapa-del-sistema).
Numeración alineada con la app hermana; cada versión consume la misma data compilada.

## Beta 0.6 — Instituciones subnacionales en el grafo + ajustes de presentación (19-10-2026)
- **Las 6 instituciones subnacionales y sus planes entran al grafo** (12 nodos nuevos:
  86 → **98 nodos**, 290 → **310 aristas**): Peñalolén, Maipú, San Joaquín, Renca,
  GORE Metropolitano de Santiago (nivel regional) y Concepción, con sus 6 planes de
  acción (2019 Renca; 2021 Peñalolén; 2023 Maipú y San Joaquín; 2026 Santiago/GORE y
  Concepción) como nodos de rango *soft law*, grupo nuevo **SN**. Las 14 aristas curadas
  citan texto literal de las fichas del dossier `plataforma/data-subnacional/` (regla
  dura de evidencia idéntica a la del acervo); se reutilizan los tipos de arista
  existentes (`se_aplica_a`, `responsable_de`, `opera`), sin tipos nuevos. El nodo
  "nivel regional" ya existía desde la fase 1 (hermano de nacional y municipal): se
  conecta al GORE, no se duplicó. Temas y Tiempo se alimentan solos de los campos
  `temas`/`anio` (entradas 2019–2026); "Territorio" (tipo nivel) sigue oculto por
  defecto en el mapa. La versión Estudio recibe la misma data sin tocar su interfaz
  (copias locales de `grafo.json`/`meta.json` idénticas, verificadas por hash).
- **Botón "Ver ficha"** en el panel de detalle de las instituciones subnacionales:
  navega a su ficha de la sección "Tu comuna" (campo nuevo `ficha_url`).
- **Vista Orden**: bloque nuevo "Gobierno abierto subnacional" con selector de las 6
  instituciones que navega a su ficha (aditivo; la pirámide no se reestructura).
- **Mapa (grafo)**: vista inicial más alejada (escala inicial 0.70; el zoom 0.12–4 y
  el arrastre siguen intactos) y mayor dispersión (repulsión many-body −520 → −650,
  distancia de enlace 130 → 150).
- Vista **Internacional**: párrafo nuevo sobre la integración como oportunidad y los
  beneficios compartidos de la transparencia y la participación (aditivo; la
  perspectiva de "costos socializados" se mantiene intacta).
- Se elimina el acceso cruzado a la versión académica desde la landing; autoría con
  nombre completo (Bernardo Alfredo Silva Quezada).
- ⚠️ marcados "por verificar": segundo plan de Maipú; número exacto de compromisos del
  plan 2023 de San Joaquín (CEPAL 4 / carta OGP 3); URL de la Plataforma de Rendición
  del GORE; tramitación CPLT/MNEA, PDF y vigencia formal del plan de Concepción.

## Beta 0.5 — Nueva sección "Gobierno abierto en tu comuna y región" (15-10-2026)
- Sección aditiva (entrada **"Tu comuna"** en la navegación, sin cambios en grafo, línea de
  tiempo, pirámide, modos ni selector): el gobierno abierto subnacional chileno con datos
  verificados al **15-10-2026**, construida exclusivamente desde el dossier
  `plataforma/data-subnacional/` (resumen 00 + fichas 01–07).
- **Mapa esquemático SVG de Chile** con sus 16 regiones: solo **Metropolitana** (5
  instituciones) y **Biobío** (1 institución) activas y clicables; las otras 14 en gris con
  leyenda "Sin plan de gobierno abierto declarado (dato al 15-10-2026)".
- **Vista regional** con tarjetas de institución (tipo, sello de categoría con ayuda
  emergente, estado del plan y botón "Ver ficha") y textos guía T4 (categorías) y T5
  (cómo leer cada ficha) desplegables.
- **Fichas de las 6 instituciones** (Peñalolén, Maipú, San Joaquín, Renca, GORE
  Metropolitano de Santiago y Concepción): compromisos, plataformas, mecanismos de
  seguimiento y fechas clave, cada bloque con **sello de verificación** (documento oficial /
  plataforma institucional / prensa / ⚠️ por verificar) y los datos dudosos marcados en
  línea, nunca presentados como hechos.
- **Botón de documento con 3 estados**: PDF local (carpeta nueva `docs-subnacional/` con
  8 PDF y 1 respaldo HTML), enlace externo al sitio oficial (Maipú y GORE Santiago →
  páginas OGP vivas) o aviso "Documento completo no publicado por la institución" + mejor
  evidencia oficial (Renca y Concepción).
- **Conexión consorcio**: las fichas de Renca y del GORE Metropolitano de Santiago llevan
  el indicador "🤝 Plan compartido 2026–2028" con la nota T6 y enlace mutuo.
- **Categoría C** (transparencia municipal CPLT, 300+ de 345 municipios) solo como bloque
  explicativo, sin tarjetas interactivas; **T7** (antecedentes 2012–2026) cierra la portada.
- Datos de la sección en módulo propio `data/subnacional.json` (no se modificó
  `data/grafo.json`); plan de trabajo en `PLAN-subnacional.md`.

## Beta 0.4 — Compromisos internacionales + PDFs + footer (09-10-2026)
- Nueva categoría **"Compromisos internacionales"** (posición 3 del menú, entre "Resolver
  algo" y "Orden"): página explicativa sin links directos a documentos — apertura con el
  argumento de la limitación recíproca (caso chileno: fundador de OGP 2011 y Compromiso 10
  FiTI), tipología de adopción en Chile (aprobación legislativa + promulgación, ratificación,
  decreto supremo, reforma constitucional) y tarjetas desplegables de ODS, OGP y tratados,
  cada una con CTA "¿Qué normas chilenas implementan esto?" que salta al mapa con el nodo
  preseleccionado. La meta ODS 10.2 se muestra marcada "por verificar": no consta en la
  data del proyecto.
- Botón **"Ver documento oficial (PDF)"** en normas y **"Ver documento de referencia (PDF)"**
  en compromisos y ODS, según el campo `pdf` de la data (40 PDFs servidos desde `pdfs/`;
  si el campo es null no se muestra botón).
- El detalle técnico omite la sección 7 "Relevancia para el curso" de las fichas
  (solo presentación; el contenido fuente no se modifica).
- Data re-sincronizada: **86 nodos / 290 aristas**; 3 reglamentos nuevos (D.S. 2/2016 —
  Ley 20.880, D.S. 661/2024 — Ley 19.886 reemplazando al derogado D.S. 250/2004,
  D.S. 295/2025 — reporte de incidentes de ciberseguridad); ⚠️ actualizada en Ley 21.719
  (Boletín 18.623-07: posible postergación de vigencia al 01-12-2027).
- Pie de página con autoría (Bernardo A. Silva Quezada, Universidad de Concepción),
  versión, este changelog, formulario de comentarios (pendiente) y GitHub Issues.

## Beta 0.3 — Arista `responsable_de` + mejoras del grafo (08-10-2026)
- Re-sync: 83 nodos / 271 aristas; nuevo tipo de arista `responsable_de`
  (institución → compromiso) con etiqueta ciudadana "es responsable de" / "tiene como
  responsable a"; 3 instituciones nuevas (MinCiencia, Ministerio de Energía, SUBPESCA).
- Portadas desde Estudio las mejoras del grafo: mayor dispersión, satélites atraídos
  suavemente a la red principal, filtros por tipo de nodo con "Territorio" oculto de inicio.
- Panel: instituciones muestran "Es responsable del cumplimiento de…" y compromisos listan
  su institución responsable.
- Despliegue en GitHub Pages: https://bedeberna-debug.github.io/mapa-ciudadania/

## Beta 0.2 — Panel de detalle ciudadano (30-09-2026)
- Panel en lenguaje claro: nombre + descripción con fuente + bloque "¿Y esto en qué me
  afecta?" generado por plantilla solo desde campos de la data + conexiones en voz
  ciudadana (activa/pasiva).
- Botón discreto "Ver detalle técnico" que carga la ficha completa bajo demanda.
- Enlace "versión académica" a la app hermana.

## Beta 0.1 — Build inicial (30-09-2026)
- Landing introductoria: qué es el Estado abierto (transparencia, participación, integridad
  con ejemplos de la vida real) y dos entradas: "Explorar el mapa" y "Quiero resolver algo".
- Flujo guiado por necesidad: pedir información, participar, denunciar, contratar con el
  Estado (curaduría de nodos existentes + textos que parafrasean sus descripciones).
- 4 vistas re-etiquetadas en lenguaje claro (Orden, Mapa, Temas, Tiempo) reutilizando los
  componentes de la versión Estudio con funcionalidad intacta.
- Chrome mobile-first con gramática visual compartida (mismos colores por tipo de nodo y
  arista) y mayor contraste.
- Data: 80 nodos / 228 aristas consumidos vía `npm run sync` desde `mapa-del-sistema/`.
