/**
 * Verifica que todos los archivos de texto del repo estén en UTF-8.
 *
 * Un archivo guardado en Windows-1252 (ANSI) NO está corrupto: es texto válido,
 * sólo que con bytes que no son UTF-8. Git no avisa, el build no se queja, y el
 * problema aparece después, cuando alguien lo lee y ve un rombo con signo de
 * pregunta en vez de cada tilde. Ya pasó con `docs/pruebas.md`.
 *
 * También busca el mojibake doble, que el decoder no ve: `sesión` guardado como
 * dos caracteres raros es UTF-8 perfectamente válido, así que pasa el control
 * anterior y el texto queda roto igual. Pasa cuando se lee un archivo UTF-8 sin
 * BOM como ANSI y se lo vuelve a guardar como UTF-8 (típico de PowerShell 5.1
 * sin `-Encoding`).
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

/**
 * Mojibake doble: una `Ã` o `Â` seguida de un carácter de continuación (U+0080 a
 * U+00BF). Es lo que aparece cuando los bytes de un acento se leyeron como ANSI.
 */
const MOJIBAKE = /[\u00C3\u00C2][\u0080-\u00BF]/;

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

/**
 * Devuelve las líneas con mojibake, salteando el código inline: la documentación
 * de este mismo control cita el patrón entre backticks y no es un error.
 */
function lineasConMojibake(texto) {
  const encontradas = [];

  texto.split('\n').forEach((linea, indice) => {
    const sinCodigo = linea.replace(/`[^`\n]*`/g, '');
    if (MOJIBAKE.test(sinCodigo)) encontradas.push({ numero: indice + 1, texto: linea.trim() });
  });

  return encontradas;
}

const raiz = process.argv[2] ?? '.';
const corruptos = [];
const dobleCodificados = [];

for (const ruta of recorrer(raiz)) {
  const bytes = readFileSync(ruta);
  let texto;

  try {
    texto = utf8Estricto.decode(bytes);
  } catch {
    corruptos.push(relative(raiz, ruta));
    continue;
  }

  const lineas = lineasConMojibake(texto);
  if (lineas.length > 0) dobleCodificados.push({ ruta: relative(raiz, ruta), lineas });
}

let fallo = false;

if (corruptos.length > 0) {
  fallo = true;
  console.error('Archivos que NO estan en UTF-8:');
  for (const ruta of corruptos) console.error(`  - ${ruta}`);
  console.error('');
  console.error('Guardalos como UTF-8 (sin BOM) y volve a correr el script.');
  console.error('');
}

if (dobleCodificados.length > 0) {
  fallo = true;
  console.error('Archivos con mojibake doble (UTF-8 valido pero texto roto):');
  for (const { ruta, lineas } of dobleCodificados) {
    console.error(`  - ${ruta}`);
    for (const { numero, texto } of lineas.slice(0, 3)) {
      console.error(`      linea ${numero}: ${texto}`);
    }
    if (lineas.length > 3) console.error(`      ... y ${lineas.length - 3} mas`);
  }
  console.error('');
  console.error('Se arregla reescribiendo el archivo desde una version sana (git show, editor)');
  console.error('o convirtiendo el texto cp1252 -> UTF-8. NO con Get-Content | Set-Content.');
  console.error('');
}

if (fallo) process.exit(1);

console.log('OK: todos los archivos de texto estan en UTF-8 y sin mojibake doble.');
