import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,         // Permite usar describe, test, expect sin importar
    environment: 'jsdom',  // Simula navegador para tests de React
  },
})
