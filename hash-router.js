document.addEventListener('DOMContentLoaded', () => {
  const routes = {
    'home': { template: '/templates/home.html', title: 'Home', description: 'Portfolio of Tyler Johnston-Kent aka Formant — developer, music producer, sound designer, and digital artist based in Canada.' },

    'about':   { template: '/templates/about.html', title: 'About',   description: 'Learn more about Tyler Johnston-Kent’s background, skills, and artistic focus.' },
    'work':    { template: '/templates/work.html',  title: 'Work',    description: 'Explore creative projects by Tyler Johnston-Kent, including games, art, and interactive media.' },
    'music':   { template: '/templates/music.html', title: 'Music',   description: 'Listen to Formant’s sound design and original compositions across platforms.' },
    'contact': { template: '/templates/contact.html', title: 'Contact', description: 'Contact Tyler Johnston-Kent — digital artist, developer, and music producer.' },
    '404':     { template: '/templates/404.html',   title: '404',     description: 'Page not found' }
  };

  function lockScroll(state = true) {
    document.body.classList.toggle('lock-scroll', state);
    document.getElementById('content')?.classList.toggle('lock-scroll', state);
  }

  async function locationHandler() {
    const key = window.location.hash.replace(/^#/, '');
    const route = routes[key] || routes['404'];
    const isHome = key === 'home';


    if (isHome) window.scrollTo(0, 0);

    const html = await fetch(route.template).then(r => r.text());
    const outlet = document.getElementById('content');
    if (!outlet) return console.error('Router outlet (#content) not found!');
    outlet.innerHTML = html;

    const section = outlet.querySelector('section');
    if (section) {
      const footerHtml = await fetch('/templates/footer.html').then(r => r.text());
      section.insertAdjacentHTML('beforeend', footerHtml);
    }

    document.body.classList.toggle('lock-scroll', isHome);
    outlet.classList.toggle('lock-scroll', isHome);

    if (typeof initCarousels === 'function') initCarousels();
    const yearSpan = document.querySelector('#currentYear');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    document.title = `Formant | ${route.title}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', route.description);

    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://www.formant.ca/#${key}`);

    document.querySelector('meta[property="og:title"]')?.setAttribute('content', `Formant | ${route.title}`);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', route.description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', `https://www.formant.ca/#${key}`);

    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', `Formant | ${route.title}`);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', route.description);
  }

  // Fix nav clicking even if hash doesn’t change
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = link.getAttribute('href');
      const current = window.location.hash;

      if (current === `#${target}` || (!target && !current)) {
        locationHandler(); // force reload if hash is same
      } else {
        window.location.hash = target;
      }
    });
  });

  if (!window.location.hash) {
    window.location.hash = '#home';
    return; // Let hashchange event handle the routing
  }
  
  window.addEventListener('hashchange', locationHandler);
  locationHandler();
});
