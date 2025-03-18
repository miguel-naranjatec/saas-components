class UiDivider extends HTMLElement {

	#version = "0.0.1";
	#styles = new CSSStyleSheet();
	#variants = ["default"];
	#variant = "default";
	#sizes = ["default"];
	#size = "default";
	#orientations = ["vertical", "horizontal"];
	#orientation = "horizontal";

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	static get observedAttributes() {
		return ['orientation', 'size'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'variant' && this.#variants.includes(newValue)) {
			this.#variant = newValue;
		}
		if (name == 'size' && this.#sizes.includes(newValue)) {
			this.#size = newValue;
		}
		if (name == 'orientation' && this.#orientations.includes(newValue)) {
			this.#orientation = newValue;
		}
		this.render();
	}

	render() {
		this.#styles.replaceSync(`
			:host{
				display: flex;
			}
			.divider {
				display: flex;
            	background: var(--divider-${this.#variant}-background);
            	width: ${this.#orientation === 'horizontal' ? '100%' : `var(--divider-${this.#size}-width)`};
            	height: ${this.#orientation === 'vertical' ? '100%' : `var(--divider-${this.#size}-width)`};
			}
		`);

		this.shadowRoot.adoptedStyleSheets = [this.#styles];
		this.shadowRoot.innerHTML = `<div class="divider"><slot></slot></div>`;
	}
}

customElements.define('ui-divider', UiDivider);