import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        theme_color: "#1e293b",
        background_color: "#0f172a",
        icons: [
          {
            src: "apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "apple touch",
          },
          { purpose: "maskable", sizes: "512x512", src: "icon512_maskable.png", type: "image/png" },
          { purpose: "any", sizes: "512x512", src: "icon512_rounded.png", type: "image/png" },
        ],
        orientation: "portrait",
        display: "standalone",
        lang: "en",
        name: "Sleep Stack",
        short_name: "SleepStack",
        start_url: "https://thomasstock.github.io/tracker/",
        scope: "https://thomasstock.github.io/tracker/",
        description: "Sleep tracker with AI analysis",
        id: "https://thomasstock.github.io/tracker/",
        screenshots: [
          {
            src: "screenshot.jpg",
            sizes: "1080x1920",
            type: "image/jpeg",
          },
          {
            src: "screenshot.jpg",
            sizes: "1080x1920",
            type: "image/jpeg",
            form_factor: "wide",
          },
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true,
        sourcemap: true,
      },
    }),
  ],
  base: "/tracker",
  define: {
    "process.env.VERSION": JSON.stringify(process.env.VERSION || "dev"),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
});
