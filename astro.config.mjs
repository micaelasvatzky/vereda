// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  // Dominio real del sitio. Se completa antes del deploy (Fase 8).
  site: 'https://vereda.mica.app',
});