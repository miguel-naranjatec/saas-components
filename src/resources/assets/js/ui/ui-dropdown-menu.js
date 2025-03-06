class UIDropdownMenu extends HTMLElement {
	
	#version = "0.0.1";

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.render();	
	}

	render() {
		this.shadowRoot.innerHTML = `
        <style>
		:host{
			box-sizing: border-box;
		}
		.dropdown-menu {
		
			box-sizing: border-box;

			padding: 24px;
			outline: 1px solid #000;
			display: flex;
		}
        </style>
		<div class='dropdown-menu'><slot></slot></div>
      `;
	}

}

customElements.define('ui-dropdown-menu', UIDropdownMenu);