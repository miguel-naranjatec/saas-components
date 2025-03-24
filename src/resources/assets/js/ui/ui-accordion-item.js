class UiAccordionItem extends HTMLElement {
    #version = "0.0.1";
	#styles = new CSSStyleSheet();
    #title;
	#variants = ['default'];
    #variant = 'default';
	#open;

    constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });
	}

    connectedCallback() {
		this.render();
		this.shadowRoot.addEventListener('click', (e) => {
			if (e.target.id == 'title') {
				this.toggleAttribute('open');
			}
		});
	}

    static get observedAttributes() {
		return [
			"variant",
            "size",
            "title",
			"open"
		];
	}

    attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'variant' && this.#variants.includes(newValue)) {
			this.#variant = newValue;
		}
        if (name == 'title') {
			this.#title = newValue;
		}
		if (name == 'open') {
			this.#open = this.hasAttribute('open');
			this.#open ? this.dispatchEvent(new CustomEvent("open")) : this.dispatchEvent(new CustomEvent("close"));
		}
		this.render();
	}

    render() {
        const title = (this.#title) ? `${this.#title}` : ``;
		this.#styles.replaceSync(`
			:host{
				display: flex;
                flex-direction: column;
				width: 100%;
				background: var(--accordion-${this.#variant}-background);
				border-radius: var(--accordion-${this.#variant}-border-radius);
				padding: var(--accordion-${this.#variant}-padding);
                gap: var(--accordion-${this.#variant}-gap);
			}

			#title{
				display: flex;
				align-items: center;
				justify-content: space-between;
				font: var(--accordion-title-${this.#variant}-font);
				text-transform: var(--accordion-title-${this.#variant}-text-transform);
				letter-spacing: var(--accordion-title-${this.#variant}-letter-spacing);
				padding: var(--accordion-title-${this.#variant}-padding);
				gap: var(--accordion-title-${this.#variant}-gap);
				background: var(--accordion-title-${this.#variant}-background);
				color: var(--accordion-title-${this.#variant}-color);
				border-radius: var(--accordion-title-${this.#variant}-border-radius);
				overflow: hidden;
  				text-overflow: ellipsis;
				cursor: pointer;
			}
				
			#content{
				display: ${ this.#open ? 'flex' : 'none' };
				padding: var(--accordion-content-${this.#variant}-padding);
			}
		`);

		this.shadowRoot.adoptedStyleSheets = [this.#styles];
		this.shadowRoot.innerHTML = `
            <a id='title'>
            	${this.#title}
				<ui-material-symbol size='sm' icon='${ this.#open ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }'></ui-material-symbol>
            </a>
            <div id='content'>
                <slot></slot>
            </div>
			`;
	}

}

customElements.define("ui-accordion-item", UiAccordionItem);
