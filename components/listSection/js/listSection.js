import { loadStyles } from "../../js/components.js";

export function renderListSection({
    container,
    items,
    title,
    stylePaths = [],
    containerExtraClass = "",
    cardExtraClass = "",
    imgExtraClass = ""
}) {

    // Define título e container
    const h2 = container.querySelector(".list_title");
    const listDiv = container.querySelector(".list_container");

    h2.textContent = title;

    listDiv.className = "list_container list_characters";
    if (containerExtraClass) listDiv.classList.add(containerExtraClass);

    listDiv.innerHTML = items.map(item => {
        const style = `background-image: url('${item.image}')`;
        const cardClass = `character${cardExtraClass ? ` ${cardExtraClass}` : ""}`;
        const imgClass = `character_img${imgExtraClass ? ` ${imgExtraClass}` : ""}`;

        return `
            <a href="${item.link || '#'}" class="${cardClass}">
                <div class="${imgClass}" style="${style}"></div>
                <p>${item.name}</p>
            </a>
        `;
    }).join("");

    if (stylePaths.length > 0) {
        loadStyles(stylePaths);
    }
}
