class UiBadge extends HTMLElement {

	#version = "0.0.1";
	#styles = new CSSStyleSheet();
	#variants = ['default', 'secondary', 'tertiary', 'outlined', 'danger', 'warning', 'info', 'success'];
	#variant = 'default';
	#sizes = ['sm', 'default', 'lg'];
	#size = 'default';
	#href;
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		return ['size', 'variant', 'href'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'size' && this.#sizes.includes(newValue)) {
			this.#size = newValue;
		}
		if (name == 'variant' && this.#variants.includes(newValue)) {
			this.#variant = newValue;
		}

		if (name == 'href') {
			this.#href = newValue;
		}
		this.render();
	}

	connectedCallback() {
		this.render();
	}

	render() {

		const tag = (this.#href) ? `a` : `div`;
		const href = (this.#href) ? `href='${this.#href}'` : ``;

		this.#styles.replaceSync(`
			:host{
				display: inline-flex;
			}
			.badge {
				display: inline-flex;
				align-items: center;
				justify-content: center;
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
				white-space:nowrap;
				text-transform: var(--font-label-text-transform);
				letter-spacing: var(--badge-${this.#size}-letter-spacing);
				line-height: 1;
				text-decoration: none;
				user-select: none;
			}
		`);

		this.shadowRoot.adoptedStyleSheets = [this.#styles];
		this.shadowRoot.innerHTML = `<${tag} ${href} class="badge"><slot></slot></${tag}>`;
	}
}

customElements.define('ui-badge', UiBadge);
