class UiBadge extends HTMLElement {

	#version = "0.0.1";
	#styles = new CSSStyleSheet();
	#variants = ['default', 'outlined'];
	#variant = 'default';
	#sizes = ['sm', 'default', 'lg'];
	#size = 'default';
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		return ['size', 'variant', 'icon', 'icon-trailing'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'size' && this.#sizes.includes(newValue)) {
			this.#size = newValue;
		}
		if (name == 'variant' && this.#variants.includes(newValue)) {
			this.#variant = newValue;
		}
		this.render();
	}

	connectedCallback() {
		this.render();
	}

	render() {

		this.#styles.replaceSync(`
			:host{
				display: inline-flex;
			}
			.badge {
				display: inline-flex;
				white-space: nowrap;
				background: var(--badge-${this.#variant}-background);
				color: var(--badge-${this.#variant}-color);
				outline: var(--badge-${this.#variant}-outline);
				outline-offset: var(--badge-${this.#variant}-outline-offset);
				outline-width: var(--badge-${this.#size}-outline-width);
    		
				padding: var(--badge-${this.#size}-padding);
				gap: var(--badge-${this.#size}-gap);
				border-radius: var(--badge-${this.#size}-border-radius);
				font: var(--badge-${this.#size}-font);
				line-height: 1;
				user-select: none;
			}
		`);

		this.shadowRoot.adoptedStyleSheets = [this.#styles];
		this.shadowRoot.innerHTML = `<div class="badge"><slot></slot></div>`;
	}
}

customElements.define('ui-badge', UiBadge);
