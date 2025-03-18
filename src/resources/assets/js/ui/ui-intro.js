class UiIntro extends HTMLElement {

	#version = "0.0.1";
	#styles = new CSSStyleSheet();
	#variants = ["default"];
	#variant = 'default';
	#sizes = ["xs", "sm", "default", "lg", "xl"];
	#size = 'default';

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		
		if (this.#variants.includes(document.documentElement.getAttribute('ui-variant'))){
			this.#variant = document.documentElement.getAttribute('ui-variant');
		}
	}

	static get observedAttributes() {
		return ["variant", "size"];
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		
		if (name === "variant" && this.#variants.includes(this.#variant)) {
			this.#variant = newValue
		}
		if (name === "size" && this.#sizes.includes(this.#size)) {
			this.#size = newValue;
		}
		this.render();
	}

	render() {
		this.#styles.replaceSync(`
			:host {
                font: var(--font-title-sm);
				font-weight: var(--font-title-weight-light);
            }

			:host > #holder::first-letter {
				text-transform: capitalize;
			}

			:host > #holder > b {
				font-weight: var(--font-title-weight);
			}
			:host > #holder > strong {
				font-weight: var(--font-title-weight);
			}
		`)

		this.shadowRoot.adoptedStyleSheets = [this.#styles];

		this.shadowRoot.innerHTML = `
			<div id='holder'>
				<slot><slot>
			</div>
		`;
	}
}

customElements.define("ui-intro", UiIntro);
