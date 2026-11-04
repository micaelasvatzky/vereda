# Vereda

**TODO(Mica)**: nombre final del sitio, descripción de la propuesta y público al que se
dirige. Reemplazar este README completo en la Fase 7.

Un portfolio web personal e interactivo. El visitante camina por una vereda de Buenos
Aires y va pasando por carteleras verdes de calle. Cada cartelera es un proyecto: la
captura de su web va en el hueco del cartel verde, el cartel lleva a la demo en Vercel y
el botón de GitHub, al repositorio.

## Estado del proyecto

Fase 2 (las previews en los carteles) — en construcción. La Fase 1 (el motor del
escenario) tiene el parallax y los fixes de la vista de Mica, pero falta medir los fps en
un celular. El cielo dinámico con Open-Meteo ya está integrado. El detalle de cada fase
está en `docs/bitacora.md`; el resumen por fecha, en `docs/bitacora-mica.md`.

## Instalación

```bash
npm install
npm run dev
```

El sitio corre en `http://localhost:4321`.

## Build

```bash
npm run build
npm run preview
```

La salida estática queda en `dist/`.

## Tecnologías

- **AstroJS** — única tecnología obligatoria de la consigna.
- **CSS plano** con variables custom properties (`src/styles/tokens.css`).
- **JavaScript plano** en módulos ES (`src/scripts/`).
- Sin framework de UI, sin Tailwind, sin librería de animación.

La justificación completa de estas decisiones está en `docs/decisiones.md`.

## Estructura

```
src/
├─ config.js          ← toda la parametrización ajustable
├─ content.config.ts  ← schema de la colección de proyectos
├─ content/proyectos/ ← un .md por cartelera (título, orden, links, preview)
├─ assets/proyectos/  ← las capturas de las previews (Astro las sirve en WebP)
├─ assets/clima/      ← sol, luna y nube ilustrados (Astro los sirve en WebP)
├─ components/        ← Escenario, Cartelera, Caminante, ClimaCiudad, ElementosCielo
├─ layouts/           ← Vereda.astro
├─ pages/             ← index, creditos
├─ scripts/           ← escenario, caminante, clima, cielo
└─ styles/            ← tokens.css, global.css
docs/                 ← bitácora, decisiones, pruebas, uso de IA, defensa
public/               ← capas/, stickers/, img/
```

## Los proyectos

Cada cartelera sale de un `.md` en `src/content/proyectos/`. Para agregar un proyecto se
agrega el archivo y la captura en `src/assets/proyectos/`; para sacarlo, se borra el
archivo. El orden en la vereda es el campo `orden` del frontmatter, y el motor arma solo
el recorrido.

## Fuente dinámica

El navegador consulta la [API de Open-Meteo](https://open-meteo.com/en/docs) para
Buenos Aires: temperatura, código del tiempo y salida/puesta del sol. No se consulta
durante el build ni se necesita la ubicación del visitante. Los horarios se interpretan
en `America/Argentina/Buenos_Aires`, aunque se abra el sitio desde otro país.

El cielo cambia de color según el clima y el momento del día. Muestra sol o luna
cuando corresponde, nubes claras con nubosidad y oscuras con lluvia/tormenta.
La nieve y la niebla también tienen estados propios. El amanecer y el atardecer usan
una ventana de 45 minutos a cada lado de la salida/puesta del sol.

- **Carga:** se usa el horario de Buenos Aires mientras llega la respuesta.
- **Datos disponibles:** se guardan en `localStorage` durante 30 minutos.
- **Error, respuesta incompleta, HTTP 429 o más de 6 segundos de espera:** se usa el
  último dato guardado si no supera 6 horas, indicando que es guardado. Sin él, se
  informa que el clima no está disponible y se estima el cielo por horario (7–19 h).
- **Almacenamiento bloqueado:** el clima funciona igual, sin guardar la respuesta.
- **Actualización:** el reloj se revisa cada minuto; se consulta como máximo cada
  30 minutos por pestaña, o al cambiar de fecha local. No se consulta con la pestaña
  oculta. Al volver se revisa si hace falta actualizar.

La API ofrece datos de modelos meteorológicos, no una cámara del cielo. El servicio
gratuito es para uso no comercial y limita las consultas a 600/minuto, 5.000/hora y
10.000/día ([condiciones](https://open-meteo.com/en/terms)). Los datos se atribuyen en
la página `/creditos/` del sitio bajo CC BY 4.0.

Configuración de ciudad, espera y caché: `src/config.js`. Colores, posiciones y
opacidad del sol: `src/styles/tokens.css`. Los dibujos reemplazables del sol, la luna
y la nube están en `src/assets/clima/`; fueron generados con IA como apoyo visual.
Referencia y prompts: [ilustraciones del cielo](docs/ilustraciones-cielo.md).

Pruebas de la integración: `node --test scripts/probar-clima.mjs`.

## Responsive y accesibilidad

El recorrido mantiene scroll nativo y funciona con gestos táctiles y teclado. Al
enfocar un proyecto con Tab, se lo lleva hasta la chica y aparece su descripción.
Los botones tienen un mínimo de 44 px, el foco queda dentro del panel y los links
avisan que abren otra pestaña. Se respeta `prefers-reduced-motion`.

En pantallas de hasta 500 px de alto se usa una lista con los mismos proyectos,
para que la lectura no dependa de achicar la escena. Al volver a vertical se recupera
el punto del recorrido. Sin JavaScript también se muestra esa lista. La adaptación
está en `src/styles/lista.css`, el umbral en `tokens.css` y las medidas en `config.js`.

Se probaron once tamaños, toque/scroll emulado, teclado y el build con CPU ralentizada.
Falta validar fps y gestos en un celular real, Safari/iOS y un lector de pantalla.
La ubicación y paleta del clima se conservaron a pedido de Mica; no se certifica
contraste sobre todos los fondos ni conformidad WCAG completa. Detalle en `docs/pruebas.md`.

Las descripciones aparecen cuando la chica alcanza un cartel y éste se agranda;
en ese mismo momento gira la cabeza. Los textos de Mica se acortaron a su pedido,
conservando el año y las tecnologías. El cartel activo se acomoda dentro de la pantalla.

La caminata usa una sola figura articulada: recortes de `camina-3.svg` con pivotes
en caderas, rodillas, hombros y codos. `src/scripts/caminante.js` calcula el movimiento
según la distancia recorrida y asienta los pies al parar. Sólo se cambia el recorte
de la cabeza para mirar el cartel, sin superponer poses completas. Los originales
se conservan; las zonas ocultas de abrigo/cadera se completan con formas simples.
La caminata fue aprobada por Mica. Falta medir el rendimiento en un celular real.

Mica reportó tirones durante la caminata. Se quitaron las mediciones de geometría en
cada avance y se pasó el movimiento de la chica a `transform`; falta medir la mejora
en navegador y los fps en celular.

## Licencia y créditos

Datos meteorológicos: [Open-Meteo](https://open-meteo.com/),
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Se transforman en colores
y elementos ilustrados. Ver también la página de créditos del sitio.

**TODO(Mica)**: completar licencias y créditos de las tipografías y de las
ilustraciones de la escena. La generación asistida de los elementos del cielo se
registra en `docs/ilustraciones-cielo.md` y `docs/uso-de-ia.md`.
