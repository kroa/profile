/* =====================================================================
   Profile content data
   개인정보(전화/주소 등)는 포함하지 않습니다. 공개 가능한 정보만 사용.

   [이미지] assets/img/ 폴더에 아래 파일명으로 넣으면 자동 표시됩니다.
   파일이 없으면 우아한 플레이스홀더(그라데이션 + 아이콘)로 대체됩니다.
   ===================================================================== */

const PROFILE = {
  /* 프로필 사진 — assets/img/profile.png */
  profilePhoto: "assets/img/profile.png",

  /* ---------- 주요 프로젝트 (최신순) ---------- */
  projects: [
    {
      period: "2022.07 – 2025.06",
      badge: "아키텍처",
      title: "신세계백화점 차세대 영업정보·영업분석 시스템 구축",
      role: "AA / TA 아키텍트 · 아키텍처 리딩",
      points: [
        "AA·DBA·TA 영역 신규 아키텍처 설계 검토 및 변경, 산출물·성능·가용성·백업 테스트 리딩",
        "주요 영업 서비스에 AWS–신세계IDC Hybrid 클라우드 고가용성 환경 구현",
        "Datadog 기반 관제 체계 설계·운영 (커스텀 메트릭, 대시보드, AlertNow 연동)",
        "AWS Aurora MySQL 비용 절감 → 실제 운영비 대폭 절감 (사내 우수사원 수상)",
        "Redshift 동시성 성능 테스트 리딩 → 분석계 안정적 오픈 기여",
        "Amazon Linux OS 업그레이드 대응 → 차세대 운영환경 EOL 기간 확보",
      ],
      tags: ["AWS", "EKS", "Aurora MySQL", "Redshift", "Datadog", "Hybrid Cloud"],
      links: [],
      accent: "cloud",
      glyph: "☁️",
      img: "assets/img/proj-aws-architecture.png",
    },
    {
      period: "2021.03 – 2021.11",
      badge: "컨설팅",
      title: "차세대 시스템 구축 PI/ISP 컨설팅",
      role: "POS 컨설턴트",
      points: [
        "백화점 Legacy POS 시스템 현황 분석",
        "PI/ISP 기반 아키텍처 방향성 제시 및 기술 검토 수행",
        "기존 시스템 진단 및 개선 제안",
      ],
      tags: ["PI/ISP", "아키텍처 진단", "컨설팅"],
      links: [],
      accent: "plan",
      glyph: "🧭",
      img: "assets/img/proj-piisp.png",
    },
    {
      period: "2020.07 – 2021.02",
      badge: "DevOps · 최초",
      title: "신세계백화점 POS DevOps 운영환경 구축",
      role: "그룹사 최초 POS CI/CD 구축",
      points: [
        "그룹사 최초 POS DevOps 시스템 구축 (사내 내부 프로젝트)",
        "TFS 기반 C#·WPF·Xamarin·Winform 코드 빌드–배포 자동화 파이프라인 설계·구현",
        "국내 POS 업계 최초 DevOps 적용 → 사내 우수사원 수상",
        "배포 소요 시간 50% 이상 단축, 운영 안정성 향상",
      ],
      tags: ["TFS", "CI/CD", "C#", "WPF", "Xamarin"],
      links: [],
      accent: "devops",
      glyph: "🔧",
      img: "assets/img/proj-devops.png",
    },
    {
      period: "2019.09 – 2020.01",
      badge: "KIOSK",
      title: "SSG.COM 주문픽업 KIOSK (PIXEL) 도입·구축",
      role: "개발 PM",
      points: [
        "오프라인 이마트 매장에서 SSG.COM 물류 시스템과 연동, 주문 상품 픽업 KIOSK 개발",
        "신규 프로그램 개발 및 장비 디자인 기획·설계 참여",
        "오프라인–온라인 연계 시스템 설계 및 구축, POS UX/UI 기획·설계",
      ],
      tags: ["KIOSK", "O2O", "UX/UI"],
      links: [],
      accent: "kiosk",
      glyph: "📦",
      img: "assets/img/proj-ssg-pixel.png",
    },
    {
      period: "2018.10 – 2019.04",
      badge: "무인 · SCO",
      title: "신세계백화점 셀프계산대(SCO) 시스템 신규 구축",
      role: "개발 PM",
      points: [
        "식품관 고객이 직접 결제하는 무인 셀프 체크아웃 시스템 구축",
        "신규 장비 디자인 기획 및 설계 참여",
        "C#/WPF 기반 신규 프로그램 개발, POS UX/UI 기획·설계",
      ],
      tags: ["Self-Checkout", "C#", "WPF", "UX/UI"],
      links: [],
      accent: "kiosk",
      glyph: "🛒",
      img: "assets/img/proj-sco.png",
    },
    {
      period: "2018.04 – 2019.04",
      badge: "POS+ATM",
      title: "신세계백화점 캐시터미널(ATM+POS) 시스템 신규 구축",
      role: "개발 PM",
      points: [
        "현금 및 상품권 계수가 모두 가능한 만능 통합 POS 장비 구축",
        "신규 장비 디자인 기획 및 설계 참여",
        "POS+ATM 통합 신규 프로그램 개발 (C#/WPF 기반), POS UX/UI 기획·설계",
      ],
      tags: ["POS", "ATM", "C#", "WPF"],
      links: [],
      accent: "pos",
      glyph: "🏧",
      img: "assets/img/proj-cashterminal.png",
    },
    {
      period: "2017.08 – 2018.06",
      badge: "모바일",
      title: "신세계백화점 모바일 POS 도입",
      role: "개발 PM",
      points: [
        "신규 안드로이드 POS 장비 기획 및 선정 참여",
        "안드로이드 기반 Thin Client, Windows 서버 OS 기반 WCF 프로그램 개발 참여",
        "신규 POS UX/UI 기획 및 설계 참여",
      ],
      tags: ["Android", "Xamarin", "WCF", "Thin Client"],
      links: [
        { label: "iNews24 기사", url: "http://www.inews24.com/view/1105754" },
        { label: "ZDNet 기사", url: "https://www.zdnet.co.kr/view/?no=20180702085141" },
      ],
      accent: "pos",
      glyph: "📱",
      img: "assets/img/proj-mobile-pos.png",
    },
    {
      period: "2014.11 – 2016.02",
      badge: "PL · 최초",
      title: "신세계백화점 차세대 POS 및 태블릿 POS 도입",
      role: "차세대 POS 프로젝트 PL",
      points: [
        "POS·PDA·TABLET POS를 C# 기반 통합 프로그램으로 구현",
        "국내 백화점 최초 윈도우 태블릿 기반 POS 장비 도입 (7,000대 · 10.1인치/5인치)",
        "국내 백화점 최초 POS 보안 인증(KTC) 취득 (여신협회 인증번호 2016-011-P1)",
        "신규 태블릿 POS 기획·도입 및 POS UX/UI 기획·설계",
      ],
      tags: ["C#", "Tablet POS", "보안인증", "UX/UI"],
      links: [
        { label: "Microsoft 협업 영상", url: "https://www.youtube.com/watch?v=duj8Ejku9gQ" },
      ],
      accent: "pos",
      glyph: "🧾",
      img: "assets/img/proj-tablet-pos.png",
    },
  ],

  /* ---------- 개인 AI 프로젝트 ---------- */
  aiProjects: [
    {
      period: "2026.04 – 2026.05",
      award: "사내 AI League 우수상",
      title: "SecuDog · 오픈소스 걱정 없는 보안 스크립트 수행 도우미",
      points: [
        "100여 대 이상 서버 병렬 접속 후 취약점 점검",
        "DevX AI가 조치 가이드 자동 제시",
        "오픈소스 제로 의존성 (순수 Windows C# WPF 개발)",
        "폐쇄망(VDI)에서 사용 가능",
      ],
      tags: ["C#", "WPF", "AI", "보안"],
      accent: "ai",
      glyph: "🐕",
      img: "assets/img/ai-secudog.png",
    },
    {
      period: "2026.02 – 2026.03",
      award: null,
      title: "AI 시대 AA는 이렇게 일합니다 · n8n 시스템 성능 분석 자동화",
      points: [
        "DevX·MCP를 이용해 n8n 워크플로우 제작 (매일 오전 9시 리포트 자동 전달)",
        "영업정보 Aurora MySQL 및 영업분석 Redshift 성능 분석 자동화",
        "Jira 미종료 작업 · GitLab 머지 요청 · 당일 회의 안내",
      ],
      tags: ["n8n", "MCP", "Automation", "AI"],
      accent: "ai",
      glyph: "🤖",
      img: "assets/img/ai-n8n.png",
    },
  ],

  /* ---------- 기술 스택 ---------- */
  skillGroups: [
    {
      name: "Languages",
      icon: "◈",
      items: [
        { label: "Java / Spring", note: "최근 3년" },
        { label: "Python", note: "분석계 · 1년" },
        { label: "C#", note: "7년" },
        { label: "C / C++", note: "5년" },
        { label: "Flutter (Dart)", note: "앱 2년" },
      ],
    },
    {
      name: "Cloud · AWS",
      icon: "☁",
      items: [
        { label: "EKS · EC2 · Lambda", note: "" },
        { label: "Aurora MySQL / PostgreSQL", note: "" },
        { label: "Redshift · Spectrum · Federated", note: "" },
        { label: "S3 · EFS · SNS/SQS", note: "" },
        { label: "API Gateway · DMS · Secret Mgr", note: "" },
      ],
    },
    {
      name: "DevOps · 관제",
      icon: "⚙",
      items: [
        { label: "GitLab · Jenkins · TFS", note: "" },
        { label: "CI/CD 파이프라인", note: "그룹사 최초" },
        { label: "Datadog", note: "End-to-End · 3년" },
        { label: "Redis · AlertNow", note: "" },
      ],
    },
    {
      name: "Data · BI",
      icon: "▦",
      items: [
        { label: "Aurora / RDS MySQL", note: "" },
        { label: "Redshift 분석계", note: "" },
        { label: "Tableau (BI)", note: "" },
      ],
    },
  ],

  /* ---------- 자격증 (유효기간 미표시) ---------- */
  certs: [
    {
      name: "AWS Advanced Networking – Specialty",
      grade: "Specialty",
      issued: "2024.12.26",
    },
    {
      name: "AWS Certified Solutions Architect – Professional",
      grade: "Professional",
      issued: "2022.11.13",
    },
    {
      name: "AWS Certified Solutions Architect – Associate",
      grade: "Associate",
      issued: "2022.07.03",
    },
    {
      name: "AWS Certified Cloud Practitioner",
      grade: "Foundational",
      issued: "2021.01.30",
    },
  ],

  /* ---------- 세미나 & 해외 활동 ---------- */
  activities: [
    {
      period: "2018.03",
      title: "Retail Tech Japan 2018 전시회 참관",
      desc: "무인 점포·리테일 혁신 제품 견학 및 업계 네트워크 형성",
    },
    {
      period: "2017.04",
      title: "SuperSmart 도입 검토 출장 (이스라엘)",
      desc: "차별화된 쇼핑 경험을 위한 신기술 솔루션 검토, 신세계·이마트 워크샵 추진",
    },
    {
      period: "2017.03",
      title: "EuroShop 2017 참관 & SuperSmart CEO 미팅",
      desc: "유통 전문 박람회 견학 및 이스라엘 SuperSmart 도입 검토",
    },
    {
      period: "2017.03",
      title: "신세계그룹 All About POS 세미나 발표",
      desc: "‘POS H/W 아키텍처의 이해’ 주제 발표 진행",
    },
    {
      period: "2015.09",
      title: "핀란드 오울루 해외 출장",
      desc: "전세계 유일 5인치 Windows Tablet POS 장비 도입 위해 제조사 방문",
    },
  ],
};

/* classic <script> 환경에서 const는 window에 노출되지 않으므로 명시적으로 등록 */
if (typeof window !== "undefined") window.PROFILE = PROFILE;
