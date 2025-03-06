class UiAppContent extends HTMLElement {

	#version = "0.0.1";
	#variants = ['default'];
	#variant = 'default';

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	static get observedAttributes() {
		return ['variant'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'variant' && this.#variants.includes(newValue)) {
			this.#variant = newValue;
		}
		this.render();
	}

	render() {
		this.shadowRoot.innerHTML = `<style>
:host {
   
}
</style>
<div header>
	<slot name='header'></slot>
</div>
<div content>
	<slot></slot>
</div>
<div footer>
	<slot name='footer'></slot>
</div>
`;
	}
}

customElements.define('ui-app-content', UiAppContent);