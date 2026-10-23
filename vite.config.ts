import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  // Normally served from the domain root. GitHub Pages can serve a project site
  // from /<repo>/, so the Pages workflow sets BASE_PATH to match.
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // In production the Express server serves the docs at /docs. In dev they are a
    // separate process (`npm run dev:docs`), so proxy across and keep links working.
    proxy: {
      '/docs': { target: 'http://localhost:3000', changeOrigin: true },
    },
  },
});
