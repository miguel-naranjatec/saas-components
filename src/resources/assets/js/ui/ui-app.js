import reset from '../reset'

class UiApp extends HTMLElement {

	#version = "0.0.1";
	#variants = ['default'];
	#variant = 'default';

	constructor() {
		super();
		const shadow = this.attachShadow({ mode: 'open' });
		
		
		let styles = new CSSStyleSheet();
		styles.replaceSync(`
			:host {
			
   			}
			`)

		shadow.adoptedStyleSheets = [reset, styles];
		
	}

	connectedCallback() {
		this.render();
	}

	static get observedAttributes() {
		return ['variant'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'variant' && this.#variants.includes(newValue)) {
			this.#variant = newValue;
		}
		this.render();
	}

	render() {
		this.shadowRoot.innerHTML = `<slot></slot>`;
	}
}

customElements.define('ui-app', UiApp);