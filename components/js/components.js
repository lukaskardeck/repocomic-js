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

export { includeComponent, loadStyles };