/* OctopusFile docs: search, copy buttons, table of contents, theme, mobile menu. No libraries. */
(function () {
  "use strict";
  var root = document.body.getAttribute("data-root") || "";
  var pt = (document.documentElement.lang || "").indexOf("pt") === 0;
  var T = pt ? { copy: "Copiar", copied: "Copiado", none: "Nada encontrado para" }
             : { copy: "Copy", copied: "Copied", none: "Nothing found for" };

  // ------------------------------------------------------------------ language links remember the choice
  document.querySelectorAll("a[data-lang]").forEach(function (a) {
    a.addEventListener("click", function () {
      try { localStorage.setItem("of-lang", a.getAttribute("data-lang")); } catch (e) { /* not kept */ }
    });
  });

  // ------------------------------------------------------------------ theme
  var html = document.documentElement;
  function savedTheme() {
    try { return localStorage.getItem("of-theme"); } catch (e) { return null; }
  }
  function setTheme(t) {
    html.setAttribute("data-theme", t);
    try { localStorage.setItem("of-theme", t); } catch (e) { /* private mode: keep it for this page */ }
  }
  var initial = savedTheme() ||
    (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  html.setAttribute("data-theme", initial);
  var themeBtn = document.getElementById("theme");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      setTheme(html.getAttribute("data-theme") === "light" ? "dark" : "light");
    });
  }

  // ------------------------------------------------------------------ mobile menu
  var menuBtn = document.getElementById("menu");
  if (menuBtn) {
    menuBtn.addEventListener("click", function () { document.body.classList.toggle("nav-open"); });
    document.addEventListener("click", function (e) {
      if (document.body.classList.contains("nav-open") && !e.target.closest(".sidebar") && !e.target.closest("#menu")) {
        document.body.classList.remove("nav-open");
      }
    });
  }

  // ------------------------------------------------------------------ copy buttons
  document.querySelectorAll("pre").forEach(function (pre) {
    var btn = document.createElement("button");
    btn.className = "copy";
    btn.type = "button";
    btn.textContent = T.copy;
    btn.addEventListener("click", function () {
      var text = pre.querySelector("code").innerText;
      var done = function () {
        btn.textContent = T.copied;
        btn.classList.add("done");
        setTimeout(function () { btn.textContent = T.copy; btn.classList.remove("done"); }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
      } else {
        fallbackCopy(text);
        done();
      }
    });
    pre.appendChild(btn);
  });
  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) { /* nothing else to try */ }
    document.body.removeChild(ta);
  }

  // ------------------------------------------------------------------ table of contents + scroll spy
  var toc = document.getElementById("toc-list");
  var content = document.querySelector(".content");
  if (toc && content) {
    var heads = content.querySelectorAll("h2[id], h3[id]");
    if (heads.length < 2) {
      document.querySelector(".toc").style.visibility = "hidden";
    }
    var links = [];
    heads.forEach(function (h) {
      var a = document.createElement("a");
      a.href = "#" + h.id;
      a.textContent = h.firstChild ? h.firstChild.textContent : h.textContent;
      a.className = h.tagName === "H3" ? "l3" : "l2";
      toc.appendChild(a);
      links.push({ head: h, link: a });
    });
    var spy = function () {
      var current = null;
      for (var i = 0; i < links.length; i++) {
        if (links[i].head.getBoundingClientRect().top < 120) { current = links[i]; }
      }
      links.forEach(function (l) { l.link.classList.toggle("active", l === current); });
    };
    window.addEventListener("scroll", spy, { passive: true });
    spy();
  }

  // ------------------------------------------------------------------ search
  var input = document.getElementById("q");
  var box = document.getElementById("results");
  var index = window.OF_SEARCH || [];
  var sel = -1;

  function norm(s) {
    return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }
  index.forEach(function (e) { e._t = norm(e.title + " " + e.heading); e._x = norm(e.text); });

  function esc(s) {
    return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }
  function highlight(text, words) {
    var out = esc(text);
    words.forEach(function (w) {
      if (w.length < 2) { return; }
      var re = new RegExp("(" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
      out = out.replace(re, "<mark>$1</mark>");
    });
    return out;
  }
  function snippet(text, word) {
    var i = norm(text).indexOf(word);
    if (i < 0) { return text.slice(0, 140); }
    var from = Math.max(0, i - 50);
    return (from > 0 ? "…" : "") + text.slice(from, from + 150) + "…";
  }

  function search(q) {
    var words = norm(q).split(/\s+/).filter(Boolean);
    if (!words.length) { return []; }
    var scored = [];
    index.forEach(function (e) {
      var score = 0;
      for (var i = 0; i < words.length; i++) {
        var w = words[i];
        var inTitle = e._t.indexOf(w) >= 0;
        var inText = e._x.indexOf(w) >= 0;
        if (!inTitle && !inText) { return; }
        score += inTitle ? 10 : 1;
        if (e._t.indexOf(w) === 0) { score += 3; }
      }
      scored.push({ e: e, score: score });
    });
    scored.sort(function (a, b) { return b.score - a.score; });
    return scored.slice(0, 12).map(function (s) { return s.e; });
  }

  function render() {
    var q = input.value.trim();
    sel = -1;
    if (!q) { box.classList.remove("open"); box.innerHTML = ""; return; }
    var words = q.split(/\s+/);
    var hits = search(q);
    if (!hits.length) {
      box.innerHTML = '<div class="empty">' + T.none + ' “' + esc(q) + '”.</div>';
    } else {
      box.innerHTML = hits.map(function (h) {
        var title = h.heading ? h.heading : h.title;
        return '<a href="' + root + h.url + '"><div class="r-page">' + esc(h.title) + "</div>" +
          '<div class="r-title">' + highlight(title, words) + "</div>" +
          '<div class="r-text">' + highlight(snippet(h.text, norm(words[0])), words) + "</div></a>";
      }).join("");
    }
    box.classList.add("open");
  }

  function move(d) {
    var items = box.querySelectorAll("a");
    if (!items.length) { return; }
    sel = (sel + d + items.length) % items.length;
    items.forEach(function (a, i) { a.classList.toggle("sel", i === sel); });
    items[sel].scrollIntoView({ block: "nearest" });
  }

  if (input && box) {
    input.addEventListener("input", render);
    input.addEventListener("focus", function () { if (input.value) { render(); } });
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { move(1); e.preventDefault(); }
      else if (e.key === "ArrowUp") { move(-1); e.preventDefault(); }
      else if (e.key === "Enter") {
        var items = box.querySelectorAll("a");
        var target = items[sel >= 0 ? sel : 0];
        if (target) { window.location.href = target.getAttribute("href"); }
      } else if (e.key === "Escape") { input.value = ""; render(); input.blur(); }
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".search")) { box.classList.remove("open"); }
    });
    document.addEventListener("keydown", function (e) {
      var typing = /INPUT|TEXTAREA/.test(document.activeElement.tagName);
      if ((e.key === "/" && !typing) || (e.key.toLowerCase() === "k" && (e.ctrlKey || e.metaKey))) {
        e.preventDefault();
        input.focus();
        input.select();
      }
    });
  }
})();
