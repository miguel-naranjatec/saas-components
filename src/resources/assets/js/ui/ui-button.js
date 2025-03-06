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
				
			}
          	button {
				box-sizing: border-box;
            	display: inline-flex;
            	
            	cursor: ${disabled ? "not-allowed" : "pointer"};
            	opacity: ${disabled ? "0.5" : "1"};
				background: var(--button-${this.#variant}-background);
				color: var(--button-${this.#variant}-color);
				border: var(--button-${this.#variant}-border);
				outline: var(--button-${this.#variant}-outline);
				border-radius: var(--button-${this.#size}-border-radius);
				font: var(--button-${this.#size}-font);
				padding: var(--button-${this.#size}-padding);


          }
        </style>
        <button ${disabled ? "disabled" : ""}><slot></slot></button>
      `;
	}
}
customElements.define("ui-button", UiButton);
