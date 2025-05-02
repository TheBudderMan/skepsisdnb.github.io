function initEmbeds() {
    const modal = document.getElementById('embed-modal');
    const playerContainer = document.getElementById('embed-player-container');
    const closeBtn = document.getElementById('close-embed-modal');
  
    if (!modal || !playerContainer || !closeBtn) return;
  
    // Event: Close on X button
    closeBtn.addEventListener('click', () => closeEmbedModal());
  
    // Event: Close on ESC or background click (set up once)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeEmbedModal();
      }
    });
  
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeEmbedModal();
      }
    });
  
    // Event: Trigger embed modal
    document.querySelectorAll('.embed-card').forEach(card => {
      card.addEventListener('click', () => {
        const src = card.dataset.src;
        const allow = card.dataset.allow || 'autoplay; encrypted-media';
        showEmbedModal(src, allow);
      });
    });
  
    function showEmbedModal(src, allow) {
      playerContainer.innerHTML = `
        <iframe
          src="${src}"
          allow="${allow}"
          allowfullscreen
          frameborder="0"
          width="100%"
          height="100%"
        ></iframe>
      `;
      modal.classList.remove('hidden');
    }
  
    function closeEmbedModal() {
      modal.classList.add('hidden');
      playerContainer.innerHTML = '';
    }
  }
  
  // Run on load
  document.addEventListener('DOMContentLoaded', initEmbeds);
  