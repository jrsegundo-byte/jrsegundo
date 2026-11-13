const pages = document.querySelectorAll('.page');
const dotsContainer = document.querySelector('.dots');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const counter = document.getElementById('counter');

let current = 0;
const total = pages.length;

// Build pagination dots
pages.forEach((page, i) => {
  const dot = document.createElement('button');
  dot.setAttribute('aria-label', page.dataset.title);
  if (i === 0) dot.classList.add('on');
  dot.addEventListener('click', () => goToPage(i, i > current ? 'right' : 'left'));
  dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll('button');

function goToPage(index, dir = 'right') {
  if (index < 0 || index >= total || index === current) return;
  
  const outgoing = pages[current];
  const incoming = pages[index];

  outgoing.classList.remove('active', 'from-right', 'from-left');
  incoming.classList.remove('active', 'from-right', 'from-left');
  
  // Force reflow
  void incoming.offsetWidth;

  incoming.classList.add('active', dir === 'right' ? 'from-right' : 'from-left');
  
  dots[current].classList.remove('on');
  dots[index].classList.add('on');

  current = index;
  counter.textContent = `${current + 1} / ${total}`;

  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === total - 1;
}

prevBtn.addEventListener('click', () => goToPage(current - 1, 'left'));
nextBtn.addEventListener('click', () => goToPage(current + 1, 'right'));

// Keyboard navigation support
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'PageDown') {
    if (current < total - 1) goToPage(current + 1, 'right');
  } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
    if (current > 0) goToPage(current - 1, 'left');
  }
});
