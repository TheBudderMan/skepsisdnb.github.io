document.addEventListener('DOMContentLoaded', () => {
  const routes = {
    '':       { template: '/templates/home.html',   title: 'Home',    description: 'Portfolio of Tyler Johnston-Kent aka Formant — developer, music producer, sound designer, and digital artist based in Canada.' },
    'home':   { template: '/templates/home.html',   title: 'Home',    description: 'Portfolio of Tyler Johnston-Kent aka Formant — developer, music producer, sound designer, and digital artist based in Canada.' },
    'about':  { template: '/templates/about.html',  title: 'About',   description: 'Learn more about Tyler Johnston-Kent’s background, skills, and artistic focus.' },
    'work':   { template: '/templates/work.html',   title: 'Work',    description: 'Explore creative projects by Tyler Johnston-Kent, including games, art, and interactive media.' },
    'music':  { template: '/templates/music.html',  title: 'Music',   description: 'Listen to Formant’s sound design and original compositions across platforms.' },
    'contact':{ template: '/templates/contact.html',title: 'Contact', description: 'Contact Tyler Johnston-Kent — digital artist, developer, and music producer.' },
    '404':    { template: '/templates/404.html',    title: '404',     description: 'Page not found' }
  };

  function lockScroll(state = true) {
    document.body.classList.toggle('lock-scroll', state);
    document.getElementById('content')?.classList.toggle('lock-scroll', state);
  }

  async function locationHandler() {
    const key = window.location.hash.replace(/^#/, '');
    const route = routes.hasOwnProperty(key) ? routes[key] : routes['404'];
    const isGhost = key === '';  // ghost page (initial load)
    const isHome = key === 'home';

    if (isGhost || isHome) {
      window.scrollTo(0, 0);
    }

    if (isHome && window.location.hash !== '#') {
      // If user visits #home, normalize to #
      history.replaceState(null, '', '#');
    }

    const html = await fetch(route.template).then(r => r.text());
    const outlet = document.getElementById('content');
    if (!outlet) return console.error('Router outlet (#content) not found!');
    outlet.innerHTML = html;

    const section = outlet.querySelector('section');
    if (section) {
      const footerHtml = await fetch('/templates/footer.html').then(r => r.text());
      section.insertAdjacentHTML('beforeend', footerHtml);
    }

    lockScroll(isGhost || isHome);

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

    const setMeta = (sel, content) => document.querySelector(sel)?.setAttribute('content', content);
    setMeta("meta[property='og:title']", `Formant | ${route.title}`);
    setMeta("meta[property='og:description']", route.description);
    setMeta("meta[property='og:url']", `https://www.formant.ca/#${key}`);
    setMeta("meta[name='twitter:title']", `Formant | ${route.title}`);
    setMeta("meta[name='twitter:description']", route.description);

    setupScrollSnapRouter();
  }

  function setupScrollSnapRouter() {
    const sectionOrder = ['home', 'about', 'work', 'music', 'contact'];
    const sections = document.querySelectorAll('#content > section');
    if (!sections.length) return;

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-route');
          if (window.location.hash !== `#${id}` && id !== 'home') {
            history.replaceState(null, '', `#${id}`);
          } else if (id === 'home' && window.location.hash !== '#') {
            history.replaceState(null, '', '#');
          }
        }
      }
    }, { threshold: 0.6 });

    sections.forEach((section, idx) => {
      section.setAttribute('data-route', sectionOrder[idx]);
      observer.observe(section);
    });
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

  // Initial load: don't force any redirect — let '' stay as ghost
  locationHandler();
});
