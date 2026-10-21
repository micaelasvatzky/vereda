/**
 * Verifica que todos los archivos de texto del repo estén en UTF-8.
 *
 * Un archivo guardado en Windows-1252 (ANSI) NO está corrupto: es texto válido,
 * sólo que con bytes que no son UTF-8. Git no avisa, el build no se queja, y el
 * problema aparece después, cuando alguien lo lee y ve un rombo con signo de
 * pregunta en vez de cada tilde. Ya pasó con `docs/pruebas.md`.
 *
 * Uso: `npm run check`
 */

import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

/** Carpetas que no son código nuestro: no se miran. */
const IGNORAR = new Set(['node_modules', 'dist', '.astro', '.git']);

/** Extensiones de los archivos que tienen que ser texto UTF-8. */
const EXTENSIONES = new Set(['.md', '.astro', '.js', '.mjs', '.ts', '.json', '.css', '.svg']);

/** Decoder estricto: si el archivo no es UTF-8 válido, tira. */
const utf8Estricto = new TextDecoder('utf-8', { fatal: true });

/** Devuelve todos los archivos de texto que hay bajo una carpeta. */
function recorrer(carpeta) {
  const encontrados = [];

  for (const entrada of readdirSync(carpeta, { withFileTypes: true })) {
    if (IGNORAR.has(entrada.name)) continue;

    const ruta = join(carpeta, entrada.name);
    if (entrada.isDirectory()) {
      encontrados.push(...recorrer(ruta));
    } else if (EXTENSIONES.has(ruta.slice(ruta.lastIndexOf('.')))) {
      encontrados.push(ruta);
    }
  }

  return encontrados;
}

const raiz = process.argv[2] ?? '.';
const corruptos = [];

for (const ruta of recorrer(raiz)) {
  try {
    utf8Estricto.decode(readFileSync(ruta));
  } catch {
    corruptos.push(relative(raiz, ruta));
  }
}

if (corruptos.length > 0) {
  console.error('Archivos que NO estan en UTF-8:');
  for (const ruta of corruptos) console.error(`  - ${ruta}`);
  console.error('');
  console.error('Guardalos como UTF-8 (sin BOM) y volve a correr el script.');
  process.exit(1);
}

console.log('OK: todos los archivos de texto estan en UTF-8.');
