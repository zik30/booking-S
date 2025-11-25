import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      app: "/src/app",
      api: "/src/api",
      pages: "/src/pages",
      shared: "/src/shared",
      modules: "/src/modules",
      components: "/src/components",
    },
  },
});
