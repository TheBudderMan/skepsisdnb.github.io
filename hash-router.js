// hash-router.js
document.addEventListener('DOMContentLoaded', () => {
  // Intercept nav clicks
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      window.location.hash = link.getAttribute('href');
    });
  });

  // Define routes
  const routes = {
    '':        { template: '/templates/index.html', title: 'Home',    description: 'Portfolio of Tyler Johnston-Kent aka Formant — developer, music producer, sound designer, and digital artist based in Canada.' },
    'about':   { template: '/templates/about.html', title: 'About',   description: 'Learn more about Tyler Johnston-Kent’s background, skills, and artistic focus.' },
    'work':    { template: '/templates/work.html',  title: 'Work',    description: 'Explore creative projects by Tyler Johnston-Kent, including games, art, and interactive media.' },
    'music':   { template: '/templates/music.html', title: 'Music',   description: 'Listen to Formant’s sound design and original compositions across platforms.' },
    'contact': { template: '/templates/contact.html', title: 'Contact', description: 'Contact Tyler Johnston-Kent — digital artist, developer, and music producer.' },
    '404':     { template: '/templates/404.html',   title: '404',     description: 'Page not found' }
  };

  // Load appropriate content
  async function locationHandler() {
    const key = window.location.hash.replace(/^#/, '');
    const route = routes[key] || routes['404'];

    const html = await fetch(route.template).then(r => r.text());
    const outlet = document.getElementById('content');
    if (!outlet) {
      console.error('Router outlet (#content) not found!');
      return;
    }

    outlet.innerHTML = html;
    if (typeof initCarousels === 'function') initCarousels();

    document.title = route.title;
    document
      .querySelector('meta[name="description"]')
      .setAttribute('content', route.description);
  }

  window.addEventListener('hashchange', locationHandler);
  locationHandler();
});
