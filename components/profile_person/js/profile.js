import { loadStyles } from '../../js/components.js';

function renderProfile(data, type) {
    loadStyles([
        '/components/profile_person/styles/profile.css',
        '/components/profile_person/styles/profile-tablet.css',
        '/components/profile_person/styles/profile-phone.css',
    ]);

    const profileSection = document.createElement('section');
    profileSection.className = `profile-section profile-${type}`;
    profileSection.id = 'profileSection';

    profileSection.innerHTML = `
        <div class="profile-container">
            <div class="profile-img" style="background-image: url('${data.image}')">
                ${type === 'team' ? `<h1 class="profile-title">${data.name}</h1>` : ''}
            </div>
            ${type === 'character' ? `<h1 class="profile-title">${data.name}</h1>` : ''}
        </div>
        
        <div class="add-favorite">
            <label class="favorite-toggle" for="favorite-item">
                <input type="checkbox" id="favorite-item" hidden />
                <svg
                            class="star-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <polygon
                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                            ></polygon>
                        </svg>
                <span class="favorite-text">Adicionar aos favoritos</span>
            </label>
        </div>
        
        <div class="profile-description">
            ${data.description.map(p => `<p>${p}</p>`).join('')}
        </div>
    `;

    return profileSection;
}

export { renderProfile };