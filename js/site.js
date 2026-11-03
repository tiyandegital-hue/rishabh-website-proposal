/* ================================================================
   Proposal demo for [Friend's Business Name] — shared behaviour
   ONE swappable constant: change the value below and the whole
   site updates. No build step.
   ================================================================ */
(function () {
  "use strict";

  /* ---------- 1. Business name — THE swappable constant ---------- */
  var BUSINESS_NAME = "[Friend's Business Name]";

  document.querySelectorAll("[data-biz]").forEach(function (el) {
    el.textContent = BUSINESS_NAME;
  });

  /* ---------- 2. JS-available class (rest state stays visible) ---------- */
  document.documentElement.classList.remove("no-js");
  document.documentElement.classList.add("js");

  /* ---------- 3. Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- 4. Mobile menu — state machine: closed ⇄ open ---------- */
  var menuBtn = document.querySelector(".menu-btn");
  var mobileMenu = document.querySelector(".mobile-menu");
  var lastFocus = null;

  function setMenu(open) {
    if (!menuBtn || !mobileMenu) return;
    menuBtn.setAttribute("aria-expanded", String(open));
    mobileMenu.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    if (open) {
      lastFocus = document.activeElement;
      var first = mobileMenu.querySelector("a");
      if (first) first.focus();
    } else if (lastFocus) {
      lastFocus.focus();
    }
  }
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", function () {
      setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
    });
    var menuClose = mobileMenu.querySelector(".menu-close");
    if (menuClose) menuClose.addEventListener("click", function () { setMenu(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobileMenu.classList.contains("open")) setMenu(false);
    });
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
  }

  /* ---------- 5. Scroll reveals — stagger via --rd ---------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 6. Hero headline entrance delays ---------- */
  document.querySelectorAll(".rise > span").forEach(function (s, i) {
    s.style.setProperty("--rd", (0.05 + i * 0.12).toFixed(2) + "s");
  });

  /* ---------- 7. SIGNATURE — before/after slider ---------- */
  var stage = document.querySelector(".compare-stage");
  if (stage) {
    var after = stage.querySelector(".compare-after");
    var handle = stage.querySelector(".compare-handle");
    var grip = stage.querySelector(".compare-grip");
    var pos = 50; // percent — where the divider sits

    function setPos(p, announce) {
      pos = Math.max(4, Math.min(96, p));
      after.style.clipPath = "inset(0 0 0 " + pos + "%)";
      handle.style.left = pos + "%";
      grip.setAttribute("aria-valuenow", String(Math.round(pos)));
      if (announce) {
        var sr = stage.querySelector(".sr-pos");
        if (sr) sr.textContent = "Divider at " + Math.round(pos) + " percent.";
      }
    }

    function posFromEvent(e) {
      var r = stage.getBoundingClientRect();
      return ((e.clientX - r.left) / r.width) * 100;
    }

    var dragging = false;
    handle.addEventListener("pointerdown", function (e) {
      dragging = true;
      handle.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    handle.addEventListener("pointermove", function (e) {
      if (dragging) setPos(posFromEvent(e), false);
    });
    ["pointerup", "pointercancel"].forEach(function (ev) {
      handle.addEventListener(ev, function () { dragging = false; });
    });
    stage.addEventListener("pointerdown", function (e) {
      // clicking anywhere on the stage jumps the divider there
      if (e.target.closest(".compare-handle")) return;
      setPos(posFromEvent(e), true);
    });
    grip.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { setPos(pos - 5, true); e.preventDefault(); }
      if (e.key === "ArrowRight") { setPos(pos + 5, true); e.preventDefault(); }
      if (e.key === "Home") { setPos(4, true); e.preventDefault(); }
      if (e.key === "End") { setPos(96, true); e.preventDefault(); }
    });
    setPos(50, false);
  }

  /* ---------- 8. Image-break subtle scale (decoration only) ---------- */
  var breakImg = document.querySelector(".break img");
  if (breakImg && !reduceMotion && "IntersectionObserver" in window) {
    var bio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        breakImg.style.transform = entry.isIntersecting ? "scale(1.06)" : "scale(1)";
      });
    }, { threshold: 0.2 });
    bio.observe(breakImg);
  }

  /* ---------- 9. Demo contact form — no backend, honest thank-you ---------- */
  var form = document.getElementById("demo-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      form.hidden = true;
      var ok = document.getElementById("form-success");
      if (ok) {
        ok.hidden = false;
        ok.querySelector("h3").focus && ok.querySelector("h3").setAttribute("tabindex", "-1");
        ok.querySelector("h3").focus({ preventScroll: false });
      }
    });
  }
})();
