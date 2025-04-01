class UiRadio extends HTMLElement {

	// TODO implement functionality

	#version = "0.0.1";
	#styles = new CSSStyleSheet();
	#variants = ["default"];
	#variant = 'default';
	#sizes = ["sm", "default", "lg"];
	#size = 'default';
	#checked = false;
	#disabled = false;
	#name;
	#value;

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.internals = this.attachInternals();
		if (this.#variants.includes(document.documentElement.getAttribute('ui-variant'))){
			this.#variant = document.documentElement.getAttribute('ui-variant');
		}
	}

	static get observedAttributes() {
		return ["checked", "disabled", "variant", "size", "name", "value"];
	}

	connectedCallback() {
		this.render();
		this.addEventListener("click", () => {
			this.internals.setFormValue("1");
			this.dispatchEvent(new Event("change"));
		});
	}
	
	get checked() {
		return this.#checked;
	}

	set checked(value) {
		this.#checked = Boolean(value);
	}

	static get formAssociated() {
		return true;
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "checked") {
			this.#checked = this.hasAttribute("checked");
		}
		if (name === "disabled") {
			this.#disabled = this.hasAttribute("disabled");
		}
		if (name === "variant" && this.#variants.includes(this.#variant)) {
			this.#variant = newValue
		}
		if (name === "size" && this.#sizes.includes(this.#size)) {
			this.#size = newValue;
		}
		if (name === "name") {
			this.#name = newValue;
		}
		if (name === "value") {
			this.#value = newValue;
		}
		this.render();
	}

	render() {
		this.#styles.replaceSync(`
            :host {
                display: inline-flex;
                user-select: none;
            }
			#label {
			    display: flex;
			    align-items: center;
			    gap: var(--gap);
                cursor: pointer;
			}
			#checkbox{
				clip: rect(0 0 0 0); 
				clip-path: inset(50%);
				height: 1px;
				overflow: hidden;
				position: absolute;
				white-space: nowrap; 
				width: 1px;
			}
			.switch {
		  		aspect-ratio: 1;
            	height: var(--checkbox-${this.#size}-height);	
            	background: var(--checkbox-${this.#variant}-background);
                border: var(--checkbox-${this.#variant}-border);
            	border-radius: var(--checkbox-${this.#size}-height);
                outline: var(--checkbox-${this.#variant}-outline);
                outline-width:var(--checkbox-${this.#size}-outline-width);
                outline-offset:var(--checkbox-${this.#size}-outline-offset);
            	display: inline-flex;
            	align-items: center;
            	transition: background-color 0.3s ease;
				position: relative;
				transition: all var(--transition-fast-duration) var(--ease-in-out);
				
          	}
			.handle {
				position: absolute;
                inset: var(--checkbox-${this.#size}-padding);
				aspect-ratio: 1;
                opacity: 0;
            	transition: all var(--transition-fast-duration) var(--ease-in-out);
          	}
			#checkbox:checked + .switch {
				background: var(--checkbox-${this.#variant}-checked-background);
                border: var(--checkbox-${this.#variant}-checked-border);
                outline: var(--checkbox-${this.#variant}-checked-outline);
                outline-width:var(--checkbox-${this.#size}-outline-width);
                outline-offset:var(--checkbox-${this.#size}-outline-offset);

			}
			#checkbox:checked + .switch > .handle{
                opacity: 1;
                background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 800 800'%3E%3Cpolygon points='717.9 115.8 296.3 537.4 82.1 323.2 8.7 396.5 222.9 610.8 289.8 677.6 296.3 684.2 791.3 189.2 717.9 115.8' style='fill: %23FFFFFF;'/%3E%3C/svg%3E");
            }
            #info {
                font: var(--font-body-sm);
            }
		`)

		this.shadowRoot.adoptedStyleSheets = [this.#styles];
		let disabled = (this.#disabled) ? "disabled" : "";
		let checked = (this.#checked) ? "checked" : "";
		this.shadowRoot.innerHTML = `<label id='label'>
			<input name=${this.#name}  ${disabled} ${checked} id='checkbox' type='radio' />
			<div class="switch" role="switch" aria-checked="${this.#checked}">
				<div class="handle"></div>
			</div>
			<div id='info'>
				<slot><slot>
			</div>
		</label>`;
	}
}

customElements.define("ui-radio", UiRadio);
