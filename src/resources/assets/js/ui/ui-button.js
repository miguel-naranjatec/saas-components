class UiButton extends HTMLElement {

	//TODO add ripple effect? https://github.com/mariusclaret/ripple-effect/blob/master/ripple.js
	#version =  "0.0.2";
	#styles = new CSSStyleSheet();
	#variants = [
		'default',
		'secondary',
		'tertiary',
		'outlined',
		'subtle',
		'transparent',
		'danger',
		'info',
		'success'
	];
	#variant = 'default';
	#sizes = [
		'default',
		'sm',
		'lg'
	];
	#size = 'default';
	#icon;
	#icon_trailing;
	#href;
	#target;


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
			"size",
			"icon",
			"icon-trailing",
			"loading",
			"square",
			"href",
			"target"
		];
	}
	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'variant' && this.#variants.includes(newValue)) {
			this.#variant = newValue;
		}
		if (name == 'size' && this.#sizes.includes(newValue)) {
			this.#size = newValue;
		}

		if (name == 'icon') {
			this.#icon = newValue;
		}

		if (name == 'icon-trailing') {
			this.#icon_trailing = newValue;
		}

		if (name == 'href') {
			this.#href = newValue;
		}

		if (name == 'target') {
			this.#target = newValue;
		}

	
		
		this.render();
	}

	render() {
		const icon = (this.#icon) ? `<ui-material-symbol variant='default' icon='${this.#icon}' size='${this.#size}'></ui-material-symbol>` : ``;
		const icon_trailing = (this.#icon_trailing) ? `<ui-material-symbol variant='default' icon='${this.#icon_trailing}' size='${this.#size}'></ui-material-symbol>` : ``;
		const href = (this.#href) ? `href='${this.#href}'` : ``;
		const tag = (this.#href) ? 'a' : 'button';
		const target = (this.#href && this.#target) ? `target='${this.#target}'` : ``;
		const disabled = (this.hasAttribute("disabled")) ? `disabled` : ``;
		const fullwidth = this.hasAttribute("fullwidth");
		this.#styles.replaceSync(`
			:host {
				display: ${ (fullwidth) ? 'flex' : 'inline-flex' };
			}
			:host:disabled{
			}
          	:is(button, a) {
				box-sizing: border-box;
            	display: inline-flex;
				width: ${ (fullwidth) ? '100%' : 'auto' };;
				align-items: center;
				gap: var(--button-${this.#size}-gap);
				line-height: 1;
				whitespace: nowrap;
				font: var(--button-${this.#size}-font);
				text-transform: var(--button-text-transform);
				letter-spacing: var(--button-${this.#size}-letter-spacing);
				padding: var(--button-${this.#size}-padding);
				border-radius: var(--button-${this.#size}-border-radius);
				background: var(--button-${this.#variant}-background);
				color: var(--button-${this.#variant}-color);
				border: var(--button-${this.#variant}-border);
				outline: var(--button-${this.#variant}-outline);
				outline-offset: var(--button-${this.#size}-outline-offset);
				outline-width: var(--button-${this.#size}-outline-width);
				transition: all var(--transition-duration) var(--ease-in-out);
				text-decoration: none;
				user-select: none;
				cursor: pointer;
        	}
			:is(button, a):is(:hover,:focus){
				background: var(--button-hover-${this.#variant}-background);
				color: var(--button-hover-${this.#variant}-color);
				outline: var(--button-hover-${this.#variant}-outline);
				outline-width: var(--button-${this.#size}-outline-width);
			}
		`);

		this.shadowRoot.adoptedStyleSheets = [this.#styles];

		this.shadowRoot.innerHTML = `
		<${tag} ${href} ${disabled} ${target}>
			
			${icon}
			<slot></slot>
			${icon_trailing}
		</${tag}>
      `;
	}
}
customElements.define("ui-button", UiButton);
