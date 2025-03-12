class UiCoachmark extends HTMLElement {
	//https://opensource.adobe.com/spectrum-web-components/components/coachmark/
	

	// TODO save position in cache?

	#version = "0.0.2";
	#styles = new CSSStyleSheet();
	#variants = ['default'];
	#variant = 'default';
	#placements = [
		'top',
		'top-left', 'left-top',
		'top-right', 'right-top',
		'bottom',
		'bottom-left', 'left-bottom',
		'bottom-right', 'right-bottom',
		'right',
		'left'
	]
	#placement = 'bottom';
	#title;
	#step = 0;
	#active = false;
	#element = false;
	#languages = {
		"en": {
			previous: 'Previous',
			next: 'Next',
			skip: 'Skip'
		},
		"es": {
			previous: 'Anterior',
			next: 'Siguiente',
			skip: 'Omitir'
		}
	}
	#language = "en";

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		if (Object.keys(this.#languages).includes(document.documentElement.lang)) {
			this.#language = document.documentElement.lang;
		}
	}

	static get observedAttributes() {
		return ['variant', 'step', 'active', 'title', 'element', 'placement', 'language'];
	}

	connectedCallback() {
		this.render();
		this.handleResize = () => { this.#placementElement() };
		window.addEventListener('resize', this.handleResize);
		this.handleScroll = () => { this.#placementElement() };
		window.addEventListener('scroll', this.handleScroll);
		this.shadowRoot.addEventListener('click', (e) => {
			if (e.target.matches('[next]')) {
				this.#next();
				e.preventDefault();
			}

			if (e.target.matches('[previous]')) {
				this.#previous();
				e.preventDefault();
			}

			if (e.target.matches('[skip]')) {
				this.#skip();
				e.preventDefault();
			}
		});
	}

	#skip() {
		this.removeAttribute('active');
		this.dispatchEvent(new CustomEvent("skip"));
	}

	#next() {
		let items = Array.from(document.querySelectorAll('ui-coachmark[step]'))
			.sort(function (a, b) {
				return parseInt(a.getAttribute('step')) - parseInt(b.getAttribute('step'));
			}).filter((item) => {
				return (parseInt(item.getAttribute('step')) > this.#step);
			});

		if (items[0]){
			this.removeAttribute('active');
			items[0].setAttribute('active', 'true');
			this.dispatchEvent(new CustomEvent("change"));
		}
	}

	#previous () {
		let items = Array.from(document.querySelectorAll('ui-coachmark[step]'))
			.sort(function (a, b) {
				return parseInt(b.getAttribute('step')) - parseInt(a.getAttribute('step'));
			}).filter((item) => {
				return (parseInt(item.getAttribute('step')) < this.#step);
			});

		if (items[0]){
			this.removeAttribute('active');
			items[0].setAttribute('active', 'true');
			this.dispatchEvent(new CustomEvent("change"));
		}
	}

	disconnectedCallback() {
		window.removeEventListener('resize', this.handleResize);
		window.removeEventListener('scroll', this.handleScroll);
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'variation' && this.#variants.includes(newValue)) {
			this.#variant = newValue;
		}
		if (name == 'title') {
			this.#title = newValue;
		}
		if (name == 'step') {
			this.#step = newValue;
		}
		if (name == 'element') {
			this.#element = (document.querySelector(newValue)) ?? false;
		}
		if (name == 'placement' && this.#placements.includes(newValue)) {
			this.#placement = newValue;
		}
		if (name == 'language' && this.#languages.includes(newValue)) {
			this.#language = newValue;
		}
		if (name == 'active') {
			this.#active = this.hasAttribute('active');
		}
		this.render();
	}

	render() {

		if (!this.#active) {
			this.shadowRoot.innerHTML = ``;
			return;
		}

		this.#styles.replaceSync(`
			:host{
				position: fixed;
				z-index: 2147483647;
				display: inline-flex;
				padding: var(--gap);
			}
            #coachmark{
                display: inline-flex;
                flex-direction: column;
                gap: var(--gap);
                border: 1px solid #000;
                padding: var(--padding);
				background: var(--color-surface-lighter);
            }
		`);
		this.shadowRoot.adoptedStyleSheets = [this.#styles];
		const title = (this.#title) ? `${this.#title}` : '';
		this.shadowRoot.innerHTML = `
        <div id='coachmark' ${(this.#element) ? 'has-element' : ''}  >
            <slot name='media'></slot>
            <div>${title}</div>
            <slot></slot>
            <ui-flex>
				<ui-button previous >${this.#languages[this.#language].previous}</ui-button>
				<ui-button next >${this.#languages[this.#language].next}</ui-button>
				<ui-button skip >${this.#languages[this.#language].skip}</ui-button>
			</ui-flex>
        </div>
        `;

		this.#placementElement();
		setTimeout(function () { this.#placementElement(); }.bind(this), 100);
	}

	#placementElement() {
		const bounds_coachmark = this.getBoundingClientRect();
		const bounds = this.#element.getBoundingClientRect();
		let top, left;

		if (this.#placement == 'top') {
			top = bounds.y - bounds_coachmark.height;
			left = bounds.x + (bounds.width / 2) - (bounds_coachmark.width / 2);
		}

		if (['top-left', 'left-top'].includes(this.#placement)) {
			top = bounds.y - bounds_coachmark.height;
			left = bounds.x;
		}

		if (['top-right', 'right-top'].includes(this.#placement)) {
			top = bounds.y - bounds_coachmark.height;
			left = bounds.x + bounds.width - bounds_coachmark.width;
		}

		if (this.#placement == 'bottom') {
			top = bounds.top + bounds.height;
			left = bounds.left + (bounds.width / 2) - (bounds_coachmark.width / 2);
		}

		if (['bottom-left', 'left-bottom'].includes(this.#placement)) {
			top = bounds.top + bounds.height;
			left = bounds.left;
		}

		if (['bottom-right', 'right-bottom'].includes(this.#placement)) {
			top = bounds.top + bounds.height;
			left = bounds.left + bounds.width - bounds_coachmark.width;
		}

		if (this.#placement == 'left') {
			top = bounds.top + (bounds.height / 2) - (bounds_coachmark.height / 2);
			left = bounds.left;
		}

		if (this.#placement == 'right') {
			top = bounds.top + (bounds.height / 2) - (bounds_coachmark.height / 2);
			left = bounds.x + bounds.width - bounds_coachmark.width;
		}

		this.style.setProperty('top', `${top}px`);
		this.style.setProperty('left', `${left}px`);
	}
}

customElements.define('ui-coachmark', UiCoachmark);

