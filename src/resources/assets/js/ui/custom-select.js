class CustomSelect extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.options = JSON.parse(this.getAttribute("options") || "[]");
        this.multiple = this.hasAttribute("multiple");
        this.selectedValues = [];
        this.focusedIndex = -1;
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host { display: block; position: relative; width: 200px; }
                .select-container { border: 1px solid pink; padding: 5px; cursor: pointer; }
                .dropdown { display: none; position: absolute; width: 100%; border: 1px solid #ccc; background: white; max-height: 150px; overflow-y: auto; }
                .option { padding: 5px; cursor: pointer; }
                .option:hover, .option.focused { background: #f0f0f0; }
                .selected { font-weight: bold; }
                input { width: 100%; box-sizing: border-box; }
                .selected-values { display: flex; flex-wrap: wrap; gap: 5px; }
                .tag { background: #ddd; padding: 3px 5px; border-radius: 3px; display: flex; align-items: center; }
                .remove { margin-left: 5px; cursor: pointer; color: red; }
            </style>
            <div class="select-container" tabindex="0">
                <div class="selected-values">Select...</div>
            </div>
            <div class="dropdown">
                <input type="text" placeholder="Search...">
                <div class="options"></div>
            </div>
        `;

        this.selectContainer = this.shadowRoot.querySelector(".select-container");
        this.dropdown = this.shadowRoot.querySelector(".dropdown");
        this.optionsContainer = this.shadowRoot.querySelector(".options");
        this.input = this.shadowRoot.querySelector("input");
        this.selectedDisplay = this.shadowRoot.querySelector(".selected-values");

        this.selectContainer.addEventListener("click", () => this.toggleDropdown());
        this.input.addEventListener("input", (e) => this.filterOptions(e.target.value));
        this.selectContainer.addEventListener("keydown", (e) => this.handleKeyboard(e));

        this.renderOptions();
    }

    renderOptions() {
        this.optionsContainer.innerHTML = "";
        this.options.forEach((option, index) => {
            const div = document.createElement("div");
            div.classList.add("option");
            div.textContent = option.label;
            div.dataset.value = option.value;
            div.dataset.index = index;
            div.setAttribute("tabindex", "0");
            div.addEventListener("click", () => this.selectOption(option));
            this.optionsContainer.appendChild(div);
        });
    }

    toggleDropdown() {
        const isOpen = this.dropdown.style.display === "block";
        this.dropdown.style.display = isOpen ? "none" : "block";
        if (!isOpen) {
            this.input.focus();
            this.focusedIndex = -1;
        }
    }

    filterOptions(query) {
        const options = this.shadowRoot.querySelectorAll(".option");
        options.forEach(option => {
            option.style.display = option.textContent.toLowerCase().includes(query.toLowerCase()) ? "block" : "none";
        });
    }

    handleKeyboard(event) {
        const options = [...this.shadowRoot.querySelectorAll(".option")];
        if (event.key === "ArrowDown") {
            this.focusedIndex = (this.focusedIndex + 1) % options.length;
        } else if (event.key === "ArrowUp") {
            this.focusedIndex = (this.focusedIndex - 1 + options.length) % options.length;
        } else if (event.key === "Enter" && this.focusedIndex >= 0) {
            options[this.focusedIndex].click();
        } else if (event.key === "Escape") {
            this.toggleDropdown();
        }

        options.forEach((opt, idx) => {
            opt.classList.toggle("focused", idx === this.focusedIndex);
        });
    }

    selectOption(option) {
        if (this.multiple) {
            if (!this.selectedValues.includes(option.value)) {
                this.selectedValues.push(option.value);
            }
        } else {
            this.selectedValues = [option.value];
            this.toggleDropdown();
        }
        this.updateDisplay();
        this.dispatchEvent(new CustomEvent("change", { detail: this.selectedValues }));
    }

    removeOption(value) {
        this.selectedValues = this.selectedValues.filter(val => val !== value);
        this.updateDisplay();
        this.dispatchEvent(new CustomEvent("change", { detail: this.selectedValues }));
    }

    updateDisplay() {
        this.selectedDisplay.innerHTML = "";
        if (this.selectedValues.length === 0) {
            this.selectedDisplay.textContent = "Select...";
        } else {
            this.selectedValues.forEach(value => {
                const option = this.options.find(opt => opt.value === value);
                if (option) {
                    const tag = document.createElement("span");
                    tag.classList.add("tag");
                    tag.textContent = option.label;
                    
                    const removeBtn = document.createElement("span");
                    removeBtn.classList.add("remove");
                    removeBtn.textContent = "×";
                    removeBtn.addEventListener("click", (e) => {
                        e.stopPropagation();
                        this.removeOption(option.value);
                    });
                    
                    tag.appendChild(removeBtn);
                    this.selectedDisplay.appendChild(tag);
                }
            });
        }
    }
}

customElements.define("custom-select", CustomSelect);