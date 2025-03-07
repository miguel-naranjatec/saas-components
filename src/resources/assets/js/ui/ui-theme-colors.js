class UiThemeColors extends HTMLElement {
	#version = "0.0.1";
	

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.render();
	}


	render() {
		this.shadowRoot.innerHTML = `
        <style>
		.grid{
			display: grid;
			grid-template-columns: repeat(5, 1fr);
		}
		
		.item{
			aspect-ratio: 3;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.item::before{
			content: attr(class);
		}

		.grid > .surface-lighter{
			background-color: var(--color-surface-lighter);
			color: var(--color-surface-lighter-contrast);
		}
		.grid > .surface-light{
			background-color: var(--color-surface-light);
			color: var(--color-surface-light-contrast);
		}
		.grid > .surface{
			background-color: var(--color-surface);
			color: var(--color-surface-contrast);
		}
		.grid > .surface-dark{
			background-color: var(--color-surface-dark);
			color: var(--color-surface-dark-contrast);

		}
		.grid > .surface-darker{
			background-color: var(--color-surface-darker);
			color: var(--color-surface-darker-contrast);
		}


		.grid > .surface-inverse-lighter{
			background-color: var(--color-surface-inverse-lighter);
			color: var(--color-surface-inverse-lighter-contrast);
		}
		.grid > .surface-inverse-light{
			background-color: var(--color-surface-inverse-light);
			color: var(--color-surface-inverse-light-contrast);
		}
		.grid > .surface-inverse{
			background-color: var(--color-surface-inverse);
			color: var(--color-surface-inverse-contrast);
		}
		.grid > .surface-inverse-dark{
			background-color: var(--color-surface-inverse-dark);
			color: var(--color-surface-inverse-dark-contrast);

		}
		.grid > .surface-inverse-darker{
			background-color: var(--color-surface-inverse-darker);
			color: var(--color-surface-inverse-darker-contrast);
		}



		.grid > .primary-lighter{
			background-color: var(--color-primary-lighter);
			color: var(--color-primary-lighter-contrast);
		}
		.grid > .primary-light{
			background-color: var(--color-primary-light);
			color: var(--color-primary-light-contrast);
		}
		.grid > .primary{
			background-color: var(--color-primary);
			color: var(--color-primary-contrast);
		}
		.grid > .primary-dark{
			background-color: var(--color-primary-dark);
			color: var(--color-primary-dark-contrast);

		}
		.grid > .primary-darker{
			background-color: var(--color-primary-darker);
			color: var(--color-primary-darker-contrast);
		}


		.grid > .secondary-lighter{
			background-color: var(--color-secondary-lighter);
			color: var(--color-secondary-lighter-contrast);
		}
		.grid > .secondary-light{
			background-color: var(--color-secondary-light);
			color: var(--color-secondary-light-contrast);
		}
		.grid > .secondary{
			background-color: var(--color-secondary);
			color: var(--color-secondary-contrast);
		}
		.grid > .secondary-dark{
			background-color: var(--color-secondary-dark);
			color: var(--color-secondary-dark-contrast);

		}
		.grid > .secondary-darker{
			background-color: var(--color-secondary-darker);
			color: var(--color-secondary-darker-contrast);
		}


		.grid > .tertiary-lighter{
			background-color: var(--color-tertiary-lighter);
			color: var(--color-tertiary-lighter-contrast);
		}
		.grid > .tertiary-light{
			background-color: var(--color-tertiary-light);
			color: var(--color-tertiary-light-contrast);
		}
		.grid > .tertiary{
			background-color: var(--color-tertiary);
			color: var(--color-tertiary-contrast);
		}
		.grid > .tertiary-dark{
			background-color: var(--color-tertiary-dark);
			color: var(--color-tertiary-dark-contrast);

		}
		.grid > .tertiary-darker{
			background-color: var(--color-tertiary-darker);
			color: var(--color-tertiary-darker-contrast);
		}

		.grid > .error-lighter{
			background-color: var(--color-error-lighter);
			color: var(--color-error-lighter-contrast);
		}
		.grid > .error-light{
			background-color: var(--color-error-light);
			color: var(--color-error-light-contrast);
		}
		.grid > .error{
			background-color: var(--color-error);
			color: var(--color-error-contrast);
		}
		.grid > .error-dark{
			background-color: var(--color-error-dark);
			color: var(--color-error-dark-contrast);

		}
		.grid > .error-darker{
			background-color: var(--color-error-darker);
			color: var(--color-error-darker-contrast);
		}


		.grid > .warning-lighter{
			background-color: var(--color-warning-lighter);
			color: var(--color-warning-lighter-contrast);
		}
		.grid > .warning-light{
			background-color: var(--color-warning-light);
			color: var(--color-warning-light-contrast);
		}
		.grid > .warning{
			background-color: var(--color-warning);
			color: var(--color-warning-contrast);
		}
		.grid > .warning-dark{
			background-color: var(--color-warning-dark);
			color: var(--color-warning-dark-contrast);

		}
		.grid > .warning-darker{
			background-color: var(--color-warning-darker);
			color: var(--color-warning-darker-contrast);
		}


		.grid > .info-lighter{
			background-color: var(--color-info-lighter);
			color: var(--color-info-lighter-contrast);
		}
		.grid > .info-light{
			background-color: var(--color-info-light);
			color: var(--color-info-light-contrast);
		}
		.grid > .info{
			background-color: var(--color-info);
			color: var(--color-info-contrast);
		}
		.grid > .info-dark{
			background-color: var(--color-info-dark);
			color: var(--color-info-dark-contrast);

		}
		.grid > .info-darker{
			background-color: var(--color-info-darker);
			color: var(--color-info-darker-contrast);
		}


		
		.grid > .success-lighter{
			background-color: var(--color-success-lighter);
			color: var(--color-success-lighter-contrast);
		}
		.grid > .success-light{
			background-color: var(--color-success-light);
			color: var(--color-success-light-contrast);
		}
		.grid > .success{
			background-color: var(--color-success);
			color: var(--color-success-contrast);
		}
		.grid > .success-dark{
			background-color: var(--color-success-dark);
			color: var(--color-success-dark-contrast);

		}
		.grid > .success-darker{
			background-color: var(--color-success-darker);
			color: var(--color-success-darker-contrast);
		}




        </style>
		<div class='grid'>

			<div class='item surface-lighter'></div>
			<div class='item surface-light'></div>
			<div class='item surface'></div>
			<div class='item surface-dark'></div>
			<div class='item surface-darker'></div>
			<div class='item surface-inverse-lighter'></div>
			<div class='item surface-inverse-light'></div>
			<div class='item surface-inverse'></div>
			<div class='item surface-inverse-dark'></div>
			<div class='item surface-inverse-darker'></div>
			<div class='item primary-lighter'></div>
			<div class='item primary-light'></div>
			<div class='item primary'></div>
			<div class='item primary-dark'></div>
			<div class='item primary-darker'></div>
			<div class='item secondary-lighter'></div>
			<div class='item secondary-light'></div>
			<div class='item secondary'></div>
			<div class='item secondary-dark'></div>
			<div class='item secondary-darker'></div>
			<div class='item tertiary-lighter'></div>
			<div class='item tertiary-light'></div>
			<div class='item tertiary'></div>
			<div class='item tertiary-dark'></div>
			<div class='item tertiary-darker'></div>
			<div class='item error-lighter'></div>
			<div class='item error-light'></div>
			<div class='item error'></div>
			<div class='item error-dark'></div>
			<div class='item error-darker'></div>
			<div class='item warning-lighter'></div>
			<div class='item warning-light'></div>
			<div class='item warning'></div>
			<div class='item warning-dark'></div>
			<div class='item warning-darker'></div>
			<div class='item info-lighter'></div>
			<div class='item info-light'></div>
			<div class='item info'></div>
			<div class='item info-dark'></div>
			<div class='item info-darker'></div>
			<div class='item success-lighter'></div>
			<div class='item success-light'></div>
			<div class='item success'></div>
			<div class='item success-dark'></div>
			<div class='item success-darker'></div>



		</div>
      `;
	}
}
customElements.define("ui-theme-colors", UiThemeColors);
