class UiAlert extends HTMLElement {
	#version = "0.0.1";
	#styles = new CSSStyleSheet();
	#title;
	#icon;
	#variants = ['default', 'secondary', 'outlined'];
	#variant = 'default';
	#sizes = ['default', 'sm', 'lg'];
	#size = 'default';
	#severities = ['success', 'info', 'warning', 'error'];
	#severity = 'info';
	
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.render();
	}

	static get observedAttributes() {
		return [
			"severity",
			"variant",
			"size",
			"icon",
			"title"
		];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'variant' && this.#variants.includes(newValue)) {
			this.#variant = newValue;
		}
		if (name == 'size' && this.#sizes.includes(newValue)) {
			this.#size = newValue;
		}
		if (name == 'severity' && this.#severities.includes(newValue)) {
			this.#severity = newValue;
		}
		if (name == 'icon') {
			this.#icon = newValue;
		}
		if (name == 'title') {
			this.#title = newValue;
		}

		this.render();
	}
	
	#getIconSize() {
		return {
			'default': 'lg',
			'sm': 'default',
			'lg': 'xl'
		}[this.#size];
	}

	render() {
		const title = (this.#title) ?  `<div class='title'>${this.#title}</div>` : ''
		const icon = (this.#icon) ? `<ui-material-symbol size='${  this.#getIconSize() }' icon='${this.#icon}'></ui-material-symbol>` : '';
		this.#styles.replaceSync(`
			:host{
				display: flex;
			}
			#alert{
				display: flex;
				width: 100%;
				align-items: center;
				background: var(--alert-${this.#variant}-background);
				color: var(--alert-${this.#variant}-color);
				border: var(--alert-${this.#variant}-border);
				outline: var(--alert-${this.#variant}-outline);
				outline-offset: var(--alert-${this.#size}-outline-offset);	
				outline-width: var(--alert-${this.#size}-outline-width);
				font: var(--alert-${this.#size}-font);
				gap: var(--alert-${this.#size}-gap);
				padding: var(--alert-${this.#size}-padding);
				border-radius: var(--alert-${this.#size}-border-radius);
			}
			#alert > .info{
				display: flex;
				width: 100%;
				flex-direction: column;
				gap: var(--alert-${this.#size}-gap);
			}
			#alert > .info > .title {
				font: var(--font-title);
			}
		`);

		this.shadowRoot.adoptedStyleSheets = [this.#styles];
		this.shadowRoot.innerHTML = `
		<div id='alert' class='${this.#severity} ${this.#variant}' role='alert'>
			${icon}
			<div class='info'>
				${title}
				<slot></slot>
				<slot name='actions'></slot>
			</div>
		</div>
      `;
	}
}
customElements.define("ui-alert", UiAlert);
