function initCarousels() {
  function initCarousel(containerSelector, leftBtnSelector, rightBtnSelector) {
    const container = document.querySelector(containerSelector);
    const leftBtn = document.querySelector(leftBtnSelector);
    const rightBtn = document.querySelector(rightBtnSelector);

    if (!container || !leftBtn || !rightBtn) return;

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

  initCarousel('.selection-container', '.music-left', '.music-right');
  initCarousel('.work-selection-container', '.work-left', '.work-right');
}

// Initial call on page load
document.addEventListener('DOMContentLoaded', initCarousels);
