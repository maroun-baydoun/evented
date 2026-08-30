import "./style.css";

export class CopyrightYear extends HTMLElement {
  connectedCallback() {
    const fallbackYear = this.textContent?.trim();
    const currentYear = String(new Date().getFullYear());

    if (fallbackYear !== currentYear) {
      this.textContent = currentYear;
    }
  }
}

if (!customElements.get("copyright-year")) {
  customElements.define("copyright-year", CopyrightYear);
}
