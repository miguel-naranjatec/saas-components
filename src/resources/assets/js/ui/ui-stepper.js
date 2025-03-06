class UiStepper extends HTMLElement {

    #version = "0.0.1";
    #currentStep = 0;
    #steps;
    #variants = ["default"];
	#variant = 'default';

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.steps = [];
        this.currentStep = 0;
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['steps', 'current-step', 'variation'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'steps') {
            this.#steps = this.getAttribute('steps') ? JSON.parse(this.getAttribute('steps')) : [];
        }
        if (name == 'current-step') {
            this.#currentStep = parseInt(newValue, 10);
        }
        if (name == 'variant' && this.#variants.includes(newValue)) {
            this.#variant = newValue;
        }
        this.render();
    }

    render() {
    
        const stepsHtml = this.#steps.map((step, index) => {
            const isActive = index === this.currentStep;
            const isCompleted = index < this.currentStep;
            return `<div class="step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}"><span class="step-title">${step}</span></div>`;
        }).join('');

        this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            font-family: Arial, sans-serif;
            padding: 16px;
          }
          .stepper-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .step {
            text-align: center;
            position: relative;
            flex: 1;
          }
          .step-number {
            display: block;
            font-size: 18px;
            font-weight: bold;
            background-color: #ccc;
            color: #fff;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            line-height: 32px;
            margin: 0 auto;
          }
          .step-title {
            font-size: 14px;
            color: #333;
          }
          
          .step:not(:last-child)::after {
            content: '';
            position: absolute;
            right: -10px;
            top: 50%;
            width: 20px;
            height: 2px;
            background-color: #9e9e9e;
            transform: translateY(-50%);
          }
          .step.completed::after {
            background-color: #4caf50;
          }
          .step.active::after {
            background-color: #2196f3;
          }
        </style>
        <div class="stepper-container">
          ${stepsHtml}
        </div>
      `;
    }


    nextStep() {
        if (this.currentStep < this.steps.length - 1) {
            this.setAttribute('current-step', this.currentStep + 1);
        }
    }

    
    prevStep() {
        if (this.currentStep > 0) {
            this.setAttribute('current-step', this.currentStep - 1);
        }
    }
}

customElements.define('ui-stepper', UiStepper);
