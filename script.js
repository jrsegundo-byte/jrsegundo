// Navigation state stays in the browser; all portfolio content is in index.html.
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
  let achievement = 0;
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
    // Move focus out of content that has just been hidden.
    if (document.activeElement.closest('[hidden]')) document.getElementById('main-content').focus();
  }

  function showAchievement(index) {
    achievement = index;
    document.querySelectorAll('[data-moment]').forEach(panel => {
      panel.hidden = Number(panel.dataset.moment) !== achievement;
    });
    document.querySelectorAll('[data-achievement]').forEach(button => {
      button.setAttribute('aria-pressed', String(Number(button.dataset.achievement) === achievement));
    });
    document.getElementById('moment-count').textContent = achievement + 1;
  }

  document.querySelectorAll('[data-page]').forEach(button => {
    button.addEventListener('click', () => showChapter(Number(button.dataset.page)));
  });
  previous.addEventListener('click', () => showChapter(page - 1));
  next.addEventListener('click', () => showChapter((page + 1) % chapters.length));
  document.querySelectorAll('[data-achievement]').forEach(button => {
    button.addEventListener('click', () => showAchievement(Number(button.dataset.achievement)));
  });
  document.getElementById('next-moment').addEventListener('click', () => showAchievement((achievement + 1) % 4));
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
  window.addEventListener('keydown', event => {
    if (event.target.closest('button, a, input, textarea, select, [contenteditable]')) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      showChapter(event.key === 'ArrowRight' ? (page + 1) % chapters.length : page - 1);
    }
  });
})();
