// sync-data.js — copia la base de datos y recursos compilados desde la app hermana
// (mapa-del-sistema) hacia esta app. NUNCA edita los datos: solo copia.
// Uso: npm run sync   (desde plataforma/mapa-ciudadania)
const fs = require('fs');
const path = require('path');

const ORIGEN = path.join(__dirname, '..', '..', 'mapa-del-sistema');
const DESTINO = path.join(__dirname, '..');

const COPIAS = [
  ['data/grafo.json', 'data/grafo.json'],
  ['data/meta.json', 'data/meta.json'],
  ['vendor/d3.v7.min.js', 'vendor/d3.v7.min.js'],
];

function copiar(relOrigen, relDestino) {
  const src = path.join(ORIGEN, relOrigen);
  const dst = path.join(DESTINO, relDestino);
  if (!fs.existsSync(src)) {
    console.error(`✗ No existe el origen: ${src}`);
    process.exitCode = 1;
    return 0;
  }
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(src, dst);
  return 1;
}

let ok = 0;
for (const [o, d] of COPIAS) ok += copiar(o, d);

// Fichas HTML pre-compiladas (directorio completo)
const dirFichas = path.join(ORIGEN, 'fichas');
if (!fs.existsSync(dirFichas)) {
  console.error(`✗ No existe el directorio de fichas: ${dirFichas}`);
  process.exitCode = 1;
} else {
  for (const f of fs.readdirSync(dirFichas).filter(f => f.endsWith('.html'))) {
    ok += copiar(path.join('fichas', f), path.join('fichas', f));
  }
}

// PDFs oficiales / de referencia (directorio completo, si existe en Estudio)
const dirPdfs = path.join(ORIGEN, 'pdfs');
if (fs.existsSync(dirPdfs)) {
  for (const f of fs.readdirSync(dirPdfs).filter(f => f.endsWith('.pdf'))) {
    ok += copiar(path.join('pdfs', f), path.join('pdfs', f));
  }
} else {
  console.log('  (sin carpeta pdfs/ en Estudio por ahora — se omite)');
}

console.log(`✓ Sincronización completa: ${ok} archivos copiados desde mapa-del-sistema/`);
console.log('  Recordatorio: estos archivos son GENERADOS. Los errores de datos se reportan,');
console.log('  se corrigen en el acervo (marco normativo/) y se recompilan — nunca se editan aquí.');
