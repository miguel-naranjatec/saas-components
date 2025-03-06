class UiAppBar extends HTMLElement {

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
		return ['title', 'variant'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'title') {
			this.render();
		}
		if (name == 'variant' && this.#variants.includes(newValue)) {
			this.#variant = newValue;
		}
		this.render();
	}

	render() {
	
		this.shadowRoot.innerHTML = `<style>
:host {
    display: flex;
	align-items: stretch;
    position: fixed;
	height: var(--app-bar-height, 100px);
	top: var(--app-bar-offset-top, 0);
    left: var(--app-bar-offset-left, 0);
	right: var(--app-bar-offset-right, 0);
    background: var(--app-bar-${this.#variant}-background);
    padding: var(--padding);
	gap: var(--gap);
	justi
}
[left] {
	
	display: flex;
	align-items: center;
}
[center] {
	background-color: white;
	flex-grow: 1;
	display: flex;
	align-items: center;
	justify-content: center;
}
[right] {

display: flex;
justify-content: flex-end;
display: flex;
	align-items: center;
	gap: var(--gap);
	
}
</style>
	<div left>
		<slot name='left'></slot>
	</div>
	<div center>
		<slot name='center'></slot>
	</div>
	<div right>
		<slot></slot>
	</div>

`;
	}
}

customElements.define('ui-app-bar', UiAppBar);