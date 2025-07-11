import { includeComponent } from "../../../components/js/components.js";
import { renderListSection } from "../../../components/listSection/js/listSection.js";
import { renderComicsTable } from "../../../components/comicsTable/js/comicsTable.js";
import { getFavorites } from "./favManager.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("favoritesFilterForm");

    // Atualiza favoritos ao interagir com os filtros
    form.querySelectorAll("input").forEach(input => {
        input.addEventListener("change", loadFavorites);
    });

    loadFavorites(); // render inicial
});

function loadFavorites() {
    const favorites = getFavorites();

    const form = document.getElementById("favoritesFilterForm");
    const formData = new FormData(form);

    const selectedPublisher = formData.get("publisher");
    const selectedTypes = formData.getAll("type");

    const emptyStateSection = document.getElementById("emptyStateSection");

    // Caso nenhum tipo esteja selecionado
    if (selectedTypes.length === 0) {
        hideAndClearSection("charactersSection");
        hideAndClearSection("teamsSection");
        hideAndClearSection("comicsSection");
        document.querySelectorAll("hr[data-dynamic]").forEach(el => el.remove());

        if (emptyStateSection) {
            emptyStateSection.style.display = "";
        }
        return;
    } else if (emptyStateSection) {
        emptyStateSection.style.display = "none";
    }

    let filtered = favorites.filter(item => selectedTypes.includes(item.type));

    if (selectedPublisher && selectedPublisher !== "all") {
        filtered = filtered.filter(item => item.publisher === selectedPublisher);
    }

    // Limpa e esconde todas as seções antes de renderizar
    hideAndClearSection("charactersSection");
    hideAndClearSection("teamsSection");
    hideAndClearSection("comicsSection");

    // Remove todos os <hr> inseridos dinamicamente
    document.querySelectorAll("hr[data-dynamic]").forEach(el => el.remove());

    const main = document.querySelector("main");
    const renderQueue = [];

    if (selectedTypes.includes("character")) {
        const characters = filtered.filter(item => item.type === "character");
        renderQueue.push({ id: "charactersSection", render: () => renderFavoriteCharacters(characters) });
    }

    if (selectedTypes.includes("team")) {
        const teams = filtered.filter(item => item.type === "team");
        renderQueue.push({ id: "teamsSection", render: () => renderFavoriteTeams(teams) });
    }

    if (selectedTypes.includes("comic")) {
        const comics = filtered.filter(item => item.type === "comic");
        renderQueue.push({ id: "comicsSection", render: () => renderFavoriteComics(comics) });
    }

    // Renderiza e insere <hr> entre as seções visíveis
    renderQueue.forEach((item, index) => {
        const section = document.getElementById(item.id);
        if (!section) return;

        section.style.display = ""; // mostra a seção
        if (index > 0) {
            const hr = document.createElement("hr");
            hr.setAttribute("aria-hidden", "true");
            hr.setAttribute("data-dynamic", "true");
            // hr.style.margin = "2rem auto";
            main.insertBefore(hr, section);
        }

        item.render();
    });
}


function hideAndClearSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.innerHTML = "";
        section.style.display = "none";

        const prev = section.previousElementSibling;
        if (prev?.tagName === "HR" && prev.dataset.dynamic) {
            prev.remove();
        }
    }
}

// ===============================
// RENDERIZADORES DE CADA TIPO
// ===============================
function renderFavoriteCharacters(characters) {
    includeComponent("charactersSection", "/components/listSection/listSection.html", () => {
        const container = document.getElementById("charactersSection");

        if (characters.length === 0) {
            container.innerHTML = "<h2>Personagens</h2><p>Nenhum personagem favoritado.</p>";
            return;
        }

        renderListSection({
            container,
            items: characters.map(item => ({
                name: item.name,
                image: item.image,
                link: item.link,
            })),
            title: "Personagens",
            stylePaths: [
                "/components/listSection/styles/listBase.css",
                "/components/listSection/styles/listBase-phone.css"
            ]
        });
    });
}

function renderFavoriteTeams(teams) {
    includeComponent("teamsSection", "/components/listSection/listSection.html", () => {
        const container = document.getElementById("teamsSection");

        if (teams.length === 0) {
            container.innerHTML = "<h2>Equipes</h2><p>Nenhuma equipe favoritada.</p>";
            return;
        }

        renderListSection({
            container,
            items: teams.map(item => ({
                name: item.name,
                image: item.image,
                link: item.link,
            })),
            title: "Equipes",
            containerExtraClass: "equipes",
            cardExtraClass: "equipe",
            imgExtraClass: "equipe_img",
            stylePaths: [
                "/components/listSection/styles/listBase.css",
                "/components/listSection/styles/listBase-phone.css",
                "/components/listSection/styles/listTeam.css",
                "/components/listSection/styles/listTeam-phone.css"
            ]
        });
    });
}

function renderFavoriteComics(comics) {
    includeComponent("comicsSection", "/components/comicsTable/comicsTable.html", () => {
        const container = document.getElementById("comicsSection");

        if (comics.length === 0) {
            container.innerHTML = "<h2>Quadrinhos</h2><p>Nenhum quadrinho favoritado.</p>";
            return;
        }

        const sortedComics = [...comics].sort((a, b) => {
            return a.title.localeCompare(b.title, 'pt', { sensitivity: 'base' });
        });

        sortedComics.forEach((comic, index) => {
            comic.number = index + 1;
        });

        renderComicsTable({
            comics: sortedComics,
            container,
            title: "Quadrinhos",
            columns: [
                { key: "number", label: "#" },
                { key: "character", label: "Personagem" },
                { key: "cover", label: "Capa" },
                { key: "title", label: "Título" },
                { key: "year", label: "Ano" },
                { key: "link", label: "Link" },
            ]
        });
    });
}

