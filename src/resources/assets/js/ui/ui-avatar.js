class UiAvatar extends HTMLElement {

	#version = "0.0.1";
	#styles = new CSSStyleSheet();
	#variants = ['default', 'rounded'];
	#variant = 'default';
	#sizes = ['default', 'xs', 'sm', 'lg', 'xl'];
	#size = 'default';
	#name;
	#src;

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.render();
	}

	static get observedAttributes() {
		return ["variant", "size", "name", "src"];
	}
	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'variant' && this.#variants.includes(newValue)) {
			this.#variant = newValue;
		}
		if (name == 'size' && this.#sizes.includes(newValue)) {
			this.#size = newValue;
		}
		if (name == 'name') {
			this.#name = newValue;
		}
		if (name == 'src') {
			this.#src = this.generatePicture(newValue);
		}
		this.render();
	}

	generatePicture(src) {
		return `<picture><img loading='lazy' src='${src}' /></picture>`;
	}

	generateName() {
		return (!this.#name) ? `<ui-material-symbol size='${this.#size}' icon='person'></ui-symbol-icon>` : (this.#name.match(/\b\w/g) || []).slice(0, 2).join("").toUpperCase();
	}


	stringToColour(str) {
		if (!str) {
			return `var(--color-primary)` 
		}
		let hash = 0;
		str.split('').forEach(char => {
			hash = char.charCodeAt(0) + ((hash << 5) - hash)
		})
		let colour = '#'
		for (let i = 0; i < 3; i++) {
			const value = (hash >> (i * 8)) & 0xff
			colour += value.toString(16).padStart(2, '0')
		}
		return colour
	}

	render() {
		this.#styles.replaceSync(`
			:host {
				display: inline-flex;

				--custom-color: ${ this.stringToColour(this.#name) };
			}
			#avatar{
				background-color: var(--color-surface-dark);



				background: hsl(from var(--custom-color) h s calc(l));
				color: hsl(from var(--custom-color) h s calc(l + 50));
		
				display: inline-flex;
				align-items: center;
				justify-content: center;
				aspect-ratio: 1;
				width: var(--avatar-${this.#size}-width);
				border-radius: var(--avatar-${this.#variant}-border-radius);
				line-height: 1;
				font: var(--font-label);
				font-size: var(--avatar-${this.#size}-font-size);
				letter-spacing: var(--avatar-${this.#size}-letter-spacing);
				text-align: center;
				user-select: none;
				overflow: hidden;
			}
			#avatar > picture{
				display: flex;
				width: var(--avatar-${this.#size}-width);
				height: var(--avatar-${this.#size}-width);
			}
			#avatar > picture > img{
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		`);
		this.shadowRoot.adoptedStyleSheets = [this.#styles];
		this.shadowRoot.innerHTML = `<div id='avatar'>${(this.#src) ?? this.generateName()}</div>
      `;
	}
}
customElements.define("ui-avatar", UiAvatar);
