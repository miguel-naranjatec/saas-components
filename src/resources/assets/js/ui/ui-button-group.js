class UiButtonGroup extends HTMLElement {

    #version =  "0.0.1";

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
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
