import reset from '../reset'

class UiFieldset extends HTMLElement {

	#version = "0.0.1";
	#styles = new CSSStyleSheet();

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	static get observedAttributes() {
		return [
		];
	}
	
	connectedCallback() {
		this.render();
	}
	
	attributeChangedCallback(name, oldValue, newValue) {
		this.render();
	}

	
	render() {
		this.#styles.replaceSync(`
			:host{	
				display: grid;
				grid-template-columns: repeat(4, 1fr);
				gap: var(--gap-xl);
			}
		`);
		this.shadowRoot.adoptedStyleSheets = [this.#styles, reset];

		
		this.shadowRoot.innerHTML = `
			<slot></slot>
        `;
	}
}

customElements.define('ui-fieldset', UiFieldset);

