class UiBlockquote extends HTMLElement {
	#version = "0.0.1";
	#styles = new CSSStyleSheet();
	#variants = ['default', 'primary'];
	#variant = 'default';
	#icon = 'format_quote';
	#cite;

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	static get observedAttributes() {
		return ['variant', 'icon', 'cite'];
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

		if (name == 'cite') {
			this.#cite = newValue;
		}
		this.render();
	}

	render() {
		const cite = (this.#cite) ? `cite='${this.#cite}'` : ``;
		this.#styles.replaceSync(`
			:host{
				background: var(--blockquote-${this.#variant}-background);
				color: var(--blockquote-${this.#variant}-color);
				border-radius: var(--blockquote-${this.#variant}-border-radius);
				padding: var(--blockquote-${this.#variant}-padding);
				gap:  var(--blockquote-${this.#variant}-gap);
				font: var(--blockquote-${this.#variant}-font);
				display: flex;
				align-items: center;
				width: 100%;
			}
			blockquote {
				display: flex;
				flex-grow: 1;
				margin: 0 !important;
			}
			ui-material-symbol{mix-blend-mode: soft-light;}
		`);
		this.shadowRoot.adoptedStyleSheets = [this.#styles];
		this.shadowRoot.innerHTML = `
			<ui-material-symbol icon='${this.#icon}' size='xl'></ui-material-symbol>
			<blockquote ${cite} >
				<slot></slot>
			</blockquote>
        `;
	}
}

customElements.define('ui-blockquote', UiBlockquote);

