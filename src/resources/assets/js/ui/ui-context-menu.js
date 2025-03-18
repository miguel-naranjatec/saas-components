class UIContextMenu extends HTMLElement {

	#version = "0.0.1";
	#styles = new CSSStyleSheet();
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
		return ["target", "variant"];
	}

	connectedCallback() {
		document.addEventListener("click", this.handleOutsideClick);
		this.handleScroll = () => { this.setAttribute("open", "false"); };
		window.addEventListener('scroll', this.handleScroll);
		window.addEventListener('resize', this.handleScroll);
		this.setTargetListener();
	}

	disconnectedCallback() {
		document.removeEventListener("click", this.handleOutsideClick);
		window.removeEventListener('scroll', this.handleScroll);
		window.removeEventListener('resize', this.handleScroll);
		this.removeTargetListener();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "target") {
			this.removeTargetListener();
			this.setTargetListener();
		}
		if (name == 'variant' && this.#variants.includes(newValue)) {
			this.#variant = newValue;
		}
		this.render();
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
		this.showMenu(event.pageX - window.pageXOffset , event.pageY - window.pageYOffset);
	}

	showMenu(x, y) {
		this.style.left = `${x}px`;
		this.style.top = `${y}px`;
		this.setAttribute("open", "true");
	}

	render() {

		this.#styles.replaceSync(`
			:host {
				position: fixed;
				top: 0;
				left: 0;
				font: var(--context-menu-${this.#variant}-font);
				padding: var(--context-menu-${this.#variant}-padding);
				background: var(--context-menu-${this.#variant}-background);
				color: var(--context-menu-${this.#variant}-color);
				border: var(--context-menu-${this.#variant}-border);
				border-radius: var(--context-menu-${this.#variant}-border-radius);
				outline: var(--context-menu-${this.#variant}-outline);
				outline-offset: var(--context-menu-${this.#variant}-outline-offset);
				display: none;
				z-index: calc(var(--z-index-max) - 100);
			}
			:host([open="true"]) {
				display: flex;
				flex-direction: column;
				gap: var(--context-menu-${this.#variant}-gap);
			}
		`);

		this.shadowRoot.adoptedStyleSheets = [this.#styles];
		this.shadowRoot.innerHTML = `<slot></slot>`;
	}
}

customElements.define("ui-context-menu", UIContextMenu);
