class UiBreadcrumb extends HTMLElement {

	#version =  "0.0.1";
	#styles = new CSSStyleSheet();
	#variants = ['default'];
	#variant = 'default';
	#gaps = ['xs', 'sm', 'default', 'lg', 'xl'];
	#gap = 'default';
	#separator = "/";
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		
		const slot = this.shadowRoot.querySelector('#options slot');
		const elements = slot.assignedElements({ flatten: true });
		const last = elements.pop();
		if (elements.length) {
			elements.forEach(element => {
				this.shadowRoot.querySelector('#breadcrumb').appendChild(element);
				this.shadowRoot.querySelector('#breadcrumb').innerHTML += `<div class='separator'>${this.#separator}</div>`;
			});
		}
		if (last){
			this.shadowRoot.querySelector('#breadcrumb').appendChild(last);
		}
	}

	static get observedAttributes() {
		return ['separator', 'gap', 'size', 'variant'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'gap' && this.#gaps.includes(newValue)){
			this.#gap = newValue;
		}
		if (name == 'separator'){
			this.#separator = newValue;
		}
		if (name == 'variant' && this.#variants.includes(newValue)){
			this.#variant = newValue;
		}
		this.render();
	}

	render() {
		this.#styles.replaceSync(`
			:host{
				display: flex;
				align-items: center;
				gap: var(--breadcrumb-gap-${this.#gap});
				font: var(--breadcrumb-${this.#variant}-font);
				user-select: none;
			}
			#breadcrumb {display: flex;align-items: center;gap: var(--breadcrumb-gap-${this.#gap});}
			#breadcrumb > * { white-space: nowrap; }
			#breadcrumb > a {
				text-decoration: none;
				color: var(--breadcrumb-${this.#variant}-color);
			}
			#breadcrumb > a:last-child {
				color: var(--breadcrumb-current-${this.#variant}-color);
				font-weight: var(--breadcrumb-current-${this.#variant}-font-weight);
				pointer-events: none;
			}
			#breadcrumb > a:is(:hover, :focus){
				color: var(--breadcrumb-hover-${this.#variant}-color);
			}
			.separator{
				display: inline-flex;
				color: var(--breadcrumb-separator-${this.#variant}-color);
			}
			#options{display: none;}
			[name=prefix], [name=sufix]{color: var(--breadcrumb-prefix-${this.#variant}-color);white-space: nowrap;}
		`);
		this.shadowRoot.adoptedStyleSheets = [this.#styles];
		this.shadowRoot.innerHTML = `
		<slot name='prefix'></slot>
		<nav id="breadcrumb"></nav>
		<slot name='sufix'></slot>
		<div id='options'><slot></slot></div>
		`;

	}
}

customElements.define('ui-breadcrumb', UiBreadcrumb);