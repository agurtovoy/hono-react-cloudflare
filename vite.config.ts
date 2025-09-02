//
// BEGIN
//

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react({ include: "**/*.tsx" }),
  ],
  build: {
    assetsDir: "dist",
    manifest: true,
    minify: true,
    ssrManifest: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/entry-client.tsx"),
        globals: resolve(__dirname, "src/globals.css"),
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
        globals: {
          react: "React",
        },
      },
    },
  },
});

//
// END
//
