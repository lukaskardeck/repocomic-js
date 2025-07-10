import { renderComicsTable } from "../../../components/comicsTable/js/comicsTable.js";
import { includeComponent } from "../../../components/js/components.js";
import { renderProfile, attachFavoriteHandler } from "../../../components/profile_person/js/profile.js";

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const character = params.get("character");
    const publisher = params.get("publisher");
    const team = params.get("team");

    if (!character || !publisher) {
        console.error("Parâmetros 'character' ou 'publisher' não encontrados");
        window.location.href = "/pages/publisher/publisher.html";
        return;
    }

    fetch(`/pages/character/data/${publisher}/${character}.json`)
        .then(res => {
            if (!res.ok) throw new Error("Personagem não encontrado");
            return res.json();
        })
        .then(data => {
            if (data.publisher !== publisher) {
                throw new Error(`Personagem pertence à editora ${data.publisher}`);
            }

            // Renderiza o perfil do personagem/equipe
            const profileElement = renderProfile(data, data.type);
            document.querySelector('main').prepend(profileElement);
            attachFavoriteHandler(); 

            const dataComics = {
                comics: data.comics,
                publisher,
                character
            }
            renderComics(dataComics);
            renderMoments(data.moments);

            // Atualizações adicionais
            document.title = `${data.name} | REPOCOMICS`;
            document.body.classList.add(publisher);
        })
        .catch(err => {
            console.error("Erro:", err);
            // window.location.href = `/pages/publisher/publisher.html?publisher=${publisher}`;
        });
});

function renderComics(dataComics) {
    includeComponent("comicsSection", "/components/comicsTable/comicsTable.html", () => {
        const container = document.getElementById("comicsSection");

        renderComicsTable({
            comics: dataComics.comics,
            container: document.getElementById("comicsSection"),
            title: "HQs do Personagem",
            publisher: dataComics.publisher,
            character: dataComics.character,
            columns: [
                { key: "number", label: "#" },
                { key: "cover", label: "Capa" },
                { key: "title", label: "Título" },
                { key: "year", label: "Ano" },
                { key: "link", label: "Link" },
                // { key: "publisher", label: "Editora" },
                { key: "favorite", label: "Favoritar" },
            ],
        });

    });
}

function renderMoments(moments) {
    const container = document.getElementById("momentsContainer");
    container.innerHTML = moments.map((moment, index) => `
        <div class="moment ${index % 2 !== 0 ? 'reverse' : ''}">
            <div class="moment_img" style="background-image: url('${moment.image}')"></div>
            <div class="moment_text">
                <h3>${moment.title}</h3>
                <p>${moment.description}</p>
            </div>
        </div>
    `).join("");
}