class UiSelect extends HTMLElement {

	#version = "0.0.1";
	#variants = ['default'];
	#variant = 'default';
	#multiple = false;
	#data = [];
	#isOpen = false;
	focusedIndex = -1;
	#languages = {
		"en": {
			placeholder: 'Select a option',
		},
		"es": {
			placeholder: 'Select a option',
		}
	}

	#language = "en";

	constructor() {
		super();
		const shadow = this.attachShadow({ mode: "open" });
		if (Object.keys(this.#languages).includes(document.documentElement.lang)) {
			this.#language = document.documentElement.lang;
		}
		let styles = new CSSStyleSheet();
		styles.replaceSync(`
			:host {
			
   			}
			#holder-slot{
				display:none;
			}
			#dropdown{
				flex-direction: column;
				border: 2px solid pink;
			}
			`)
		shadow.adoptedStyleSheets = [styles];

		document.addEventListener('click', (e) => {
			if (!this.contains(e.target) && this.#isOpen) {
				this.closeDropdown();
			}
		});

	}

	connectedCallback() {
		this.render();
		this.generateData();
		this.renderOptions();
	}

	static get observedAttributes() {
		return ['variant', 'multiple', 'name', 'placeholder'];
	}

	attributeChangedCallback(name, oldValue, newValue) {

		if (name == "variant" && this.#variants.includes(newValue)) {
			this.#variant = newValue;
		}

		if (name == "language" && Object.keys(this.#languages).includes(newValue)) {
			this.#language = newValue;
		}

		this.render();
		

	}

	closeDropdown() {
		this.#isOpen = false;
		this.dropdown.style.display = this.#isOpen ? "flex" : "none";
	}

	toggleDropdown() {
		this.#isOpen = !this.#isOpen;
		this.dropdown.style.display = this.#isOpen ? "flex" : "none";
	}

	generateData() {

		const elements = this.shadowRoot.querySelector('#holder-slot slot').assignedElements({ flatten: true });
		this.#data = [];
		if (elements.length) {
			//only option && optiongroup
			elements.forEach(element => {
				if (element.nodeName == 'OPTION') {
					let obj = {
						label: element.label,
						disabled: element.disabled,
						selected: element.selected,
						value: element.value
					}
					this.#data.push(obj);

				}
			});
		}

	}

	filterOptions(query) {
        const options = this.shadowRoot.querySelectorAll(".option");
        options.forEach(option => {
            option.style.display = option.textContent.toLowerCase().includes(query.toLowerCase()) ? "block" : "none";
        });
    }

	renderOptions() {
		this.optionsContainer.innerHTML = "";
		this.#data.forEach((option, index) => {
			const div = document.createElement("div");
			div.classList.add("option");
			div.textContent = option.label;
			div.dataset.data = option;
			div.setAttribute("tabindex", "0");
			div.addEventListener("click", () => this.selectOption(option));
			this.optionsContainer.appendChild(div);
		});
	}

	render() {
		this.#multiple = this.hasAttribute('multiple');
		this.shadowRoot.innerHTML = `
			<div class="select-container" tabindex="0">
            	<div class="selected-values">${this.#languages[this.#language].placeholder}</div>
            </div>
            <div id='dropdown' slot='dropdown' style='display:none;'>
				<input placeholder='${this.#languages[this.#language].placeholder}' />
				<div id='optionsContainer'></div>
            </div>
			<div id='holder-slot'>
				<slot id='slot'></slot>
			</div>
      	`;

		this.dropdown = this.shadowRoot.querySelector("#dropdown");
		this.selectContainer = this.shadowRoot.querySelector(".select-container");
		this.selectContainer.addEventListener("click", () => this.toggleDropdown());
		this.optionsContainer = this.shadowRoot.querySelector("#optionsContainer");
		this.input = this.shadowRoot.querySelector("#dropdown > input");
		this.input.addEventListener("input", (e) => this.filterOptions(e.target.value));
		this.renderOptions();
	}
}

customElements.define("ui-select", UiSelect);
