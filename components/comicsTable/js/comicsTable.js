import { loadStyles } from "../../js/components.js";

export function renderComicsTable({ 
    comics, 
    container, 
    title = "Guia de Leitura", 
    // stylePaths = [], 
    publisher = null, 
    columns = null 
}) {
    const titleEl = container.querySelector(".table_title");
    const tableBody = container.querySelector("#comicsTableBody");
    const tableHead = container.querySelector("thead tr");

    titleEl.textContent = title;

    const defaultColumns = [
        { key: "number", label: "#" },
        { key: "cover", label: "Capa" },
        { key: "title", label: "Título" },
        { key: "year", label: "Ano" },
        { key: "link", label: "Link" },
        { key: "favorite", label: "Favoritar" }
    ];

    const finalColumns = columns || defaultColumns;

    // Monta o cabeçalho da tabela
    tableHead.innerHTML = finalColumns.map(col => {
        const classes = col.key === "favorite" ? "class='fav-column'" : "";
        return `<th ${classes}>${col.label}</th>`;
    }).join("");

    // Monta o corpo da tabela
    tableBody.innerHTML = comics.map(comic => {
        return `
            <tr>
                ${finalColumns.map(col => {
                    switch (col.key) {
                        case "number":
                            return `<td data-label="#">${comic.number}</td>`;
                        case "cover":
                            return `<td data-label="Capa">
                                <div class="hq_capa" style="background-image: url('${comic.cover}')"></div>
                            </td>`;
                        case "title":
                            return `<td data-label="Título">${comic.title}</td>`;
                        case "year":
                            return `<td data-label="Ano">${comic.year}</td>`;
                        case "link":
                            return `<td data-label="Link">
                                <a target="_blank" href="${comic.link}">Acessar</a>
                            </td>`;
                        case "favorite":
                            return `<td data-label="Favoritar" class="fav-column">
                                <label class="favorite-toggle">
                                    <input type="checkbox" hidden />
                                    <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                    </svg>
                                </label>
                            </td>`;
                        case "publisher":
                            return `<td data-label="Editora">${publisher || "-"}</td>`;
                        default:
                            return `<td data-label="${col.label}">-</td>`;
                    }
                }).join("")}
            </tr>
        `;
    }).join("");

    loadStyles([
        "/components/comicsTable/styles/comicsTable.css",
        "/components/comicsTable/styles/comicsTable-tablet.css",
        "/components/comicsTable/styles/comicsTable-phone.css",
    ]);
}
