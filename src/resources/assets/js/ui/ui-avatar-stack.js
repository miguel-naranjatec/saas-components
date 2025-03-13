class UiAvatarStack extends HTMLElement {
	#version = "0.0.1";

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.render();
	}

	static get observedAttributes() {
		return ["variant", "size", "name"];
	}
	attributeChangedCallback(name, oldValue, newValue) {

		
		this.render();
	}


	render() {
		this.shadowRoot.innerHTML = `
        <style>

		:host {
			display: inline-flex;
		}

		::slotted(*:nth-last-child(n)) {		
			display: none;
		}

		::slotted(*:nth-last-child(-n + 5)) {
			display: inline-flex;
			filter: brightness(.6);
		}

		::slotted(*:nth-last-child(-n + 4)) {
			display: inline-flex;
			transform: translateX(-50%);
			filter: brightness(.7);
		}

		::slotted(*:nth-last-child(-n + 3)) {
			display: inline-flex;
			transform: translateX(-100%);
			filter: brightness(.8);
		}

		::slotted(*:nth-last-child(-n + 2)) {
			display: inline-flex;
			transform: translateX(-150%);
			filter: brightness(.9);
		}

		::slotted(*:nth-last-child(-n + 1)) {
			display: inline-flex;
			transform: translateX(-200%);
			filter: brightness(1);
		}


		:host:hover {
			background-color: pink;
		}


        </style>
		<slot></slot>
      `;
	}
}
customElements.define("ui-avatar-stack", UiAvatarStack);
