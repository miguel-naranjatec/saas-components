class UIDropdownMenu extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.render();	
	}


	render() {
		this.shadowRoot.innerHTML = `
        <style>
		.dropdown-menu {
			padding: 24px;
			background-color: orange;
			display: inline-flex;
		}
        </style>
		<div class='dropdown-menu'><slot></slot></div>
      `;
	}

}

customElements.define('ui-dropdown-menu', UIDropdownMenu);