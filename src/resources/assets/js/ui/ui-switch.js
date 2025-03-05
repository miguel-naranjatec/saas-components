class UISwitch extends HTMLElement {
    static get observedAttributes() {
        return ["checked", "disabled"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.checked = this.hasAttribute("checked"); // Estado inicial
        this.disabled = this.hasAttribute("disabled");
        this.render();
    }

    connectedCallback() {
        this.shadowRoot.querySelector(".switch").addEventListener("click", () => this.toggleSwitch());
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "checked") {
            this.checked = this.hasAttribute("checked");
        }
        if (name === "disabled") {
            this.disabled = this.hasAttribute("disabled");
        }
        this.render();
    }

    toggleSwitch() {
        if (this.disabled) return;

        this.checked = !this.checked;
        this.setAttribute("checked", this.checked ? "" : null);
        this.dispatchEvent(new CustomEvent("change", { detail: { checked: this.checked } }));
        this.render();
    }

    render() {
        const switchColor = this.checked ? "var(--switch-active-color, #4caf50)" : "var(--switch-inactive-color, #ccc)";
        const handleColor = this.checked ? "var(--switch-handle-active, #fff)" : "var(--switch-handle-inactive, #fff)";
        const disabledOpacity = this.disabled ? "0.5" : "1";

        this.shadowRoot.innerHTML = `
        <style>
          .switch {
            width: 50px;
            height: 24px;
            background-color: ${switchColor};
            border-radius: 12px;
            display: flex;
            align-items: center;
            padding: 2px;
            cursor: ${this.disabled ? "not-allowed" : "pointer"};
            opacity: ${disabledOpacity};
            transition: background-color 0.3s ease;
          }
  
          .handle {
            width: 20px;
            height: 20px;
            background-color: ${handleColor};
            border-radius: 50%;
            transition: transform 0.3s ease;
            transform: translateX(${this.checked ? "26px" : "0px"});
          }
        </style>
        <div class="switch" role="switch" aria-checked="${this.checked}">
          <div class="handle"></div>
        </div>
      `;
    }
}

customElements.define("ui-switch", UISwitch);
