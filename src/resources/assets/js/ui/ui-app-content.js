import reset from './../reset'

class UiAppContent extends HTMLElement {

	#version = "0.0.1";
	#variants = ['default'];
	#variant = 'default';

	constructor() {
		super();
		const shadow = this.attachShadow({ mode: 'open' });
		
		
		let styles = new CSSStyleSheet();
		styles.replaceSync(`
			:host {
   				display: flex;
   				flex-direction: column;
				position: relative;
				height: calc(100vh - 200px);
			
   			}
			[header] {
				
				background-color: indigo;
				padding: var(--padding);
			}
			[content] {
				flex-grow: 1;
				padding: var(--padding);
				
			}
			[footer] {
				padding: var(--padding)
			}
			`)

		shadow.adoptedStyleSheets = [reset, styles];
		
	}

	connectedCallback() {
		this.render();
	}

	static get observedAttributes() {
		return ['variant'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'variant' && this.#variants.includes(newValue)) {
			this.#variant = newValue;
		}
		this.render();
	}

	render() {
		this.shadowRoot.innerHTML = `

<div header>
	<slot name='header'></slot>
</div>
<div content>
	<slot></slot>
</div>
<div footer>
	<slot name='footer'></slot>
</div>
`;
	}
}

customElements.define('ui-app-content', UiAppContent);