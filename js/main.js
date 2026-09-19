/* =====================================================================
   Interactions & rendering
   ===================================================================== */
(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* 주소 표시용 축약: 프로토콜·끝 슬래시 제거 */
  function prettyUrl(u) {
    return String(u).replace(/^https?:\/\//, "").replace(/\/$/, "");
  }

  /* 카드 미디어(사진) — 파일이 있으면 사진, 없으면 그라데이션+아이콘 플레이스홀더 */
  function mediaHTML(item, alt, wide) {
    const accent = item.accent || "pos";
    const glyph = item.glyph || "✦";
    const img = item.img
      ? `<img class="card-media__img" src="${esc(item.img)}" alt="${esc(alt)}" loading="lazy" data-fallback />`
      : "";
    return `<div class="card-media${wide ? " card-media--wide" : ""}" data-accent="${esc(accent)}">
        ${img}<span class="card-media__glyph" aria-hidden="true">${esc(glyph)}</span>
      </div>`;
  }

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
        <article class="timeline__item has-media reveal" data-reveal data-reveal-delay="${i % 3}">
          <div class="timeline__body">
            <div class="timeline__top">
              <span class="timeline__period">${esc(p.period)}</span>
              <span class="timeline__badge">${esc(p.badge)}</span>
            </div>
            <h3 class="timeline__title">${esc(p.title)}</h3>
            <p class="timeline__role">${esc(p.role)}</p>
            <ul class="timeline__points">${points}</ul>
            <div class="timeline__tags">${tags}</div>
            ${links}
          </div>
          ${mediaHTML(p, p.title)}
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
          ${mediaHTML(p, p.title, true)}
          <div class="ai-card__body">
            <div><span class="ai-card__period">${esc(p.period)}</span>${award}</div>
            <h3 class="ai-card__title">${esc(p.title)}</h3>
            <ul class="ai-card__points">${points}</ul>
            <div class="timeline__tags">${tags}</div>
          </div>
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
        <div class="cert-card reveal" data-reveal data-reveal-delay="${i % 2}" data-vendor="${esc(c.vendor || "")}">
          ${c.img ? `<span class="cert-card__badge"><img src="${esc(c.img)}" alt="" data-fallback /></span>` : ""}
          <span class="cert-card__grade">${esc(c.grade)}</span>
          <h3 class="cert-card__name">${esc(c.name)}</h3>
          <div class="cert-card__dates">
            <span>취득 <b>${esc(c.issued)}</b></span>
          </div>
        </div>`
      )
      .join("");
  }

  /* ---------- Render: Papers ---------- */
  function renderPapers() {
    const wrap = $("#papers-list");
    if (!wrap || !window.PROFILE || !PROFILE.papers) return;
    wrap.innerHTML = PROFILE.papers
      .map(
        (p, i) => `
        <li class="paper reveal" data-reveal data-reveal-delay="${i % 2}">
          <div class="paper__meta">
            <span class="paper__period">${esc(p.period)}</span>
            <span class="paper__venue">${esc(p.venue)}</span>
            ${p.note ? `<span class="paper__note">${esc(p.note)}</span>` : ""}
          </div>
          <p class="paper__title">${
            p.url
              ? `<a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">${esc(p.title)} <span class="ext" aria-hidden="true">↗</span></a>`
              : esc(p.title)
          }</p>
          ${
            p.url
              ? `<a class="paper__src" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">
                  <span class="paper__site">${esc(p.site || "원문")}</span>
                  <span class="paper__url">${esc(prettyUrl(p.url))}</span>
                </a>`
              : ""
          }
        </li>`
      )
      .join("");
  }

  /* ---------- Render: Education (SNU EPM) ---------- */
  function renderEducation() {
    const wrap = $("#education");
    if (!wrap || !window.PROFILE || !PROFILE.education) return;
    const e = PROFILE.education;
    const points = (e.points || []).map((pt) => `<li>${esc(pt)}</li>`).join("");
    const shots = (e.shots || [])
      .map(
        (sh) => `<a class="edu__shot" href="${esc(sh.src)}" target="_blank" rel="noopener noreferrer">
            <img src="${esc(sh.src)}" alt="${esc(sh.alt)}" loading="lazy" data-fallback />
            <span class="edu__shot-glyph" aria-hidden="true">🏅</span>
          </a>`
      )
      .join("");
    wrap.innerHTML = `
      <article class="edu__card reveal" data-reveal>
        <div class="edu__body">
          <div class="edu__meta">
            <span class="edu__period">${esc(e.period)}</span>
            ${e.org && e.title.indexOf(e.org) === -1 ? `<span class="edu__org">${esc(e.org)}</span>` : ""}
          </div>
          <h4 class="edu__title">${esc(e.title)}</h4>
          <ul class="edu__points">${points}</ul>
        </div>
        <div class="edu__shots">${shots}</div>
      </article>`;
  }

  /* ---------- Render: Side projects ---------- */
  function renderSideProjects() {
    const wrap = $("#side-list");
    if (!wrap || !window.PROFILE || !PROFILE.sideProjects) return;
    wrap.innerHTML = PROFILE.sideProjects
      .map(
        (sp, i) => `
        <a class="sidepj reveal" data-reveal data-reveal-delay="${i}"
           href="${esc(sp.url)}" target="_blank" rel="noopener noreferrer">
          <span class="sidepj__glyph" aria-hidden="true">${esc(sp.glyph || "✨")}</span>
          <span class="sidepj__body">
            <span class="sidepj__title">${esc(sp.title)} <span class="ext" aria-hidden="true">↗</span></span>
            <span class="sidepj__desc">${esc(sp.desc)}</span>
            <span class="sidepj__repo">${esc(sp.label)}</span>
          </span>
        </a>`
      )
      .join("");
  }

  /* ---------- Render: Promo videos ---------- */
  function renderVideos() {
    const wrap = $("#videos");
    if (!wrap || !window.PROFILE || !PROFILE.videos) return;
    wrap.innerHTML = PROFILE.videos
      .map(
        (v, i) => `
        <a class="video-card reveal" data-reveal data-reveal-delay="${i}"
           href="${esc(v.url)}" target="_blank" rel="noopener noreferrer">
          <span class="video-card__thumb">
            <img src="${esc(v.thumb)}" alt="" loading="lazy" data-fallback />
            <span class="video-card__play" aria-hidden="true">▶</span>
          </span>
          <span class="video-card__body">
            <span class="video-card__title">${esc(v.title)} <span class="ext" aria-hidden="true">↗</span></span>
            <span class="video-card__desc">${esc(v.desc)}</span>
          </span>
        </a>`
      )
      .join("");
  }

  /* ---------- Render: Activities ---------- */
  function renderActivities() {
    const wrap = $("#activities");
    if (!wrap || !window.PROFILE) return;
    wrap.innerHTML = PROFILE.activities
      .map((a, i) => {
        const shots =
          a.imgs && a.imgs.length
            ? `<div class="activity__shots">${a.imgs
                .map(
                  (im, n) => {
                    const src = typeof im === "string" ? im : im.src;
                    const alt = (typeof im === "string" ? "" : im.alt) || `${a.title} 사진 ${n + 1}`;
                    return `<span class="activity__shot">
                    <img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" data-fallback />
                    <span class="activity__shot-glyph" aria-hidden="true">📷</span>
                  </span>`;
                  }
                )
                .join("")}</div>`
            : "";
        return `
        <div class="activity${a.imgs && a.imgs.length ? " has-shots" : ""} reveal" data-reveal data-reveal-delay="${i % 2}">
          <span class="activity__period">${esc(a.period)}</span>
          <div>
            <div class="activity__title">${esc(a.title)}</div>
            <div class="activity__desc">${esc(a.desc)}</div>
            ${shots}
          </div>
        </div>`;
      })
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
              const match = navLinks.find((l) => l.getAttribute("href") === "#" + id);
              if (!match) return; // 네비에 없는 섹션(#side)에서는 직전 하이라이트 유지
              navLinks.forEach((l) => l.classList.toggle("is-active", l === match));
            }
          });
        },
        { threshold: 0.5 }
      );
      sections.forEach((s) => io.observe(s));
    }
  }

  /* ---------- Hero portrait ---------- */
  function initHeroPhoto() {
    const img = $("#heroPhoto");
    if (!img) return;
    const src = window.PROFILE && PROFILE.profilePhoto;
    if (!src) return;
    img.addEventListener("load", () => img.classList.add("is-loaded"));
    img.addEventListener("error", () => img.classList.remove("is-loaded"));
    img.src = src;
  }

  /* ---------- Image fallback: 로딩 성공 시에만 표시(실패하면 플레이스홀더 유지) ---------- */
  function initImageFallback() {
    $$("img[data-fallback]").forEach((img) => {
      const reveal = () => {
        img.classList.add("is-loaded");
        // 배지는 기본 숨김 — 실제로 로드된 경우에만 노출(:has 미지원 브라우저 대응)
        const box = img.parentNode;
        if (box && box.classList &&
            (box.classList.contains("cert-card__badge") || box.classList.contains("career__logo"))) {
          box.classList.add("is-ready");
        }
      };
      const hide = () => img.classList.remove("is-loaded");
      if (img.complete && img.naturalWidth > 0) reveal();
      img.addEventListener("load", reveal);
      img.addEventListener("error", hide);
    });
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
    renderPapers();
    renderEducation();
    renderActivities();
    renderSideProjects();
    renderVideos();
    initHeroPhoto();
    initImageFallback();
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
