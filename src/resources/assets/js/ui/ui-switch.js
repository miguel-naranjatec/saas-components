class UISwitch extends HTMLElement {

	#version = "0.0.2";
	#styles = new CSSStyleSheet();
	#variants = ["default"];
	#variant = 'default';
	#sizes = ["xs", "sm", "default", "lg", "xl"];
	#size = 'default';
	#checked = false;
	#disabled = false;
	#name;

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.internals = this.attachInternals();
		if (this.#variants.includes(document.documentElement.getAttribute('ui-variant'))){
			this.#variant = document.documentElement.getAttribute('ui-variant');
		}
	}

	static get observedAttributes() {
		return ["checked", "disabled", "variant", "size", "name"];
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

		this.render();
	}

	render() {
		this.#styles.replaceSync(`
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
		  		aspect-ratio:  var(--switch-aspect-ratio);
            	height: var(--switch-${this.#size}-height);	
            	border-radius:  var(--switch-${this.#size}-border-radius);
            	background: var(--switch-${this.#variant}-background);
            	display: inline-flex;
            	align-items: center;
            	transition: background-color 0.3s ease;
				position: relative;
				transition: all var(--transition-fast-duration) var(--ease-in-out);
				cursor: pointer;
          	}
			.handle {
				position: absolute;
				aspect-ratio: 1;
            	height: calc(var(--switch-${this.#size}-height) - var(--switch-${this.#size}-padding) * 2);
            	background-color: var(--switch-handle-${this.#variant}-background);
            	border-radius: 50%;
            	transition: all var(--transition-fast-duration) var(--ease-in-out);
				left: var(--switch-${this.#size}-padding);
          	}
			#checkbox:checked + .switch {
				background: var(--switch-checked-${this.#variant}-background);
			}
			#checkbox:checked + .switch > .handle {
				background: var(--switch-checked-handle-${this.#variant}-background);
				transform: translateX(calc(var(--switch-${this.#size}-height) * var(--switch-aspect-ratio) - var(--switch-${this.#size}-height) ) );
			}
			#checkbox:focus + .switch > .handle{
				outline: var(--switch-focus-handle-${this.#variant}-outline);
			}
		`)

		this.shadowRoot.adoptedStyleSheets = [this.#styles];
		let disabled = (this.#disabled) ? "disabled" : "";
		let checked = (this.#checked) ? "checked" : "";
		this.shadowRoot.innerHTML = `<label>
			<input name=${this.#name}  ${disabled} ${checked} id='checkbox' type='checkbox' />
			<div class="switch" role="switch" aria-checked="${this.#checked}">
				<div class="handle"></div>
			</div>
		</label>`;
	}
}

customElements.define("ui-switch", UISwitch);
