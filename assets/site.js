/* CH Crépy — fix absolute routes on GitHub project Pages (must work without full HTML redeploy) */
(function () {
  var BASE = "/ch-crepy-site/";
  function onPages() {
    try { return /\/ch-crepy-site(\/|$)/.test(location.pathname); } catch (e) { return false; }
  }
  function toRel(href) {
    if (!href || href.charAt(0) !== "/" || href.indexOf("//") === 0) return null;
    if (/^(https?:|tel:|mailto:|#|\?)/i.test(href)) return null;
    var u = href.slice(1);
    if (!u) return "index.html";
    var hash = "", q = "", path = u;
    var hi = u.indexOf("#");
    var qi = u.indexOf("?");
    if (hi >= 0) { path = u.slice(0, hi); hash = u.slice(hi); }
    else if (qi >= 0) { path = u.slice(0, qi); q = u.slice(qi); }
    path = path.replace(/\/$/, "");
    if (!path) return "index.html" + hash + q;
    if (path.indexOf("images/") === 0 || path.indexOf("assets/") === 0 || path.indexOf("fragments/") === 0) return path + hash + q;
    if (path.slice(-5) === ".html") return path + hash + q;
    return path + ".html" + hash + q;
  }
  function fix(root) {
    if (!onPages()) return;
    var nodes = (root || document).querySelectorAll("a[href^='/']");
    for (var i = 0; i < nodes.length; i++) {
      var a = nodes[i];
      var h = a.getAttribute("href");
      var n = toRel(h);
      if (n) a.setAttribute("href", n);
    }
  }
  // Run ASAP
  fix(document);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { fix(document); wire(); });
  } else {
    wire();
  }
  // Catch late-injected nodes
  try {
    new MutationObserver(function () { fix(document); }).observe(document.documentElement, { childList: true, subtree: true });
  } catch (e) {}

  function wire() {
    document.querySelectorAll("button[aria-expanded]").forEach(function (b) {
      if (b.getAttribute("data-bound") === "1") return;
      b.setAttribute("data-bound", "1");
      b.addEventListener("click", function () {
        var exp = b.getAttribute("aria-expanded") === "true";
        b.setAttribute("aria-expanded", exp ? "false" : "true");
        var id = b.getAttribute("aria-controls");
        if (id) {
          var el = document.getElementById(id);
          if (el) { el.hidden = exp; el.style.display = exp ? "none" : ""; }
        }
        var menu = b.parentElement && b.parentElement.querySelector('[role="menu"]');
        if (menu && !id) { menu.hidden = exp; menu.style.display = exp ? "none" : ""; }
      });
    });
    document.querySelectorAll('button[aria-controls="mobile-nav"],button[aria-label*="menu" i]').forEach(function (btn) {
      if (btn.getAttribute("data-bound-nav") === "1") return;
      btn.setAttribute("data-bound-nav", "1");
      btn.addEventListener("click", function () {
        var nav = document.getElementById("mobile-nav");
        if (!nav) return;
        var open = nav.getAttribute("data-open") === "1";
        nav.setAttribute("data-open", open ? "0" : "1");
        nav.hidden = open;
        nav.style.display = open ? "none" : "block";
        btn.setAttribute("aria-expanded", open ? "false" : "true");
      });
    });
  }
})();
