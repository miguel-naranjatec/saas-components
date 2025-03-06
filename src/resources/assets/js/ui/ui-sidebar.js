class UISidebar extends HTMLElement {

	#version = "0.0.1";
	#open;
	#sides = ["left", "right"];
	#side = "left";
	#collapsibles = ["offcanvas", "icon", "none"]
	#collapsible = "icon";
	#widths = ["xs", "sm", "default", "lg", "xl"];
	#width = "default";

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.render();
	}
	
	static get observedAttributes() {
		return ["open", "side", "collapsible", "width"];
	}

	attributeChangedCallback(name, oldValue, newValue) {
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
            top: 0;
            ${this.#side}: 0;
            width: var(--sidebar-${this.#width}-width);
            height: 100%;
            background: #333;
            color: white;
           
            transform: translateX(${this.#open ? "0" :this.#side === "left" ? "-100%" : "100%"});
            transition: transform 0.3s ease;
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
        <button class="toggle-btn">☰</button>
        <slot></slot>
      `;

		this.shadowRoot.querySelector(".toggle-btn").addEventListener("click", () => this.toggleSidebar());
	}
}

customElements.define("ui-sidebar", UISidebar);
