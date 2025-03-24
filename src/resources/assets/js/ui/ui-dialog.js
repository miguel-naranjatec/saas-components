class UiDialog extends HTMLElement {

	//TODO close click outside, close button, close on escape

	#version = "0.0.1";
	#styles = new CSSStyleSheet();
	#open;
	#trigger_element;
	#variants = ["default"];
	#variant = "default";
	#sizes = ["sm", "default", "lg"];
	#size = "default";
	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true  });
	}

	connectedCallback() {
		this.render();
		document.addEventListener('click', (e) => {
			if (e.target.closest(this.#trigger_element)) {
				this.#open = !this.#open;
				this.render();
			}
		});

		this.shadowRoot.addEventListener('click', (e) => {
			if (e.target.matches('#overlay')) {
				this.#open = false;
				this.render();
			}
		})
	}

	static get observedAttributes() {
		return ['variant', 'trigger-element', 'size'];
	}
	
	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'size' && this.#sizes.includes(newValue)) {
			this.#size = newValue;
		}
        if (name == 'variant' && this.#variants.includes(newValue)) {
			this.#variant = newValue;
		}
		if (name == 'trigger-element') {
			this.#trigger_element = newValue;
		}
		this.render();
	}
	render() {
		const open = (this.#open) ? 'open' : '';
		this.#styles.replaceSync(`
			:host{
				display: ${open ? 'flex' : 'none'};
				align-items: center;
				justify-content: center;
				inset: 0;
				position: fixed;
				z-index: calc(var(--z-index-max) - 50);
			}
			:host > #overlay {
				display: ${open ? 'block' : 'none'};
				position: absolute;
				inset: 0;
				background: rgba(0,0,0,0.5);
				z-index: 1;
			}
			dialog{
				z-index: 2;
				position: relative;
				display: flex;
				flex-direction: column;
				padding: var(--padding-lg);
				gap: var(--gap);
				border: var(--dialog-${this.#variant}-border);
				border-radius: var(--border-radius);
				width: min(var(--dialog-${this.#size}-width), calc(100vw - var(--gap-xl) * 2));
				pointer-events: auto;
			}
		`);
		this.shadowRoot.adoptedStyleSheets = [this.#styles];

		

		this.shadowRoot.innerHTML = `
		<dialog ${open} id='dialog'>
			<slot name='header'></slot>
			<div id='content'><slot></slot></div>
			<slot name='footer'></slot>
			<ui-button>Close</ui-button>
		</dialog>
		<div id='overlay'></div>
		`;
	}
}
customElements.define("ui-dialog", UiDialog);