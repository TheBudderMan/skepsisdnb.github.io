// hash-router.js
document.addEventListener('DOMContentLoaded', () => {
    // 1) Intercept your nav clicks and set the hash
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        window.location.hash = link.getAttribute('href');
      });
    });
  
    // 2) All your “routes” live here
    const routes = {
      '':    { template: '/templates/index.html', title: 'Home',    description: 'Portfolio of …' },
      '404': { template: '/templates/404.html',   title: '404',     description: 'Page not found' },
      // add other hashes: 'about', 'work', 'music', 'contact', etc.
    };
  
    // 3) The workhorse that fetches & injects
    async function locationHandler() {
      const key = window.location.hash.replace(/^#/, '');
      const route = routes[key] || routes['404'];
  
      const html = await fetch(route.template).then(r => r.text());
      // pick whichever container you actually have:
      const outlet = document.getElementById('content') 
                  || document.getElementById('main');
      if (!outlet) {
        console.error('Router outlet (#content or #main) not found!');
        return;
      }
  
      outlet.innerHTML = html;
      document.title = route.title;
      document
        .querySelector('meta[name="description"]')
        .setAttribute('content', route.description);
    }
  
    // 4) Listen for hash changes (and run once on load)
    window.addEventListener('hashchange', locationHandler);
    locationHandler();
  });
  