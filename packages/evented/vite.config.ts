import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: fileURLToPath(new URL("./src/evented.ts", import.meta.url)),
      fileName: "evented",
      formats: ["es"],
    },
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        exports: "default",
      },
    },
  },
});
