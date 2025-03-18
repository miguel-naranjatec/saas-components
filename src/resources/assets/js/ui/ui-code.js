class UiCode extends HTMLElement {
	#version =  "0.0.1";
	#styles = new CSSStyleSheet();
	#variants = [
		'default'	
	];

	#variant = 'default';
    
	#sizes = [
        'sm',
		'default',
        'lg'
	];

	#size = 'default';
	

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.render();
	}

	static get observedAttributes() {
		return [
			"variant",
			"size"
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
			:host {
                display: inline-flex;
			}
            code{
                display: flex;
                padding: var(--padding);
                background: var(--color-surface);
                color: var(--color-surface-contrast);
                border-radius: var(--border-radius);
            }
		`);

		this.shadowRoot.adoptedStyleSheets = [this.#styles];

		this.shadowRoot.innerHTML = `
		<code>
			<slot></slot>
		</code>
      `;
	}
}
customElements.define("ui-code", UiCode);
