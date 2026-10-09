# Changelog — El Estado abierto, explicado (versión Ciudadanía)

Versión para público general del [Mapa del Sistema](https://github.com/bedeberna-debug/mapa-del-sistema).
Numeración alineada con la app hermana; cada versión consume la misma data compilada.

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
