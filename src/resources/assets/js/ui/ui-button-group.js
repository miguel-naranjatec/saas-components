class UiButtonGroup extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
        display: flex;
        gap: 0;
        </style>
        <slot></slot>
      `;
    }
}
customElements.define("ui-button-group", UiButtonGroup);
