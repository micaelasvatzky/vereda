# Vereda

**TODO(Mica)**: nombre final del sitio, descripción de la propuesta y público al que se
dirige. Reemplazar este README completo en la Fase 7.

Un portfolio web personal e interactivo. El visitante camina por una vereda de Buenos
Aires y va pasando por carteleras verdes de calle. Cada cartelera es un proyecto y el
afiche negro que lleva puesto es la pieza de diseño.

## Estado del proyecto

Fase 0 (andamiaje) — en construcción.

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
├─ components/        ← Escenario, Cartelera, Afiche, ClimaCiudad, LineaParadas
├─ layouts/           ← Vereda.astro
├─ pages/             ← index, lista, 404
├─ scripts/           ← escenario, clima, cielo, afiche
└─ styles/            ← tokens.css, global.css
docs/                 ← bitácora, decisiones, pruebas, uso de IA, defensa
public/               ← capas/, stickers/, img/
```

## Fuente dinámica

Open-Meteo (clima y salida/puesta del sol de Buenos Aires). Se documenta completo en la
Fase 4.

## Licencia y créditos

**TODO(Mica)**: créditos de Open-Meteo, licencias de las tipografías y de las
ilustraciones.