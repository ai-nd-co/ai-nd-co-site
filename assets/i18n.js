// Language switch for a static site: English is in the HTML; Russian and Uzbek come from
// window.I18N (strings keyed by data-i18n) and from blocks marked data-lang="en|ru|uz".
(function () {
  var LANGS = ["en", "ru", "uz"];
  var KEY = "aindco-lang";
  var original = {};

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function store(lang) {
    try { localStorage.setItem(KEY, lang); } catch (e) { /* private mode: ignore */ }
  }
  function initial() {
    var q = new URLSearchParams(location.search).get("lang");
    if (LANGS.indexOf(q) >= 0) return q;
    var s = stored();
    if (LANGS.indexOf(s) >= 0) return s;
    return "en";
  }

  function apply(lang) {
    var dict = (window.I18N && window.I18N[lang]) || {};
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (!(k in original)) original[k] = el.innerHTML;
      el.innerHTML = lang === "en" ? original[k] : (dict[k] || original[k]);
    });
    document.querySelectorAll("[data-lang]").forEach(function (el) {
      el.hidden = el.getAttribute("data-lang").split(" ").indexOf(lang) < 0;
    });
    var t = document.querySelector("title[data-title-" + lang + "]");
    if (t) document.title = t.getAttribute("data-title-" + lang);
    else if (lang === "en" && original.__title) document.title = original.__title;
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-set-lang") === lang));
    });
    // Carry the language to the other pages even when storage is unavailable.
    document.querySelectorAll("a[data-page]").forEach(function (a) {
      var page = a.getAttribute("data-page");
      a.setAttribute("href", lang === "en" ? page : page + "?lang=" + lang);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    original.__title = document.title;
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.addEventListener("click", function () {
        var lang = b.getAttribute("data-set-lang");
        store(lang);
        apply(lang);
      });
    });
    apply(initial());
  });
})();
