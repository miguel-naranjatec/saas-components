class UiStatusLight extends HTMLElement {

	#version = "0.0.1";
	#styles = new CSSStyleSheet();
	#variants = ["default", "positive", "negative", "notice", "info", "neutral"];
	#variant = 'default';
	#sizes = ["xs", "sm", "default", "lg", "xl"];
	#size = 'default';

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		if (this.#variants.includes(document.documentElement.getAttribute('ui-variant'))) {
			this.#variant = document.documentElement.getAttribute('ui-variant');
		}
	}

	static get observedAttributes() {
		return ["size", "variant"];
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'size' && this.#sizes.includes(newValue)){
			this.#size = newValue;	
		}
		if (name == 'variant' && this.#variants.includes(newValue)){
			this.#variant = newValue;	
		}
		this.render();
	}

	render() {
		this.#styles.replaceSync(`
			.status-light{
				display: inline-flex;
				align-items: center;
				gap: var(--status-light-${this.#size}-gap);
			}
			.ball {
				display: inline-flex;
				aspect-ratio: 1;
				width: var(--status-light-${this.#size}-width);
				background-color: var(--status-light-${this.#variant}-background);
				border-radius: var(--status-light-${this.#size}-width);
			}
		`);
		this.shadowRoot.adoptedStyleSheets = [this.#styles];
		this.shadowRoot.innerHTML = `<div class='status-light'><span class='ball'></span><slot></slot></div>`;
	}
}

customElements.define("ui-status-light", UiStatusLight);
