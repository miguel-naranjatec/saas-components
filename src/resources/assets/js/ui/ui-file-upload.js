class UIFileUpload extends HTMLElement {

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
          :host {
            display: block;
            border: 2px dashed #ccc;
            padding: 16px;
            text-align: center;
            cursor: pointer;
            font-family: Arial, sans-serif;
            border-radius: 8px;
            transition: border 0.3s ease;
          }
          :host(:hover) {
            border-color: #888;
          }
          input {
            display: none;
          }
          .label {
            color: #555;
          }
        </style>
        <div class="upload-area">
          <span class="label">Click o arrastra un archivo aquí</span>
          <input type="file" id="file-input">
        </div>
      `;

		this.fileInput = this.shadowRoot.querySelector("#file-input");
		this.uploadArea = this.shadowRoot.querySelector(".upload-area");

		this.uploadArea.addEventListener("click", () => this.fileInput.click());
		this.fileInput.addEventListener("change", (event) => this.handleFile(event));
		this.uploadArea.addEventListener("dragover", (event) => this.handleDragOver(event));
		this.uploadArea.addEventListener("drop", (event) => this.handleDrop(event));
	}

	handleFile(event) {
		const file = event.target.files[0];
		if (file) {
			this.dispatchEvent(new CustomEvent("file-selected", { detail: file }));
		}
	}

	handleDragOver(event) {
		event.preventDefault();
		event.dataTransfer.dropEffect = "copy";
	}

	handleDrop(event) {
		event.preventDefault();
		const file = event.dataTransfer.files[0];
		if (file) {
			this.dispatchEvent(new CustomEvent("file-selected", { detail: file }));
		}
	}
}

customElements.define("ui-file-upload", UIFileUpload);
