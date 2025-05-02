function initCarousels() {
  document.querySelectorAll('[data-carousel]').forEach(carouselWrapper => {
    const container = carouselWrapper.querySelector('[data-carousel-track]');
    const leftBtn = carouselWrapper.querySelector('[data-carousel-left]');
    const rightBtn = carouselWrapper.querySelector('[data-carousel-right]');

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
  });
}

document.addEventListener('DOMContentLoaded', initCarousels);
