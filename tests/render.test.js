/* =====================================================================
   Render tests (jsdom) — 소스 수정 시 반드시 통과해야 함
   실행: cd tests && npm install && npm test
   ===================================================================== */
const fs = require("fs");
const path = require("path");
const { JSDOM, VirtualConsole } = require("jsdom");

const ROOT = path.resolve(__dirname, "..");
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");

let passed = 0;
let failed = 0;
const problems = [];

function ok(cond, msg) {
  if (cond) {
    passed++;
    console.log("  ✓ " + msg);
  } else {
    failed++;
    problems.push(msg);
    console.log("  ✗ " + msg);
  }
}

(async function run() {
  console.log("\n🔍 Profile site render tests\n");

  // 1) JS syntax is validated separately via `node --check` in the harness;
  //    here we load everything into a real DOM and assert output.
  const html = read("index.html");
  const dataJs = read("js/data.js");
  const mainJs = read("js/main.js");

  // Capture any script errors surfaced through the virtual console.
  const vc = new VirtualConsole();
  const scriptErrors = [];
  vc.on("jsdomError", (e) => scriptErrors.push(e.message || String(e)));

  const dom = new JSDOM(html, {
    runScripts: "outside-only",
    pretendToBeVisual: true,
    virtualConsole: vc,
  });
  const { window } = dom;

  // Stub IntersectionObserver (jsdom has none) so reveal/counters run.
  window.IntersectionObserver = class {
    constructor(cb) { this.cb = cb; }
    observe(el) { this.cb([{ isIntersecting: true, target: el }], this); }
    unobserve() {}
    disconnect() {}
  };
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (fn) => setTimeout(() => fn(Date.now()), 0);
  }
  // jsdom has no matchMedia; browsers do. Stub so pointer-based features run.
  if (!window.matchMedia) {
    window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
  }

  // Execute the site scripts in the window context, in order.
  try {
    window.eval(dataJs + "\n;" + mainJs);
  } catch (e) {
    scriptErrors.push("eval: " + e.message);
  }

  // Allow rAF-based counters to settle.
  await new Promise((r) => setTimeout(r, 60));

  const doc = window.document;

  console.log("[구조 / 무결성]");
  ok(scriptErrors.length === 0, "스크립트 실행 중 오류 없음" + (scriptErrors.length ? " → " + scriptErrors.join("; ") : ""));
  ok(doc.documentElement.lang === "ko", "문서 언어가 ko");
  ok(/<title>[^<]*김승원[^<]*<\/title>/.test(html), "타이틀에 이름 포함");
  ok(!!window.PROFILE, "PROFILE 데이터 로드됨");

  console.log("\n[데이터 렌더링]");
  const projects = doc.querySelectorAll("#timeline .timeline__item");
  ok(projects.length === window.PROFILE.projects.length && projects.length === 8,
    `주요 프로젝트 ${projects.length}건 렌더링 (기대: 8)`);

  const ai = doc.querySelectorAll("#ai-grid .ai-card");
  ok(ai.length === window.PROFILE.aiProjects.length && ai.length === 2,
    `개인 AI 프로젝트 ${ai.length}건 렌더링 (기대: 2)`);

  const skills = doc.querySelectorAll("#skills-grid .skill-group");
  ok(skills.length === window.PROFILE.skillGroups.length && skills.length === 4,
    `기술 스택 그룹 ${skills.length}개 렌더링 (기대: 4)`);

  const certs = doc.querySelectorAll("#certs-grid .cert-card");
  ok(certs.length === window.PROFILE.certs.length && certs.length === 6,
    `자격증 ${certs.length}개 렌더링 (기대: 6)`);

  const acts = doc.querySelectorAll("#activities .activity");
  ok(acts.length === window.PROFILE.activities.length && acts.length === 5,
    `세미나/활동 ${acts.length}건 렌더링 (기대: 5)`);

  const papers = doc.querySelectorAll("#papers-list .paper");
  ok(papers.length === window.PROFILE.papers.length && papers.length === 4,
    `논문 ${papers.length}건 렌더링 (기대: 4)`);

  console.log("\n[사진 슬롯]");
  ok(!!doc.querySelector("#heroPhoto"), "히어로 프로필 사진 요소 존재");
  const projMedia = doc.querySelectorAll("#timeline .timeline__item .card-media");
  ok(projMedia.length === 8, `프로젝트 사진 슬롯 ${projMedia.length}개 (기대: 8)`);
  const projImgs = doc.querySelectorAll("#timeline .card-media img[data-fallback]");
  ok(projImgs.length === 8, `프로젝트 이미지 태그 ${projImgs.length}개 (기대: 8)`);
  const aiMedia = doc.querySelectorAll("#ai-grid .ai-card .card-media");
  ok(aiMedia.length === 2, `AI 프로젝트 사진 슬롯 ${aiMedia.length}개 (기대: 2)`);
  ok(Array.from(projImgs).every((im) => (im.getAttribute("src") || "").startsWith("assets/img/")),
    "프로젝트 이미지 경로가 assets/img/ 로 지정됨");
  const actShots = doc.querySelectorAll("#activities .activity__shot img[data-fallback]");
  ok(actShots.length === 10, `활동 사진 슬롯 ${actShots.length}개 (기대: 10)`);
  ok(Array.from(actShots).every((im) => (im.getAttribute("src") || "").startsWith("assets/img/act-")),
    "활동 사진 경로가 assets/img/act- 로 지정됨");
  ok(Array.from(actShots).every((im) => (im.getAttribute("alt") || "").trim() !== ""),
    "활동 사진에 대체텍스트(alt) 존재");
  ok(Array.from(actShots).every((im) => !/사진 \d+$/.test(im.getAttribute("alt") || "")),
    "활동 사진 alt가 자동생성 문구가 아닌 구체적 설명");

  console.log();
  console.log("[자격증 벤더 표기]");
  const vendors = Array.from(doc.querySelectorAll("#certs-grid .cert-card"))
    .map((c) => c.getAttribute("data-vendor") || "");
  ok(vendors.every((v) => v !== ""),
    "모든 자격증 카드에 data-vendor 지정(워터마크 AWS 고정 방지)");
  ok(vendors.includes("GCP") && vendors.includes("Azure") && vendors.includes("AWS"),
    `벤더 3종 모두 표기 (${Array.from(new Set(vendors)).join("/")})`);

  console.log();
  console.log("[네비게이션 무결성]");
  const navHrefs = Array.from(doc.querySelectorAll(".nav__link")).map((a) => a.getAttribute("href"));
  ok(navHrefs.every((h) => h && h.startsWith("#") && !!doc.querySelector(h)),
    "모든 네비 링크가 실제 섹션을 가리킴");

  console.log();
  console.log("[이미지 파일 실존 점검]");
  const refs = [window.PROFILE.profilePhoto]
    .concat(window.PROFILE.projects.map((x) => x.img))
    .concat(window.PROFILE.aiProjects.map((x) => x.img))
    .concat(
      window.PROFILE.activities.reduce(
        (acc, a) => acc.concat((a.imgs || []).map((im) => (typeof im === "string" ? im : im.src))),
        []
      )
    )
    .filter(Boolean);
  ok(refs.length === 21,
    `참조 이미지 ${refs.length}개 (기대: 21 = 프로필 1 + 프로젝트 8 + AI 2 + 활동 10)`);
  const missing = refs.filter((r) => !fs.existsSync(path.join(ROOT, r)));
  ok(missing.length === 0,
    missing.length ? "누락된 이미지 파일: " + missing.join(", ")
                   : "참조된 이미지 파일이 모두 존재");

  console.log("\n[자격증 · 유효기간 제외]");
  const certsText = doc.querySelector("#certs-grid").textContent;
  ok(!certsText.includes("유효"), "자격증에 '유효'(유효기간) 미표시");
  ok(certsText.includes("취득"), "자격증 취득일은 표시됨");
  ok(certsText.includes("Google") && certsText.includes("Azure"),
    "Google · Azure 자격증 노출");
  ok(certsText.includes("2021.02.18") && certsText.includes("2021.01.26"),
    "신규 자격증 취득일 정확히 표시");

  console.log("\n[홍보 영상 순서 · URL]");
  const videoLinks = Array.from(doc.querySelectorAll(".awards__list--links a"));
  ok(videoLinks.length === 2, "홍보 영상 링크 2개");
  ok(/duj8Ejku9gQ/.test(videoLinks[0].getAttribute("href")) && videoLinks[0].textContent.includes("MS"),
    "첫 번째 = MS 협업 영상(duj8Ejku9gQ)로 교체·순서 변경");
  ok(/R0P6jXCw4ic/.test(videoLinks[1].getAttribute("href")),
    "두 번째 = 소프트웨어 개발 직무 소개 영상");
  ok(!/c317VLcHiHk/.test(html), "기존 MS 영상 URL(c317VLcHiHk) 완전 제거");

  console.log("\n[핵심 콘텐츠 반영]");
  const body = doc.body.textContent;
  ok(body.includes("SecuDog"), "AI League 프로젝트(SecuDog) 노출");
  ok(body.includes("7,000") || body.includes("7,000대"), "태블릿 POS 7,000대 실적 노출");
  ok(body.includes("셀프계산대") || body.includes("SCO"), "셀프계산대(SCO) 프로젝트 노출");
  ok(body.includes("Datadog"), "Datadog 관제 경험 노출");
  ok(doc.querySelector("#year") && doc.querySelector("#year").textContent.trim() !== "", "푸터 연도 채워짐");
  ok(body.includes("마법한자대모험") && !!doc.querySelector('#side a[href*="magichanjaadventure"]'),
    "사이드 프로젝트(마법한자대모험) 노출 및 링크 연결");
  const papersText = doc.querySelector("#papers-list").textContent;
  ok(papersText.includes("P2P-SIP"), "논문 주제(P2P-SIP) 노출");
  ok(papersText.includes("대학원 졸업 논문"), "대학원 졸업 논문 표기");
  ok(papersText.includes("한국 정보처리학회") && papersText.includes("IEEE"),
    "국내·국제 학회 모두 표기");
  ok(papersText.includes("HICSS 2015") && !papersText.includes("HICSS 2017"),
    "HICSS 회차-연도 정합(48th / 2015)");

  const idxs = Array.from(doc.querySelectorAll(".section__index")).map((e) => e.textContent.trim());
  ok(idxs.join(",") === "01,02,03,04,05,06,07,08,09,10",
    `섹션 번호 순차 정렬 (${idxs.join(",")})`);

  console.log("\n[링크 / 보안]");
  const extLinks = Array.from(doc.querySelectorAll('a[target="_blank"]'));
  ok(extLinks.length > 0, `외부 링크 ${extLinks.length}개 존재`);
  ok(extLinks.every((a) => (a.getAttribute("rel") || "").includes("noopener")),
    "모든 외부 링크에 rel=noopener 적용");
  const mailto = doc.querySelector('a[href^="mailto:"]');
  ok(!!mailto, "연락처 이메일 링크 존재");

  console.log("\n[개인정보 노출 점검]");
  // 전화번호(휴대폰) 패턴이 노출되지 않아야 함
  const phone = /01[016789][-\s]?\d{3,4}[-\s]?\d{4}/;
  ok(!phone.test(body), "본문에 휴대폰 번호 패턴 없음");
  ok(!/주민등록|생년월일|\b\d{6}[-]\d{7}\b/.test(body), "주민번호/생년월일 노출 없음");

  console.log("\n----------------------------------------");
  console.log(`결과: ${passed} passed, ${failed} failed`);
  if (failed > 0) {
    console.log("실패 항목:\n - " + problems.join("\n - "));
    process.exit(1);
  }
  console.log("✅ 모든 테스트 통과\n");
})();
