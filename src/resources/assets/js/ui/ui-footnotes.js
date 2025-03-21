class UiFootnotes extends HTMLElement {

	#version =  "0.0.1";
	#variants = ["default"];
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
		if (name === 'variant' && this.#variants.includes(newValue)) {
			this.#variant = newValue;
		}
		this.render();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.shadowRoot.innerHTML = `
        <div>
          <slot></slot>
        </div>
      `;
	}
}

customElements.define('ui-footnotes', UiList);
