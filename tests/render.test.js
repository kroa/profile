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
  ok(certs.length === window.PROFILE.certs.length && certs.length === 4,
    `자격증 ${certs.length}개 렌더링 (기대: 4)`);

  const acts = doc.querySelectorAll("#activities .activity");
  ok(acts.length === window.PROFILE.activities.length && acts.length === 5,
    `세미나/활동 ${acts.length}건 렌더링 (기대: 5)`);

  console.log("\n[핵심 콘텐츠 반영]");
  const body = doc.body.textContent;
  ok(body.includes("SecuDog"), "AI League 프로젝트(SecuDog) 노출");
  ok(body.includes("7,000") || body.includes("7,000대"), "태블릿 POS 7,000대 실적 노출");
  ok(body.includes("셀프계산대") || body.includes("SCO"), "셀프계산대(SCO) 프로젝트 노출");
  ok(body.includes("Datadog"), "Datadog 관제 경험 노출");
  ok(doc.querySelector("#year") && doc.querySelector("#year").textContent.trim() !== "", "푸터 연도 채워짐");

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
