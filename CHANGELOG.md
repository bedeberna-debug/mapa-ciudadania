# Changelog — El Estado abierto, explicado (versión Ciudadanía)

Versión para público general del [Mapa del Sistema](https://github.com/bedeberna-debug/mapa-del-sistema).
Numeración alineada con la app hermana; cada versión consume la misma data compilada.

## Beta 0.9 — Rediseño visual "Territorio Vivo" + portada nueva + reorden de navegación (20-10-2026)
- **Cambio 100% de presentación y estructura de entrada:** ningún texto factual, ficha
  ni dato fue modificado (salvo la corrección de cifra de la tarjeta 02, ver abajo).
- **Chrome nuevo según la propuesta de diseño aprobada** (`plataforma/diseno-propuestas/propuesta-2/`,
  variante azul profundo + crema + cobre, pie rojizo teja/cobrizo): la barra superior pasa a
  **banda-cabecera** con cordillera en capas, capa atenuante azul, siluetas tono sobre tono
  (cóndor y estrella solitaria), marca "EA", título, subtítulo y chip "Versión Ciudadanía".
  Tipografías **Atkinson Hyperlegible** (cuerpo) y **Bitter** (titulares).
- **Portada (Inicio) nueva:** hero y grilla de 7 tarjetas numeradas 01–07 con los textos
  TEXTUALES de `plataforma/data-guias/landing-v2.md`, cada tarjeta enlaza a su vista.
- **Reorden de navegación** (también en la grilla de la portada): Inicio, Resolver algo,
  Tu comuna, Mapa, Temas, Tiempo, Orden, Internacional.
- **Pie de página nuevo:** banda rojiza con siluetas (huemul y copihue), nota de
  verificación, créditos reales y enlaces a changelog / comentarios / issues.
- **Cifras re-verificadas contra la data:** 98 nodos ✓, 310 conexiones ✓ (grafo.json),
  345 municipalidades ✓ (portales-municipios.json). La tarjeta "Tu comuna" decía
  "3 gobiernos regionales y 3 municipalidades" en el borrador; la data
  (`subnacional.json`) registra **1 gobierno regional + 5 municipalidades** y la tarjeta
  (y `landing-v2.md`) quedaron corregidas.
- **Contraste AA medido:** los enlaces del pie usan `#ffc95e` en vez del `#f2b230` del
  mockup (éste llegaba a 4,02:1 sobre el inicio del degradado, bajo AA; el tono ajustado
  mide ≥ 4,9:1 en toda la banda). El amarillo `#f2b230` se mantiene solo en decoración.
- **Anti-colisión CSS:** todo lo nuevo vive en `css/territorio-vivo.css` con prefijo `tv-`;
  las clases preexistentes (`.tarjeta`, `.capa`, `.pie`, `.hero`, `sn-`, `rg-`) no se tocan.
  Los colores semánticos del grafo y los tokens compartidos con la versión Estudio quedan intactos.
- **Funcionalidad intacta:** grafo d3, panel de detalle, mapa SVG de "Tu comuna", guías de
  "Resolver algo", modos de portales y regla `.seccion-int` centrada (880px). La versión
  Ciudadanía sigue sin mostrar enlace a la versión académica.

## Beta 0.8 — Modo "Portales de transparencia" en "Tu comuna" (20-10-2026)
- **Selector de dos modos** en la sección "Tu comuna" (texto D6): "Planes de gobierno
  abierto" (el modo actual, sin ningún cambio) y **"Portales de transparencia"** (nuevo).
  Rutas nuevas `#/tu-comuna/portales` y `#/tu-comuna/portales-region-<id>`; todas las rutas
  y vistas anteriores (0.5–0.7) quedan intactas.
- **En el modo portales el mapa se enciende completo:** las 16 regiones quedan activas y
  clicables (la transparencia activa es obligación de todas las municipalidades), cada una
  con su conteo de comunas **calculado desde los datos**, y el texto D7 junto al mapa
  (transparencia ≠ gobierno abierto).
- **Vista regional (D8):** cabecera "Portales de transparencia — Región de [nombre]", texto
  con conteos calculados ([N] comunas, [X] portal propio, [Y] vía Portal del Estado),
  **buscador que filtra mientras escribes** y tarjetas por comuna con badges de estado
  (verificado / por verificar / no respondió al chequeo) y de tipo de portal (propio vs. vía
  Portal del Estado), los tres accesos (Transparencia activa · Solicitudes · Ficha Portal)
  y la fecha de verificación de cada enlace.
- Datos en módulo nuevo `data/portales-municipios.json` (copia de
  `plataforma/data-portales/10-municipios.json`: 345 municipalidades verificadas el
  **19-10-2026**; la app no depende de rutas externas al repo). No se modificó
  `data/subnacional.json` ni `data/grafo.json`.
- **App hermana nueva e independiente:** `plataforma/directorio-portales/` — el mismo
  directorio como aplicación estática propia (345 municipalidades + 16 GOREs + 24
  organismos nacionales, con buscador y filtros por región y estado), lista para publicarse
  como repo propio en GitHub Pages (ver su `README.md` y `PLAN-portales.md`).
- Estilos nuevos solo con prefijo `sn-` (selector de modos, buscador, badges de estado);
  toda la gramática visual previa se reutiliza.
- ⚠️ se muestran "por verificar" en la UI (tal cual los datos): los 4 municipios sin enlace
  oficial de solicitudes (Concón, Curacaví, Puente Alto, Teodoro Schmidt) y los 19 registros
  municipales cuyo chequeo automático fue bloqueado (posible anti-robots).

## Beta 0.7 — Guías de procedimientos en "Resolver algo" (19-10-2026)
- **La vista "Resolver algo" pasa de curaduría de normas a guías de procedimientos:**
  cada una de las 4 rutas (pedir información, participar, denunciar, contratar con el
  Estado) ahora muestra qué hacer, ante quién, en qué plazo y qué sigue si te dicen que
  no, construida exclusivamente desde el dossier `plataforma/data-guias/` con fecha de
  corte **19-10-2026** (visible en cada guía: "Procedimientos verificados al 19-10-2026").
- **20 procedimientos ciudadanos** (5 por ruta), cada uno en acordeón con: cuándo usarlo,
  pasos numerados, plazo destacado, costo, bloque "Si te dicen que no / no responden" con
  la instancia siguiente, fuente y **sello de verificación** (documento oficial /
  plataforma institucional / ⚠️ por verificar, reutilizando las clases `sello-verif`).
- Estructura por guía: síntesis → instituciones clave (con enlaces oficiales y "Ver en el
  mapa →" cuando el nodo existe en el grafo: CPLT, CGR, ChileCompra, Registro Civil,
  Escazú) → obligaciones de la ley → a quiénes alcanza → procedimientos →
  **advertencias y datos vivos** (transición Ley 21.719/Agencia de Protección de Datos,
  práctica real de 120 días en reclamos CPLT, TCP en expansión, etc.) → disclaimer
  obligatorio ("guía informativa, no asesoría legal").
- **Referencias cruzadas entre guías** ("guía 01", "guía 03"…) convertidas en enlaces
  internos `#/resolver/<ruta>`; los "por verificar" se muestran resaltados, nunca como
  hechos.
- **Se mantiene intacta** la sección de pasos-norma al final de cada guía ("las normas
  que te protegen, en el orden en que conviene conocerlas") con su enlace "Ver estas
  piezas en el mapa": la guía encima, las normas debajo.
- Datos en módulo nuevo `data/guias.json` (no se modificó `data/grafo.json`); plan de
  trabajo en `PLAN-guias.md`; estilos nuevos solo con prefijo `rg-`.
- ⚠️ marcados "por verificar" en la UI (tal cual el dossier): plazo exacto de habilitación
  del Registro de Proveedores, plazo de respuesta del Canal de Denuncias CGR, aranceles
  notariales (junta de vecinos y plebiscito), plazos de audiencias municipales según
  ordenanza, vía específica si el alcalde no convoca plebiscito, estado de la anotación
  "fin de vigencia 24-02-2027" de la Ley 21.595, costos de patrocinio ante el TCP.

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
