document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    
    if (currentPage === "index.html" || currentPage === "") {
        loadPage("pages/hero.html");
    }
});

function loadPage(pagePath) {
    fetch(pagePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById("content").innerHTML = data;
            loadScripts(pagePath);
        })
        .catch(error => console.error("Error cargando página:", error));
}

function loadScripts(pagePath) {
    const scripts = document.querySelectorAll(`#content script`);
    scripts.forEach(script => {
        const newScript = document.createElement("script");
        newScript.innerHTML = script.innerHTML;
        newScript.src = script.src;
        document.body.appendChild(newScript);
    });
}