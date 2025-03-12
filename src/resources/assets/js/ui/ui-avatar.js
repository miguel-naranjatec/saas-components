class UiAvatar extends HTMLElement {
	#version = "0.0.1";
	#variants = ['default', 'rounded'];
	#variant = 'default';
	#sizes = ['default', 'xs', 'sm', 'lg', 'xl'];
	#size = 'default';
	#name = null;

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.render();
	}

	static get observedAttributes() {
		return ["variant", "size", "name"];
	}
	attributeChangedCallback(name, oldValue, newValue) {

		if (name == 'variant' && this.#variants.includes(newValue)) {
			this.#variant = newValue;
		}

		if (name == 'size' && this.#sizes.includes(newValue)) {
			this.#size = newValue;
		}

		if (name == 'name') {
			this.#name = newValue;
		}

		this.render();
	}

	generateName() {
		return (!this.#name) ? "" : (this.#name.match(/\b\w/g) || []).slice(0, 2).join("").toUpperCase();
	}

	render() {
		this.shadowRoot.innerHTML = `
        <style>
		:host {
			display: inline-flex;
		}
		.avatar{
			background-color: var(--color-primary);
			color: var(--color-primary-contrast);
			display: inline-flex;
			align-items: center;
			justify-content: center;
			aspect-ratio: 1;
			width: var(--avatar-${this.#size}-width);
			border-radius: var(--avatar-${this.#variant}-border-radius);
			line-height: 1;
			font-size: var(--avatar-${this.#size}-font-size);
			text-align: center;
		}
        </style>
		<div class='avatar ${this.#variant}'>${ this.generateName() }</div>
      `;
	}
}
customElements.define("ui-avatar", UiAvatar);
