const FAVORITES_KEY = "repocomics_fav";

export function getFavorites() {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

export function isFavorited(id) {
    return getFavorites().some(item => item.id === id);
}

export function addFavorite(item) {
    const favorites = getFavorites();
    if (!isFavorited(item.id)) {
        favorites.push(item);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
}

export function removeFavorite(id) {
    const updated = getFavorites().filter(item => item.id !== id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
}

export function toggleFavorite(item) {
    if (isFavorited(item.id)) {
        removeFavorite(item.id);
        return false;
    } else {
        addFavorite(item);
        return true;
    }
}
