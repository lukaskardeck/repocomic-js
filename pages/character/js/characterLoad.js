import { renderProfile } from "../../../components/profile_person/js/profile.js";

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
            
            // 1. Renderiza o perfil componentizado
            const profileElement = renderProfile(data, data.type);
            document.querySelector('main').prepend(profileElement);
            
            // 2. Renderiza as outras seções
            renderComics(data.comics);
            renderMoments(data.moments);
            
            // 3. Atualizações adicionais
            document.title = `${data.name} | REPOCOMICS`;
            document.body.classList.add(publisher);
        })
        .catch(err => {
            console.error("Erro:", err);
            window.location.href = `/pages/publisher/publisher.html?publisher=${publisher}`;
        });
});

function renderComics(comics) {
    const tableBody = document.getElementById("comicsTableBody");
    tableBody.innerHTML = comics.map(comic => `
        <tr>
            <td data-label="#">${comic.number}</td>
            <td data-label="Capa">
                <div class="hq_capa" style="background-image: url('${comic.cover}')"></div>
            </td>
            <td data-label="Título">${comic.title}</td>
            <td data-label="Ano">${comic.year}</td>
            <td data-label="Link">
                <a target="_blank" href="${comic.link}">Acessar</a>
            </td>
            <td data-label="Favoritar" class="fav-column">
                <label class="favorite-toggle">
                    <input type="checkbox" hidden />
                    <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                </label>
            </td>
        </tr>
    `).join("");
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