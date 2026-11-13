const pages = [...document.querySelectorAll('.page')];
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const counter = document.getElementById('counter');
const dots = document.querySelector('.dots');
let current = 0;

pages.forEach((p, i) => {
  const b = document.createElement('button');
  b.setAttribute('aria-label', p.dataset.title);
  b.title = p.dataset.title;
  b.addEventListener('click', () => go(i));
  dots.appendChild(b);
});

function go(i) {
  if (i < 0 || i >= pages.length || i === current) return;
  const dir = i > current ? 'from-right' : 'from-left';
  pages[current].classList.remove('active', 'from-right', 'from-left');
  current = i;
  pages[current].classList.add('active', dir);
  update();
}

function update() {
  counter.textContent = `${current + 1} / ${pages.length}`;
  prev.disabled = current === 0;
  next.textContent = current === pages.length - 1 ? '↺ Start Over' : current === 0 ? 'Get to know me →' : 'Next →';
  [...dots.children].forEach((d, i) => d.classList.toggle('on', i === current));
}

next.addEventListener('click', () => go(current === pages.length - 1 ? 0 : current + 1));
prev.addEventListener('click', () => go(current - 1));

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') next.click();
  if (e.key === 'ArrowLeft') go(current - 1);
});

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) go(current + 1);
    else go(current - 1);
  }
}, { passive: true });

update();
