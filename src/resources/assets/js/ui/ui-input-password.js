

class UiInputPassword extends HTMLElement {

	#version = "0.0.1";
	#styles = new CSSStyleSheet();
	#variants = ['default'];
	#variant = 'default';
	#sizes = ['sm', 'default', 'lg'];
	#size = 'default';
	
	#name;
	#required;
	#disabled;
	#placeholder;
	#pattern = false;
	#maxlength = 255;
	#label;
	#caption;
	#labelPlacements = ['top', 'bottom', 'left', 'right'];
	#labelPlacement = 'top';
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
			'input-sufix'
		];
	}
	
	connectedCallback() {
		this.render();

		
		
		
		

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
	
		this.render();
	}
	
	render() {
		this.#styles.replaceSync(`
			:host{	
				
			}
		`);
		this.shadowRoot.adoptedStyleSheets = [this.#styles];

		/*
		const for_attr = (this.#name) ? `for='input-${ this.#name }'` : ``;
		const id_attr = (this.#name) ? `id='input-${ this.#name }'` : ``;
		const label_left = (this.#label && this.#labelPlacement == 'left') ? `<label ${for_attr} >${this.#label}</label>` : ``;
		const label_right = (this.#label && this.#labelPlacement == 'right') ? `<label ${for_attr} >${this.#label}</label>` : ``;
		const label_top = (this.#label && this.#labelPlacement == 'top') ? `<label ${for_attr} >${this.#label}</label>` : ``;
		const label_bottom = (this.#label && this.#labelPlacement == 'bottom') ? `<label ${for_attr} >${this.#label}</label>` : ``;
		const caption = (this.#caption) ? `<div class='caption' >${this.#label}</div>` : ``;
		const placeholder = (this.#placeholder) ? `placeholder='${ this.#placeholder }'` : ``;
		const name = (this.#name) ? `name='${ this.#name }'` : ``;
		const disabled = (this.#disabled) ? `disabled` : ``;
		*/


		this.shadowRoot.innerHTML = `
			<ui-input 
				size='${this.#size}' 
				variant='${this.#variant}' 
				type='password' 
				label='Password'
				input-sufix='<ui-material-symbol size="${this.#size}" icon="visibility"></ui-material-symbol>'
			><ui-input>
        `;

	
		const input = this.shadowRoot.querySelector('ui-input');
		input.addEventListener('click', (e) => {
			if (e.explicitOriginalTarget.matches('ui-material-symbol')){
				if (input.getAttribute('type') == 'password') {
					input.setAttribute('type', 'text');
				} else {
					input.setAttribute('type', 'password');
				}
			}			
		});
	}
}

customElements.define('ui-input-password', UiInputPassword);

