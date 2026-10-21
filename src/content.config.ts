import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/**
 * VEREDA — Colección de proyectos.
 *
 * Una entrada por cartelera de la vereda. Los datos vienen de un `.md` en
 * `src/content/proyectos/`, así que Mica puede agregar o sacar un proyecto
 * sin tocar ni el motor ni los componentes.
 *
 * - `orden`    posición del proyecto en la vereda (la primera es la de la izquierda).
 * - `preview`  captura de pantalla del proyecto, llena el hueco del cartel.
 * - `vercel`   link principal: el que se abre al hacer clic en la preview.
 * - `github`   link secundario: el botón con el ícono de GitHub.
 *
 * El cuerpo del markdown es la descripción del proyecto (la escribe Mica).
 */
const proyectos = defineCollection({
  loader: glob({ base: './src/content/proyectos', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      orden: z.number(),
      vercel: z.url(),
      github: z.url(),
      preview: image(),
    }),
});

export const collections = { proyectos };
