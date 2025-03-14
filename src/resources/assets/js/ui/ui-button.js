class UiButton extends HTMLElement {

	#version =  "0.0.1";
	#styles = new CSSStyleSheet();
	#variants = ['default', 'outlined', 'subtle', 'danger'];
	#variant = 'default';
	#sizes = [
		'default',
		'sm',
		'lg'
	];
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
		this.#styles.replaceSync(`
          	button {
				box-sizing: border-box;
            	display: inline-flex;
				align-items: center;
				gap: var(--button-${this.#size}-gap);
            	
			
				line-height: 1;
				whitespace: nowrap;
				font: var(--button-${this.#size}-font);
				text-transform: var(--button-text-transform);
				letter-spacing: var(--button-${this.#size}-letter-spacing);
				padding: var(--button-${this.#size}-padding);
				border-radius: var(--button-${this.#size}-border-radius);

				background: var(--button-${this.#variant}-background);
				color: var(--button-${this.#variant}-color);
				border: var(--button-${this.#variant}-border);

				outline: var(--button-${this.#variant}-outline);
				outline-offset: var(--button-${this.#variant}-outline-offset);
				outline-width: var(--button-${this.#size}-outline-width);

				cursor: ${disabled ? "not-allowed" : "pointer"};
            	opacity: ${disabled ? "0.5" : "1"};

				transition: all var(--transition-duration) var(--ease-in-out);
        	}
			button:is(:hover,:focus){
				background: var(--button-hover-${this.#variant}-background);
				color: var(--button-hover-${this.#variant}-color);
				outline: var(--button-hover-${this.#variant}-outline);
				outline-width: var(--button-${this.#size}-outline-width);
			}
		`);
		this.shadowRoot.adoptedStyleSheets = [this.#styles];
		this.shadowRoot.innerHTML = `<button ${disabled ? "disabled" : ""}>
			<ui-material-symbol variant='default' icon='info' size='${this.#size}'></ui-material-symbol>
			<slot></slot>
		</button>
      `;
	}
}
customElements.define("ui-button", UiButton);
