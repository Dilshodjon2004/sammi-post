import path from "path";
import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target:
          "https://sammi-blog-bcog17i7k-dilshodjon2004s-projects.vercel.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
