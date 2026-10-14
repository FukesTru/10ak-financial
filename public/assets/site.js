// 1Oak Financial Group site script. Plain JavaScript, no libraries.
// Everything on the page works without it; this adds the menus, the Contact us scrolling and motion.
(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.add("js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Mark the current page in the header without changing the shared header markup.
  var here = location.pathname.replace(/index\.html$/, "");
  document.querySelectorAll(".nav-link, .m-link").forEach(function (a) {
    var href = a.getAttribute("href");
    if (href && href !== "/" && here.indexOf(href) === 0) a.setAttribute("aria-current", "page");
  });

  // Desktop dropdown menus: click or keyboard to open, Escape or outside click to close.
  var toggles = Array.prototype.slice.call(document.querySelectorAll(".nav-toggle"));
  function closeAll(except) {
    toggles.forEach(function (t) {
      if (t === except) return;
      t.setAttribute("aria-expanded", "false");
      document.getElementById(t.getAttribute("aria-controls")).hidden = true;
    });
  }
  toggles.forEach(function (t) {
    var panel = document.getElementById(t.getAttribute("aria-controls"));
    t.addEventListener("click", function () {
      var open = t.getAttribute("aria-expanded") === "true";
      closeAll(t);
      t.setAttribute("aria-expanded", open ? "false" : "true");
      panel.hidden = open;
    });
    panel.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeAll(); t.focus(); }
    });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".has-menu")) closeAll();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeAll();
  });

  // Mobile menu.
  var menuBtn = document.querySelector(".menu-button");
  var mobile = document.getElementById("mobile-menu");
  function setMenu(open) {
    if (!menuBtn || !mobile) return;
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menuBtn.querySelector(".i-open").style.display = open ? "none" : "";
    menuBtn.querySelector(".i-close").style.display = open ? "" : "none";
    mobile.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (menuBtn) {
    menuBtn.addEventListener("click", function () { setMenu(mobile.hidden); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !mobile.hidden) { setMenu(false); menuBtn.focus(); }
    });
  }
  document.querySelectorAll(".m-toggle").forEach(function (t) {
    t.addEventListener("click", function () {
      var sub = document.getElementById(t.getAttribute("aria-controls"));
      var open = t.getAttribute("aria-expanded") === "true";
      t.setAttribute("aria-expanded", open ? "false" : "true");
      sub.hidden = open;
    });
  });

  // Every "Contact us" link lands with the whole form in view, centred in the space between the
  // sticky header and, on a phone, the round buttons at the bottom of the screen.
  function formTop(form) {
    var col = form.closest(".reveal");
    if (col && !col.classList.contains("in")) {
      // Show the form in its final place first, so the measurement is not thrown off by the motion.
      col.style.transition = "none";
      col.classList.add("in");
      void col.offsetHeight;
      col.style.transition = "";
    }
    var header = document.querySelector(".site-header");
    var bar = document.querySelector(".action-bar .round-row");
    var top = header ? header.getBoundingClientRect().bottom : 0;
    var bottom = window.innerHeight;
    if (bar && bar.offsetParent !== null) bottom = Math.min(bottom, bar.getBoundingClientRect().top - 12);
    var r = form.getBoundingClientRect();
    var room = bottom - top;
    return window.scrollY + r.top - (r.height <= room ? top + (room - r.height) / 2 : top + 12);
  }
  function goToForm(e) {
    var form = document.getElementById("contact-form");
    if (!form) return;
    e.preventDefault();
    setMenu(false);
    window.scrollTo({ top: formTop(form), behavior: reduceMotion ? "auto" : "smooth" });
    if (history.replaceState) history.replaceState(null, "", "#contact-form");
    // Move keyboard focus into the form without scrolling again.
    var frame = form.querySelector("iframe");
    if (frame) window.setTimeout(function () { frame.focus({ preventScroll: true }); }, reduceMotion ? 0 : 700);
  }
  document.querySelectorAll('a[href="#contact-form"]').forEach(function (a) { a.addEventListener("click", goToForm); });
  if (location.hash === "#contact-form") {
    window.addEventListener("load", function () {
      var form = document.getElementById("contact-form");
      if (form) window.scrollTo({ top: formTop(form) });
    });
  }

  // Scroll movement: sections settle into place as they come into view.
  var items = document.querySelectorAll(".reveal");
  if (!reduceMotion && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }
})();
