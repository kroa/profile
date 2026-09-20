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

  console.log();
  console.log("[교육 수료 · 서울대 EPM]");
  const eduCard = doc.querySelector("#education .edu__card");
  ok(!!eduCard, "EPM 교육 카드 렌더링");
  const eduText = eduCard ? eduCard.textContent : "";
  ok(eduText.includes("EPM") && eduText.includes("서울대학교"), "기관·과정명 표기");
  ok(eduText.includes("2026.03.27") && eduText.includes("2026.09.18"), "수료 기간 표기");
  ok(eduText.includes("메타 AI 글라스") && eduText.includes("최우수 프로젝트상"), "1등 수상·최우수 프로젝트상 표기");
  ok(eduText.includes("서울대학교 공과대학장") && eduText.includes("신세계아이앤씨"),
    "수여 기관(서울대 공과대학장 / 신세계아이앤씨) 명시");
  ok(eduText.includes("EPM 동문 네트워크"), "선후배 네트워크 표기");
  const eduShots = doc.querySelectorAll("#education .edu__shot img[data-fallback]");
  ok(eduShots.length === 4, `증빙 이미지 ${eduShots.length}개 (기대: 4)`);

  const seq = Array.from(doc.querySelectorAll("#awards *"));
  const at = (sel) => seq.indexOf(doc.querySelector(sel));
  ok(at(".awards") < at("#education") && at("#education") < at("#activities")
    && at("#activities") < at("#videos"),
    "배치 순서: 수상 → 교육수료 → 세미나/해외활동 → 홍보영상");

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
  console.log("[논문 링크]");
  const paperLinks = Array.from(doc.querySelectorAll("#papers-list .paper__title a"));
  const withUrl = window.PROFILE.papers.filter((x) => x.url).length;
  ok(paperLinks.length === withUrl,
    `논문 원문 링크 ${paperLinks.length}건 = url 지정 ${withUrl}건 (전체 ${window.PROFILE.papers.length}건)`);
  const paperRows = Array.from(doc.querySelectorAll("#papers-list .paper"));
  const rowOK = paperRows.every((row, i) => {
    const want = window.PROFILE.papers[i].url;
    const a = row.querySelector(".paper__title a");
    return want ? !!a && a.getAttribute("href") === want : !a;
  });
  ok(rowOK, "각 논문 행의 링크가 해당 논문 url과 정확히 대응");
  const srcs = Array.from(doc.querySelectorAll("#papers-list .paper__src"));
  ok(srcs.length === withUrl, `출처 표시 ${srcs.length}건 (링크 있는 논문 수와 일치)`);
  ok(srcs.every((a) => {
    const site = a.querySelector(".paper__site");
    const url = a.querySelector(".paper__url");
    if (!site || !url) return false;
    const href = a.getAttribute("href") || "";
    return site.textContent.trim() !== "" &&
      href.replace(/^https?:\/\//, "").replace(/\/$/, "") === url.textContent.trim();
  }), "출처에 사이트명 + 실제 href와 일치하는 주소 표시");
  ok(srcs.every((a) => (a.getAttribute("rel") || "").includes("noopener")), "출처 링크에 rel=noopener");

  console.log();
  console.log("[소개 사진 · 상담 · 수상]");
  const aboutPhoto = doc.querySelector(".about__photo img");
  ok(!!aboutPhoto && (aboutPhoto.getAttribute("src") || "").includes("idcard"),
    "소개에 사원증 사진 노출");
  ok((aboutPhoto && aboutPhoto.getAttribute("alt") || "").trim() !== "", "사원증 사진에 alt 존재");
  ok(doc.querySelectorAll(".about__photo").length === 1, "사원증 사진 중복 없이 1개");
  ok(!!doc.querySelector(".about__top .about__photo") && !!doc.querySelector(".about__top .about__lead"),
    "소개: 사진과 본문이 같은 2열 행에 배치");
  ok(!!doc.querySelector(".about > .about__pillars"), "강점 카드는 전체 폭 행으로 분리");
  ok(doc.querySelectorAll(".career__period .career__logo").length === 2,
    "경력 로고 2개가 좌측(기간) 컬럼에 배치");
  ok(doc.querySelectorAll(".career__company .career__logo").length === 0,
    "회사명 안에는 로고가 남아있지 않음");

  const mentor = doc.querySelectorAll("#mentoring .activity");
  ok(mentor.length === window.PROFILE.mentoring.length && mentor.length === 2,
    `채용·직무 상담 ${mentor.length}건 렌더링 (기대: 2)`);
  const mentorTxt = doc.querySelector("#mentoring").textContent;
  ok(mentorTxt.includes("2022.10.12") && mentorTxt.includes("메타버스"), "메타버스 직무 상담(2022.10.12) 표기");
  ok(mentorTxt.includes("2023.03.02") && mentorTxt.includes("채용박람회"), "대한민국 채용박람회(2023.03) 표기");
  const mSeq = Array.from(doc.querySelectorAll("#awards *"));
  ok(mSeq.indexOf(doc.querySelector("#education")) < mSeq.indexOf(doc.querySelector("#mentoring")) &&
     mSeq.indexOf(doc.querySelector("#mentoring")) < mSeq.indexOf(doc.querySelector("#activities")),
    "배치: 교육수료 → 채용·직무상담 → 세미나/해외활동");

  const awardsTxt = doc.querySelector(".awards").textContent;
  ok(awardsTxt.includes("클라우드 자격증 노하우 공유 대회") && awardsTxt.includes("2021.09.16"),
    "클라우드 자격증 노하우 공유 대회 우승(2021.09.16) 표기");
  ok(awardsTxt.includes("추신수") && awardsTxt.includes("최정"), "사인볼 부상 표기");
  ok(!/경진대회/.test(html), "구 명칭(경진대회) 완전 제거");
  ok(doc.querySelectorAll(".awards__shot").length === 0, "수상 카드에서 기념 사진 제외됨");
  ok(!/cloud\.jpg/.test(html + dataJs + mainJs), "cloud.jpg 참조 완전 제거");
  ok(doc.querySelectorAll(".awards .awards__group").length === 3, "수상 카드 3개");
  const awardLink = doc.querySelector(".awards__link");
  ok(!!awardLink && /awsbeginner/.test(awardLink.getAttribute("href") || ""),
    "공유 대회 카드에 AWS 자격증 학습 웹앱 링크 연결");
  ok((awardLink && awardLink.getAttribute("rel") || "").includes("noopener"), "수상 카드 링크에 rel=noopener");
  ok(awardsTxt.includes("Flutter") && awardsTxt.includes("사내 배포"), "Flutter 웹앱 제작·사내 배포 표기");
  const aiLeague = Array.from(doc.querySelectorAll(".awards__group"))
    .find((g) => g.textContent.includes("AI League"));
  ok(!!aiLeague && aiLeague.querySelectorAll(".awards__list li").length === 3,
    "AI League 우수상 항목 3줄");

  console.log();
  console.log("[경력 · 회사 소개]");
  const about = doc.querySelector(".career__about");
  ok(!!about, "지어소프트 회사 소개 블록 존재");
  const aboutTxt = about ? about.textContent : "";
  ok(aboutTxt.includes("오아시스몰") && aboutTxt.includes("새벽배송"), "오아시스몰·새벽배송 언급");
  ok(aboutTxt.includes("광고") && aboutTxt.includes("AI 무인 계산"), "광고 사업·리테일 AI 무인계산 언급");
  ok(doc.querySelector(".edu__title").textContent.includes("서울대학교 EPM"),
    "교육 수료 제목에 서울대학교 포함");
  ok(doc.querySelectorAll(".edu__org").length === 0, "제목에 기관명이 있으면 org 칩 중복 미노출");
  ok(paperLinks.every((a) => /^https:\/\//.test(a.getAttribute("href") || "")),
    "논문 링크가 모두 https");
  ok(paperLinks.every((a) => (a.getAttribute("rel") || "").includes("noopener")),
    "논문 링크에 rel=noopener");

  console.log();
  console.log("[사이드 프로젝트]");
  const sps = Array.from(doc.querySelectorAll("#side-list .sidepj"));
  ok(sps.length === window.PROFILE.sideProjects.length && sps.length === 2,
    `사이드 프로젝트 ${sps.length}건 (기대: 2)`);
  const spText = doc.querySelector("#side-list").textContent;
  ok(spText.includes("마법한자대모험") && spText.includes("ydmusic.pages.dev"),
    "한자 게임 + 음악학원 사이트 모두 노출");
  ok(spText.includes("여의도실용음악학원"),
    "학원 상호가 실제 사이트(여의도실용음악학원)와 일치");
  ok(spText.includes("운영 사이트") && !spText.includes("음악학원 소개 사이트"),
    "'소개 사이트'가 아니라 '운영 사이트'로 표기");
  const spPoints = Array.from(doc.querySelectorAll("#side-list .sidepj__point")).map((e) => e.textContent);
  ok(spPoints.length === 3, `학원 사이트 기능 ${spPoints.length}건 노출 (기대: 3)`);
  ok(spPoints.some((t) => t.includes("기타 연습실") && t.includes("코드")),
    "기타 연습실(키 변경·코드) 기능 표기");
  ok(spPoints.some((t) => t.includes("드럼 연습실") && t.includes("악보")),
    "드럼 연습실(연주→악보) 기능 표기");
  ok(spPoints.some((t) => t.includes("수강생") && t.includes("관리")),
    "수강생 이용·원장 관리 기능 표기");
  const spLinks = Array.from(doc.querySelectorAll("#side-list .sidepj__link"));
  ok(spLinks.length === 3, `사이드 프로젝트 링크 ${spLinks.length}개 (한자 2 + 학원 1)`);
  ok(spLinks.some((a) => /magichanjaadventure\.pages\.dev/.test(a.getAttribute("href") || "")),
    "마법한자대모험 접속 URL 연결");
  ok(spLinks.some((a) => /github\.com\/kroa\/magichanjaadventure/.test(a.getAttribute("href") || "")),
    "마법한자대모험 GitHub 링크 유지");
  ok(spLinks.every((a) => (a.getAttribute("rel") || "").includes("noopener")), "사이드 링크에 rel=noopener");
  ok(doc.querySelectorAll("#side-list a a").length === 0, "사이드 카드에 중첩 링크 없음");

  console.log();
  console.log("[연락처 · 소개 서식]");
  const cLinks = Array.from(doc.querySelectorAll(".contact__links a"));
  ok(cLinks.length === 1 && /github\.com/.test(cLinks[0].getAttribute("href")),
    `연락처 링크 ${cLinks.length}개 (GitHub만 유지)`);
  const contactHrefs = cLinks.map((a) => a.getAttribute("href") || "").join(" ");
  ok(!/blog\.naver\.com|awsbeginner/.test(contactHrefs), "연락처에서 Blog · AWS 자격증 앱 링크 제거");
  ok(!/blog\.naver\.com/.test(html), "Blog 링크는 사이트 전체에서 제거");
  ok(doc.querySelector(".contact__lead").textContent.includes("AI Agent"),
    "연락처 문구에 AI Agent 포함");
  ok(doc.querySelectorAll(".about__lead .lb").length === 4, "소개 문단 줄바꿈 4줄");

  console.log();
  console.log("[선택 이미지 슬롯 (없으면 폴백)]");
  const optional = window.PROFILE.certs.map((c) => c.img).filter(Boolean)
    .concat(Array.from(doc.querySelectorAll(".career__logo img")).map((i) => i.getAttribute("src")));
  ok(optional.length === 8, `슬롯 ${optional.length}개 선언 (자격증 6 + 회사 로고 2)`);
  ok(doc.querySelectorAll(".career__logo-txt").length === 2, "회사 로고 이니셜 폴백 존재");
  const badgeImgs = Array.from(doc.querySelectorAll(".cert-card__badge img[data-fallback]"));
  ok(badgeImgs.length === 6, `자격증 배지 슬롯 ${badgeImgs.length}개 렌더링 (기대: 6)`);
  ok(badgeImgs.every((im) => (im.getAttribute("src") || "").startsWith("assets/img/cert-")),
    "배지 경로가 assets/img/cert- 로 지정됨");
  ok(badgeImgs.every((im) => im.getAttribute("loading") !== "lazy"),
    "배지는 lazy 아님 (기본 숨김 + lazy 조합 교착 방지)");
  ok(Array.from(doc.querySelectorAll(".career__logo img")).every((im) => im.getAttribute("loading") !== "lazy"),
    "로고는 lazy 아님 (기본 숨김 + lazy 조합 교착 방지)");
  const pendingOpt = optional.filter((r) => !fs.existsSync(path.join(ROOT, r)));
  ok(pendingOpt.length === 0,
    pendingOpt.length ? "미배치 슬롯: " + pendingOpt.join(", ")
                      : "로고·배지 8개 파일 모두 존재");
  console.log("      ℹ 미배치 " + pendingOpt.length + "개 — 폴백 표시 중");

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
    .concat(((window.PROFILE.education || {}).shots || []).map((x) => x.src))
    .concat((window.PROFILE.videos || []).map((x) => x.thumb))
    .filter(Boolean);
  ok(refs.length === 27,
    `참조 이미지 ${refs.length}개 (기대: 27 = 프로필 1 + 프로젝트 8 + AI 2 + 활동 10 + EPM 4 + 영상 2)`);
  const missing = refs.filter((r) => !fs.existsSync(path.join(ROOT, r)));
  ok(missing.length === 0,
    missing.length ? "누락된 이미지 파일: " + missing.join(", ")
                   : "참조된 이미지 파일이 모두 존재");
  const domSrcs = Array.from(doc.querySelectorAll('img[src^="assets/img/"]'))
    .map((im) => im.getAttribute("src"));
  const domMissing = Array.from(new Set(domSrcs)).filter((r) => !fs.existsSync(path.join(ROOT, r)));
  ok(domMissing.length === 0,
    domMissing.length ? "DOM 에 있으나 파일 없는 이미지: " + domMissing.join(", ")
                      : `DOM 렌더 이미지 ${new Set(domSrcs).size}종 모두 파일 존재`);

  console.log("\n[자격증 · 유효기간 제외]");
  const certsText = doc.querySelector("#certs-grid").textContent;
  ok(!certsText.includes("유효"), "자격증에 '유효'(유효기간) 미표시");
  ok(certsText.includes("취득"), "자격증 취득일은 표시됨");
  ok(certsText.includes("Google") && certsText.includes("Azure"),
    "Google · Azure 자격증 노출");
  ok(certsText.includes("2021.02.18") && certsText.includes("2021.01.26"),
    "신규 자격증 취득일 정확히 표시");

  console.log("\n[홍보 영상 순서 · URL]");
  const videoLinks = Array.from(doc.querySelectorAll("#videos a.video-card"));
  ok(videoLinks.length === 2, "홍보 영상 카드 2개");
  ok(doc.querySelectorAll("#videos .video-card__thumb img[data-fallback]").length === 2,
    "영상 카드 썸네일 2개");
  ok(/duj8Ejku9gQ/.test(videoLinks[0].getAttribute("href")) && videoLinks[0].textContent.includes("MS"),
    "첫 번째 = MS 협업 영상(duj8Ejku9gQ)로 교체·순서 변경");
  ok(/R0P6jXCw4ic/.test(videoLinks[1].getAttribute("href")),
    "두 번째 = 소프트웨어 개발 직무 소개 영상");
  ok(!/c317VLcHiHk/.test(html + dataJs + mainJs), "기존 MS 영상 URL(c317VLcHiHk) 완전 제거");

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
