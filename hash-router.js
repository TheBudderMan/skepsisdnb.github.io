document.addEventListener('DOMContentLoaded', () => {
  const routes = {
    '':       { template: 'templates/home.html',          title: 'Home',            description: 'Portfolio of Tyler Johnston-Kent aka Formant — developer, music producer, sound designer, and digital artist based in Canada.' },
    'home':   { template: 'templates/home.html',          title: 'Home',            description: 'Portfolio of Tyler Johnston-Kent aka Formant — developer, music producer, sound designer, and digital artist based in Canada.' },
    'about':  { template: 'templates/about.html',          title: 'About',           description: 'Learn more about Tyler Johnston-Kent’s background, skills, and artistic focus.' },
    'work':   { template: 'templates/work.html',           title: 'Work',            description: 'Explore creative projects by Tyler Johnston-Kent, including games, art, and interactive media.' },
    'music':  { template: 'templates/music.html',          title: 'Music',           description: 'Listen to Formant’s sound design and original compositions across platforms.' },
    'contact':{ template: 'templates/contact.html',        title: 'Contact',         description: 'Contact Tyler Johnston-Kent — digital artist, developer, and music producer.' },
    'privacy-policy': { template: 'templates/privacy-policy.html', title: 'Privacy Policy', description: 'Privacy policy for formant.ca — how cookies, analytics, and ad data are handled.' },
    '404':    { template: 'templates/404.html',            title: '404',             description: 'Page not found' }
  };
  
  
  

  function lockScroll(state = true) {
    document.body.classList.toggle('lock-scroll', state);
    document.getElementById('content')?.classList.toggle('lock-scroll', state);
  }

  async function locationHandler() {
    const key = window.location.hash.replace(/^#/, '');
    const normalizedKey = key === 'home' ? '' : key;
    const route = routes.hasOwnProperty(normalizedKey) ? routes[normalizedKey] : routes['404'];
    
    const isGhost = normalizedKey === '';
    const isHome = key === 'home';
  
    // Normalize #home → #
    if (isHome && window.location.hash === '#home') {
      history.replaceState(null, '', '#');
    }
  
    // Scroll to top for ghost/home
    if (isGhost || isHome) {
      window.scrollTo(0, 0);
    }
  
    // Load template with error catch
    let html;
    try {
      const res = await fetch(route.template);
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${route.template}`);
      html = await res.text();
    } catch (err) {
      console.error('Fetch error:', err);
      html = `<section><h1>404</h1><p>Failed to load ${route.template}</p></section>`;
    }
  
    const outlet = document.getElementById('content');
    if (!outlet) return console.error('Router outlet (#content) not found!');
    outlet.innerHTML = html;
    if (typeof initEmbeds === 'function') initEmbeds();
  
    // Inject footer
    const section = outlet.querySelector('section');
    if (section) {
      try {
        const footerRes = await fetch('templates/footer.html');
        if (footerRes.ok) {
          const footerHtml = await footerRes.text();
          section.insertAdjacentHTML('beforeend', footerHtml);
        }
      } catch (err) {
        console.warn('Footer load failed:', err);
      }
    }
  
    lockScroll(isGhost || isHome);
  
    if (typeof initCarousels === 'function') initCarousels();
  
    // Set year
    const yearSpan = document.querySelector('#currentYear');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  
    // SEO metadata
    document.title = `Formant | ${route.title}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', route.description);
  
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://www.formant.ca/#${key}`);
  
    const setMeta = (sel, content) => document.querySelector(sel)?.setAttribute('content', content);
    setMeta("meta[property='og:title']", `Formant | ${route.title}`);
    setMeta("meta[property='og:description']", route.description);
    setMeta("meta[property='og:url']", `https://www.formant.ca/#${key}`);
    setMeta("meta[name='twitter:title']", `Formant | ${route.title}`);
    setMeta("meta[name='twitter:description']", route.description);
  
    const targetSection = document.querySelector('#content > section');
    if (targetSection && !isGhost) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  

  function setupVerticalScrollRouting() {
    const sectionOrder = ['home', 'about', 'work', 'music', 'contact'];
    let scrollTimeout = null;
    let touchStartY = 0;
  
    function getCurrentIndex() {
      const current = window.location.hash.replace(/^#/, '') || 'home';
      return sectionOrder.indexOf(current);
    }
  
    function goToIndex(index) {
      if (index >= 0 && index < sectionOrder.length) {
        const target = sectionOrder[index];
        const newHash = target === 'home' ? '#' : `#${target}`;
        window.location.hash = newHash;
      }
    }
  
    function nextPage() {
      const currentIndex = getCurrentIndex();
      goToIndex(currentIndex + 1);
    }
  
    function previousPage() {
      const currentIndex = getCurrentIndex();
      goToIndex(currentIndex - 1);
    }
  
    function onWheel(e) {
      if (scrollTimeout) return;
      e.deltaY > 0 ? nextPage() : previousPage();
      scrollTimeout = setTimeout(() => scrollTimeout = null, 1000);
    }
  
    function onTouchStart(e) {
      touchStartY = e.touches[0].clientY;
    }
  
    function onTouchEnd(e) {
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < 30 || scrollTimeout) return;
      deltaY > 0 ? nextPage() : previousPage();
      scrollTimeout = setTimeout(() => scrollTimeout = null, 1000);
    }
  
    // Attach listeners once
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('touchend', onTouchEnd);
  
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
  }
  

  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = link.getAttribute('href');
      const current = window.location.hash;
  
      if (target === '#' && current !== '#') {
        history.pushState(null, '', '#');
        locationHandler(); // force the router to update to ghost page
      } else if (current !== target) {
        window.location.hash = target;
      }
    });
  });

  window.addEventListener('hashchange', locationHandler);
  // Set up scroll/swipe routing ONCE
setupVerticalScrollRouting();
  // Initial load: don't force any redirect — let '' stay as ghost
  document.addEventListener('DOMContentLoaded', () => {
    locationHandler();
  });
  locationHandler();
});
