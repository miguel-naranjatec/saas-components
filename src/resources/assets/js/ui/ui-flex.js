class UIFlex extends HTMLElement {

	#version = "0.0.1";
	#directions = ['row', 'row-reverse', 'column', 'column-reverse']
	#direction = 'row';
	#gaps = ['none', 'xs', 'sm', 'default', 'lg', 'xl'];
	#gap = 'default';
		
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.render();
	}
	
	static get observedAttributes() {
		return ['direction', 'gap'];
	}
	
	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'direction' && this.#directions.includes(newValue)) {
			this.#direction = newValue;
		}
		if (name == 'gap' && this.#gaps.includes(newValue)) {
			this.#gap = newValue;
		}
		this.render();
	}

	
	render() {
		const justify = this.getAttribute("justify") || "flex-start";
		const align = this.getAttribute("align") || "stretch";
		this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: flex;
            flex-direction: ${this.#direction};
            justify-content: ${justify};
			flex-wrap: wrap;
            align-items: ${align};
            gap: var(--gap-${this.#gap}, var(--gap));
          }
        </style>
        <slot></slot>
      `;
	}
}

customElements.define("ui-flex", UIFlex);