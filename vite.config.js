import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8094,
    proxy: {
      // Forward the PHP-gateway path to the local Node dev API (server.js)
      '/api': {
        target: 'http://localhost:3007',
        changeOrigin: true,
      },
    },
  },
})
