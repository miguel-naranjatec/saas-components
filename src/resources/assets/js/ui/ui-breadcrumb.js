class UiBreadcrumb extends HTMLElement {

	#version =  "0.0.1";
	#styles = new CSSStyleSheet();
	#gaps = ['xs', 'sm', 'default'];
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
		return ['separator', 'gap', 'size'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'gap' && this.#gaps.includes(newValue)){
			this.#gap = newValue;
		}
		if (name == 'separator'){
			this.#separator = newValue;
		}
		this.render();
	}

	render() {
		this.#styles.replaceSync(`
			:host{display: flex;gap: var(--breadcrumb-gap-${this.#gap});font: var(--font-body-sm);}
			#breadcrumb {display: flex;align-items: center;gap: var(--breadcrumb-gap-${this.#gap});}
			#breadcrumb > * { white-space: nowrap; }
			.separator{ display: inline-flex; }
			#options{display: none;}
		`);
		this.shadowRoot.adoptedStyleSheets = [this.#styles];
		this.shadowRoot.innerHTML = `
		<slot name='prefix'></slot>
		<nav id="breadcrumb"></nav>
		<slot name='sufix'></slot>
		<div id='options'>
			<slot></slot>
		</div>
		`;

	}
}

customElements.define('ui-breadcrumb', UiBreadcrumb);