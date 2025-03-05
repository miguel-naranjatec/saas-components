class UiGrid extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    static get observedAttributes() {
        return ['gap', 'size'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    render() {

        const gap = ["none", "xs", "sm"].includes(this.getAttribute("gap")) || "default";
    
        const size = ["xs", "sm", "lg", "xl"].includes(this.getAttribute("gap")) || "default";

        this.shadowRoot.innerHTML = `
        <style>
          .grid-container {
            display: grid;
            grid-template-columns: var(--grid-template-columns-${size});
            grid-gap: var(--grid-gap-${gap});
          }
        </style>
        <div class="grid-container">
          <slot></slot>
        </div>
      `;
    }
}

customElements.define('ui-grid', UiGrid);