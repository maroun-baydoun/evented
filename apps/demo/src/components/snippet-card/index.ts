import "./style.css";
import type { SnippetCopyButton } from "../snippet-copy-button";

export class SnippetCard extends HTMLElement {
  #wired = false;

  connectedCallback() {
    if (this.#wired) {
      return;
    }

    const codeBlock = this.querySelector<HTMLElement>("code[data-code]");
    const copyButton = this.querySelector<SnippetCopyButton>(
      "snippet-copy-button",
    );
    const title = this.querySelector<HTMLElement>("[data-snippet-title]");
    const language = this.querySelector<HTMLElement>("[data-snippet-language]");

    if (!codeBlock) {
      return;
    }

    const source = codeBlock.textContent ?? "";
    const isInline = !source.includes("\n");
    const titleText = this.getAttribute("title");
    const languageText = this.getAttribute("language-label");

    this.toggleAttribute("inline", isInline);

    if (title) {
      title.hidden = !titleText;
      title.textContent = titleText ?? "";
    }

    if (language) {
      language.hidden = !languageText;
      language.textContent = languageText ?? "";
    }

    if (copyButton) {
      copyButton.clipboardText = source;
      copyButton.dataset.position = "bottom-right";
    }

    this.#wired = true;
  }
}

if (!customElements.get("snippet-card")) {
  customElements.define("snippet-card", SnippetCard);
}
