// embed.js
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.embed-card').forEach(card => {
      card.addEventListener('click', () => {
        const src   = card.dataset.src;
        const width = card.dataset.width  || '100%';
        const height = card.dataset.height || '8em';
        const allow = card.dataset.allow || 'autoplay; encrypted-media';
  
        card.innerHTML = `
          <iframe
            width="${width}"
            height="${height}"
            src="${src}"
            frameborder="0"
            allow="${allow}"
            allowfullscreen
          ></iframe>
        `;
      }, { once: true });
    });
  });
  