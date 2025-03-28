// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/registros': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/bloqueos': { // Cambiamos /fechas-bloqueadas por /bloqueos
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/horarios-ocupados': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});