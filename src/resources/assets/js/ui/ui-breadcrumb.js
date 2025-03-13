class UiBreadcrumb extends HTMLElement {

	#version =  "0.0.1";
	#styles = new CSSStyleSheet();
	#gaps = ['xs', 'sm', 'default'];
	#gap = 'default';
	#sizes = ['xs', 'sm', 'default']
	#size = 'default';
	#separator = "sample separador";

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();

		const slot = this.shadowRoot.querySelector('#options slot');
	
		const elements = slot.assignedElements({ flatten: true });
		
		


		//console.log(this.shadowRoot.querySelector("div").assignedElements({ flatten: true }));
		//let elements = this.shadowRoot.querySelector('#hidden slot').assignedElements({ flatten: true });
	
		
		if (elements.length) {
			elements.forEach(element => {
				this.shadowRoot.querySelector('#breadcrumb').appendChild(element);
				this.shadowRoot.querySelector('#breadcrumb').innerHTML += `<div class='separator'>${this.#separator}</div>`;
			});
		}
		


	}

	static get observedAttributes() {
		return ['separator', 'gap', 'size'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'gap' && this.#gaps.includes(newValue)){
			this.#gap = newValue;
		}
		if (name == 'size' && this.#sizes.includes(newValue)){
			this.#size = newValue;
		}
		if (name == 'separator'){
			this.#separator = newValue;
		}
		this.render();
	}

	render() {
		this.#styles.replaceSync(`
			:host{
				display: flex;
				gap: var(--breadcrumb-gap-${this.#gap});
			}
			#breadcrumb {
				display: flex;
				align-items: center;
				gap: var(--breadcrumb-gap-${this.#gap});
			}
			#options{
				display: none !important;
				border: 6px solid pink;
			}
			.separator{
	
				display: inline-flex;
			}
		`);

		this.shadowRoot.adoptedStyleSheets = [this.#styles];
		this.shadowRoot.innerHTML = `
		<div id='options'>
			<slot></slot>
		</div>
		<slot name='prefix'></slot>
		<nav id="breadcrumb"></nav>
		<slot name='sufix></slot>
		`;

	}
}

customElements.define('ui-breadcrumb', UiBreadcrumb);