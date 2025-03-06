class UiAlert extends HTMLElement {
	#version = "0.0.1";
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

		this.shadowRoot.innerHTML = `
        <style>
		.alert{
			background-color: pink;
			display: inline-flex;
			padding: var(--alert-size-${this.#size}-padding);	
		}
        </style>
		<div class='alert ${this.#severity} ${this.#variant}' role='alert'>
			<div>
				${(title) ? `<div class='title'>${this.title}</div>` : ''}
				<slot></slot>
			</div>
		</div>
      `;
	}
}
customElements.define("ui-alert", UiAlert);
