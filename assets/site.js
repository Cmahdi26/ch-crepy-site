/* CH Crépy-en-Valois — mobile menu + GH Pages relative links */
(function () {
  var LINKS = [
    { href: "index.html", label: "Accueil" },
    { href: "organisation.html", label: "Organisation" },
    { href: "smr.html", label: "SMR" },
    { href: "usld.html", label: "USLD" },
    { href: "maisons-de-retraite.html", label: "Maisons de retraite" },
    { href: "qualite.html", label: "Qualité" },
    { href: "actualites.html", label: "Actualités" },
    { href: "emplois.html", label: "Emplois" },
    { href: "contact.html", label: "Contact" },
    { href: "login.html", label: "Espace pro" }
  ];

  function isProjectPages() {
    try {
      return /\/ch-crepy-site(\/|$)/.test(location.pathname);
    } catch (e) {
      return false;
    }
  }

  function toRelativeHtml(href) {
    if (!href || href.charAt(0) !== "/" || href.indexOf("//") === 0) return null;
    if (/^(https?:|tel:|mailto:|#|\?)/i.test(href)) return null;
    var u = href.slice(1);
    if (!u) return "index.html";
    var hash = "", q = "", path = u;
    var hi = u.indexOf("#");
    var qi = u.indexOf("?");
    if (hi >= 0) {
      path = u.slice(0, hi);
      hash = u.slice(hi);
    } else if (qi >= 0) {
      path = u.slice(0, qi);
      q = u.slice(qi);
    }
    path = path.replace(/\/$/, "");
    if (!path) return "index.html" + hash + q;
    if (
      path.indexOf("images/") === 0 ||
      path.indexOf("assets/") === 0 ||
      path.indexOf("fragments/") === 0
    ) {
      return path + hash + q;
    }
    if (path.slice(-5) === ".html") return path + hash + q;
    return path + ".html" + hash + q;
  }

  function rewriteAbsoluteLinks(root) {
    if (!isProjectPages()) return;
    var nodes = (root || document).querySelectorAll('a[href^="/"]');
    for (var i = 0; i < nodes.length; i++) {
      var a = nodes[i];
      var next = toRelativeHtml(a.getAttribute("href"));
      if (next) a.setAttribute("href", next);
    }
  }

  function ensureMobileNav() {
    var existing = document.getElementById("mobile-nav");
    if (existing) return existing;

    var panel = document.createElement("div");
    panel.id = "mobile-nav";
    panel.setAttribute("data-open", "0");
    panel.setAttribute("hidden", "");
    panel.style.display = "none";
    panel.style.position = "fixed";
    panel.style.inset = "0";
    panel.style.zIndex = "60";
    panel.style.background = "color-mix(in oklab, var(--color-bg-elevated, #fff) 96%, transparent)";
    panel.style.backdropFilter = "blur(10px)";
    panel.style.WebkitBackdropFilter = "blur(10px)";
    panel.style.overflowY = "auto";
    panel.style.padding = "1rem 1.25rem 2rem";

    var top = document.createElement("div");
    top.style.display = "flex";
    top.style.alignItems = "center";
    top.style.justifyContent = "space-between";
    top.style.gap = "0.75rem";
    top.style.marginBottom = "1.25rem";
    top.style.paddingTop = "0.5rem";

    var title = document.createElement("p");
    title.textContent = "Menu";
    title.style.margin = "0";
    title.style.fontWeight = "700";
    title.style.fontSize = "1.125rem";
    title.style.color = "var(--color-fg, #14201c)";

    var closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.setAttribute("aria-label", "Fermer le menu");
    closeBtn.textContent = "\u2715";
    closeBtn.style.width = "2.75rem";
    closeBtn.style.height = "2.75rem";
    closeBtn.style.borderRadius = "0.75rem";
    closeBtn.style.border = "1px solid var(--color-border, #d9e3df)";
    closeBtn.style.background = "var(--color-bg-elevated, #fff)";
    closeBtn.style.color = "var(--color-fg, #14201c)";
    closeBtn.style.fontSize = "1.125rem";
    closeBtn.style.cursor = "pointer";
    closeBtn.addEventListener("click", function () {
      setMobileOpen(false);
    });

    top.appendChild(title);
    top.appendChild(closeBtn);

    var list = document.createElement("nav");
    list.setAttribute("aria-label", "Navigation mobile");
    list.style.display = "grid";
    list.style.gap = "0.35rem";

    LINKS.forEach(function (item) {
      var a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.label;
      a.style.display = "block";
      a.style.padding = "0.9rem 1rem";
      a.style.borderRadius = "0.75rem";
      a.style.textDecoration = "none";
      a.style.fontWeight = "600";
      a.style.fontSize = "1rem";
      a.style.color = "var(--color-fg, #14201c)";
      a.style.background = "var(--color-bg-subtle, #f3f6f4)";
      a.addEventListener("click", function () {
        setMobileOpen(false);
      });
      list.appendChild(a);
    });

    var call = document.createElement("a");
    call.href = "tel:+33344591119";
    call.textContent = "Appeler le 03 44 59 11 19";
    call.style.display = "block";
    call.style.marginTop = "1rem";
    call.style.padding = "0.95rem 1rem";
    call.style.borderRadius = "0.75rem";
    call.style.textDecoration = "none";
    call.style.fontWeight = "700";
    call.style.textAlign = "center";
    call.style.color = "#fff";
    call.style.background = "var(--color-primary, #1f6b5c)";

    panel.appendChild(top);
    panel.appendChild(list);
    panel.appendChild(call);

    var host = document.querySelector("header") || document.body;
    if (host && host.parentNode) {
      host.parentNode.insertBefore(panel, host.nextSibling);
    } else {
      document.body.appendChild(panel);
    }
    return panel;
  }

  function setMobileOpen(open) {
    var nav = ensureMobileNav();
    var btn = document.querySelector(
      'button[aria-controls="mobile-nav"],button[aria-label*="menu" i],button[aria-label*="Menu"]'
    );
    if (open) {
      nav.removeAttribute("hidden");
      nav.style.display = "block";
      nav.setAttribute("data-open", "1");
      if (btn) btn.setAttribute("aria-expanded", "true");
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      nav.setAttribute("hidden", "");
      nav.style.display = "none";
      nav.setAttribute("data-open", "0");
      if (btn) btn.setAttribute("aria-expanded", "false");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
  }

  function wireMobileMenu() {
    ensureMobileNav();
    document
      .querySelectorAll(
        'button[aria-controls="mobile-nav"],button[aria-label*="menu" i],button[aria-label*="Menu"]'
      )
      .forEach(function (btn) {
        if (btn.getAttribute("data-bound-nav") === "1") return;
        btn.setAttribute("data-bound-nav", "1");
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          var nav = ensureMobileNav();
          var open = nav.getAttribute("data-open") === "1";
          setMobileOpen(!open);
        });
      });
  }

  function wireDropdowns() {
    document.querySelectorAll("button[aria-expanded]").forEach(function (b) {
      var controls = b.getAttribute("aria-controls") || "";
      if (controls === "mobile-nav") return;
      if (b.getAttribute("data-bound") === "1") return;
      b.setAttribute("data-bound", "1");
      b.addEventListener("click", function () {
        var exp = b.getAttribute("aria-expanded") === "true";
        b.setAttribute("aria-expanded", exp ? "false" : "true");
        var id = b.getAttribute("aria-controls");
        if (id) {
          var el = document.getElementById(id);
          if (el) {
            el.hidden = exp;
            el.style.display = exp ? "none" : "";
          }
        }
        var menu =
          b.parentElement && b.parentElement.querySelector('[role="menu"]');
        if (menu && !id) {
          menu.hidden = exp;
          menu.style.display = exp ? "none" : "";
        }
      });
    });
  }

  function removeSkeletonCircles(root) {
    (root || document)
      .querySelectorAll(
        'div.h-9.w-9.animate-pulse.rounded-full, div.animate-pulse.rounded-full[aria-hidden="true"]'
      )
      .forEach(function (el) {
        if (el && !el.children.length && !el.textContent.trim()) el.remove();
      });
  }

  function boot() {
    rewriteAbsoluteLinks(document);
    removeSkeletonCircles(document);
    wireMobileMenu();
    wireDropdowns();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.__chCrepyBoot = boot;
  window.__chCrepyMobileOpen = setMobileOpen;
})();
