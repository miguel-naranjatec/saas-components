class UiAlert extends HTMLElement {
	#version = "0.0.1";
	#styles = new CSSStyleSheet();
	#variants = ['default', 'filled', 'outlined', 'ghost', 'subtle'];
	#variant = 'default';
	#sizes = ['default', 'xs', 'sm', 'lg', 'xl'];
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

		this.render();
	}

	render() {
		const title = (this.getAttribute('title')) ?? false;
		this.#styles.replaceSync(`
			:host{
				display: flex;
			}
			.alert{
				background-color: pink;
				display: flex;
				width: 100%;
				align-items: center;
				gap: var(--alert-${this.#size}-gap);
				padding: var(--alert-${this.#size}-padding);
				border-radius: var(--alert-${this.#variant}-border-radius);
				outline: var(--alert-${this.#variant}-outline);
				outline-offset: var(--alert-${this.#variant}-outline-offset);
			}
			.alert > .info{
				display: flex;
				width: 100%;
				flex-direction: column;
				gap: var(--alert-info-${this.#size}-gap);
			}
		`);

		this.shadowRoot.adoptedStyleSheets = [this.#styles];
		this.shadowRoot.innerHTML = `
		<div class='alert ${this.#severity} ${this.#variant}' role='alert'>
			<ui-material-symbol size='${this.#size}' icon='info'></ui-material-symbol>
			<div class='info'>
				${(title) ? `<div class='title'>${this.title}</div>` : ''}
				<slot></slot>
				<slot name='actions'></slot>
			</div>
		</div>
      `;
	}
}
customElements.define("ui-alert", UiAlert);
