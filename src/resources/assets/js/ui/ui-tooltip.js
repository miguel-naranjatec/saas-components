class UiTooltip extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
     
        this.position = 'top';
        this.delay = 300;
        this.showTimeout = null;
        this.hideTimeout = null;
    }

    static get observedAttributes() {
        return ['content', 'position', 'delay', 'variant', 'size'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'delay') {
            this.delay = parseInt(newValue, 10);
        }
        this.render();
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    render() {
        const content = this.getAttribute("content") || null;
        const variant = ["default"].includes(this.getAttribute("variant")) || "default";
        const position = ["top", "bottom", "left", "right"].includes(this.getAttribute("position")) || "top";

        this.shadowRoot.innerHTML = `
        <style>
          .tooltip-container {
            position: relative;
            display: inline-block;
          }
  
          .tooltip {
            position: absolute;
            visibility: hidden;
            background-color: var(--tooltip-variant-${variant}-background);
            color: var(--tooltip-variant-${variant}-color);
            text-align: center;
            border-radius: 4px;
            padding: 8px;
            font-size: 12px;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
          }
  
          .tooltip.show {
            visibility: visible;
            opacity: 1;
          }
          .tooltip.top {
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            margin-bottom: 8px;
          }
          .tooltip.bottom {
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            margin-top: 8px;
          }
          .tooltip.left {
            top: 50%;
            right: 100%;
            transform: translateY(-50%);
            margin-right: 8px;
          }
          .tooltip.right {
            top: 50%;
            left: 100%;
            transform: translateY(-50%);
            margin-left: 8px;
          }
        </style>
        <div class="tooltip-container">
          <slot></slot>
          <div class="tooltip ${position}">${content}</div>
        </div>
      `;
    }

    addEventListeners() {
        const tooltip = this.shadowRoot.querySelector('.tooltip');
        const tooltipContainer = this.shadowRoot.querySelector('.tooltip-container');

        tooltipContainer.addEventListener('mouseenter', () => {
            if (this.showTimeout) clearTimeout(this.showTimeout);
            this.showTimeout = setTimeout(() => {
                tooltip.classList.add('show');
            }, this.delay);
        });

        tooltipContainer.addEventListener('mouseleave', () => {
            if (this.hideTimeout) clearTimeout(this.hideTimeout);
            this.hideTimeout = setTimeout(() => {
                tooltip.classList.remove('show');
            }, 100);
        });
    }
}

customElements.define('ui-tooltip', UiTooltip);
