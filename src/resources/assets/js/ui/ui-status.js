class UiStatus extends HTMLElement {

	//TODO 

	#version = "0.0.1";
	#styles = new CSSStyleSheet();
	#variants = ["default"];
	#variant = 'default';
	#options = [];
	#optionsContainer;
	#checked;

	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });
		this.internals = this.attachInternals();
		if (this.#variants.includes(document.documentElement.getAttribute('ui-variant'))) {
			this.#variant = document.documentElement.getAttribute('ui-variant');
		}
	}

	static get observedAttributes() {
		return ["options", "checked"];
	}

	connectedCallback() {
		this.render();
	}

	static get formAssociated() {
		return true;
	}

	attributeChangedCallback(name, oldValue, newValue) {
	
		if (name == 'options') {
			this.#options = JSON.parse(this.getAttribute("options") || "[]");
		}

		if (name == 'checked'){
			this.#checked = newValue;	
			this.internals.setFormValue(this.#checked);
		}

		this.render();
	}

	renderOptions() {

		this.#optionsContainer.innerHTML = "";
		this.#options.forEach((option, index) => {
			const div = document.createElement("label");
			div.classList.add("option");
			const checked = (option.value == this.#checked) ? "checked" : "";
			div.innerHTML = `<input type='radio' ${checked} name='${this.name}' value='${option.value}' /><div class='label'>${option.label}</div>`;
			this.#optionsContainer.appendChild(div);
			
		});

		this.#optionsContainer.addEventListener('change', (e) => {
			this.#checked = e.target.value;
			this.internals.setFormValue(this.#checked);
			this.dispatchEvent(new Event("change"));
		});
	}

	render() {
		this.#styles.replaceSync(`
			#optionsContainer{
				display: flex;
			}

			#optionsContainer > label > input[type=radio]{
				clip: rect(0 0 0 0); 
				clip-path: inset(50%);
				height: 1px;
				overflow: hidden;
				position: absolute;
				white-space: nowrap; 
				width: 1px;
			}

			#optionsContainer > label > input[type=radio] + .label {
				padding: var(--padding);
				border: 1px solid pink;
				white-space: nowrap;
				line-height: 1;
			}

			#optionsContainer > label > input[type=radio]:checked + .label {
				background-color: pink;
			}

			#optionsContainer > label > input[type=radio]:focus + .label {
				outline: 2px solid blue;
			}

		`);

		this.shadowRoot.adoptedStyleSheets = [this.#styles];
		this.shadowRoot.innerHTML = `<div id='optionsContainer'></div>`;
		this.#optionsContainer = this.shadowRoot.querySelector("#optionsContainer");
		this.renderOptions();
	}
}

customElements.define("ui-status", UiStatus);
