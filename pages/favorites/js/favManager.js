const FAVORITES_KEY = "repocomics_fav";

export function getFavorites() {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

export function isFavorited(slug) {
    const favorites = getFavorites();
    return favorites.some(item => item.slug === slug);
}

export function addFavorite(item) {
    const favorites = getFavorites();
    if (!isFavorited(item.slug)) {
        favorites.push(item);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
}

export function removeFavorite(slug) {
    const updated = getFavorites().filter(item => item.slug !== slug);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
}

export function toggleFavorite(item) {
    if (isFavorited(item.slug)) {
        removeFavorite(item.slug);
        return false;
    } else {
        addFavorite(item);
        return true;
    }
}
