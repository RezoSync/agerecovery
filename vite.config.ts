import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // @ apunta a la carpeta 'src'
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Configuración para manejar archivos estáticos
  assetsInclude: ['**/*.svg', '**/*.csv'],
  
  // base: './' asegura que las rutas sean relativas en el servidor (crucial para Nginx)
  base: './', 
})