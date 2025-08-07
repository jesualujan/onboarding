import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    // habiliar la opción de react fast refresh para una experiencia de desarrollo más fluida
    fastRefresh: true,
  })],
  server: {
    port: 3000, // cambiar el puerto si quieres ( por defecto es 5173)
    open: true, // abrir el navegador automáticamente al iniciar el servidor
    strictPort: true // fallará si el puerto está ocupado (evita que vite elija otro automaticamente))
  }
})
