function initContactModal() {
    const contactModal = document.getElementById('contactModal');
    const openBtn = document.querySelector('[data-open-contact]');
    const closeBtn = document.getElementById('closeContactModal');
  
    if (!contactModal || !openBtn || !closeBtn) return;
  
    openBtn.addEventListener('click', () => {
      contactModal.classList.remove('hidden');
    });
  
    closeBtn.addEventListener('click', () => {
      contactModal.classList.add('hidden');
    });
  
    window.addEventListener('click', e => {
      if (e.target === contactModal) {
        contactModal.classList.add('hidden');
      }
    });
  
    const form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        alert('Message sent! (placeholder)');
        contactModal.classList.add('hidden');
      });
    }
  }
  