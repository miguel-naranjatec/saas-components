class UiButtonGroup extends HTMLElement {

	#version = "0.0.1";
	#styles = new CSSStyleSheet();
	#gaps = ['xs', 'sm', 'default', 'lg', 'xl'];
	#gap = 'default';
	#alignments = ['start', 'end', 'center', 'space-between', 'space-around'];
	#alignment = 'center';

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	static get observedAttributes() {
		return ['gap', 'alignment'];
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'gap' && this.#gaps.includes(newValue)) {
			this.#gap = newValue;
		}
		if (name == 'alignment' && this.#alignments.includes(newValue)) {
			this.#alignment = newValue;
		}
		this.render();
	}

	render() {

		this.#styles.replaceSync(`
			:host{
                display: flex;
                gap: var(--button-group-${this.#gap}-gap);
				justify-content: ${this.#alignment};
				width: 100%;
            }
		`);

		this.shadowRoot.adoptedStyleSheets = [this.#styles];
		this.shadowRoot.innerHTML = `<slot></slot>`;
	}
}
customElements.define("ui-button-group", UiButtonGroup);
