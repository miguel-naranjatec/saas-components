import reset from '../reset'

class UiInput extends HTMLElement {

	#version = "0.0.1";
	#styles = new CSSStyleSheet();
	#variants = ['default'];
	#variant = 'default';
	#sizes = ['sm', 'default', 'lg'];
	#size = 'default';
	#types = ['text', 'password', 'date', 'datetime', 'email', 'number', 'tel', 'time', 'url', 'week'];
	#type = 'text';
	#inline = false;
	#name;
	#required;
	#disabled;
	#placeholder;
	#pattern = false;
	#readonly = false;
	#maxlength = 255;
	#minlength = false;
	#spellcheck = false;
	#label;
	#caption;
	#labelPlacements = ['top', 'bottom', 'left', 'right'];
	#labelPlacement = 'top';
	#inputPrefix;
	#inputSufix;
	#shadow;
	constructor() {
		super();
		this.#shadow = this.attachShadow({ mode: "open", delegatesFocus: true});
		this.internals = this.attachInternals();
	}

	static get observedAttributes() {
		return [
			'variant',
			'size',
			'required',
			'disabled',
			'label',
			'label-placement',
			'caption',
			'type',
			'name',
			'placeholder',
			'pattern',
			'readonly',
			'maxlength',
			'minlength',
			'input-prefix',
			'input-sufix',
			'inline'
		];
	}
	
	connectedCallback() {
		this.render();
		this.addEventListener('focus', (e) => {
			this.shadowRoot.querySelector('#input').classList.add('focus');
		});
		this.addEventListener('focusout', (e) => {
			this.shadowRoot.querySelector('#input').classList.remove('focus');
		});
	}
	
	static get formAssociated() {
		return true;
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'variant' && this.#variants.includes(newValue)) {
			this.#variant = newValue;
		}
		if (name == 'size' && this.#sizes.includes(newValue)) {
			this.#size = newValue;
		}
		if (name == 'type' && this.#types.includes(newValue)) {
			this.#type = newValue;
		}
		if (name == 'label') {
			this.#label = newValue;
		}
		if (name == 'label-placement' && this.#labelPlacements.includes(newValue)) {
			this.#labelPlacement = newValue;
		}
		if (name == 'name') {
			this.#name = newValue;
		}
		if (name == 'placeholder') {
			this.#placeholder = newValue;
		}
		if (name == 'disabled') {
			this.#disabled = newValue;
		}
		if (name == 'spellcheck') {
			this.#spellcheck = this.hasAttribute('spellcheck');
		}
		if (name == 'input-prefix') {
			this.#inputPrefix = newValue;
		}
		if (name == 'input-sufix') {
			this.#inputSufix = newValue;
		}

		if (name == 'inline') {
			this.#inline = this.hasAttribute('inline');
		}

		this.render();
	}
	
	render() {
		this.#styles.replaceSync(`
			:host{	
				display: ${ (this.#inline) ? 'inline-flex' : 'flex' };
				width: 100%;
				align-items: center;
				gap: var(--gap-sm);
			}

			#holder{
				display: flex;
				width: 100%;
				flex-direction: column;
				gap: var(--gap-xs);
			}

			#input {
				display: flex;
				align-items: stretch;
				width: 100%;
				background: var(--input-${this.#variant}-background);
				color: var(--input-${this.#variant}-color);
				border: var(--input-${this.#variant}-border);
				outline: var(--input-${this.#variant}-outline);
				outline-offset: var(--input-${this.#variant}-outline-offset);
				outline-width: var(--input-${this.#size}-outline-width);
				border-radius: var(--input-${this.#size}-border-radius);
				overflow: hidden;
			}

			#input > label{
				display: flex;
				align-items: center;
				padding: var(--input-${this.#size}-padding);
			}

			#input.focus{
				background: var(--input-${this.#variant}-focus-background);
				color: var(--input-${this.#variant}-focus-color);
				border: var(--input-${this.#variant}-focus-border);
				outline: var(--input-${this.#variant}-focus-outline);
				outline-width: var(--input-${this.#size}-outline-width);
			}

			#holder > label{
				display: flex;
				white-space: nowrap;
				font: var(--font-label);
				text-transform: var(--font-label-text-transform);
			}

			#input > input {
				width: 100%;
				font: var(--input-${this.#size}-font);
				padding: var(--input-${this.#size}-padding);
				background: transparent;
				border: none;
				outline: none;
				position: relative;
				z-index: 2;
				flex-grow: 1;
			}
			#input > input::placeholder {
				color: var(--input-${this.#variant}-placeholder-color);
			}
		`);
		this.shadowRoot.adoptedStyleSheets = [this.#styles, reset];

		const for_attr = (this.#name) ? `for='input-${ this.#name }'` : ``;
		const id_attr = (this.#name) ? `id='input-${ this.#name }'` : ``;
		const label_left = (this.#label && this.#labelPlacement == 'left') ? `<label ${for_attr} >${this.#label}</label>` : ``;
		const label_right = (this.#label && this.#labelPlacement == 'right') ? `<label ${for_attr} >${this.#label}</label>` : ``;
		const label_top = (this.#label && this.#labelPlacement == 'top') ? `<label ${for_attr} >${this.#label}</label>` : ``;
		const label_bottom = (this.#label && this.#labelPlacement == 'bottom') ? `<label ${for_attr} >${this.#label}</label>` : ``;
		const caption = (this.#caption) ? `<div class='caption' >${this.#label}</div>` : ``;
		const placeholder = (this.#placeholder) ? `placeholder='${ this.#placeholder }'` : ``;
		const name = (this.#name) ? `name='${ this.#name }'` : ``;
		const type = `type='${ this.#type }'`;
		const disabled = (this.#disabled) ? `disabled` : ``;
		const spellcheck = (this.#spellcheck) ? `spellcheck` : ``;
		const inputPrefix = (this.#inputPrefix) ? `<label ${for_attr} >${this.#inputPrefix}</label>` : ``;
		const inputSufix = (this.#inputSufix) ? `<label ${for_attr} >${this.#inputSufix}</label>` : ``;

		this.shadowRoot.innerHTML = `
			${label_left}
			<div id='holder'>
				<slot name='prepend'></slot>
				${label_top}
				${caption}
				<div id='input'>
					${inputPrefix}
					<input ${id_attr} ${name} ${placeholder} ${type} ${disabled} ${spellcheck} />
					${inputSufix}
				</div>
				${label_bottom}
				<slot name='info'></slot>
				<slot name='append'></slot>
			</div>
			${label_right}
        `;

		
	}
}

customElements.define('ui-input', UiInput);

