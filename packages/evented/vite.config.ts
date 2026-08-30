import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: fileURLToPath(new URL("./src/evented.ts", import.meta.url)),
      fileName: (format) => {
        if (format === "es") {
          return "evented.js";
        }

        return "evented.cjs.js";
      },
      formats: ["es", "cjs"],
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
