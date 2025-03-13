class UiYoutube extends HTMLElement {
	#version = "0.0.1";
	#styles = new CSSStyleSheet();
	#variants = ['default'];
	#variant = 'default';
	#iframe;
	#settings = {
		autoplay: 0,
		controls: 0,
		cc_load_policy: 1,
		disablekb: 1,
		enablejsapi: 0,
		fs: 1,
		iv_load_policy: 1,
		loop: 0,
		modestbranding: 1,
		playsinline: 1,
		rel: 0,
		showinfo: 0,
		cc_lang_pref: document.documentElement.lang,
		hl: document.documentElement.lang
	};

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	static get observedAttributes() {
		return ['variant', 'src', 'autoplay', 'controls', 'cc_load_policy', 'disablekb', 'enablejsapi', 'fs', 'iv_load_policy', 'loop', 'modestbranding', 'playsinline', 'rel', 'showinfo'];
	}
	
	connectedCallback() {
		this.render();
	}
	
	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'variant' && this.#variants.includes(newValue)) {
			this.#variant = newValue;
		}
		if (name == 'src') {
			this.#iframe = this.getIframe(newValue);
		}
		if ( Object.keys(this.#settings).includes(name)) {
			this.#settings[ name ] = newValue;
		}
		this.render();
	}

	#parseId(url) {
		const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    	const match = url.match(regExp);
    	return ((match&&match[7].length==11)? match[7] : false);
	}

	getIframe(url) {
		let id = this.#parseId(url);
		let iframe = null;
		if (id) {
			iframe = `<iframe src='https://www.youtube.com/embed/${id}?${ new URLSearchParams(this.#settings) }' allowfullscreen ></iframe>`;
		}
		return iframe;
	}

	render() {
		this.#styles.replaceSync(`
			:host{
				overflow: hidden;
				display: block;
				border-radius: var(--youtube-${this.#variant}-border-radius);
				outline: var(--youtube-${this.#variant}-outline);
				box-shadow: var(--youtube-${this.#variant}-box-shadow);
				
			}
			:host > #youtube{
				position: relative;
				display: flex;
				aspect-ratio: 16 / 9;
				background-color: var(--color-surface-dark);	
			}
			:host > #youtube > iframe {
				display: flex;
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				border: none;
			}
		`);
		this.shadowRoot.adoptedStyleSheets = [this.#styles];
		this.shadowRoot.innerHTML = `
        <div id='youtube'>
			${this.#iframe}
        </div>
        `;
	}
}

customElements.define('ui-youtube', UiYoutube);

