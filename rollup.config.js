import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/evented.ts",
  output: {
    dir: "dist",
    format: "cjs",
    exports: "default",
  },
  plugins: [typescript()],
};
