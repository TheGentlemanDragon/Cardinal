import preact from "@preact/preset-vite";
import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      $assets: path.resolve(__dirname, "./src/assets"),
      $components: path.resolve(__dirname, "./src/components"),
      $icons: path.resolve(__dirname, "./src/icons"),
      $lib: path.resolve(__dirname, "./src/lib"),
    },
  },
});
