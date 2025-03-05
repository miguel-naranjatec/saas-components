class UiBadge extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		return ['size', 'icon', 'icon-trailing', 'variant'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this.render();
	}

	connectedCallback() {
		this.render();
	}

	render() {

		const variant = ["secondary", "outline"].includes(this.getAttribute("variant")) || "default";
		const size = ["xs", "sm"].includes(this.getAttribute("size")) || "default";

		this.shadowRoot.innerHTML = `<style>
.badge {
	display: inline-flex;
	background-color: var(--badge-variant-${variant}-background);
    color: var(--badge-variant-${variant}-color);


	border-radius: var(--badge-size-${size}-border-radius);

}
</style>
<div class="badge"><slot></slot></div>`;
	}
}

customElements.define('ui-badge', UiBadge);
