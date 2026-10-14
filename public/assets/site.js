// 1Oak Financial Group site script. Plain JavaScript, no libraries.
// Everything on the page works without it; this adds menus, the chat pop-up, form checks and motion.
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

  // Every "Contact us" link lands with the whole form in the middle of the screen.
  function goToForm(e) {
    var form = document.getElementById("contact-form");
    if (!form) return;
    e.preventDefault();
    setMenu(false);
    closeChat();
    form.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    if (history.replaceState) history.replaceState(null, "", "#contact-form");
    window.setTimeout(function () {
      var first = form.querySelector("input");
      if (first) first.focus({ preventScroll: true });
    }, reduceMotion ? 0 : 600);
  }
  document.querySelectorAll('a[href="#contact-form"]').forEach(function (a) { a.addEventListener("click", goToForm); });
  if (location.hash === "#contact-form") {
    window.addEventListener("load", function () {
      var form = document.getElementById("contact-form");
      if (form) form.scrollIntoView({ block: "center" });
    });
  }

  // Built-in chat pop-up. It only offers the phone and the form; it sends nothing anywhere.
  var chatBtn = document.querySelector(".round-btn.chat");
  var chat = document.getElementById("chat-panel");
  function closeChat() {
    if (!chat || chat.hidden) return;
    chat.hidden = true;
    chatBtn.setAttribute("aria-expanded", "false");
  }
  if (chatBtn && chat) {
    chatBtn.addEventListener("click", function () {
      var open = chat.hidden;
      chat.hidden = !open;
      chatBtn.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) chat.querySelector(".btn").focus();
    });
    chat.querySelector(".chat-close").addEventListener("click", function () { closeChat(); chatBtn.focus(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !chat.hidden) { closeChat(); chatBtn.focus(); }
    });
  }

  // Contact form. Checks the fields, then opens the visitor's email app with the message
  // addressed to the firm (the CRM form replaces this once it is connected).
  var form = document.querySelector("#contact-form form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fields = { name: form.elements.name, phone: form.elements.phone, email: form.elements.email };
      var bad = null;
      function check(el, ok, msg) {
        var err = document.getElementById(el.id + "-err");
        el.setAttribute("aria-invalid", ok ? "false" : "true");
        err.textContent = ok ? "" : msg;
        if (!ok && !bad) bad = el;
      }
      check(fields.name, fields.name.value.trim().length > 1, "Please enter your name.");
      check(fields.phone, fields.phone.value.replace(/\D/g, "").length >= 10, "Please enter a phone number we can call.");
      check(fields.email, /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.value.trim()), "Please enter a valid email address.");
      var consent = form.elements.consent;
      var cerr = document.getElementById("consent-err");
      if (!consent.checked) { cerr.textContent = "Please tick the box so we can reply to you."; if (!bad) bad = consent; } else { cerr.textContent = ""; }
      if (bad) { bad.focus(); return; }
      var to = form.getAttribute("data-to");
      var body = "Name: " + fields.name.value.trim() + "\nPhone: " + fields.phone.value.trim() + "\nEmail: " + fields.email.value.trim() +
        "\n\n" + form.elements.message.value.trim() + "\n\nSent from the website page " + location.pathname;
      window.location.href = "mailto:" + to + "?subject=" + encodeURIComponent("Website enquiry from " + fields.name.value.trim()) + "&body=" + encodeURIComponent(body);
      var status = form.querySelector(".form-status");
      status.hidden = false;
      status.focus();
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
