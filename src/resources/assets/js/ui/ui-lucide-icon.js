//https://unpkg.com/lucide@latest

class UiLucideIcon extends HTMLElement {

	// TODO implement functionality
	#version = "0.0.1";
	#styles = new CSSStyleSheet();
	#variants = ["thin", "default", "thick"];
	#variant = "default";
	#sizes = ["xs", "sm", "default", "lg", "xl"];
	#size = 'default';
	#icon;
	

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.render();

	}

	static get observedAttributes() {
		return ['icon', 'size'];
	}	

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'icon') {
			this.#icon = newValue;
		}
		if (name == 'size' && this.#sizes.includes(newValue)) {
			this.#size = newValue;
		}
		if (name == 'variant' && this.#variants.includes(newValue)) {
			this.#variant = newValue;
		}
		this.render();	
	}

	render() {
	
		this.#styles.replaceSync(`
			:host{
				display: inline-flex;
			}
		`);
		this.shadowRoot.adoptedStyleSheets = [this.#styles];
		this.shadowRoot.innerHTML = `<i data-lucide="menu">aaaa</i>`;
	}
}
customElements.define("ui-lucide-icon", UiLucideIcon);

