import { includeComponent, loadStyles } from "../../js/components.js";

document.addEventListener("DOMContentLoaded", () => {
    includeComponent("header", "/components/header/header.html", () => {
        loadStyles([
            "/components/header/styles/header.css",
            "/components/header/styles/header-tablet.css",
            "/components/header/styles/header-phone.css"
        ]);
        personalizeHeader();
    });
});

function personalizeHeader() {
    const fullPath = window.location.pathname + window.location.search;
    const logo = document.getElementById("logoLink");

    // Detectar se estamos na home
    const isHome =
        fullPath === "/" ||
        fullPath === "/index.html" ||
        fullPath === "/index.html?" ||
        fullPath === ""

    if (!isHome) {
        logo.setAttribute("href", "/index.html");
    } else {
        logo.outerHTML = `<span class="logo_repocomics">REPOCOMICS</span>`;
    }

    // Marcação dinâmica dos menus ativos
    if (fullPath.includes("publisher.html?publisher=marvel")) {
        document.getElementById("navMarvel").outerHTML = `<span class="ativo">Marvel</span>`;
    } else if (fullPath.includes("publisher.html?publisher=dc")) {
        document.getElementById("navDC").outerHTML = `<span class="ativo">DC Comics</span>`;
    } else if (fullPath.includes("favorites")) {
        document.getElementById("navFav").outerHTML = `<span class="ativo">Favoritos</span>`;
    }
}
