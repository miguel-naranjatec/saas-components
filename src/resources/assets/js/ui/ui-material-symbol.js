class UiMaterialSymbol extends HTMLElement {

	#version = "0.0.1";
	#variants = ["thin", "default", "thick"];
	#variant = "default";
	#sizes = ["xs", "sm", "default", "lg", "xl"];
	#size = 'default';
	#icon;

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.render();
	}

	static get observedAttributes() {
		return ['icon', 'size', 'variant'];
	}	

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'icon') {
			this.#icon = newValue;
		}
		if (name == 'size' && this.#sizes.includes(newValue)) {
			this.#size = newValue;
		}
		if (name == 'variant' && this.#variants.includes(newValue)) {
			this.#variant = newValue;
		}
		this.render();	
	}

	render() {
	
		this.shadowRoot.innerHTML = `
        <style>
			.material-symbols-outlined {
				font-family: 'Material Symbols Outlined';
				font-weight: normal;
				font-style: normal;
				font-size: var(--material-symbol-${this.#size}-font-size);
				line-height: 1;
				letter-spacing: normal;
				text-transform: none;
				display: inline-flex;
				white-space: nowrap;
				word-wrap: normal;
				direction: ltr;
				-moz-font-feature-settings: 'liga';
				-moz-osx-font-smoothing: grayscale;
  				font-variation-settings: var(--material-symbol-${this.#variant}-font-variation-settings);
				user-select: none;
				pointer-events: none;
			}
        </style>
		<span class="material-symbols-outlined">${this.#icon}</span>
      `;
	}
}
customElements.define("ui-material-symbol", UiMaterialSymbol);