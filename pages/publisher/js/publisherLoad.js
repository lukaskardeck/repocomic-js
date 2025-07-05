document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const publisher = params.get("publisher");

    if (!publisher) {
        console.error("Parâmetro 'publisher' não encontrado na URL.");
        return;
    }

    document.title = `${capitalize(publisher)} | REPOCOMICS`;

    fetch(`./data/${publisher}.json`)
        .then((res) => res.json())
        .then((data) => renderPublisherPage(data))
        .catch((err) => console.error("Erro ao carregar JSON:", err));
});

function renderPublisherPage(data) {
    renderBanner(data.banner);
    renderDescription(data.description);
    renderItems(data.characters, document.getElementById("characters"));
    renderItems(data.teams, document.getElementById("teams"));
}

function renderBanner(banner) {
    const bannerEl = document.getElementById("banner");
    bannerEl.style.backgroundImage = `url('${banner.backgroundImage}')`;
    bannerEl.innerHTML = `<img src="${banner.logo}" alt="${banner.alt}" class="logo_marvel">`;
}

function renderDescription(paragraphs) {
    const intro = document.getElementById("publisherIntro");
    intro.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join("");
}

function renderItems(items, container) {
    container.innerHTML = items.map(item => {
        const style = `background-image: url('${item.image}')`;
        const name = `<p>${item.name}</p>`;
        const div = `
            <div class="character_img${container.classList.contains("equipes") ? " equipe_img" : ""}" style="${style}"></div>
            ${name}
        `;

        return item.link
            ? `<a href="${item.link}" class="character">${div}</a>`
            : `<a href="#" class="character">${div}</a>`;
    }).join("");
}

function capitalize(word) {
    return word.length >= 3 ? word.charAt(0).toUpperCase() + word.slice(1) : word.toUpperCase();
}