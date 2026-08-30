import type { Plugin } from "vite";
import { renderHighlightedCode } from "./highlight";

type SnippetLanguage = "typescript" | "tsx" | "shell" | "html";

export function demoCodePlugin(snippets: Record<string, string>): Plugin {
  return {
    name: "demo-code-plugin",
    transformIndexHtml(html: string) {
      return html.replace(
        /<code([^>]*data-code="([^"]+)"[^>]*)><\/code>/g,
        (_match, attrs: string, key: string) => {
          const snippet = snippets[key];
          const languageMatch = attrs.match(/data-language="([^"]+)"/);
          const language = (languageMatch?.[1] ??
            "typescript") as SnippetLanguage;

          if (!snippet) {
            return `<code${attrs}></code>`;
          }

          return `<code${attrs}>${renderHighlightedCode(snippet, language)}</code>`;
        },
      );
    },
  };
}
