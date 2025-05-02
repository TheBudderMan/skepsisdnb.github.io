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

document.addEventListener('DOMContentLoaded', () => {
  initCarousels();

  document.addEventListener('click', (e) => {
    const beausIslandBtn = e.target.closest('[data-project="beaus-island"]');
    const unfathomableBtn = e.target.closest('[data-project="unfathomable"]');
    const beausHouseBtn = e.target.closest('[data-project="beaus-house"]');

    if (beausIslandBtn) {
      const html = `
        <div class="modal-section">
          <img src="Resources/Formant-BG1.webp" alt="Beau’s Island Intro Image" class="modal-image">
        </div>
        <div class="modal-section">
          <h2>Beau’s Island</h2>
          <p>
            A cozy mobile farming game for Android, Beau’s Island invites players to befriend quirky animal villagers, collect unique resources, and relax with charming pixel art environments.
            Built with efficiency and playability in mind, the game focuses on rewarding daily engagement and exploration.
          </p>
        </div>
        <div class="modal-section">
          <img src="Resources/Formant-BG2.webp" alt="Beau’s Island Gameplay Preview" class="modal-image">
        </div>
        <button id="close-project-modal" aria-label="Close modal">✕</button>
      `;
      openProjectModal(html);
    }

    if (unfathomableBtn) {
      const html = `
        <div class="modal-section">
          <img src="Resources/Formant-BG3.webp" alt="Unfathomable Intro Image" class="modal-image">
        </div>
        <div class="modal-section">
          <h2>Unfathomable</h2>
          <p>
            Unfathomable is a first-person horror experience set within a secluded carnival operated by the eerie Verlaine family.
            Players explore haunting attractions, uncover sinister rituals, and confront masked enemies as the story descends into psychological and supernatural terror.
            Built around strong narrative pacing and handcrafted environments, the game rewards careful observation and emotional resilience.
          </p>
        </div>
        <div class="modal-section">
          <img src="Resources/Formant-BG4.webp" alt="Unfathomable Environment Preview" class="modal-image">
        </div>
        <button id="close-project-modal" aria-label="Close modal">✕</button>
      `;
      openProjectModal(html);
    }

    if (beausHouseBtn) {
      const html = `
        <div class="modal-section">
          <img src="Resources/Formant-BG5.webp" alt="Beau’s House Intro Image" class="modal-image">
        </div>
        <div class="modal-section">
          <h2>Beau’s House</h2>
          <p>
            Beau’s House is a quirky anime-style PC game in development — part cozy slice-of-life, part surreal chaos.
            Designed with expressive character interactions, playful exploration, and offbeat humor, the game aims to mix visual novel charm with light adventure gameplay in a stylistically exaggerated world.
            While still early in production, it teases a uniquely weird and heartfelt tone.
          </p>
        </div>
        <div class="modal-section">
          <img src="Resources/Formant-BG2.webp" alt="Beau’s House Mood Preview" class="modal-image">
        </div>
        <button id="close-project-modal" aria-label="Close modal">✕</button>
      `;
      openProjectModal(html);
    }
  });
});




function openProjectModal(htmlContent) {
  const modal = document.getElementById('project-modal');
  const content = document.getElementById('project-modal-content');

  content.innerHTML = htmlContent;
  modal.classList.remove('hidden');

  const closeBtn = document.getElementById('close-project-modal'); // ← moved here

  function closeModal() {
    modal.classList.add('hidden');
    content.innerHTML = '';
    document.removeEventListener('keydown', escListener);
    modal.removeEventListener('click', outsideClickListener);
  }

  function escListener(e) {
    if (e.key === 'Escape') closeModal();
  }

  function outsideClickListener(e) {
    if (e.target === modal) closeModal();
  }

  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', escListener);
  modal.addEventListener('click', outsideClickListener);
}

