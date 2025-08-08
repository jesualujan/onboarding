import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // habiliar la opción de react fast refresh para una experiencia de desarrollo más fluida
      fastRefresh: true,
    }),
  ],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"), // Alias para importar desde src con @
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", "json"], // resuelva extensiones automáticamente
  },
  server: {
    port: 3000, // cambiar el puerto si quieres ( por defecto es 5173)
    open: true, // abrir el navegador automáticamente al iniciar el servidor
    strictPort: true, // fallará si el puerto está ocupado (evita que vite elija otro automaticamente))
  },
});
