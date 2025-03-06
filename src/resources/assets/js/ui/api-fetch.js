class APIFetch extends HTMLElement {
	static get observedAttributes() {
		return ["url", "method", "body"];
	}

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.render();
	}

	connectedCallback() {
		this.fetchData();
	}

	attributeChangedCallback() {
		this.fetchData();
	}

	async fetchData() {
		const url = this.getAttribute("url");
		const method = this.getAttribute("method") || "GET";
		const body = this.getAttribute("body");

		if (!url) return;

		try {
			const options = {
				method,
				headers: { "Content-Type": "application/json" },
			};
			if (body && method !== "GET") {
				options.body = JSON.stringify(JSON.parse(body));
			}

			const response = await fetch(url, options);
			const data = await response.json();

			this.dispatchEvent(new CustomEvent("data-loaded", { detail: data }));
			this.renderData(data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}

	render() {
		this.shadowRoot.innerHTML = `
        <slot>Loading...</slot>
      `;
	}

	renderData(data) {
		this.shadowRoot.innerHTML = `
        <pre>${JSON.stringify(data, null, 2)}</pre>
      `;
	}
}

customElements.define("api-fetch", APIFetch);

/*
<api-fetch url="https://jsonplaceholder.typicode.com/posts/1"></api-fetch>

<script>
  document.querySelector("api-fetch").addEventListener("data-loaded", (event) => {
    console.log("Datos cargados:", event.detail);
  });
</script>


*/