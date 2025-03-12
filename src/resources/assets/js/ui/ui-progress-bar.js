class UiProgressBar extends HTMLElement {
	#version = "0.0.1";
	#styles = new CSSStyleSheet();
	#thicknesses = ["thinner", "thin", "default", "thick", "thicker"];
	#thickness = "default";
	#variants = ["default", "positive", "notice", "negative"];
	#variant = "default";
	#progress;

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.render();
	}

	static get observedAttributes() {
		return ['thickness', 'progress', 'variant'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'thickness' && this.#thicknesses.includes(newValue)) {
			this.#thickness = newValue;
		}
		if (name === 'variant' && this.#variants.includes(newValue)) {
			this.#variant = newValue;
		}
		if (name === 'progress' && this.between(newValue, 0, 100)) {
			this.#progress = newValue;
		}
		this.render();
	}

	between(value, min, max) {
		return value >= min && value <= max;
	}

	render() {
		this.#styles.replaceSync(`
			.progress-bar {
				display: flex;
				width: 100%;
				height: var(--progress-bar-${this.#thickness}-size);
				border-radius: var(--progress-bar-${this.#thickness}-size);
				background: var(--progress-bar-${this.#variant}-background);
				overflow: hidden;
			}
			.progress-bar > .track{
				height: var(--progress-bar-${this.#thickness}-size);
				background: var(--progress-bar-track-${this.#variant}-background);
				width: ${this.#progress}%;
			}
		`);
		this.shadowRoot.adoptedStyleSheets = [this.#styles];
		this.shadowRoot.innerHTML = `<ui-flex align='center'>
		<div class="progress-bar" role="progressbar"><span class='track'></span></div>
		<slot></slot>
		</ui-flex>`;
	}
}
customElements.define("ui-progress-bar", UiProgressBar);
