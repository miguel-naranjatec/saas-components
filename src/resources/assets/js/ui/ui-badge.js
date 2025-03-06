class UiBadge extends HTMLElement {

	#version = "0.0.1";
	#variants = ['default'];
	#variant = 'default';
	#sizes = ['xs', 'sm', 'default'];
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
		this.shadowRoot.innerHTML = `<style>
.badge {
	display: inline-flex;
	line-height: 1;
	white-space: nowrap;
	background-color: var(--badge-variant-${this.#variant}-background);
	outline: var(--badge-variant-${this.#variant}-outline);
	outline-offset: var(--badge-variant-${this.#variant}-outline-offset);
    color: var(--badge-variant-${this.#variant}-color);
	padding: var(--badge-size-${this.#size}-padding);
	border-radius: var(--badge-size-${this.#size}-border-radius);
}
</style>
<div class="badge"><slot></slot></div>`;
	}
}

customElements.define('ui-badge', UiBadge);
