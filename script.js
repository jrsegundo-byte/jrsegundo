

document.addEventListener("DOMContentLoaded", function () {

    const pages = Array.from(document.querySelectorAll(".page"));
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    const counter = document.getElementById("counter");
    const dots = document.querySelector(".dots");

    let current = 0;

    // CHECK ELEMENTS
    if (!pages.length || !prev || !next || !counter || !dots) {
        console.error("Missing navigation elements!");
        return;
    }

    // CREATE DOTS
    dots.innerHTML = "";

    pages.forEach((page, index) => {

        const button = document.createElement("button");

        button.type = "button";
        button.title = page.dataset.title || "Page " + (index + 1);

        button.addEventListener("click", function () {
            go(index);
        });

        dots.appendChild(button);

    });

    // UPDATE DISPLAY
    function update() {

        pages.forEach((page, index) => {
            page.classList.toggle("active", index === current);
        });

        counter.textContent = (current + 1) + " / " + pages.length;

        prev.disabled = current === 0;

        next.textContent =
            current === pages.length - 1
                ? "↺ Start Over"
                : current === 0
                    ? "Get to know me →"
                    : "Next →";

        Array.from(dots.children).forEach((dot, index) => {
            dot.classList.toggle("on", index === current);
            dot.setAttribute(
                "aria-current",
                index === current ? "page" : "false"
            );
        });

    }

    // GO TO PAGE
    function go(index) {

        if (index < 0 || index >= pages.length) return;

        const direction =
            index > current ? "from-right" : "from-left";

        pages[current].classList.remove(
            "active", "from-right", "from-left"
        );

        current = index;

        pages[current].classList.add("active", direction);

        const card = pages[current].querySelector(".card");

        if (card) card.scrollTop = 0;

        update();

    }

    // NEXT
    next.addEventListener("click", function () {
        go(current === pages.length - 1 ? 0 : current + 1);
    });

    // BACK
    prev.addEventListener("click", function () {
        go(current - 1);
    });

    // KEYBOARD
    document.addEventListener("keydown", function (event) {

        if (event.target.matches("input, textarea, select")) return;

        if (event.key === "ArrowRight") {
            go(current === pages.length - 1 ? 0 : current + 1);
        }

        if (event.key === "ArrowLeft") {
            go(current - 1);
        }

    });

    // START WEBSITE
    update();

});
