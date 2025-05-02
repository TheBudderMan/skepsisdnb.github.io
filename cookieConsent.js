document.addEventListener('DOMContentLoaded', () => {
  let banner = document.getElementById('cookie-consent-banner');

  // If banner doesn't exist in HTML, create it
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    document.body.appendChild(banner);
  }

  const consent = localStorage.getItem('cookieConsent');

  if (consent === 'accepted') {
    loadThirdPartyScripts();
    banner.remove();
    return;
  }

  if (consent === 'declined') {
    banner.remove();
    return;
  }

  // Inject banner if no decision yet
  banner.className = 'cookie-banner';
  banner.innerHTML = `
    <p>This site uses cookies for ads and analytics. Do you accept?</p>
    <div class="cookie-buttons">
      <button id="accept-cookies">Accept</button>
      <button id="decline-cookies">Decline</button>
    </div>
  `;

  document.getElementById('accept-cookies').addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    loadThirdPartyScripts();
    banner.remove();
  });

  document.getElementById('decline-cookies').addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'declined');
    banner.remove();
  });
});

function loadThirdPartyScripts() {
  // Google Analytics
  const gtagScript = document.createElement('script');
  gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-L499GQPJX9';
  gtagScript.async = true;
  document.head.appendChild(gtagScript);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'G-L499GQPJX9');

  // Google AdSense
  const adsScript = document.createElement('script');
  adsScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1246706747108680';
  adsScript.async = true;
  adsScript.crossOrigin = 'anonymous';
  document.head.appendChild(adsScript);
}

document.getElementById('resetConsent')?.addEventListener('click', () => {
  localStorage.removeItem('cookieConsent');
  location.reload(); // or show banner again
});
