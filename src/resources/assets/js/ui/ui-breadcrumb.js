class UiBreadcrumb extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		return ['separator'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
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
	gap: var(--gap);
}
</style>
<nav class="breadcrumb"><slot></slot></nav>`;

	}
}

customElements.define('ui-breadcrumb', UiBreadcrumb);