// contactModal.js

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
    const submitBtn = form?.querySelector('button[type="submit"]');
  
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
  
      if (submitBtn) submitBtn.disabled = true;
  
      try {
        console.log('Submitting form to:', form.action);
        const res = await fetch(form.action, {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: formData
        });
        console.log('Fetch completed:', res);
  
        if (res.ok) {
          showStatus('Message sent! Thank you.', 'success');
          form.reset();
        } else {
          const text = await res.text();
          console.error('Formspree responded with non-OK:', res.status, text);
          showStatus('Error sending message. Please try again.', 'error');
        }
      } catch (err) {
        console.error('Fetch threw exception:', err);
        showStatus('Network error. Please check your connection.', 'error');
      } finally {
        if (submitBtn) submitBtn.disabled = false;
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
  
    function handleResize() {
      // Recalculate layout or positioning on resize
      if (!modal.classList.contains('hidden')) {
        modal.style.display = 'none'; // Force reflow
        void modal.offsetHeight; // Trigger reflow
        modal.style.display = '';
      }
    }
  
    window.addEventListener('resize', handleResize);
  }
  
  window.addEventListener('DOMContentLoaded', initContactModal);
  