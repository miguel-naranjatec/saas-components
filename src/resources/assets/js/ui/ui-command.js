class UiCommand extends HTMLElement {
	#version = "0.0.1";
	#styles = new CSSStyleSheet();
	#command;
	#variants = ['default', 'secondary', 'tertiary', 'outlined', 'danger', 'warning', 'info', 'success', 'subtle'];
	#variant = 'outlined';
	#sizes = ['sm', 'default', 'lg'];
	#size = 'default';
	#languages = {
		"en": {
			then: 'then',
		},
		"es": {
			then: 'despues',
		}
	}
	#language = "en";

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		if (Object.keys(this.#languages).includes(document.documentElement.lang)) {
			this.#language = document.documentElement.lang;
		}
	}

	connectedCallback() {
		this.render();
	}

	static get observedAttributes() {
		return [
			"variant",
			"size",
			"command"
		];
	}
	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'variant' && this.#variants.includes(newValue)) {
			this.#variant = newValue;
		}
		if (name == 'size' && this.#sizes.includes(newValue)) {
			this.#size = newValue;
		}
		if (name == 'command') {
			this.#command = this.generateCommand(newValue);
		}
		if (name == 'language' && this.#languages.includes(newValue)) {
			this.#language = newValue;
		}
		this.render();
	}

	generateCommand(string) {
		let items = string.split(/\s+/).filter((word) => {
			return (word) ? true : false;
		}).map((word) => {
			if (word == '+'){
				return `<ui-badge variant='transparent' size='${this.#size}'>${word}</ui-badge>`
			}
			if (word == 'then'){
				return `<ui-badge variant='transparent' size='${this.#size}'>${this.#languages[this.#language].then}</ui-badge>`
			}
			return `<ui-badge variant='${this.#variant}' size='${this.#size}'>${word}</ui-badge>`
		}).join('');

		return items;
		
	}

	render() {
		this.#styles.replaceSync(`
			:host {
                display: inline-flex;
			}
			#keys{
				display: flex;
				flex-wrap: wrap;
				gap: var(--gap-xs);
			}
		`);
		this.shadowRoot.adoptedStyleSheets = [this.#styles];
		this.shadowRoot.innerHTML = `
        <div id='keys'>
			${this.#command}
        </div>
        `;
	}
}
customElements.define("ui-command", UiCommand);
