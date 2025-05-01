document.addEventListener("DOMContentLoaded", () => {
    function initCarousel(containerSelector, leftBtnSelector, rightBtnSelector) {
      const container = document.querySelector(containerSelector);
      const leftBtn = document.querySelector(leftBtnSelector);
      const rightBtn = document.querySelector(rightBtnSelector);
  
      function updateButtonStates() {
        const scrollLeft = container.scrollLeft;
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
  
        leftBtn.disabled = scrollLeft <= 5;
        rightBtn.disabled = scrollLeft >= maxScrollLeft - 5;
      }
  
      leftBtn.addEventListener('click', () => {
        container.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
      });
  
      rightBtn.addEventListener('click', () => {
        container.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
      });
  
      container.addEventListener('scroll', updateButtonStates);
      updateButtonStates();
    }
  
    // Init both carousels with their unique button sets
    initCarousel('.selection-container', '.music-left', '.music-right');
    initCarousel('.work-selection-container', '.work-left', '.work-right');
  });

  
  // js/embed.js
document.addEventListener('DOMContentLoaded', () => {
  // Generic loader for any card with a data-src
  document.querySelectorAll('.embed-card').forEach(card => {
    card.addEventListener('click', () => {
      const src   = card.dataset.src;
      const w     = card.dataset.width  || '100%';
      const h     = card.dataset.height || '8em';
      const allow = card.dataset.allow   || 'autoplay; encrypted-media';
      card.innerHTML = `
  <div class="embed-thumb">
    <iframe
      src="${src}"
      frameborder="0"
      allow="${allow}"
      allowfullscreen>
    </iframe>
  </div>
  <div class="embed-title">${card.dataset.title || ''}</div>`;
    }, { once: true });
  });
});
