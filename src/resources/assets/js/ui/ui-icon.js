class UiIcon extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
    }

    static get observedAttributes() {
        return ["name", "size", "color"];
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const name = this.getAttribute("name") || "star";
        const size = this.getAttribute("size") || "24";
        const color = this.getAttribute("color") || "currentColor";

        this.shadowRoot.innerHTML = `
        <style>
          svg {
            width: ${size}px;
            height: ${size}px;
            fill: ${color};
          }
        </style>
        <svg viewBox="0 0 24 24">
          <use href="#icon-${name}"></use>
        </svg>
      `;
    }
}
customElements.define("ui-icon", UiIcon);