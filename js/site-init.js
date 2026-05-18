(function () {
  function textOrDash(value) {
    if (value === null || value === undefined) return "—";
    const s = String(value).trim();
    return s.length ? s : "—";
  }

  function applySiteConfig() {
    if (typeof siteConfig === "undefined") return;

    document.querySelectorAll("[data-site]").forEach(function (el) {
      var key = el.getAttribute("data-site");
      if (!key || !(key in siteConfig)) return;
      el.textContent = textOrDash(siteConfig[key]);
    });

    document.querySelectorAll("[data-site-attr]").forEach(function (el) {
      var spec = el.getAttribute("data-site-attr");
      if (!spec || spec.indexOf(":") === -1) return;
      var parts = spec.split(":");
      var attr = parts[0].trim();
      var key = parts.slice(1).join(":").trim();
      if (!attr || !key || !(key in siteConfig)) return;
      var val = siteConfig[key];
      if (attr === "href" && key === "email") {
        var em = String(val || "").trim();
        el.setAttribute("href", em ? "mailto:" + em : "#contato");
      } else if (attr === "href" && key === "telefone") {
        var digits = String(val || "").replace(/\D/g, "");
        el.setAttribute("href", digits ? "tel:" + digits : "#contato");
      } else {
        el.setAttribute(attr, textOrDash(val));
      }
    });

    document.querySelectorAll("[data-site-wa]").forEach(function (el) {
      var key = el.getAttribute("data-site-wa");
      if (!key || !(key in siteConfig)) return;
      var raw = String(siteConfig[key] || "").replace(/\D/g, "");
      if (!raw) {
        el.setAttribute("href", "#contato");
        return;
      }
      var wa = raw;
      if (wa.length <= 11 && wa.indexOf("55") !== 0) {
        wa = "55" + wa;
      }
      el.setAttribute("href", "https://wa.me/" + wa);
    });
  }

  function initNavToggle() {
    document.querySelectorAll(".nav-toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var nav = document.getElementById("main-nav");
        if (nav) nav.classList.toggle("is-open");
        var expanded = nav && nav.classList.contains("is-open");
        btn.setAttribute("aria-expanded", expanded ? "true" : "false");
      });
    });
  }

  function onReady() {
    applySiteConfig();
    initNavToggle();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onReady);
  } else {
    onReady();
  }
})();
