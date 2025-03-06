class UiSpinner extends HTMLElement {

	#version = "0.0.1";
	#sizes = ["xs", "sm", "default", "lg", "xl"];
	#size = "default";
	#thicknesses = ["thinner", "thin", "default", "thick", "thicker"];
	#thickness = "default";
	#speeds = ["fast", "default", "slow"];
	#speed = "default";

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.render();
	}

	static get observedAttributes() {
		return ['size', 'thickness', 'speed'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'size' && this.#sizes.includes(newValue)) {
			this.#size = newValue;
		}
		if (name === 'thickness' && this.#thicknesses.includes(newValue)) {
			this.#thickness = newValue;
		}
		if (name === 'speed' && this.#speeds.includes(newValue)) {
			this.#speed = newValue;
		}
		this.render();
	}

	render() {
		this.shadowRoot.innerHTML = `
        <style>
			.spinner {
				width: var(--spiner-${size}-width);
				height: var(--spiner-${size}-width);
				border: var(--spinner-${thickness}-border-width) solid rgba(0, 0, 0, 0.1);
				border-top: var(--spinner-${thickness}-border-width) solid #000;
				border-radius: 50%;
				animation: spin var(--spinner-${speed}-duration) linear infinite;
			}
			@keyframes spin {
            	0% { transform: rotate(0deg); }
            	100% { transform: rotate(360deg); }
          	}
        </style>
        <div class="spinner"></div>
      `;
	}
}
customElements.define("ui-spinner", UiSpinner);
