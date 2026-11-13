document.addEventListener("DOMContentLoaded", function () {

    const pages = Array.from(document.querySelectorAll(".page"));
    const dots = document.querySelector(".dots");

    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    const counter = document.getElementById("counter");

    if (pages.length === 0 || !prev || !next || !counter) {
        console.error("Portfolio navigation elements are missing.");
        return;
    }

    let current = 0;

    // CREATE PAGE INDICATORS
    if (dots) {
        dots.innerHTML = "";

        pages.forEach((page, index) => {
            const dot = document.createElement("button");

            dot.type = "button";
            dot.title = page.dataset.title || `Page ${index + 1}`;
            dot.setAttribute("aria-label", `Go to page ${index + 1}`);

            dot.addEventListener("click", function () {
                goToPage(index);
            });

            dots.appendChild(dot);
        });
    }

    // UPDATE PAGE DISPLAY
    function updatePage() {

        pages.forEach((page, index) => {
            page.classList.toggle("active", index === current);
        });

        counter.textContent = `${current + 1} / ${pages.length}`;

        prev.disabled = current === 0;

        if (current === pages.length - 1) {
            next.textContent = "↺ Start Over";
        } else if (current === 0) {
            next.textContent = "Get to know me →";
        } else {
            next.textContent = "Next →";
        }

        if (dots) {
            Array.from(dots.children).forEach((dot, index) => {
                dot.classList.toggle("on", index === current);
                dot.setAttribute(
                    "aria-current",
                    index === current ? "page" : "false"
                );
            });
        }
    }

    // GO TO A SPECIFIC PAGE
    function goToPage(index) {

        if (index < 0 || index >= pages.length) {
            return;
        }

        current = index;
        updatePage();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // NEXT BUTTON
    next.addEventListener("click", function () {

        if (current === pages.length - 1) {
            goToPage(0);
        } else {
            goToPage(current + 1);
        }

    });

    // BACK BUTTON
    prev.addEventListener("click", function () {
        goToPage(current - 1);
    });

    // KEYBOARD NAVIGATION
    document.addEventListener("keydown", function (event) {

        if (
            event.target.matches("input, textarea, select") ||
            event.target.isContentEditable
        ) {
            return;
        }

        if (event.key === "ArrowRight") {
            goToPage(
                current === pages.length - 1 ? 0 : current + 1
            );
        }

        if (event.key === "ArrowLeft") {
            goToPage(current - 1);
        }

    });

    // INITIALIZE
    updatePage();

    console.log("Portfolio successfully loaded!");

});
