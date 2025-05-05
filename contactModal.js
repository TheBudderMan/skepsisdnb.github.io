function initContactModal() {
    const modal = document.getElementById('contactModal');
    const openBtn = document.querySelector('[data-open-contact]');
    const closeBtn = document.getElementById('closeContactModal');
  
    if (!modal || !openBtn || !closeBtn) {
      console.warn('Modal or buttons not found');
      return;
    }
  
    openBtn.addEventListener('click', () => {
      modal.classList.remove('hidden');
      document.body.classList.add('lock-scroll');
    });
  
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      document.body.classList.remove('lock-scroll');
    });
  
    window.addEventListener('click', e => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('lock-scroll');
      }
    });
  
    const form = document.getElementById('contactForm');
    if (!form) {
      console.warn('Form not found');
      return;
    }
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const formData = new FormData(form);
      const entries = Object.fromEntries(formData.entries());
  
      if (!entries.name || !entries.email || !entries.message) {
        showStatus('All fields are required.', 'error');
        return;
      }
  
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: formData
        });
  
        if (res.ok) {
          showStatus('Message sent! Thank you.', 'success');
          form.reset();
        } else {
          showStatus('Error sending message. Please try again.', 'error');
          console.error('Formspree response not OK:', await res.text());
        }
      } catch (err) {
        showStatus('Network error. Please check your connection.', 'error');
        console.error('Fetch error:', err);
      }
    });
  
    function showStatus(message, type) {
      let statusEl = document.getElementById('formStatus');
      if (!statusEl) {
        statusEl = document.createElement('p');
        statusEl.id = 'formStatus';
        statusEl.style.marginTop = '1em';
        form.appendChild(statusEl);
      }
      statusEl.textContent = message;
      statusEl.style.color = type === 'success' ? 'green' : 'red';
    }
  }
  