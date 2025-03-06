class UiButton extends HTMLElement {

	#version =  "0.0.1";
	#variants = ['default', 'primary', 'filled', 'danger', 'ghost', 'subtle'];
	#variant = 'default';
	#sizes = ['default', 'xs', 'sm', 'lg', 'xl'];
	#size = 'default';

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.render();
	}

	static get observedAttributes() {
		return [
			"variant",
			"size",
			"disabled",
			"size",
			"icon",
			"icon_trailing",
			"loading",
			"square"
		];
	}
	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'variant' && this.#variants.includes(newValue)) {
			this.#variant = newValue;
		}
		if (name == 'size' && this.#sizes.includes(newValue)) {
			this.#size = newValue;
		}
		this.render();
	}

	render() {
		const disabled = this.hasAttribute("disabled");
		this.shadowRoot.innerHTML = `
        <style>
			:host{
				box-sizing: border-box;
			}
          	button {
				box-sizing: border-box;
            	display: flex;
            	padding: 20px;
            	border: none;
            	cursor: ${disabled ? "not-allowed" : "pointer"};
            	opacity: ${disabled ? "0.5" : "1"};
            background-color: var(--button-variant-${this.#variant}-background);
            color: var(--button-variant-${this.#variant}-color);
            border-radius: var(--button-border-radius);

			font: var(--button-size-${this.#size}-font);


          }
        </style>
        <button ${disabled ? "disabled" : ""}><slot></slot></button>
      `;
	}
}
customElements.define("ui-button", UiButton);
