(() => {
  document.querySelectorAll('.portfolio-photo').forEach(image => {
    const updatePhoto = () => {
      image.parentElement.classList.toggle('has-photo', image.complete && image.naturalWidth > 0);
    };
    image.addEventListener('load', updatePhoto);
    image.addEventListener('error', updatePhoto);
    updatePhoto();
  });
  const chapters = ['Homepage', 'Personal Info', 'Achievements', 'Family and Friends'];
  let page = 0;
  const previous = document.getElementById('previous-chapter');
  const next = document.getElementById('next-chapter');
  function showChapter(index) {
    page = Math.max(0, Math.min(chapters.length - 1, index));
    document.querySelectorAll('[data-chapter]').forEach(section => {
      section.hidden = Number(section.dataset.chapter) !== page;
    });
    document.querySelectorAll('nav [data-page]').forEach(button => {
      if (Number(button.dataset.page) === page) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    previous.disabled = page === 0;
    document.getElementById('page-number').textContent = String(page + 1).padStart(2, '0');
    document.getElementById('page-progress').style.width = `${(page + 1) * 25}%`;
    document.getElementById('chapter-name').textContent = chapters[page];
    document.getElementById('next-label').textContent = page === 3 ? 'Back to homepage' : 'Next chapter';
    if (document.activeElement.closest('[hidden]')) document.getElementById('main-content').focus();
  }
  document.querySelectorAll('[data-page]').forEach(button => {
    button.addEventListener('click', () => showChapter(Number(button.dataset.page)));
  });
  previous.addEventListener('click', () => showChapter(page - 1));
  next.addEventListener('click', () => showChapter((page + 1) % chapters.length));
  document.querySelectorAll('[data-person]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-person]').forEach(option => {
        option.setAttribute('aria-pressed', String(option === button));
      });
      document.querySelectorAll('.people-grid figure').forEach((figure, index) => {
        figure.classList.toggle('selected-person', index === Number(button.dataset.person));
      });
    });
  });
  const birth = new Date(2008, 8, 9), today = new Date();
  let years = today.getFullYear() - birth.getFullYear();
  if (today < new Date(today.getFullYear(), 8, 9)) years--;
  document.getElementById('age').textContent = years + ' years old';
  // Tap a photo to view it larger
  const box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Photo viewer');
  box.innerHTML = '<button type="button" class="lightbox-close" aria-label="Close photo">&times;</button><img alt=""><p></p>';
  document.body.appendChild(box);
  const boxImg = box.querySelector('img');
  const boxCaption = box.querySelector('p');
  let lastFocus = null;

  function openPhoto(space) {
    const img = space.querySelector('.portfolio-photo');
    const caption = space.closest('figure') && space.closest('figure').querySelector('figcaption');
    const title = caption && (caption.querySelector('h3') || caption);
    boxImg.src = img.currentSrc || img.src;
    boxImg.alt = img.alt;
    boxCaption.textContent = title ? title.textContent : img.alt;
    lastFocus = document.activeElement;
    box.classList.add('open');
    box.querySelector('button').focus();
  }
  function closePhoto() {
    box.classList.remove('open');
    if (lastFocus) lastFocus.focus();
  }
  box.addEventListener('click', closePhoto);

  document.querySelectorAll('.photo-space').forEach(space => {
    const img = space.querySelector('.portfolio-photo');
    if (!img) return;
    space.setAttribute('role', 'button');
    space.tabIndex = 0;
    space.setAttribute('aria-label', 'View larger: ' + img.alt);
    space.addEventListener('click', () => {
      if (space.classList.contains('has-photo')) openPhoto(space);
    });
    space.addEventListener('keydown', event => {
      if ((event.key === 'Enter' || event.key === ' ') && space.classList.contains('has-photo')) {
        event.preventDefault();
        openPhoto(space);
      }
    });
  });

  window.addEventListener('keydown', event => {
    if (box.classList.contains('open')) {
      if (event.key === 'Escape') closePhoto();
      return;
    }
    if (event.target.closest('button, a, input, textarea, select, [contenteditable]')) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      showChapter(event.key === 'ArrowRight' ? (page + 1) % chapters.length : page - 1);
    }
  });
})();
