class UiTimeline extends HTMLElement {

    //TODO Check the nodes & generate the points


	#version = "0.0.1";
	#styles = new CSSStyleSheet();
	#placements = [
		'left',
		'right'
	]
	#placement = 'left';
	#variants = ["default"];
	#variant = 'default';
	

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		return ['variant', 'placement'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'placement' && this.#placements.includes(newValue)) {
			this.#placement = newValue;
		}
		if (name == 'variant' && this.#variants.includes(newValue)) {
			this.#variant = newValue;
		}
		this.render();
	}

	connectedCallback() {
		this.render();
	}

	disconnectedCallback() {
	}

	render() {
		this.#styles.replaceSync(`
		`);
		this.shadowRoot.adoptedStyleSheets = [this.#styles];
		this.shadowRoot.innerHTML = `<slot></slot>`;
	}
}

customElements.define('ui-timeline', UiTimeline);
