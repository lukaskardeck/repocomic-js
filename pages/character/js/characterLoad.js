document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const character = params.get("character");
    const publisher = params.get("publisher");

    if (!character || !publisher) {
        console.error("Parâmetros 'character' ou 'publisher' não encontrados na URL.");
        return;
    }

    fetch(`/pages/character/data/${publisher}/${character}.json`)
        .then((res) => res.json())
        .then((data) => {
            // Verifica se o personagem pertence à editora correta
            if (data.publisher !== publisher) {
                throw new Error(`Este personagem pertence à editora ${data.publisher}`);
            }
            renderCharacterPage(data, publisher);
        })
        .catch((err) => {
            console.error("Erro ao carregar JSON:", err);
            // Redireciona para a página da editora
            window.location.href = `/pages/publisher/publisher.html?publisher=${publisher}`;
        });
});

function renderCharacterPage(data, publisher) {  
    document.title = `${data.name} | REPOCOMICS`;

    document.getElementById("characterName").textContent = data.name;
    document.getElementById("characterImage").style.backgroundImage = `url('${data.image}')`;

    const descriptionEl = document.getElementById("characterDescription");
    descriptionEl.innerHTML = data.description.map(p => `<p>${p}</p>`).join("");
    
    renderComics(data.comics);
    renderMoments(data.moments);
}

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
                    <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
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