import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("node_modules/react-dom") || id.includes("node_modules/react/")) return "vendor";
          if (id.includes("node_modules/framer-motion")) return "animation";
          if (id.includes("node_modules/lucide-react")) return "icons";
          if (id.includes("node_modules/react-hook-form") || id.includes("node_modules/zod")) return "forms";
          if (id.includes("node_modules/zustand")) return "state";
        },
      },
    },
  },
});
