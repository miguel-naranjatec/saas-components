class UiBreadcrumb extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.gaps = ['xs', 'sm', 'default'];
		this.gap = 'default';
		this.sizes = ['xs', 'sm', 'default']
		this.size = 'default';
	}

	static get observedAttributes() {
		return ['separator', 'gap', 'size'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'gap' && this.gaps.includes(newValue)){
			this.gap = newValue;
		}
		if (name == 'size' && this.sizes.includes(newValue)){
			this.size = newValue;
		}
		this.render();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.shadowRoot.innerHTML =
			`<style>
.breadcrumb {
	display: flex;
	gap: var(--breadcrumb-gap-${this.gap});
}
</style>
<nav class="breadcrumb"><slot></slot></nav>
`;

	}
}

customElements.define('ui-breadcrumb', UiBreadcrumb);