class UiCard extends HTMLElement {

	#version = "0.0.1";
	#styles = new CSSStyleSheet();
	#gaps = ['none', 'xs', 'sm', 'default', 'lg', 'xl'];
	#gap = 'default';
	#variants = ['default'];
	#variant = 'default';

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'variant' && this.#variants.includes(newValue)) {
			this.#variant = newValue;
		}
		if (name == 'gap' && this.#gaps.includes(newValue)) {
			this.#gap = newValue;
		}
		this.render();
	}

	render() {
		this.#styles.replaceSync(`
			:host {
				display: flex;
				flex-direction: column;
				background: var(--card-${this.#variant}-background);
				border: var(--card-${this.#variant}-border);
				border-radius: var(--card-${this.#variant}-border-radius);
				outline: var(--card-${this.#variant}-outline);
				outline-offset: var(--card-${this.#variant}-outline-offset);
				padding: var(--card-${this.#gap}-padding);
				gap: var(--card-${this.#gap}-gap);
  			}
			#content{
				display: flex;
				flex-direction: column;
			}
		`);
		this.shadowRoot.adoptedStyleSheets = [this.#styles];

		this.shadowRoot.innerHTML = `<slot name='header'></slot><div id='content'><slot></slot></div><slot name='footer'></slot>`;
	}

}

customElements.define('ui-card', UiCard);