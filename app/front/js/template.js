document.addEventListener("DOMContentLoaded", () => {
    // Cargar navegación en todas las páginas
    fetch("../index.html")
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const header = doc.querySelector("header");
            const footer = doc.querySelector("footer");
            
            document.body.insertAdjacentHTML("afterbegin", header.outerHTML);
            document.body.insertAdjacentHTML("beforeend", footer.outerHTML);
        })
        .catch(error => console.error("Error cargando template:", error));
});