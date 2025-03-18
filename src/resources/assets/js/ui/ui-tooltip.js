class UiTooltip extends HTMLElement {
	#version = "0.0.2";
	#styles = new CSSStyleSheet();
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
	#placement = 'top';
	#variants = ["default"];
	#variant = 'default';
	#delay = 100;
	#content;
	#tooltip_element;
	#parent_element;
	#showTimeout = null;
	#hideTimeout = null;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		return ['content', 'delay', 'variant', 'placement'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'content') {
			this.#content = newValue;
		}
		if (name == 'placement' && this.#placements.includes(newValue)) {
			this.#placement = newValue;
		}
		if (name === 'delay') {
			this.#delay = parseInt(newValue, 10);
		}
		if (name == 'variant' && this.#variants.includes(newValue)) {
			this.#variant = newValue;
		}
		this.render();
	}

	connectedCallback() {
		this.render();
		this.handleResize = () => { this.#placementElement() };
		window.addEventListener('resize', this.handleResize);
		this.handleScroll = () => { this.#placementElement() };
		window.addEventListener('scroll', this.handleScroll);
		this.addEventListener('mouseenter', () => {
			if (this.#showTimeout) clearTimeout(this.#showTimeout);
			this.#showTimeout = setTimeout(() => {
				this.#tooltip_element.classList.add('show');
			}, this.#delay);
		});
		this.addEventListener('mouseleave', () => {
			if (this.#hideTimeout) clearTimeout(this.#hideTimeout);
			this.#hideTimeout = setTimeout(() => {
				this.#tooltip_element.classList.remove('show');
			}, this.#delay);
		});
	}

	disconnectedCallback() {
		window.removeEventListener('resize', this.handleResize);
		window.removeEventListener('scroll', this.handleScroll);
	}

	render() {
		this.#styles.replaceSync(`
			:host{
				display: inline-flex;
				align-items: center;
				justify-content: center;
			}
			#parent{
				display: inline-flex;	
			}
			#tooltip {
            	position: fixed;
				top: 0;
				left: 0;
            	background-color: var(--tooltip-${this.#variant}-background);
            	color: var(--tooltip-${this.#variant}-color);
            	padding: var(--tooltip-${this.#variant}-padding);
				border-radius: var(--tooltip-${this.#variant}-border-radius);
				font: var(--tooltip-${this.#variant}-font);
				text-transform: var(--tooltip-${this.#variant}-text-transform);

            	z-index: var(--z-index-max);
				opacity: 0;
				transition: opacity 0.3s ease;
				pointer-events:none;
				visibility: hidden;
          	}
			#tooltip.show {
				visibility: visible;
            	opacity: 1;
			}
		`);
		this.shadowRoot.adoptedStyleSheets = [this.#styles];
		this.shadowRoot.innerHTML = `<div id='parent'><slot></slot></div><div id='tooltip'>${this.#content}</div>`;
		this.#tooltip_element = this.shadowRoot.querySelector('#tooltip');
		this.#parent_element = this.shadowRoot.querySelector('#parent');
		this.#placementElement();
		setTimeout(function () { this.#placementElement(); }.bind(this), 100);
	}

	#placementElement() {
		const bounds_tooltip = this.#tooltip_element.getBoundingClientRect();
		const bounds = this.#parent_element.getBoundingClientRect();
		let top, left;
		if (this.#placement == 'top') {
			top = bounds.y - bounds_tooltip.height;
			left = bounds.x + (bounds.width / 2) - (bounds_tooltip.width / 2);
		}
		if (['top-left', 'left-top'].includes(this.#placement)) {
			top = bounds.y - bounds_tooltip.height;
			left = bounds.x - bounds_tooltip.width;
		}
		if (['top-right', 'right-top'].includes(this.#placement)) {
			top = bounds.y - bounds_tooltip.height;
			left = bounds.x + bounds.width;
		}
		if (this.#placement == 'bottom') {
			top = bounds.top + bounds.height;
			left = bounds.left + (bounds.width / 2) - (bounds_tooltip.width / 2);
		}
		if (['bottom-left', 'left-bottom'].includes(this.#placement)) {
			top = bounds.top + bounds.height;
			left = bounds.left - bounds_tooltip.width;
		}
		if (['bottom-right', 'right-bottom'].includes(this.#placement)) {
			top = bounds.top + bounds.height;
			left = bounds.left + bounds.width;
		}
		if (this.#placement == 'left') {
			top = bounds.top + (bounds.height / 2) - (bounds_tooltip.height / 2);
			left = bounds.left - bounds_tooltip.width;
		}
		if (this.#placement == 'right') {
			top = bounds.top + (bounds.height / 2) - (bounds_tooltip.height / 2);
			left = bounds.x + bounds.width;
		}
		this.#tooltip_element.style.setProperty('top', `${top}px`);
		this.#tooltip_element.style.setProperty('left', `${left}px`);
	}
}

customElements.define('ui-tooltip', UiTooltip);
