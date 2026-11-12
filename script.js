


// GET ALL PORTFOLIO ELEMENTS

const pages = [...document.querySelectorAll('.page')];

const prev = document.getElementById('prev');
const next = document.getElementById('next');
const counter = document.getElementById('counter');
const dots = document.querySelector('.dots');

let current = 0;


// CHECK IF ELEMENTS EXIST

if (pages.length && prev && next && counter && dots) {

    // CREATE NAVIGATION DOTS

    pages.forEach((page, index) => {

        const button = document.createElement('button');

        button.type = 'button';

        button.setAttribute(
            'aria-label',
            page.dataset.title || `Page ${index + 1}`
        );

        button.title = page.dataset.title || `Page ${index + 1}`;

        button.addEventListener('click', () => {
            go(index);
        });

        dots.appendChild(button);

    });


    // CHANGE PAGE

    function go(index) {

        if (
            index < 0 ||
            index >= pages.length ||
            index === current
        ) {
            return;
        }

        const direction =
            index > current ? 'from-right' : 'from-left';

        pages[current].classList.remove(
            'active',
            'from-right',
            'from-left'
        );

        current = index;

        pages[current].classList.add(
            'active',
            direction
        );

        // RESET CARD POSITION

        const card = pages[current].querySelector('.card');

        if (card) {
            card.scrollTop = 0;
        }

        update();

    }


    // UPDATE NAVIGATION

    function update() {

        counter.textContent =
            `${current + 1} / ${pages.length}`;

        prev.disabled = current === 0;

        if (current === pages.length - 1) {

            next.textContent = '↺ Start Over';

        } else if (current === 0) {

            next.textContent = 'Get to know me →';

        } else {

            next.textContent = 'Next →';

        }

        // UPDATE DOTS

        [...dots.children].forEach((dot, index) => {

            dot.classList.toggle(
                'on',
                index === current
            );

            dot.setAttribute(
                'aria-current',
                index === current ? 'page' : 'false'
            );

        });

    }


    // NEXT BUTTON

    next.addEventListener('click', () => {

        if (current === pages.length - 1) {
            go(0);
        } else {
            go(current + 1);
        }

    });


    // BACK BUTTON

    prev.addEventListener('click', () => {

        go(current - 1);

    });


    // KEYBOARD NAVIGATION

    document.addEventListener('keydown', (event) => {

        if (
            event.target.matches('input, textarea, select') ||
            event.target.isContentEditable
        ) {
            return;
        }

        if (event.key === 'ArrowRight') {

            if (current === pages.length - 1) {
                go(0);
            } else {
                go(current + 1);
            }

        }

        if (event.key === 'ArrowLeft') {

            go(current - 1);

        }

    });


    // INITIALIZE WEBSITE

    update();

}
