class UIDropdown extends HTMLElement {

	#isOpen;
	#position = 'bottom';
	#positions = ['bottom', 'top', 'left', 'right'];
	#align = 'end';
	#aligns = ['start', 'center', 'end'];
	#elementTrigger;
	#elementDropdown;

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.dropdownTrigger;
		this.dropdown;
		document.addEventListener('click', (e) => {
			if (!this.contains(e.target) && this.#isOpen) {
				this.closeDropdown();
			}
		});
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
	}

	connectedCallback() {
		this.render();
		this.addEventListeners();
	}

	render() {
		this.shadowRoot.innerHTML = `
        <style>
		[dropdown] {
			opacity: .2;
		}
		[dropdown].open {
			opacity: 1;
		}
        </style>
		<div trigger>
			<slot name='trigger'></slot>
		</div>
		<div dropdown>
			<slot name='dropdown'></slot>
		</div>
      `;
	}

}

customElements.define('ui-dropdown', UIDropdown);