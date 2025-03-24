// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/registros': {
        target: 'http://localhost:3000', // El puerto donde corre tu backend
        changeOrigin: true, // Asegura que el origen de la solicitud coincida con el backend
        rewrite: (path) => path.replace(/^\/registros/, '/registros'), // Opcional, asegura que la ruta se mantenga
      },
    },
  },
});