class UiGrid extends HTMLElement {

	#version = "0.0.1";
	#gaps = ['none', 'xs', 'sm', 'default']
	#gap = 'default';
	#sizes = ['xs', 'sm', 'default', 'lg', 'xl']
	#size = 'default';

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	static get observedAttributes() {
		return ['gap', 'size'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'gap' && this.#gaps.includes(newValue)){
			this.#gap = newValue;
		}
		if (name == 'size' && this.#sizes.includes(newValue)){
			this.#size = newValue;
		}
		this.render();
	}
	
	render() {
		this.shadowRoot.innerHTML = `
        <style>
          .grid-container {
            display: grid;
            grid-template-columns: var(--grid-${this.#size}-template-columns);
            grid-gap: var(--grid-${this.#gap}-gap);
          }
        </style>
        <div class="grid-container">
          <slot></slot>
        </div>
      `;
	}
}

customElements.define('ui-grid', UiGrid);