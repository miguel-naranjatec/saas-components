class UiBlockquote extends HTMLElement {
	#version = "0.0.1";
	#styles = new CSSStyleSheet();
	#variants = ['default'];
	#variant = 'default';
	#icon = 'format_quote';

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	static get observedAttributes() {
		return ['variant', 'icon'];
	}
	
	connectedCallback() {
		this.render();
	}
	
	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'variant' && this.#variants.includes(newValue)) {
			this.#variant = newValue;
		}

		if (name == 'icon') {
			this.#icon = newValue;
		}
		this.render();
	}

	
	render() {
		this.#styles.replaceSync(`
			:host{	
				background: var(--blockquote-${this.#variant}-background);
				color: var(--blockquote-${this.#variant}-color);
				border-radius: var(--blockquote-${this.#variant}-border-radius);
				padding: var(--blockquote-${this.#variant}-padding);
				display: flex;
				align-items: center;
				gap: var(--gap);
				width: 100%;
			}
		`);
		this.shadowRoot.adoptedStyleSheets = [this.#styles];
		this.shadowRoot.innerHTML = `
			<ui-material-symbol icon='format_quote' size='xl'></ui-material-symbol>
			<slot></slot>
        `;
	}
}

customElements.define('ui-blockquote', UiBlockquote);

