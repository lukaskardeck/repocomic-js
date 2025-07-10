document.addEventListener("DOMContentLoaded", function() {
    // Carrega os dados da home
    fetch('/data/index.json')
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Erro ao carregar os dados');
            }
            return response.json();
        })
        .then(function(data) {
            renderCharacters(data.favoriteCharacters);
            renderComics(data.recommendedComics);
        })
        .catch(function(error) {
            console.error('Erro:', error);
        });
});

// Renderiza a seção de personagens
function renderCharacters(characters) {
    const container = document.getElementById('section_characters');
    const listContainer = container.querySelector('.list_characters');
    
    // Limpa o container
    listContainer.innerHTML = '';
    
    // Adiciona cada personagem dinamicamente
    characters.forEach(function(character) {
        const characterElement = document.createElement('a');
        characterElement.href = character.url;
        characterElement.className = 'character';
        
        characterElement.innerHTML = `
            <div class="character_img" style="background-image: url('${character.imageUrl}')"></div>
            <div class="character_name">
                <p>${character.name}</p>
                <p>(${character.realName})</p>
            </div>
        `;
        
        listContainer.appendChild(characterElement);
    });
}

// Renderiza a seção de quadrinhos
function renderComics(comics) {
    const container = document.querySelector('.section_comics:not(#section_characters)');
    const listContainer = container.querySelector('.list_comics');
    
    // Limpa o container
    listContainer.innerHTML = '';
    
    // Adiciona cada quadrinho dinamicamente
    comics.forEach(function(comic) {
        const comicElement = document.createElement('a');
        comicElement.href = comic.comicUrl;
        comicElement.className = 'comic';
        
        comicElement.innerHTML = `
            <div class="comic_img" style="background-image: url('${comic.imageUrl}')"></div>
            <div class="comic_description">
                <p>${comic.title}</p>
                <p class="comic_year">${comic.year}</p>
            </div>
        `;
        
        listContainer.appendChild(comicElement);
    });
}