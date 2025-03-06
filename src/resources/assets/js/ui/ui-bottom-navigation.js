class UiBottomNavigation extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.items = []; // Array para almacenar los íconos y nombres de las secciones
		this.currentIndex = 0; // Índice del ítem seleccionado
	}

	connectedCallback() {
		this.render();
	}

	static get observedAttributes() {
		return ['items', 'current-index'];
	}

	// Método para actualizar cuando cambian los atributos
	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'current-index') {
			this.currentIndex = parseInt(newValue, 10);
			this.render();
		}
	}

	// Método para renderizar el Bottom Navigation
	render() {
		// Obtener los elementos de la barra de navegación desde el atributo `items`
		this.items = this.getAttribute('items') ? JSON.parse(this.getAttribute('items')) : [];
		const navItemsHtml = this.items.map((item, index) => {
			const isActive = index === this.currentIndex;
			return `
          <div class="nav-item ${isActive ? 'active' : ''}" data-index="${index}">
            <span class="label">${item.label}</span>
          </div>
        `;
		}).join('');

		// Estilos y estructura del componente
		this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            border-top: 1px solid #ddd;
            z-index: 1000;
          }
			  
          .nav-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 16px;
            background-color: #f8f8f8;
          }
  
          .nav-item {
            text-align: center;
            flex: 1;
            padding: 8px;
            cursor: pointer;
          }
  
          .nav-item.active .icon {
            color: #2196f3;
          }
  
          .nav-item .icon {
            font-size: 24px;
            display: block;
            margin-bottom: 4px;
          }
  
          .nav-item .label {
            font-size: 12px;
            color: #666;
          }
  
          .nav-item:hover .icon {
            color: #2196f3;
          }
        </style>
        <div class="nav-container">
          ${navItemsHtml}
        </div>
      `;

		// Agregar eventos a los elementos de navegación
		this.shadowRoot.querySelectorAll('.nav-item').forEach(item => {
			item.addEventListener('click', (e) => {
				const index = parseInt(e.target.closest('.nav-item').getAttribute('data-index'));
				this.setAttribute('current-index', index);
				this.dispatchEvent(new CustomEvent('nav-item-selected', { detail: { index } }));
			});
		});
	}
}


customElements.define('ui-bottom-navigation', UiBottomNavigation);
