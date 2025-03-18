class UiAvatarStack extends HTMLElement {

	#version = "0.0.2";
	#styles = new CSSStyleSheet();
	#gaps = ["xs", "sm", "default", "lg", "xl"];
	#gap = "default";

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.render();
	}

	static get observedAttributes() {
		return ["gap"];
	}
	
	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'gap' && this.#gaps.includes(newValue)) {
			this.#gap = newValue;
		}
		this.render();
	}

	#getGap() {
		return (this.#gap == 'default') ? `` : `-${this.#gap}`;
	}
	
	render() {
		this.#styles.replaceSync(`
			:host {
				display: inline-flex;
			}
			::slotted(*) {
				margin-left: calc(0px - var(--gap${ this.#getGap() }));
			}
			::slotted(*:nth-child(1)) {
				margin-left: 0;
			}
		`);
		this.shadowRoot.adoptedStyleSheets = [this.#styles];
		this.shadowRoot.innerHTML = `<slot></slot>`;
	}
}
customElements.define("ui-avatar-stack", UiAvatarStack);
