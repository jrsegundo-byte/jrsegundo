
document.addEventListener("DOMContentLoaded", () => {

    // GET ALL WEBSITE ELEMENTS
    const pages = [...document.querySelectorAll(".page")];
    const dots = document.querySelector(".dots");

    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    const counter = document.getElementById("counter");

    // CHECK REQUIRED ELEMENTS
    if (!pages.length || !prev || !next || !counter) {
        console.error("Portfolio elements are missing.");
        return;
    }

    let current = 0;

    // KEEP PHOTO HOLDERS VISIBLE IF IMAGE IS MISSING
    document.querySelectorAll(".card img").forEach(img => {

        img.addEventListener("error", () => {
            img.style.visibility = "hidden";
            console.warn("Image not found:", img.getAttribute("src"));
        });

        if (img.complete && img.naturalWidth === 0) {
            img.style.visibility = "hidden";
        }

    });

    // CREATE NAVIGATION DOTS
    if (dots) {

        dots.innerHTML = "";

        pages.forEach((page, index) => {

            const dot = document.createElement("button");

            dot.type = "button";
            dot.className = "dot";

            const title = page.dataset.title || `Page ${index + 1}`;

            dot.title = title;
            dot.setAttribute("aria-label", `Go to ${title}`);

            dot.addEventListener("click", () => {
                goToPage(index);
            });

            dots.appendChild(dot);

        });

    }

    // UPDATE PAGE DISPLAY
    function updatePage() {

        pages.forEach((page, index) => {

            const active = index === current;

            page.classList.toggle("active", active);

            page.setAttribute(
                "aria-hidden",
                String(!active)
            );

            if (active) {
                const card = page.querySelector(".card");

                if (card) {
                    card.scrollTop = 0;
                }
            }

        });

        // UPDATE PAGE COUNTER
        counter.textContent = `${current + 1} / ${pages.length}`;

        // BACK BUTTON
        prev.disabled = current === 0;

        // NEXT BUTTON
        if (current === pages.length - 1) {
            next.textContent = "↺ Start Over";
        } else if (current === 0) {
            next.textContent = "Get to know me →";
        } else {
            next.textContent = "Next →";
        }

        // UPDATE NAVIGATION DOTS
        if (dots) {

            [...dots.children].forEach((dot, index) => {

                const active = index === current;

                dot.classList.toggle("on", active);

                if (active) {
                    dot.setAttribute("aria-current", "page");
                } else {
                    dot.removeAttribute("aria-current");
                }

            });

        }

    }

    // GO TO SPECIFIC PAGE
    function goToPage(index) {

        if (index < 0 || index >= pages.length) {
            return;
        }

        current = index;
        updatePage();

    }

    // NEXT BUTTON
    next.addEventListener("click", () => {

        if (current === pages.length - 1) {
            goToPage(0);
        } else {
            goToPage(current + 1);
        }

    });

    // BACK BUTTON
    prev.addEventListener("click", () => {

        goToPage(current - 1);

    });

    // KEYBOARD NAVIGATION
    document.addEventListener("keydown", (event) => {

        if (
            event.target.matches("input, textarea, select") ||
            event.target.isContentEditable
        ) {
            return;
        }

        if (event.key === "ArrowRight") {

            event.preventDefault();

            goToPage(
                current === pages.length - 1
                    ? 0
                    : current + 1
            );

        }

        if (event.key === "ArrowLeft") {

            event.preventDefault();

            goToPage(current - 1);

        }

    });

    // INITIALIZE WEBSITE
    updatePage();

    console.log("Portfolio successfully loaded!");

});

