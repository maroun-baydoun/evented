import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { demoCodePlugin } from "./src/demo-code-plugin";
import { snippets } from "./src/snippets";

export default defineConfig({
  base: "/evented/",
  plugins: [tailwindcss(), demoCodePlugin(snippets)],
  resolve: {
    alias: {
      "evented-ts": fileURLToPath(
        new URL("../../packages/evented/src/evented.ts", import.meta.url),
      ),
    },
  },
});
