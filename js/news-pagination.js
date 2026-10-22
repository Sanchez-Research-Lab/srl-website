(() => {
  'use strict';
  const articles = Array.from(document.querySelectorAll('.news-list article'));
  if (!articles.length) return;
  const perPage = 5;
  const total = Math.ceil(articles.length / perPage);
  const nav = document.createElement('nav');
  nav.className = 'news-pagination';
  nav.setAttribute('aria-label', 'News pages');
  articles[articles.length - 1].after(nav);

  function render() {
    const url = new URL(window.location.href);
    let page = Math.min(total, Math.max(1, Number.parseInt(url.searchParams.get('page'), 10) || 1));
    const target = articles.findIndex(article => '#' + article.id === url.hash && article.id);
    if (target >= 0) page = Math.floor(target / perPage) + 1;
    articles.forEach((article, index) => {
      article.hidden = Math.floor(index / perPage) + 1 !== page;
      article.querySelectorAll('video').forEach(video => {
        if (article.hidden) video.pause();
      });
    });
    nav.replaceChildren();
    const status = document.createElement('p');
    status.className = 'news-page-count';
    status.textContent = `Showing ${(page - 1) * perPage + 1}–${Math.min(page * perPage, articles.length)} of ${articles.length} news items`;
    nav.append(status);
    function link(label, number, current = false) {
      const a = document.createElement('a');
      const destination = new URL(window.location.href);
      destination.hash = '';
      destination.searchParams.set('page', number);
      a.href = destination.pathname + destination.search;
      a.textContent = label;
      if (current) a.setAttribute('aria-current', 'page');
      nav.append(a);
    }
    if (page > 1) link('← Previous', page - 1);
    for (let number = 1; number <= total; number++) link(String(number), number, number === page);
    if (page < total) link('Next →', page + 1);
    if (target >= 0) requestAnimationFrame(() => articles[target].scrollIntoView());
  }
  render();
  window.addEventListener('hashchange', render);
})();
