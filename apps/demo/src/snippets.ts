export const snippets: Record<string, string> = {
  example: `import create from "evented-ts";

const evented = create();

evented.on("hello", (event) => console.log(event.args));
evented.fire("hello", "world");`,
  "install-npm": "npm i evented-ts",
  "install-pnpm": "pnpm add evented-ts",
  "install-yarn": "yarn add evented-ts",
};
