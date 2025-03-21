class UiExpandable extends HTMLElement {

    // TODO back to size
	// TODO animate size

	#version = "0.0.1";
	#styles = new CSSStyleSheet();
	#expandable_element;
	#holder_element;
	#trigger_element;
	#open = false;
	#variants = ["default"];
	#variant = "default";




	#languages = {
		"en": {
			expand : 'Expand'		
		},
		"es": {
			expand: 'Expandir'
		}
	}
	#language = "en";

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		if (Object.keys(this.#languages).includes(document.documentElement.lang)) {
			this.#language = document.documentElement.lang;
		}
	}
	
	connectedCallback() {
		this.render();
		this.handleClick = (e) => {
			if (e.target.matches('#trigger')) {
				this.#expandable_element.setAttribute('open', 'true');
				this.#open = true;
				window.dispatchEvent(new Event('resize'));
			}
		};

		this.shadowRoot.addEventListener('click', this.handleClick);
		this.handleResize = () => {
			if (!this.#open){ this.#updateSizes(); }
		};
		window.addEventListener('resize', this.handleResize);
		window.addEventListener('scroll', this.handleResize);
		this.handleResize();	

	}
	
	static get observedAttributes() {
		return ['variant', 'language'];
	}


	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'variant' && this.#variants.includes(newValue)) {
			this.#variant = newValue;
		}
		if (name == 'language' && this.#languages.includes(newValue)) {
			this.#language = newValue;
		}
		this.render();
	}


	#updateSizes(){	
		const bounds_expandable = this.#expandable_element.getBoundingClientRect();
		const bounds_holder = this.#holder_element.getBoundingClientRect();
		if (bounds_holder.height > bounds_expandable.height){
			this.#expandable_element.setAttribute('need-expand', 'true');
		} else{
			this.#expandable_element.setAttribute('need-expand', 'false');
		}
	}

	render() {
		this.#styles.replaceSync(`
			:host{
			}
            #expandable {
				overflow: hidden;
				height: 20vh;
				min-height: 128px;
				position: relative;
            }
			#expandable[open]{
				height: auto;
			}

		 	#expandable:not([open])[need-expand=true] {
			 	mask-image: linear-gradient(to top, transparent 32px, white 128px);
			}
			#trigger {
				text-align: center;
				margin: 0 auto;
			}

			#expandable[open] + #trigger{
			display: none;}

		`);
		this.shadowRoot.adoptedStyleSheets = [this.#styles];
		this.shadowRoot.innerHTML = `
        <div id='expandable' need-expand='false'>
			<div id='holder'><slot></slot></div>
        </div>
		
		<ui-button size='sm' variant='outlined' id='trigger'>${this.#languages[this.#language].expand}</ui-button>`;

		this.#expandable_element = this.shadowRoot.querySelector('#expandable');
		this.#holder_element = this.shadowRoot.querySelector('#holder');
		
	}
}

customElements.define('ui-expandable', UiExpandable);