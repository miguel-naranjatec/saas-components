class UiHeading extends HTMLElement {

	
	#version =  "0.0.1";
	#styles = new CSSStyleSheet();

	#subtitle;
	#pretitle;

	#variants = [
		'default',	
	];
	#variant = 'default';
	#sizes = [
		'sm',
		'default',
		'lg'
	];
	#size = 'default';
	

	#gaps = ['xs', 'sm', 'default', 'lg', 'xl'];
	#gap = 'default';

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
			"subtitle",
			"pretitle"
		];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'variant' && this.#variants.includes(newValue)) {
			this.#variant = newValue;
		}
		if (name == 'size' && this.#sizes.includes(newValue)) {
			this.#size = newValue;
		}
		if (name == 'subtitle') {
			this.#subtitle = newValue;
		}
		if (name == 'pretitle') {
			this.#pretitle = newValue;
		}
	
		this.render();
	}

	render() {
		
		const subtitle = (this.#subtitle) ? `<ui-subtitle variant='${this.#variant}' >${this.#subtitle}</ui-subtitle>` : ``;
		const pretitle = (this.#pretitle) ? `<ui-subtitle variant='${this.#variant}' >${this.#pretitle}</ui-subtitle>` : ``;

		this.#styles.replaceSync(`
			:host {
				display: flex;
				gap: var(--gap);
			}
			#holder {
				flex-grow: 1;
			}
			#content {
				flex-grow: 1;
			}

			::slotted(*) {
				margin: 0;
			}
			::slotted(*:is(h1,h2,h3,h4,h5)) {
				font: var(--font-title);
			}
		`);

		this.shadowRoot.adoptedStyleSheets = [this.#styles];
		this.shadowRoot.innerHTML = `
		<ui-flex id='holder' align='center' gap='${this.#gap}'>
			<slot name='prepend'></slot>
			<ui-flex id='content' direction='column' gap='${this.#gap}'>
				${pretitle}
				<slot></slot>
				<slot name='intro'></slot>
				${subtitle}
			</ui-flex>
			<slot name='append'></slot>
		</ui-flex>`;
	}
}
customElements.define("ui-heading", UiHeading);
