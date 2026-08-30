type SnippetLanguage = "typescript" | "tsx" | "shell" | "html";

const keywords = new Set([
  "import",
  "from",
  "const",
  "let",
  "var",
  "function",
  "return",
  "if",
  "else",
  "npm",
  "pnpm",
  "yarn",
  "add",
]);

const punctuation = new Set(["{", "}", "(", ")", "[", "]", ",", ";", "."]);

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const wrap = (kind: string, value: string) =>
  `<span class="token-${kind}">${escapeHtml(value)}</span>`;

const renderTypeScript = (source: string) => {
  const tokens: string[] = [];
  let index = 0;

  while (index < source.length) {
    const char = source[index];

    if (/\s/.test(char)) {
      let end = index + 1;
      while (end < source.length && /\s/.test(source[end])) {
        end += 1;
      }
      tokens.push(escapeHtml(source.slice(index, end)));
      index = end;
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      const quote = char;
      let end = index + 1;
      while (end < source.length && source[end] !== quote) {
        end += 1;
      }
      tokens.push(
        wrap("string", source.slice(index, Math.min(end + 1, source.length))),
      );
      index = Math.min(end + 1, source.length);
      continue;
    }

    if (char === "/" && source[index + 1] === "/") {
      const end = source.indexOf("\n", index);
      const commentEnd = end === -1 ? source.length : end;
      tokens.push(wrap("comment", source.slice(index, commentEnd)));
      index = commentEnd;
      continue;
    }

    if (char === "=" && source[index + 1] === ">") {
      tokens.push(wrap("operator", "=>"));
      index += 2;
      continue;
    }

    if (char === "=") {
      tokens.push(wrap("operator", char));
      index += 1;
      continue;
    }

    if (punctuation.has(char)) {
      tokens.push(wrap("punctuation", char));
      index += 1;
      continue;
    }

    if (/[A-Za-z_$]/.test(char)) {
      let end = index + 1;
      while (end < source.length && /[A-Za-z0-9_$]/.test(source[end])) {
        end += 1;
      }
      const word = source.slice(index, end);
      tokens.push(wrap(keywords.has(word) ? "keyword" : "identifier", word));
      index = end;
      continue;
    }

    tokens.push(escapeHtml(char));
    index += 1;
  }

  return tokens.join("");
};

const renderShell = (source: string) =>
  source
    .split("\n")
    .map((line) =>
      line
        .split(/(\s+)/)
        .map((part) => {
          if (!part || /^\s+$/.test(part)) {
            return escapeHtml(part);
          }

          if (keywords.has(part)) {
            return wrap("keyword", part);
          }

          return wrap("identifier", part);
        })
        .join(""),
    )
    .join("\n");

const renderHtml = (source: string) =>
  source
    .split(/(<!--[\s\S]*?-->|<[^>]+>)/g)
    .map((part) => {
      if (!part.startsWith("<")) {
        return escapeHtml(part);
      }

      if (part.startsWith("<!--")) {
        return wrap("comment", part);
      }

      return escapeHtml(part).replace(
        /(&lt;\/?)([\w-]+)/,
        '$1<span class="token-keyword">$2</span>',
      );
    })
    .join("");

const renderTsx = (source: string) =>
  source
    .split(/(<\/?[A-Za-z][^>]*>)/g)
    .map((part) =>
      part.startsWith("<") ? renderHtml(part) : renderTypeScript(part),
    )
    .join("");

export function renderHighlightedCode(
  source: string,
  language: SnippetLanguage = "typescript",
) {
  if (language === "shell") {
    return renderShell(source);
  }

  if (language === "html") {
    return renderHtml(source);
  }

  if (language === "tsx") {
    return renderTsx(source);
  }

  return renderTypeScript(source);
}
