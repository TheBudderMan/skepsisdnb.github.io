window.addEventListener('load', () => {
    const ad = document.querySelector('.adsbygoogle');
    const iframe = ad?.querySelector('iframe');
  
    if (!ad) {
      console.warn('AdSense container not found.');
    } else if (iframe) {
      console.log('✅ AdSense ad iframe is rendering.');
    } else {
      console.warn('⚠️ AdSense container found, but no iframe loaded yet. It may be blocked, still loading, or limited by Google.');
    }
  });
  