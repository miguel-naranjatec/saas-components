class UiButton extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.variant = 'default';
		this.variants = ['default', 'primary', 'filled', 'danger', 'ghost', 'subtle']
		this.size = 'default';
		this.sizes = ['default', 'xs', 'sm', 'lg', 'xl'];
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
		if (name == 'variant' && this.variants.includes(newValue)) {
			this.variant = newValue;
		}
		if (name == 'size' && this.sizes.includes(newValue)) {
			this.size = newValue;
		}

		this.render();
	}

	render() {
	
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
            background-color: var(--button-variant-${this.variant}-background);
            color: var(--button-variant-${this.variant}-color);
            border-radius: var(--button-border-radius);

			font: var(--button-size-${this.size}-font);


          }
        </style>
        <button ${disabled ? "disabled" : ""}><slot></slot></button>
      `;
	}
}
customElements.define("ui-button", UiButton);
