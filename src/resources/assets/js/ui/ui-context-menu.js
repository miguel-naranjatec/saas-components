class UIContextMenu extends HTMLElement {


	#version = "0.0.1";
	#variants = ["default"];
	#variant = "default";

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.render();
		this.handleOutsideClick = this.handleOutsideClick.bind(this);
		this.handleContextMenu = this.handleContextMenu.bind(this);
	}

	static get observedAttributes() {
		return ["target"];
	}

	connectedCallback() {
		document.addEventListener("click", this.handleOutsideClick);
		this.setTargetListener();
	}

	disconnectedCallback() {
		document.removeEventListener("click", this.handleOutsideClick);
		this.removeTargetListener();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "target") {
			this.removeTargetListener();
			this.setTargetListener();
		}
	}

	setTargetListener() {
		if (this.targetElement) {
			this.targetElement.removeEventListener("contextmenu", this.handleContextMenu);
		}
		this.targetElement = document.querySelector(this.getAttribute("target"));
		if (this.targetElement) {
			this.targetElement.addEventListener("contextmenu", this.handleContextMenu);
		}
	}

	removeTargetListener() {
		if (this.targetElement) {
			this.targetElement.removeEventListener("contextmenu", this.handleContextMenu);
		}
	}

	handleOutsideClick(event) {
		if (!this.contains(event.target)) {
			this.setAttribute("open", "false");
		}
	}

	handleContextMenu(event) {
		event.preventDefault();
		this.showMenu(event.pageX, event.pageY);
	}

	showMenu(x, y) {
		this.style.left = `${x}px`;
		this.style.top = `${y}px`;
		this.setAttribute("open", "true");
	}

	render() {
		this.shadowRoot.innerHTML = `
        <style>
          :host {
            position: fixed;
            background: white;
            border: 1px solid #ccc;
           
            padding: 8px;
            display: none;
            z-index: 1000;
          }
          :host([open="true"]) {
            display: block;
          }
        </style>
        <slot></slot>
      `;
	}
}

customElements.define("ui-context-menu", UIContextMenu);
