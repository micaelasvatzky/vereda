# Pruebas

## Mobile, rendimiento y accesibilidad — 04/11/2026

Al cerrar, Mica definió que la primera prueba de la próxima sesión será en un
celular real. Check/build, once pruebas de clima y 55 casos de tamaños/proyectos
quedan verificados; los resultados de hardware real todavía no existen.

Se probó el build servido en `127.0.0.1:4322`, con Edge headless y DevTools Protocol.
La API se bloqueó durante esta matriz para probar también la leyenda de error larga
y evitar consultas repetidas. El clima real ya se verificó en la integración anterior.

| Prueba | Resultado |
| --- | --- |
| 320×568, 360×640, 360×800, 390×844, 768×1024, 1280×720 y 1920×1080 | Recorrido, cinco proyectos: textos dentro del panel y botones de al menos 44 px |
| 800×360, 844×390, 1280×360 y 320×480 | Lista legible con scroll normal y los cinco proyectos |
| Scroll con eventos touch | Avanza la escena y cambia la dirección de la chica |
| Toque en GitHub y en la preview | Cada uno identifica su URL correcta; se impidió abrir pestañas durante la prueba |
| Girar de 390×844 a 844×390 y volver | Progreso conservado: aproximadamente 0,55 antes y después |
| Tab, Shift+Tab | Diez links de proyectos y uno del clima; foco visible, cartel activo y sin scroll horizontal interno |
| Home y End | Alcanzan ambos extremos |
| Movimiento reducido | Articulaciones en reposo y transiciones reducidas |
| Sin JavaScript | Cinco proyectos en grid, descripción visible y sin desborde horizontal |
| Descripción blanca sobre verde al 88% | Contraste mínimo calculado 4,93:1, tomando una captura blanca detrás |
| Clima al amanecer/atardecer y sobre ilustraciones | Diseño anterior restaurado a pedido de Mica; contraste global pendiente de revisar |
| Teléfono real, Safari/iOS y lector de pantalla | Pendientes; la emulación no los reemplaza |

La comparación de rendimiento usa 3,5 segundos de recorrido completo por muestra:
FPS aproximado a partir de rAF, percentil 95 de intervalo y PerformanceObserver para
tareas largas. CPU ×4 significa ralentización de esta PC, no un modelo de teléfono.
Las muestras rondaron 57–60 fps, p95 alrededor de 16,7–16,8 ms, sin tareas de más de
50 ms detectadas. En la última muestra ×4 hubo un intervalo entre frames de más de
33,4 ms; no se atribuye su causa sin una traza adicional. No hay una mejora de FPS
concluyente respecto de la muestra inicial;
las correcciones se concentran en uso, foco y evitar trabajo redundante.

Evidencia: `docs/capturas/pruebas-mobile-teclado-2026-11-04.json`, capturas `mobile-*`
y `sin-javascript-2026-11-04.png`. Datos de la matriz y rendimiento en
`matriz-mobile-2026-11-04.json` y `rendimiento-2026-11-04.json`, dentro de esa carpeta.
Las capturas muestran momentos de las iteraciones;
el indicador del clima se restauró a su ubicación anterior después de las primeras.

## Clima y cielo dinámico — 04/11/2026

- Respuesta real de Open-Meteo: HTTP 200, zona de Buenos Aires, temperatura/código
  y horarios solares válidos. Lectura desde Edge: OK.
- `node --test scripts/probar-clima.mjs`: 11 pruebas. Mapeo de nieve/precipitación
  helada/tormenta, null y fechas inválidas, medianoche de Buenos Aires, crepúsculos,
  caché fresca/vencida/demasiado vieja, almacenamiento bloqueado o corrupto,
  HTTP 429/JSON vacío o roto y cancelación de una consulta colgada: OK.
- Edge: despejado, parcial, nublado, tormenta, nieve, amanecer, atardecer, noche
  despejada/nublada y sin conexión: estado, colores y opacidad de dibujos correctos.
  Se usaron respuestas y fechas simuladas para recorrer los diez casos.
- Dibujos cargados con transparencia y fuente sin leyenda «Clima por Open-Meteo».
  El sol usa opacidad 0.78. Contexto del cielo aislado detrás de las capas: OK.
- Vista 390×844: indicador debajo de la bienvenida, sin desborde. Ruta de créditos y
  licencia: OK. La leyenda «Créditos» se retiró después, conservando el enlace en el clima.
- Las últimas correcciones de posición del sol son ajustes de configuración; no se
  consideran una prueba de rendimiento ni reemplazan la aprobación visual de Mica.

Capturas: [clima real](capturas/cielo-real-2026-11-04.png),
[nublado simulado](capturas/cielo-nublado-2026-11-04.png),
[tormenta simulada](capturas/cielo-tormenta-2026-11-04.png) y
[noche simulada](capturas/cielo-noche-2026-11-04.png).
Se tomaron durante las iteraciones; la ubicación final del sol y el indicador puede variar.

## 4 de noviembre de 2026 — figura articulada y carteles por contacto

Ajuste posterior aprobado como pedido por Mica: alto 380, hombros 16° y codos 12°.
Check/build/diff-check OK. Comparación geométrica a escala de referencia: coronilla
en reposo y centro del cartel ampliado separados por 2,3 px aproximadamente.
No se repitió la matriz de navegador para este ajuste de números; falta su vista.

Probado en Edge headless con DevTools Protocol sobre el servidor de desarrollo.

| Prueba | Resultado |
| --- | --- |
| `npm run check`, `npm run build` y `git diff --check` | OK sobre la versión final del cambio |
| Flechas reales sostenidas, soltar y volver | OK: avanza, cambian los ocho pivotes, frena y gira |
| Reposo | OK: las piernas se asientan; no queda congelada una mezcla de poses |
| Ocho momentos del ciclo | Revisados visualmente en Edge; una sola figura, sin poses completas superpuestas |
| Activación al contacto, incluidos proyectos 4 y 5 | OK en 360×800, 390×844, 768×1024, 1280×800 y 1920×1080: 25 casos |
| Activación con la chica centrada sobre cada cartel | OK en los mismos 25 casos |
| Texto y cabeza activados juntos | OK por estado/estilo computado, sin hover |
| Textos abreviados dentro del panel | OK: límites de párrafos medidos en los 25 casos |
| Cartel ampliado dentro del ancho visible | OK al contacto en los 25 casos, contando la barra de scroll |
| Movimiento reducido | OK: articulaciones en reposo aunque se recorra la escena |
| Aprobación de Mica y fps en un celular real | Pendiente |

Capturas: [momentos del ciclo articulado](capturas/caminata-articulada-2026-11-04.png)
y [último cartel activo en 390×844](capturas/cartel-mobile-2026-11-04.png).
La emulación de tamaños no reemplaza la prueba táctil y de rendimiento en un teléfono.

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
