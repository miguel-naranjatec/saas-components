class UiBreadcrumb extends HTMLElement {

	#version =  "0.0.1";
	#gaps = ['xs', 'sm', 'default'];
	#gap = 'default';
	#sizes = ['xs', 'sm', 'default']
	#size = 'default';

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	static get observedAttributes() {
		return ['separator', 'gap', 'size'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'gap' && this.#gaps.includes(newValue)){
			this.#gap = newValue;
		}
		if (name == 'size' && this.#sizes.includes(newValue)){
			this.#size = newValue;
		}
		this.render();
	}



	render() {
		this.shadowRoot.innerHTML =
			`<style>
.breadcrumb {
	display: flex;
	gap: var(--breadcrumb-gap-${this.#gap});
}
</style>
<nav class="breadcrumb"><slot></slot></nav>
`;

	}
}

customElements.define('ui-breadcrumb', UiBreadcrumb);