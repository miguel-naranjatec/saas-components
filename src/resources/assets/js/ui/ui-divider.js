class UiDivider extends HTMLElement {

	#version = "0.0.1";
	#variants = ["default"];
	#variant = "default";
	#sizes = ["xs", "sm", "default", "lg", "xl"];
	#size = "default";

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	static get observedAttributes() {
		return ['orientation', 'size'];
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

		const orientation = ["vertical", "xs", "sm"].includes(this.getAttribute("orientation")) || "horizontal";
		this.shadowRoot.innerHTML = `<style>
          .divider {
            display: flex;
            background: var(--divider-${this.#variant}-background);
            width: ${orientation === 'horizontal' ? '100%' : `var(--divider-${this.#size}-width)`};
            height: ${orientation === 'vertical' ? '100%' : `var(--divider-${this.#size}-width)`};
          }
        </style>
        <div class="divider"></div>
      `;
	}
}

customElements.define('ui-divider', UiDivider);