# La vereda de Mica

Soy estudiante de la Licenciatura en Tecnología Multimedial y me interesa el diseño
y el desarrollo web front end. Realicé este portfolio para el examen final de
Programación Multimedial IV de UMAI.

La propuesta consiste en recorrer una vereda de Buenos Aires para conocer mis
proyectos. Cada cartelera verde presenta un trabajo y permite acceder a su sitio y
a su código. Elegí este recorrido para presentar mi trabajo mediante una experiencia
personal e interactiva, vinculada con la identidad visual de la ciudad.

El portfolio está dirigido a quienes quieran conocer mi trabajo y a posibles
empleadores o colaboradores del área de diseño y desarrollo web.

Repositorio: [micaelasvatzky/vereda](https://github.com/micaelasvatzky/vereda).
Portfolio publicado: [La vereda de Mica](https://vereda-portfolio.vercel.app/).

## Recorrido

Se puede avanzar con las flechas del teclado, la rueda del mouse o el desplazamiento
táctil. Cuando el personaje se acerca a un cartel, lo mira y aparece la información
del proyecto: nombre, año, tecnologías y una descripción breve. La imagen permite
visitar el sitio publicado y el botón de GitHub lleva a su repositorio.

También es posible recorrer los enlaces con la tecla Tab. El cielo acompaña el clima
y el horario de Buenos Aires, y desde el título del proyecto se accede a los créditos.

## Instalación y ejecución

Se necesita Node.js 22.12.0 o superior y npm. Después de descargar el repositorio,
abrir una terminal en la carpeta del proyecto y ejecutar:

```bash
npm ci
npm run dev -- --background
```

La terminal indica la dirección local del sitio, habitualmente `http://localhost:4321`.
Para detener el servidor:

```bash
npm run dev -- stop
```

Para generar y revisar la versión que se publicará:

```bash
npm run build
npm run preview
```


## Tecnologías y decisiones principales

Utilicé Astro para organizar y construir el sitio, CSS para su presentación visual
y JavaScript para el recorrido y las interacciones. Las fuentes Archivo e Inter se
incluyen mediante Fontsource.

Elegí trabajar sin un framework de interfaz ni librerías de animación para mantener
una estructura sencilla y poder comprender y modificar cada parte del proyecto.
Organicé los textos y las imágenes de los trabajos por separado, para facilitar
su actualización.

La vista lateral permite leer los carteles de frente. El movimiento de los edificios
y de los demás elementos a distintas velocidades aporta profundidad a la escena.


## Componentes propios

Dividí la experiencia en componentes con funciones específicas:

- **Escenario:** reúne las capas de la ciudad, organiza los proyectos y presenta la
  bienvenida y las indicaciones para recorrer el sitio.
- **Cartelera:** presenta la imagen y la información de cada proyecto, junto con sus
  enlaces al sitio publicado y al repositorio.
- **Caminante:** representa al personaje y sus movimientos al avanzar, detenerse,
  cambiar de dirección y mirar los proyectos.
- **ClimaCiudad:** muestra la información meteorológica.
- **ElementosCielo:** reúne el sol, la luna y las nubes que acompañan el estado del cielo.

## Proyectos

El recorrido presenta, en este orden: Pegatina, DevPath, Studio 3 Ecommerce,
Rick & Morty, Popcorn.js y Recetukis.
Cada proyecto tiene una imagen, una descripción y enlaces propios. Elegí que las
capturas ocupen el espacio completo del cartel.


## Información dinámica y manejo de errores

Utilicé la API de [Open-Meteo](https://open-meteo.com/) para obtener la temperatura, el estado
del tiempo y los horarios de salida y puesta del sol de Buenos Aires. Estos datos
modifican la apariencia del cielo y la información visible del clima en el portfolio.

Mientras se realiza la consulta, el sitio informa que está cargando y representa el
cielo según el horario. Cuando llegan los datos, actualiza la información y guarda
una copia durante 30 minutos para evitar consultas innecesarias.

Si la consulta falla o tarda demasiado, se utiliza el último dato guardado, siempre
que no tenga más de seis horas, y se aclara que es un dato anterior. Si no hay
información válida, se indica que el clima no está disponible y el cielo continúa
funcionando con horarios aproximados. En todos los casos se puede seguir recorriendo
los proyectos. Si el navegador no permite guardar datos, la consulta funciona igualmente.

La información depende de la disponibilidad y de los límites del servicio externo.
Por eso se espacian las consultas y no se presenta la representación del cielo como
una observación exacta del clima.

## Adaptación a pantallas y accesibilidad

La escena y los carteles ajustan su tamaño al espacio disponible. En celular, el
tramo hasta el primer proyecto es más corto para facilitar el inicio del recorrido.
Si JavaScript está desactivado, los trabajos se presentan en una lista.

Consideré la navegación por teclado, la identificación visible del enlace seleccionado,
los textos alternativos de las imágenes y botones con espacio suficiente para tocarlos.
Los enlaces indican que se abren en otra pestaña. También contemplé la preferencia
de reducir el movimiento y que las descripciones puedan abrirse sin utilizar el mouse.

Realicé revisiones en distintos tamaños de pantalla y ajustes a partir de las pruebas.


## Proceso y uso de inteligencia artificial

Durante el desarrollo exploré distintas formas de presentar la caminata, las
carteleras y el cielo. Ajusté el recorrido, el tamaño del personaje, la lectura de las
descripciones y la presentación móvil a partir de las pruebas y de los resultados visuales.

Utilicé inteligencia artificial como apoyo para desarrollar y corregir código,
realizar verificaciones, organizar la documentación y generar ilustraciones. Definí
el concepto, los contenidos y la dirección visual, y revisé las propuestas para
adaptarlas o descartarlas. Por ejemplo, descarté el encuadre que dejaba franjas en
las capturas y la presentación en lista para pantallas bajas.

Entre las dificultades registradas hubo problemas con movimientos poco naturales del personaje y la animación del mismo, y ajustes que desplazaban los carteles. También, el paso de desktop a mobile requirió de varios ajustes para lograr el mismo funcionamiento en ambos formatos.

La bitácora del proceso se entrega por separado en Google Drive. La documentación
personal de seguimiento y preparación de la defensa se conserva fuera del repositorio
publicado. La consigna está disponible en [Consigna del examen](examen-final-portfolio.txt).

Para revisar la codificación de los archivos, construir el sitio y ejecutar las
pruebas del clima:

```bash
npm run check
npm run build
node --test scripts/probar-clima.mjs
```

## Limitaciones y posibles mejoras

Queda pendiente que los carteles se vean completos al entrar o salir de pantalla. Prefiero que mantengan
su posición en la vereda antes que desplazarlos para que permanezcan siempre visibles.
Como mejora futura, puedo reemplazar las capturas y seguir ajustando
la lectura en pantallas pequeñas.

## Créditos y licencias

La información meteorológica proviene de [Open-Meteo](https://open-meteo.com/) y se
utiliza bajo licencia [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
La atribución también está disponible en la página de créditos del sitio.

Las tipografías Archivo e Inter pertenecen a sus respectivos autores y se distribuyen
bajo SIL Open Font License 1.1. Sus licencias se incluyen en los paquetes Fontsource.
Georgia y Times New Roman se utilizan cuando están disponibles en el sistema.

Generé las ilustraciones de la escena con ChatGPT, utilizando referencias de estilo
encontradas en Pinterest. Estuve a cargo de su selección y dirección visual. No
conservé los enlaces a las referencias, por lo que no puedo identificar ni acreditar
a sus autores.
