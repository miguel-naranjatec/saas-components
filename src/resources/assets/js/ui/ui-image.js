class UiImage extends HTMLElement {
	#version = "0.0.1";
	#styles = new CSSStyleSheet();
	#src;
	#srcSet;
	#fits = ['cover', 'contains'];
	#fit = 'cover';

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.render();
	}

	static get observedAttributes() {
		return [
			"src",
			"srcSet",
			"alt",
			"fit"
		];
	}
	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'src' ) {
			this.#src = newValue;
		}
		if (name == 'srcSet' ) {
			this.#srcSet = newValue;
		}
		if (name == 'fit' ) {
			this.#fit = newValue;
		}
		this.render();
	}

	render() {
		this.#styles.replaceSync(`
			:host{
				display: flex;
			}
			picture{
				border: 2px solid #000;
				display: flex;
				width: 100%;
			}
			picture > img{
				width: 100%;
				height: 100%;
				object-fit: ${this.#fit};
			}
		`);
		this.shadowRoot.adoptedStyleSheets = [this.#styles];
		this.shadowRoot.innerHTML = `
		<picture>
			<img src='${this.#src}' />
		</picture>
      `;
	}
}
customElements.define("ui-image", UiImage);
