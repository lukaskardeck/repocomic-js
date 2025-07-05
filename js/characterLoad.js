// characterLoader.js

// Utilitário para obter parâmetros da URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Carrega os dados do personagem com base no ID da URL
async function loadCharacterData() {
    const characterId = getQueryParam("id");
    if (!characterId) return;

    try {
        const response = await fetch("../../../data/characters.json");
        const data = await response.json();
        const character = data.find(c => c.id === characterId);

        if (!character) {
            document.querySelector("main").innerHTML = `<p>Personagem não encontrado.</p>`;
            return;
        }

        document.title = `${character.nome} | REPOCOMICS`;

        document.querySelector(".profile_img").style.backgroundImage = `url('${character.imagem}')`;
        document.querySelector(".intro_personagem h1").textContent = character.nome;
        document.querySelector(".intro_personagem p").textContent = character.descricao;

        loadComicTable(character.hqs);
        loadMoments(character.momentos);
    } catch (error) {
        console.error("Erro ao carregar dados do personagem:", error);
    }
}

// Popula a tabela de HQs
function loadComicTable(hqs) {
    const tbody = document.querySelector(".hqs_personagem tbody");
    tbody.innerHTML = "";
    hqs.forEach((hq, index) => {
        tbody.innerHTML += `
        <tr>
            <td data-label="#">${index + 1}</td>
            <td data-label="Capa">
                <div class="hq_capa" style="background-image: url('${hq.capa}')"></div>
            </td>
            <td data-label="Título">${hq.titulo}</td>
            <td data-label="Ano">${hq.ano}</td>
            <td data-label="Link">
                <a target="_blank" href="${hq.link}">Acessar</a>
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
        `;
    });
}

// Popula os momentos marcantes
function loadMoments(moments) {
    const container = document.querySelector(".moments_container");
    container.innerHTML = "";
    moments.forEach((moment, index) => {
        const reverseClass = index % 2 !== 0 ? "reverse" : "";
        container.innerHTML += `
            <div class="moment ${reverseClass}">
                <div class="moment_img" style="background-image: url('${moment.imagem}')"></div>
                <div class="moment_text">
                    <h3>${moment.titulo}</h3>
                    <p>${moment.descricao}</p>
                </div>
            </div>
        `;
    });
}

// Inicializa a página
window.addEventListener("DOMContentLoaded", () => {
    includeComponent("header", "/components/header.html", personalizeHeader);
    includeComponent("footer", "/components/footer.html");
    loadCharacterData();
});
