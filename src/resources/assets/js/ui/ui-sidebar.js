import reset from '../reset'

class UISidebar extends HTMLElement {

	#version = "0.0.1";
	#open;
	#sides = ["left", "right"];
	#side = "left";
	#collapsibles = ["offcanvas", "icon", "none"]
	#collapsible = "none";
	#widths = ["xs", "sm", "default", "lg", "xl"];
	#width = "default";

	#variants = ["default"];
	#variant = "default";

	constructor() {
		super();
		const shadow = this.attachShadow({ mode: "open" });

		shadow.adoptedStyleSheets = [reset];
		

	}

	connectedCallback() {
		this.render();
	}
	
	static get observedAttributes() {
		return ["open", "side", "collapsible", "width"];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'collapsible' && this.#collapsibles.includes(newValue)) {
			this.#collapsible = newValue;
		}
		if (name === 'open') {
			this.#open = newValue === "true";
		}
		if (name === 'side' && this.#sides.includes(newValue)) {
			this.#side = newValue;
		}
		if (name === 'width' && this.#widths.includes(newValue)) {
			this.#width = newValue;
		}
		this.render();
	}

	toggleSidebar() {
		const isOpen = this.getAttribute("open") === "true";
		this.setAttribute("open", isOpen ? "false" : "true");
	}

	render() {
		this.shadowRoot.innerHTML = `
        <style>
          :host {
            position: fixed;
            top: var(--sidebar-offset-top, 0);
			bottom: var(--sidebar-offset-bottom, 0);
            ${this.#side}: 0;
            width: var(--sidebar-${this.#width}-width);
            background: var(--sidebar-${this.#variant}-background);
            transform: translateX(${this.#open ? "0" :this.#side === "left" ? "-100%" : "100%"});
            transition: transform 0.3s var(--ease-in-out, ease);
			padding: var(--sidebar-${this.#variant}-padding);
          }
          .toggle-btn {
            position: absolute;
            top: 16px;
            ${this.#side === "left" ? "right" : "left"}: -40px;
            background: #444;
            color: white;
            border: none;
            padding: 8px;
            cursor: pointer;
          }
        </style>
		${ (this.#collapsible == 'icon') ? `<button class="toggle-btn">☰</button>` : ''  }
        
        <slot></slot>
      `;

		//this.shadowRoot.querySelector(".toggle-btn").addEventListener("click", () => this.toggleSidebar());
	}
}

customElements.define("ui-sidebar", UISidebar);
