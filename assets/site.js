/* CH Crépy-en-Valois — client helpers for static deploy (GitHub Pages + Vercel) */
(function () {
  function isProjectPages() {
    // GitHub project site: /ch-crepy-site/ or /ch-crepy-site/index.html
    return /\/ch-crepy-site(\/|$)/.test(location.pathname);
  }

  /** Convert absolute app routes (/smr, /) to relative *.html for project Pages base path. */
  function toRelativeHtml(href) {
    if (!href || href.startsWith('http') || href.startsWith('//') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('#') || href.startsWith('?')) {
      return null;
    }
    if (!href.startsWith('/')) return null;
    // Keep protocol-relative and external-looking out
    const u = href.slice(1); // drop leading /
    if (!u) return 'index.html';
    const hashIdx = u.indexOf('#');
    const qIdx = u.indexOf('?');
    let path = u;
    let suffix = '';
    if (hashIdx >= 0) {
      path = u.slice(0, hashIdx);
      suffix = u.slice(hashIdx);
    } else if (qIdx >= 0) {
      path = u.slice(0, qIdx);
      suffix = u.slice(qIdx);
    }
    path = path.replace(/\/$/, '');
    if (!path) return 'index.html' + suffix;
    if (path.endsWith('.html')) return path + suffix;
    // /images/... or assets should stay under project if needed — only rewrite page routes
    if (path.startsWith('images/') || path.startsWith('assets/') || path.startsWith('fragments/')) {
      return path + suffix;
    }
    return path + '.html' + suffix;
  }

  function rewriteAbsoluteLinks(root) {
    if (!isProjectPages()) return;
    (root || document).querySelectorAll('a[href^="/"]').forEach(function (a) {
      const h = a.getAttribute('href');
      const next = toRelativeHtml(h);
      if (next) a.setAttribute('href', next);
    });
  }

  function wireUi() {
    document.querySelectorAll('button[aria-expanded]').forEach(function (b) {
      if (b.dataset.bound === '1') return;
      b.dataset.bound = '1';
      b.addEventListener('click', function () {
        const exp = b.getAttribute('aria-expanded') === 'true';
        b.setAttribute('aria-expanded', exp ? 'false' : 'true');
        const id = b.getAttribute('aria-controls');
        if (id) {
          const el = document.getElementById(id);
          if (el) {
            el.hidden = exp;
            el.style.display = exp ? 'none' : '';
          }
        }
        const menu = b.parentElement && b.parentElement.querySelector('[role="menu"]');
        if (menu && !id) {
          menu.hidden = exp;
          menu.style.display = exp ? 'none' : '';
        }
      });
    });

    document.querySelectorAll('button[aria-controls="mobile-nav"],button[aria-label*="menu" i],button[aria-label*="Menu"]').forEach(function (btn) {
      if (btn.dataset.boundNav === '1') return;
      btn.dataset.boundNav = '1';
      btn.addEventListener('click', function () {
        const nav = document.getElementById('mobile-nav');
        if (!nav) return;
        const open = nav.getAttribute('data-open') === '1' || (!nav.hidden && nav.style.display !== 'none' && nav.offsetParent !== null);
        if (open) {
          nav.setAttribute('data-open', '0');
          nav.hidden = true;
          nav.style.display = 'none';
          btn.setAttribute('aria-expanded', 'false');
        } else {
          nav.setAttribute('data-open', '1');
          nav.hidden = false;
          nav.style.display = 'block';
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  function boot() {
    rewriteAbsoluteLinks(document);
    wireUi();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
