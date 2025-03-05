class UiDivider extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });

    }
  
    static get observedAttributes() {
      return ['orientation', 'thickness'];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      
      this.render();
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {


      const thickness = ["xs", "sm", "lg", "xl"].includes(this.getAttribute("orientation")) || "default";

      const orientation = ["vertical", "xs", "sm"].includes(this.getAttribute("orientation")) || "horizontal";
  
      this.shadowRoot.innerHTML = `
        <style>
          .divider {
            display: flex;
        
            background: pink;
            width: ${orientation === 'horizontal' ? '100%' : `var(--divider-thickness-${thickness})`};
            height: ${orientation === 'vertical' ? '100%' : `var(--divider-thickness-${thickness})`};
           
          }
        </style>
        <div class="divider"></div>
      `;
    }
  }
  
  customElements.define('ui-divider', UiDivider);