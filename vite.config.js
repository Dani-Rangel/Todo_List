import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Todo_List/",   // 👈 aquí, en la raíz
  test: {
    globals: true,        // Permite usar describe, test, expect sin importar
    environment: 'jsdom', // Simula navegador para tests de React
  },
})
