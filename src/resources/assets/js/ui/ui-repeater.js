class UiRepeater extends HTMLElement {

	#version = "0.0.1";
	#name = 'repeater';
	#languages = {
		"en": {
			add_row: 'Add row',
			delete_all: 'Delete all',
			delete_row: 'Delete row',
			down: 'Down',
			limit_reached: 'Limit reached',
			up: 'Up',
			there_is_nothing: 'There is nothing'
		},
		"es": {
			add_row: 'Añadir fila',
			delete_all: 'Borrar todo',
			down: 'Down',
			delete_row: 'Borrar fila',
			limit_reached: 'Límite alcanzado',
			up: 'Up',
			there_is_nothing: 'No hay nada'
		}
	}

	#language = "en";

	constructor() {
		super();
		const shadow = this.attachShadow({ mode: "open" });
		let styles = new CSSStyleSheet();
		styles.replaceSync(`
			:host {
   				display: flex;
   				flex-direction: column;
				position: relative;	
				background: var(--color-surface);
				padding: var(--padding-sm)
   			}
			#repeater-content[length="0"]{display:none;}
			#repeater-actions{
				margin-top: var(--gap-sm);
			}
			
			::slotted(.row),
			.row{
			border: 2px solid blue !important;
			padding: var(--padding);
			position: relative;
			}
			.hidden{
				display: none !important;
			}
			`)

		shadow.adoptedStyleSheets = [styles];
	}

	connectedCallback() {
		this.render();
		this.addListeners();
	}

	static get observedAttributes() {
		return ['language', 'name'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == "language" && Object.keys(this.#languages).includes(newValue)) {
			this.#language = newValue;
		}
		if (name == "name") {
			this.#name = newValue;
		}
		this.render();
		this.setIndexes();
	}

	addRow() {

		const slot = this.shadowRoot.querySelector('slot[name=template]');
		const elements = slot.assignedElements({ flatten: true });
		let template = this.#languages[this.#language].there_is_nothing;
		if (elements.length) {
			template = elements[0].innerHTML;
		}

		const row = document.createElement('div');
		row.classList.add('row');
		row.innerHTML = `${template}`;
		this.addRowActions(row);
		this.shadowRoot.querySelector('#repeater-content').append(row);
		this.setIndexes();
	}

	addRowActions( element ) {

		let actions = element.querySelector('[repeater-item-actions]');
        if (!actions) {
            let code = `<div repeater-item-actions>
                <a move-up href='javascript:;'>${this.#languages[this.#language].up}</a>
                <a move-down href='javascript:;'>${this.#languages[this.#language].down}</a>
                <a delete-row href='javascript:;'>${this.#languages[this.#language].delete_row}</a>
            </div>`;
            element.innerHTML += code;
			element.addEventListener('click', e => {
				if (e.target.matches('[delete-row]')){
					element.remove();
					e.preventDefault();
				}
				if (e.target.matches('[move-up]')){
					let node = e.target.closest('.row');
                	if (node.previousElementSibling) node.parentNode.insertBefore(node, node.previousElementSibling);
                	this.setIndexes();
					e.preventDefault();
				}
				if (e.target.matches('[move-down]')){
					let node = e.target.closest('.row');
                	if (node.nextElementSibling) node.parentNode.insertBefore(node.nextElementSibling, node);
                	this.setIndexes();
					e.preventDefault();
				}
			})
        }
	}

	deleteAll() {
		const elements = this.shadowRoot.querySelectorAll('#repeater-content .row');
		elements.forEach((element) => {
			element.remove();
		});
		this.setIndexes();
	}


	addListeners() {
		this.shadowRoot.addEventListener('click', (e) => {
			if (e.target.matches('[add-row]')) {
				this.addRow();
				e.preventDefault();
			}
			if (e.target.matches('[delete-all]')) {
				this.deleteAll();
				e.preventDefault();
			}
		});

		const elements = this.shadowRoot.querySelector('#repeater-content slot').assignedElements({ flatten: true });
		if (elements.length) {

			elements.forEach(element => {
				element.classList.add('row');
				this.addRowActions(element);
				this.shadowRoot.querySelector('#repeater-content').appendChild(element);
			});

			this.setIndexes();
		}
	}

	setIndexes() {

		let rows = this.shadowRoot.querySelectorAll('#repeater-content > .row');
		this.shadowRoot.querySelector('#repeater-content').setAttribute('length', rows.length )
        rows.forEach((row, index) => {
            let inputs = row.querySelectorAll('[name]');
            inputs.forEach((input) => {
                let attrName = input.getAttribute('name');
                let matches = attrName.match(/\[[^\]]+\]/g);
                let name = (matches) ? matches.pop().replace(/\[|\]/g, '') : attrName;
                let newName = `${this.#name}[${index}][${name}]`;
                newName += (input.type == 'checkbox' || input.hasAttribute('multiple')) ? '[]' : '';
                input.setAttribute('name', newName);
            });
        });
		
    }


	render() {
		this.shadowRoot.innerHTML = `
		<div class='hidden'>
			<slot name='template'></slot>
		</div>
		<ui-flex  direction='column'>
			<ui-flex id='repeater-content' direction='column'>
				<slot></slot>
			</ui-flex>
			<ui-button-group id='repeater-actions'>
				<ui-button delete-all>${this.#languages[this.#language].delete_all}</ui-button>
				<ui-button add-row>${this.#languages[this.#language].add_row}</ui-button>
			</ui-button-group>
		</ui-flex>
      `;
	}
}

customElements.define("ui-repeater", UiRepeater);
