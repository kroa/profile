/* =====================================================================
   Interactions & rendering
   ===================================================================== */
(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Render: Projects timeline ---------- */
  function renderProjects() {
    const wrap = $("#timeline");
    if (!wrap || !window.PROFILE) return;
    wrap.innerHTML = PROFILE.projects
      .map((p, i) => {
        const points = p.points.map((pt) => `<li>${esc(pt)}</li>`).join("");
        const tags = p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("");
        const links = p.links && p.links.length
          ? `<div class="timeline__links">${p.links
              .map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${esc(l.label)} ↗</a>`)
              .join("")}</div>`
          : "";
        return `
        <article class="timeline__item reveal" data-reveal data-reveal-delay="${i % 3}">
          <div class="timeline__top">
            <span class="timeline__period">${esc(p.period)}</span>
            <span class="timeline__badge">${esc(p.badge)}</span>
          </div>
          <h3 class="timeline__title">${esc(p.title)}</h3>
          <p class="timeline__role">${esc(p.role)}</p>
          <ul class="timeline__points">${points}</ul>
          <div class="timeline__tags">${tags}</div>
          ${links}
        </article>`;
      })
      .join("");
  }

  /* ---------- Render: AI projects ---------- */
  function renderAI() {
    const wrap = $("#ai-grid");
    if (!wrap || !window.PROFILE) return;
    wrap.innerHTML = PROFILE.aiProjects
      .map((p, i) => {
        const points = p.points.map((pt) => `<li>${esc(pt)}</li>`).join("");
        const tags = p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("");
        const award = p.award ? `<span class="ai-card__award">${esc(p.award)}</span>` : "";
        return `
        <article class="ai-card reveal" data-reveal data-reveal-delay="${i}">
          <div><span class="ai-card__period">${esc(p.period)}</span>${award}</div>
          <h3 class="ai-card__title">${esc(p.title)}</h3>
          <ul class="ai-card__points">${points}</ul>
          <div class="timeline__tags">${tags}</div>
        </article>`;
      })
      .join("");
  }

  /* ---------- Render: Skills ---------- */
  function renderSkills() {
    const wrap = $("#skills-grid");
    if (!wrap || !window.PROFILE) return;
    wrap.innerHTML = PROFILE.skillGroups
      .map((g, i) => {
        const items = g.items
          .map(
            (it) =>
              `<li class="skill-item"><span>${esc(it.label)}</span>${
                it.note ? `<span class="skill-item__note">${esc(it.note)}</span>` : ""
              }</li>`
          )
          .join("");
        return `
        <div class="skill-group reveal" data-reveal data-reveal-delay="${i}">
          <h3 class="skill-group__name"><span>${esc(g.icon)}</span>${esc(g.name)}</h3>
          <ul class="skill-group__items">${items}</ul>
        </div>`;
      })
      .join("");
  }

  /* ---------- Render: Certifications ---------- */
  function renderCerts() {
    const wrap = $("#certs-grid");
    if (!wrap || !window.PROFILE) return;
    wrap.innerHTML = PROFILE.certs
      .map(
        (c, i) => `
        <div class="cert-card reveal" data-reveal data-reveal-delay="${i % 2}">
          <span class="cert-card__grade">${esc(c.grade)}</span>
          <h3 class="cert-card__name">${esc(c.name)}</h3>
          <div class="cert-card__dates">
            <span>취득 <b>${esc(c.issued)}</b></span>
            <span>유효 <b>${esc(c.valid)}</b></span>
          </div>
        </div>`
      )
      .join("");
  }

  /* ---------- Render: Activities ---------- */
  function renderActivities() {
    const wrap = $("#activities");
    if (!wrap || !window.PROFILE) return;
    wrap.innerHTML = PROFILE.activities
      .map(
        (a, i) => `
        <div class="activity reveal" data-reveal data-reveal-delay="${i % 2}">
          <span class="activity__period">${esc(a.period)}</span>
          <div>
            <div class="activity__title">${esc(a.title)}</div>
            <div class="activity__desc">${esc(a.desc)}</div>
          </div>
        </div>`
      )
      .join("");
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    const els = $$("[data-reveal]");
    els.forEach((el) => {
      const d = el.getAttribute("data-reveal-delay");
      if (d) el.style.setProperty("--d", d);
    });
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
  }

  /* ---------- Count-up stats ---------- */
  function initCounters() {
    const nums = $$(".hero__stat-num");
    if (!("IntersectionObserver" in window)) {
      nums.forEach((n) => (n.textContent = n.dataset.count + (n.dataset.suffix || "")));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          const target = parseInt(el.dataset.count, 10) || 0;
          const suffix = el.dataset.suffix || "";
          const dur = 1400;
          let start = null;
          const step = (ts) => {
            if (start === null) start = ts;
            const prog = Math.min((ts - start) / dur, 1);
            const eased = 1 - Math.pow(1 - prog, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (prog < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          io.unobserve(el);
        });
      },
      { threshold: 0.6 }
    );
    nums.forEach((n) => io.observe(n));
  }

  /* ---------- Nav: scroll state, active link, mobile toggle ---------- */
  function initNav() {
    const nav = $("#nav");
    const toggle = $("#navToggle");
    const links = $("#navLinks");

    const onScroll = () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 20);
      const progress = $("#scrollProgress");
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (toggle && links) {
      toggle.addEventListener("click", () => {
        const open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
      });
      links.addEventListener("click", (e) => {
        if (e.target.closest("a")) {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }

    // Active section highlight
    const sections = $$("main section[id]");
    const navLinks = $$(".nav__link");
    if ("IntersectionObserver" in window && sections.length) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              const id = e.target.id;
              navLinks.forEach((l) =>
                l.classList.toggle("is-active", l.getAttribute("href") === "#" + id)
              );
            }
          });
        },
        { threshold: 0.5 }
      );
      sections.forEach((s) => io.observe(s));
    }
  }

  /* ---------- Cursor glow (pointer only) ---------- */
  function initGlow() {
    const glow = $("#cursorGlow");
    if (!glow || !window.matchMedia("(pointer: fine)").matches) return;
    let raf = null;
    window.addEventListener("mousemove", (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
        raf = null;
      });
    });
  }

  /* ---------- Init ---------- */
  function init() {
    renderProjects();
    renderAI();
    renderSkills();
    renderCerts();
    renderActivities();
    initReveal();
    initCounters();
    initNav();
    initGlow();
    const yr = $("#year");
    if (yr) yr.textContent = "2026";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
