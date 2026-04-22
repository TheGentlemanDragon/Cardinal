import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import path from "path";

/* Note: Daisy UI aliases are to address error
> [plugin @tailwindcss/vite:generate:build] /home/nando/Code/cardinal/src/styles.css
> TypeError: Unknown file extension ".css" for /home/nando/Code/cardinal/node_modules/daisyui/daisyui.css
> TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".css" for /home/nando/Code/cardinal/node_modules/daisyui/daisyui.css
*/

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: /^daisyui$/,
        replacement: path.resolve(__dirname, "./node_modules/daisyui/index.js"),
      },
      {
        find: /^daisyui\/theme$/,
        replacement: path.resolve(
          __dirname,
          "./node_modules/daisyui/theme/index.js",
        ),
      },
      {
        find: "$assets",
        replacement: path.resolve(__dirname, "./src/assets"),
      },
      {
        find: "$components",
        replacement: path.resolve(__dirname, "./src/components"),
      },
      {
        find: "$lib",
        replacement: path.resolve(__dirname, "./src/lib"),
      },
    ],
  },
});
