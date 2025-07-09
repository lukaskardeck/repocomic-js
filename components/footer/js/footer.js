import { includeComponent, loadStyles } from "../../js/components.js";

document.addEventListener("DOMContentLoaded", () => {   
    includeComponent("footer", "/components/footer/footer.html", () => {
        loadStyles([
            "/components/footer/styles/footer.css",
            "/components/footer/styles/footer-tablet.css",
            "/components/footer/styles/footer-phone.css"
        ]);
    });
});