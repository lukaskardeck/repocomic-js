document.addEventListener("DOMContentLoaded", () => {
    includeComponent("header", "/components/header/header.html", () => {
        loadStyles([
            "/components/header/styles/header.css",
            "/components/header/styles/header-tablet.css",
            "/components/header/styles/header-phone.css"
        ]);
        personalizeHeader();
    });
    
    includeComponent("footer", "/components/footer/footer.html", () => {
        loadStyles([
            "/components/footer/styles/footer.css",
            "/components/footer/styles/footer-tablet.css",
            "/components/footer/styles/footer-phone.css"
        ]);
    });
});

function includeComponent(tagId, url, callback = null) {
    const placeholder = document.getElementById(tagId);
    if (placeholder) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                placeholder.innerHTML = html;
                if (callback) callback();
            })
            .catch(error => {
                console.error(`Erro ao carregar ${url}:`, error);
            });
    }
}

function loadStyles(urls) {
    urls.forEach(href => {
        if (!document.querySelector(`link[href="${href}"]`)) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = href;
            document.head.appendChild(link);
        }
    });
}

function personalizeHeader() {
    const fullPath = window.location.pathname + window.location.search;
    const logo = document.getElementById("logoLink");

    // Detectar se estamos na home (com ou sem index.html explícito)
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
