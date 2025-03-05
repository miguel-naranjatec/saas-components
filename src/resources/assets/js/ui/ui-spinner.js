class UiSpinner extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.render();
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          .spinner {
            width: 24px;
            height: 24px;
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-top: 4px solid #000;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
        <div class="spinner"></div>
      `;
    }
  }
  customElements.define("ui-spinner", UiSpinner);
  