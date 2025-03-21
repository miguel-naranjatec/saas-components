class UiAccordion extends HTMLElement {

	#version = "0.0.1";
	#styles = new CSSStyleSheet();
	#variants = ['default'];
	#variant = 'default';
    #sizes = ['sm', 'default', 'lg'];
    #size = 'default';

	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true  });
	}

	connectedCallback() {
		this.render();
	}

	static get observedAttributes() {
		return [
			"variant",
            "size",
		];
	}

	attributeChangedCallback(name, oldValue, newValue) {

		if (name == 'variant' && this.#variants.includes(newValue)) {
			this.#variant = newValue;
		}
        if (name == 'size' && this.#sizes.includes(newValue)) {
			this.#size = newValue;
		}
		this.render();
	}
	render() {
		this.#styles.replaceSync(`
			:host{
				display: flex;
				flex-direction: column;
				gap: var(--gap-sm)
			}
		`);
		this.shadowRoot.adoptedStyleSheets = [this.#styles];
		this.shadowRoot.innerHTML = `<slot></slot>`;
	}
}
customElements.define("ui-accordion", UiAccordion);