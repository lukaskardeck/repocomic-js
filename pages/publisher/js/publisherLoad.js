import { includeComponent } from "../../../components/js/components.js";
import { renderListSection } from "../../../components/listSection/js/listSection.js";

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
    renderListCharacter(data.characters);
    renderListTeams(data.teams);
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

function renderListCharacter(listCharacters) {
    includeComponent("charactersSection", "/components/listSection/listSection.html", () => {
        const container = document.getElementById("charactersSection");
        renderListSection({
            container,
            items: listCharacters,
            title: "Personagens",
            stylePaths: [
                "/components/listSection/styles/listBase.css",
                "/components/listSection/styles/listBase-phone.css"
            ]
        });
    });
}

function renderListTeams(listTeams) {
    includeComponent("teamsSection", "/components/listSection/listSection.html", () => {
        const container = document.getElementById("teamsSection");
        renderListSection({
            container,
            items: listTeams,
            title: "Equipes",
            stylePaths: [
                "/components/listSection/styles/listBase.css",
                "/components/listSection/styles/listBase-phone.css",
                "/components/listSection/styles/listTeam.css",
                "/components/listSection/styles/listTeam-phone.css"
            ],
            containerExtraClass: "equipes",
            cardExtraClass: "equipe",
            imgExtraClass: "equipe_img"
        });
    });
}

function capitalize(word) {
    return word.length >= 3 ? word.charAt(0).toUpperCase() + word.slice(1) : word.toUpperCase();
}