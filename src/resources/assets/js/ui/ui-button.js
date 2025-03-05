class UiButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
    }

    static get observedAttributes() {
        return [
            "variant",
            "disabled",
            "size",
            "icon",
            "icon_trailing",
            "loading",
            "square"
        ];
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const variant = this.getAttribute("variant") || "primary";
        const size = this.getAttribute("size") || null;
        const disabled = this.hasAttribute("disabled");
        const icon = this.hasAttribute("icon");
        const icon_trailing = this.hasAttribute("icon-trailing");
        const loading = this.hasAttribute("loading");
        const square = this.hasAttribute("square");

        this.shadowRoot.innerHTML = `
        <style>
        
          button {
            display: inline-flex;
            padding: 10px 20px;
            border: none;
            cursor: ${disabled ? "not-allowed" : "pointer"};
            opacity: ${disabled ? "0.5" : "1"};
            background-color: var(--button-variant-${variant}-background);
            color: white;
            border-radius: var(--button-border-radius);
          }
        </style>
        <button ${disabled ? "disabled" : ""}><slot></slot></button>
      `;
    }
}
customElements.define("ui-button", UiButton);
