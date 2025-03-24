class UiAspectRatio extends HTMLElement {

	#version = "0.0.1";
	#styles = new CSSStyleSheet();
	#aspect_ratio;
	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true  });
	}

	connectedCallback() {
		this.render();
	}

	static get observedAttributes() {
		return ['aspect-ratio'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'aspect-ratio') {
			this.#aspect_ratio = newValue;
		}
		this.render();
	}
	render() {
		this.#styles.replaceSync(`
			:host {
				
			}

			:host > ::slotted(*) {
				display: flex;
				aspect-ratio: ${this.#aspect_ratio};
				width: 100%;
				border: 6px solid pink;
			}
		`);
		this.shadowRoot.adoptedStyleSheets = [this.#styles];
		this.shadowRoot.innerHTML = `<slot></slot>`;
	}
}
customElements.define("ui-aspect-ratio", UiAspectRatio);