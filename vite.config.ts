import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), preact()],
  resolve: {
    alias: {
      $assets: path.resolve(__dirname, "./src/assets"),
      $components: path.resolve(__dirname, "./src/components"),
      $lib: path.resolve(__dirname, "./src/lib"),
    },
  },
});
