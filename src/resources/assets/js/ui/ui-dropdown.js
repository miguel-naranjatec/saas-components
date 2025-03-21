class UIDropdown extends HTMLElement {

	#version = "0.0.1";
	#styles = new CSSStyleSheet();
	#isOpen;
	#variants = ["default"];
	#variant = "default";
	#position = 'bottom';
	#positions = ['bottom', 'top', 'left', 'right'];
	#align = 'end';
	#aligns = ['start', 'center', 'end'];
	#elementTrigger;
	#elementDropdown;

	constructor() {
		super();
		this.attachShadow({ mode: "open" });	
		document.addEventListener('click', (e) => {
			if (!this.contains(e.target) && this.#isOpen) {
				this.closeDropdown();
			}
		});
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'position' && this.#positions.includes(newValue)) {
			this.#position = newValue;
		}

		if (name == 'align' && this.#aligns.includes(newValue)) {
			this.#align = newValue;
		}

		if (name == 'variant' && this.#variants.includes(newValue)) {
			this.#variant = newValue;
		}

		this.render();
		this.addEventListeners();
	}

	toggleDropdown() {
		this.#isOpen = !this.#isOpen;
		this.#elementDropdown.classList.toggle('open', this.#isOpen);
		this.#elementTrigger.setAttribute('aria-expanded', this.#isOpen);
	}

	closeDropdown() {
		this.#isOpen = false;
		this.#elementDropdown.classList.remove('open');
		this.#elementTrigger.setAttribute('aria-expanded', this.isOpen);
	}

	addEventListeners() {
		this.#elementTrigger = this.shadowRoot.querySelector('[trigger]');
		this.#elementDropdown = this.shadowRoot.querySelector('[dropdown]');
		this.#elementTrigger.addEventListener('click', () => {
			this.toggleDropdown();
		});
		/*
		this.#elementTrigger.addEventListener('contextmenu', (e) => {
			this.toggleDropdown();
			e.preventDefault();
		});
		*/


	}

	connectedCallback() {
		this.render();
		this.addEventListeners();
	}

	render() {

		this.#styles.replaceSync(`
			:host {
				position: relative;
			}	
			[dropdown] {
				position: absolute;
				display:none;
			}
			[dropdown].position-bottom{
				top: 100%;
			}
			[dropdown].position-top{
				top: 0;
				transform: translateY(-100%);
				background: blue;
			}
			[dropdown].position-left{
			}
			[dropdown].position-right{
			}
			[dropdown].open {
				display: flex;
				z-index: 10;
				background: pink;
				z-index: calc(var(--z-index-max) - 100);
			}
		`);

		this.shadowRoot.adoptedStyleSheets = [this.#styles];

		this.shadowRoot.innerHTML = `
		<slot trigger name='trigger'></slot>
		<div id='dropdown'>
			<slot dropdown name='dropdown' class='position-${this.#position}'></slot>
		</div>
		`;
	}

}

customElements.define('ui-dropdown', UIDropdown);