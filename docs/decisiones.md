# Decisiones

Registro corto de decisiones de arquitectura y diseño, con las alternativas que se
exploraron y el motivo de la elección.

## Sin framework de UI

**Elegido:** HTML en `.astro`, CSS plano y JavaScript en módulos ES.

**Alternativas:** React, Vue, Svelte (todos permitidos por la consigna, que sólo exige
AstroJS), y Tailwind para los estilos.

**Motivo:** la consigna dice que usar más herramientas no implica mejor solución. La
defensa es individual y hay que poder explicar y modificar el código en vivo. Menos
dependencias significan menos cosas que se puedan romper, y el sitio es estático: no hay
estado de aplicación que justifique un framework. El scroll se resuelve con
`position: sticky` y `position: fixed`, que ya son CSS.

**Ojo con la defensa:** la consigna *permite* Tailwind y los frameworks. La respuesta a
"¿por qué no los usaste?" no puede ser "porque no me dejaban". Tiene que ser la
justificación técnica de arriba.

## Vista lateral, no perspectiva

**Elegido:** vista de perfil de la vereda, el mundo se desplaza en horizontal.

**Alternativas:** perspectiva hacia el horizonte (tipo calle en fuga), o vista en planta.

**Motivo:** la vista lateral es la que permite leer el afiche de la cartelera de frente. Si
el afiche se ve en escorzo, no se lee. Además la referencia visual elegida (carteleras de
calle porteñas) es lateral.

## Sticky en vez de scroll horizontal propio

**Elegido:** página alta con el escenario en `position: sticky; top: 0` y el scroll vertical
nativo traducido a desplazamiento horizontal.

**Alternativas:** transformar el scroll nativo con un listener y prevenir el default; usar
una librería de smooth scroll; o hacer el escenario completamente horizontal.

**Motivo:** el scroll nativo ya resuelve teclado, touch, lectores de pantalla, gestos de
swipe, barra de scroll y Preferences de reduced-motion. Reimplementarlo significa perder
todo eso a cambio de nada. Además el recorrido es largo y el scroll vertical le es familiar
a cualquiera.

## CSS variables en vez de tokens de Tailwind

**Elegido:** `src/styles/tokens.css` con custom properties.

**Alternativas:** `tailwind.config.js`, o variables sueltas en cada componente.

**Motivo:** todo el mundo se expresa contra un alto de referencia de 1080 px y se
multiplica por `--escala`. Una variable CSS le llega a todas las capas y a JavaScript por
la misma vía (`getComputedStyle`). Con Tailwind habría que duplicar esos números en el
archivo de configuración.

## Capas repetibles en vez de imágenes largas

**Elegido:** las capas de fondo son tiles que se repiten con `background-repeat: repeat-x`.

**Alternativas:** una imagen larga por capa, del ancho total del recorrido.

**Motivo:** el recorrido completo mide del orden de 12.000 px de referencia. Como imagen
larga eso es mucho peso y además es frágil: al cambiar la separación entre carteleras hay
que regenerar las imágenes. Como tile, el ancho no importa.

## Editar configuración, no motor

**Elegido:** todos los números ajustables (separación, ritmo de parallax, escala, umbral
de cartelera activa, color de acento, posición del caminante) viven en `src/config.js` y
`src/styles/tokens.css`.

**Motivo:** la defensa incluye una modificación en vivo. Con la configuración centralizada
la modificación es cambiar un número en un archivo plano y recargar. Pedirle a alguien que
modifique un cálculo interno es una forma segura de perder el examen.

## Tipografías autohospedadas

**Elegido:** Archivo (grotesca, para afiches) e Inter (sans, para texto), con
`@fontsource`.

**Alternativas:** Google Fonts por CDN.

**Motivo:** cargar desde un host externo agrega una dependencia de red de terceros y un
pedido extra en el camino crítico. `@fontsource` trae los archivos al repo y son dos
paquetes de dependencia sin código.