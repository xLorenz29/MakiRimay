document.addEventListener("DOMContentLoaded", () => {
    fetch("../components/navbar.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("header").innerHTML = data;
            setActiveLink();
        });
});

function setActiveLink() {
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".nav-link");
    
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
}