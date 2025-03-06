class UICard extends HTMLElement {

	#version =  "0.0.1";
	#gaps = ['none', 'xs', 'sm', 'default', 'lg', 'xl'];
	#gap = 'default';
	#variations = ['outlined'];
	#variation = 'outlined';
	
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'variation' && this.#variations.includes(newValue)) {
			this.#variation = newValue;
		}
		if (name == 'gap' && this.#gaps.includes(newValue)) {
			this.#gap = newValue;
		}

		this.render();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.shadowRoot.innerHTML = `
        <style>
		:host {
			position: relative;
			display: flex;
			flex-direction: column;
			border: var(card-${this.#variation}-border);
			outline: var(card-${this.#variation}-outline);
			gap: var(card-${this.#gap}-gap);
  		}
        </style>
		<slot name='header'></slot>
		<slot></slot>
		<slot name='footer'></slot>
      `;
	}

}

customElements.define('ui-card', UICard);