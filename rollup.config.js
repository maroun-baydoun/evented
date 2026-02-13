import typescript from "@rollup/plugin-typescript";
import path from "path";

const plugins = [typescript()];

export default [{
  input: "src/evented.ts",
  output: {
    file: path.resolve("dist", "evented.cjs.js"),
    format: "cjs",
    exports: "default",
  },
  plugins,
}, {
  input: "src/evented.ts",
  output: {
    file: path.resolve("dist", "evented.js"),
    format: "esm",
    exports: "default",
  },
  plugins,
}];
