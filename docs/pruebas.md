# Pruebas

Matriz de pantallas, navegadores, qué se probó, resultado y correcciones.

> Esto se completa a medida que avanzan las fases. Hoy hay entradas de las Fases 0 y 1
> (los resultados de la Fase 1 siguen pendientes de que Mica abra la página).

## Matriz de pantallas

Se prueban como mínimo estos tamaños, en vertical y horizontal los de celular:

| Ancho × alto | Tipo |
| --- | --- |
| 360 × 800 | Celular chico |
| 390 × 844 | Celular |
| 768 × 1024 | Tablet |
| 1280 × 720 | Notebook |
| 1920 × 1080 | Escritorio |

## Qué hay que probar

- **Teclado:** recorrer todo el sitio sólo con flechas, `PageUp`/`PageDown`, `Home`, `End`,
  `Tab`, `Enter`, `Esc`. Abrir y cerrar afiches.
- **Sin JavaScript:** el escenario debe caer a un contenedor con scroll horizontal y los
  afiches tienen que ser legibles.
- **`prefers-reduced-motion`:** sin transiciones largas, sin colectivo animado, sin `smooth`.
- **API caída:** bloquear el request a `api.open-meteo.com` en DevTools y verificar que el
  sitio sigue funcionando.
- **Cache vencida:** dejar un dato viejo en `localStorage` y cargar. Tiene que usarlo igual
  aunque esté vencido.
- **Resize y rotación de celular:** girar el teléfono y comprobar que la posición relativa
  del recorrido se conserva.

## Resultados

### Fase 0 — Andamiaje

| Prueba | Resultado |
| --- | --- |
| `npm run build` | OK, 1 página |
| `npm run dev` | OK |
| Sin JavaScript | **Pendiente** (la página actual no tiene nada que testear todavía) |
| Teclado | **Pendiente** |

### Fase 1 — Motor del escenario

Verificado por el agente (sin poder ver la página):

| Prueba | Resultado |
| --- | --- |
| `npm run build` | OK |
| HTML servido en `localhost:4321` | 1 riel, 1 escenario, 5 carteleras con índice, 1 chica, 1 capa de mundo, 4 capas de fondo |

**Todo lo demás quedó pendiente de que Mica abra la página.** Le comprobamos:

| Prueba | Resultado |
| --- | --- |
| ¿Se ve la chica? | **Pendiente** |
| ¿Camina al scrollear? | **Pendiente** |
| ¿La caminata se ve suave, sin saltos de pose? | **Pendiente** — el agente verificó los keyframes a mano, sin verlos |
| ¿Al parar el scroll frena la chica (no sigue caminando parada)? | **Pendiente** — el freno es por timer de 140 ms |
| Hover en el marco verde → la chica mira el cartel | **Pendiente** |
| ¿La pose quieta se ve bien (quedó `camina-1`)? | **Pendiente** — decisión del agente, ver bitácora |
| ¿El parallax se nota (fondo más lento que la vereda)? | **OK** — probado por Mica el 7/10: "el parallax va bien" |
| ¿La cartelera activa se prende? | **Pendiente** |
| Flechas ← →, Home, End | **Falló lo probado por Mica** (bug 9: entre paradas las flechas se desorientaban). **Arreglado, falta re-ver** en navegador |
| ¿Las carteleras están plantadas sobre la vereda (misma línea que la chica)? | **Falló lo probado por Mica** (bug 10: base en el borde inferior de la pantalla). **Arreglado, falta re-ver** |
| ¿Las carteleras aparecen al caminar, no todas juntas al principio? | **Falló lo reportado por Mica**. **Arreglado** (aparición progresiva con gate de movimiento), **falta re-ver** |
| ¿El cielo cambia con el horario de Buenos Aires? | **No existe todavía** — `cielo.js` es Fase 4; hoy el cielo es fijo `--cielo-dia`. Decisión pendiente de Mica: ¿ahora o en su fase? |
| Sin JavaScript: escenario estático y chica oculta | **Pendiente** — había un selector muerto, corregido sin verlo en navegador |
| Rotar el celular / cambiar el tamaño | **Pendiente** |
| Fps en un celular de gama media | **Pendiente** — es el criterio de cierre de la fase |
| `npm run build` después de integrar las ilustraciones y de los ajustes del 7/10 | **OK** — corrido el 21/10: 1 página, sin errores |

### Fase 1 (continuación) — 8 de octubre de 2026: carteleras, marcos y ajustes

Verificado por el agente con Edge headless + conteo de píxeles (no puede ver la pantalla;
mide colores en screenshots):

| Prueba | Resultado |
| --- | --- |
| ¿El SVG CartelVerde renderiza? | **OK** — 7079 píxeles #345238 al abrirlo directo; tras el fix del calc, 2621 en la escena (antes 466 = ruido) |
| ¿La primera cartelera se ve al abrir sin scrollear? | **OK por píxeles** — `revelar()` ya no exige desplazamiento > 0 |
| ¿El HTML/CSS servido es correcto? | **OK** — `data-motor="riel"` en `<html>`, `data-visible="true"` en la article, reglas compiladas presentes |
| ¿Los 404 de `/stickers/*.svg`? | **Causa encontrada**: `public/stickers/` siempre vacía. `STICKERS = []` — sin 404 |
| ¿Los marcos rectangulares del cartel? | **Quitados** (box-shadow + anillo blanco del activo), pedido de Mica |
| ¿La chica en x 0.24 / alto 300? | **OK** — `CAMINANTE` en config.js, verificado con import de node |

**Pendiente de Mica (confirmación visual):**

| Prueba | Resultado |
| --- | --- |
| ¿Se ven las carteleras al abrir y al caminar? | **Pendiente** — arreglado el bug 12 (calc con ancho 0), falta su vista |
| ¿El flash "aparecen y desaparecen" desapareció? | **Pendiente** — fallback movido a `<noscript>` |
| ¿La chica se ve bien en su nueva posición/tamaño? | **Pendiente** — 0.24 / 300 |
| ¿El SVG nuevo de la cartelera se ve limpio, sin marco? | **Pendiente** |
| Fallback sin JavaScript (carteleras apiladas) | **Sin probar en navegador** — `--headless` con scripts apagados no genera screenshots; verificado por selector y especificidad |
| `npm run build` después de todo el 8/10 | **OK** — corrido el 21/10: 1 página, 4.13 s, sin errores |
| ¿`docs/pruebas.md` se lee bien? | **OK** — la sección del 8/10 estaba en Windows-1252 (codificación mixta) y las vocales acentuadas se veían como el rombo con signo de pregunta (U+FFFD). Reparada a UTF-8 el 21/10 |
| `npm run check` (encoding de todo el repo) | **OK** — 0 archivos corruptos. Probado en negativo: con un archivo CP1252 devuelve código 1 y lo nombra |

### Fase 1 (continuación) — 21 de octubre de 2026: verificación y tamaño

| Prueba | Resultado |
| --- | --- |
| `npm run build` sobre el estado del repo | **OK** — 1 página, 4.13 s, sin errores (los cambios del 8/10 nunca se habían compilado) |
| `npm run check` | **OK** — 0 archivos corruptos |
| ¿La chica se ve bien con el tamaño nuevo (340)? | **Pendiente** — pedido de Mica el 21/10. Paso medido de 300 a 340 px de referencia; ver bitácora |

### Fase 1 (continuación) — 21 de octubre de 2026: la caja del afiche

El bug 14 salió al preparar la Fase 2. Verificado por el agente con Edge headless y la
API SVG `isPointInFill()` sobre el dibujo de Mica (geometría exacta, no conteo de
píxeles). Para el detalle, ver la bitácora.

| Prueba | Resultado |
| --- | --- |
| ¿La caja del afiche coincide con el afiche del SVG? | **No** — la caja vieja tapaba el **0,9 %** del afiche. Medidas del SVG anterior |
| ¿La caja nueva (`left 40.33% / top 1.57% / width 20% / height 17.39%`)? | **OK** — tapa el **89,6 %** del afiche. Es el techo posible con un rectángulo: el afiche es un trapecio |
| ¿El `aspect-ratio` del cartel era el correcto? | **No** — decía 702 / 1088 (SVG viejo). Corregido a 8606 / 13382 |
| ¿Se ve el texto `TODO(Mica)` dentro del afiche? | **Pendiente de vista** — la caja ahora cae dentro del afiche, pero nadie lo vio en pantalla |
| ¿El recorte trapezoidal (`clip-path`) del afiche? | **Pendiente** — es parte de la Fase 2, junto con la imagen real de la preview |

### Fase 2 — 21 de octubre de 2026: las previews en los carteles

Verificado por el agente con Edge headless y conteo de píxeles (no puede ver la pantalla).
Para el detalle del método, ver la bitácora.

| Prueba | Resultado |
| --- | --- |
| ¿Dónde está "el hueco transparente"? | **Medido**: hay dos rectángulos candidatos; sólo el del centro es transparente. Hueco = x 590..7996, y 2580..8011 → `left 6.86% / top 19.28% / width 86.05% / height 40.58%` |
| ¿La preview llena el hueco? | **OK por píxeles** — la caja de la preview medida en el sitio da 295 × 222 (proporción 1,329) y 283 × 211 (1,341), contra 1,363 del hueco medido en el SVG. La diferencia es el borde del marco, que no es un rectángulo perfecto |
| ¿El botón de GitHub está en la esquina de la preview? | **OK por píxeles** — a 1 px del marco verde a la derecha y abajo; 91 % de píxeles de foto en la región superior izquierda (o sea, la preview llega hasta el borde) |
| ¿Los cinco links a Vercel y los cinco a GitHub están? | **OK** — en el HTML generado, en el orden pedido por Mica |
| ¿La captura se recorta bien (no se deforma)? | **OK** — `object-fit: cover`, pegada al borde superior |
| ¿Las capturas pesan? | **OK** — de 1,6 MB en PNG a 15 WebP (3 anchos × 5 proyectos) de 3 kB a 58 kB. Sin dependencias nuevas: `sharp` ya viene con Astro |
| `npm run build` | **OK** — 1 página, 15 imágenes optimizadas |
| `npm run check` | **OK** — 0 archivos corruptos |
| ¿Se ve bien en pantalla? | **OK según Mica** (21/10): *"sacale el cartel que dice el nombre del proyecto, pero después está perfecto"*. La chapa con el nombre se sacó |
| ¿El texto del `alt` y de los links? | **OK** — salen del `titulo` de cada `.md` |
| ¿El botón de GitHub abre GitHub y no Vercel? | **Pendiente de prueba manual** — por construcción son dos `<a>` hermanos y el botón tiene `z-index` mayor, pero falta el clic real |
| Las capturas son las de Mica | **Pendiente** — las del repo son provisionales (las sacó el agente de las URLs de Vercel) |
| ¿La descripción de cada proyecto? | **Pendiente** — `TODO(Mica)` en el cuerpo de cada `.md` |
| El `<dialog>` con la descripción | **Pendiente** — falta definir con Mica cuándo se abre |
| Fps en un celular de gama media | **Pendiente** — sigue siendo el criterio de cierre de la Fase 1 |



### 29 de octubre de 2026 — descripciones

- npm run check: OK, UTF-8 sin mojibake.
- npm run build: OK, una página y quince imágenes.
- git diff --check: OK.
- Hover y foco de teclado: implementados en CSS; pendiente verificación en navegador.
- Textos definitivos, lectura con descripciones largas e interacción móvil: pendientes.
### 29 de octubre de 2026 — edificios de fondo

- npm run check, npm run build y git diff --check: OK.
- SVG: viewBox 47999 x 7984, fill-opacity 0.8; sin opacidad duplicada.
- Capa fondo anterior en el DOM a lejana; factor 0.1 frente a 0.2 del Obelisco.
- Cobertura: ancho de capa = viewport + recorrido * factor; repeat-x evita huecos.
- Confirmación visual y rendimiento móvil: pendientes.
### 29 de octubre de 2026 — recorrido completo

- npm run check y npm run build: OK.
- Métodos reales del motor ejecutados con entorno simulado: derecha recorre paradas
  y llega al final; izquierda vuelve por paradas al inicio; repetir en límites no se pasa.
- Posición horizontal: 24% al inicio, 57% a mitad, 90% al final: OK.
- OBJETOS sin referencias a los placeholders de /capas/: OK.
- Verificación visual y móvil: pendientes.
### 29 de octubre de 2026 — textos definitivos

- npm run check y npm run build: OK con las cinco descripciones de Mica.
- Legibilidad y posible recorte en carteles pequeños: pendiente de revisión visual.
### 29 de octubre de 2026 — controles y orientación

- Check y build: OK.
- Métodos reales con eventos simulados: toque y tecla sostenida mueven, repetición no
  duplica ciclos, soltar/blur/pestaña oculta detienen, extremos no se sobrepasan: OK.
- Dirección según desplazamiento y conservación al parar: OK.
- Mensaje Sin JavaScript ausente en dist/index.html: OK.
- Sensación de los controles y giro en navegador: pendiente de Mica.
### 29 de octubre de 2026 — optimización de la caminata

- Check/build: OK.
- Métodos reales con getBoundingClientRect configurado para fallar: selección/aparición
  sin mediciones del DOM en 12 combinaciones de escala y avance: OK.
- Posición de la chica escrita localmente, sin invalidar variables en todo el escenario: OK.
- Hover con token verde-cartelera: implementado.
- Fps, fluidez y confirmación del arreglo en navegador: pendientes.
### 29 de octubre de 2026 — bienvenida

- Check y build: OK con bienvenida visible también en producción.
- Se retiraron el panel de números y su actualización por frame.
- Hover: opacidad del fondo verde 88%, texto sin transparencia.
- Revisión visual: pendiente.
### 29 de octubre de 2026 — bienvenida fija

- Check y build: OK.
- Bienvenida fuera del escenario/riel, position fixed, serif Georgia: implementado.
- Visibilidad en navegador durante todo el recorrido: pendiente de Mica.
Cierre 29/10: check/build de la última versión pasan. Bienvenida pequeña serif sin
fondo aprobada por Mica. Siguen sin medición: fps, mejora real de tirones y mobile.