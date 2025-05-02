document.addEventListener('DOMContentLoaded', () => {
    const consent = localStorage.getItem('cookieConsent');
    const banner = document.getElementById('cookie-consent-banner');
  
    if (consent === 'accepted') {
      loadThirdPartyScripts();
      banner?.remove();
      return;
    }
    if (consent === 'declined') {
      banner?.remove();
      return;
    }
  
banner.className = 'cookie-banner';
banner.innerHTML = `
  <p>This site uses cookies for ads and analytics. Do you accept?</p>
  <div class="cookie-buttons">
    <button id="accept-cookies">Accept</button>
    <button id="decline-cookies">Decline</button>
  </div>
`;

  
    // Basic styling (optional - put this in your CSS file ideally)
    banner.style.position = 'fixed';
    banner.style.bottom = '0';
    banner.style.left = '0';
    banner.style.right = '0';
    banner.style.background = '#000';
    banner.style.color = '#fff';
    banner.style.padding = '1em';
    banner.style.display = 'flex';
    banner.style.justifyContent = 'space-between';
    banner.style.alignItems = 'center';
    banner.style.zIndex = '1000';
  
    document.body.appendChild(banner);
  
    // Accept
    banner.querySelector('#accept-cookies').addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        loadThirdPartyScripts();
        banner.remove();
      });
  
    // Decline
    banner.querySelector('#decline-cookies').addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        banner.remove();
      });
  });
  
  function loadThirdPartyScripts() {
    // Load Google Analytics
    const gtagScript = document.createElement('script');
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-L499GQPJX9';
    gtagScript.async = true;
    document.head.appendChild(gtagScript);
  
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-L499GQPJX9');
  
    // Load Google Ads
    const adsScript = document.createElement('script');
    adsScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1246706747108680';
    adsScript.async = true;
    adsScript.crossOrigin = 'anonymous';
    document.head.appendChild(adsScript);
  }
  