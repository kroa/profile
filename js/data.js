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
        { label: "EKS · EC2", note: "" },
        { label: "Aurora MySQL / PostgreSQL", note: "" },
        { label: "Redshift · Spectrum · Federated", note: "" },
        { label: "S3 · EFS · SNS/SQS", note: "" },
        { label: "API Gateway · DMS · Secret Manager", note: "" },
      ],
    },
    {
      name: "DevOps · 관제",
      icon: "⚙",
      items: [
        { label: "GitLab · Jenkins · TFS", note: "" },
        { label: "CI/CD 파이프라인", note: "" },
        { label: "Datadog", note: "" },
        { label: "Redis · AlertNow", note: "" },
      ],
    },
    {
      name: "Data · DW · BI",
      icon: "▦",
      items: [
        { label: "Aurora / RDS MySQL", note: "" },
        { label: "Redshift 분석계", note: "" },
        { label: "Metastream", note: "" },
        { label: "Tableau (BI)", note: "" },
      ],
    },
  ],

  /* ---------- 자격증 (유효기간 미표시) ---------- */
  certs: [
    {
      name: "AWS Advanced Networking – Specialty",
      vendor: "AWS",
      grade: "Specialty",
      issued: "2024.12.26",
      img: "assets/img/cert-aws-ans.png",
    },
    {
      name: "AWS Certified Solutions Architect – Professional",
      vendor: "AWS",
      grade: "Professional",
      issued: "2022.11.13",
      img: "assets/img/cert-aws-sap.png",
    },
    {
      name: "AWS Certified Solutions Architect – Associate",
      vendor: "AWS",
      grade: "Associate",
      issued: "2022.07.03",
      img: "assets/img/cert-aws-saa.png",
    },
    {
      name: "Google Cloud Certified – Associate Cloud Engineer",
      vendor: "GCP",
      grade: "Associate",
      issued: "2021.02.18",
      img: "assets/img/cert-gcp-ace.png",
    },
    {
      name: "AWS Certified Cloud Practitioner",
      vendor: "AWS",
      grade: "Foundational",
      issued: "2021.01.30",
      img: "assets/img/cert-aws-ccp.png",
    },
    {
      name: "Microsoft Certified: Azure Fundamentals",
      vendor: "Azure",
      grade: "Fundamentals",
      issued: "2021.01.26",
      img: "assets/img/cert-azure-af.png",
    },
  ],

  /* ---------- 사이드 프로젝트 ---------- */
  sideProjects: [
    {
      title: "마법한자대모험",
      desc: "아들이 요청해서 만든 한자 학습 게임",
      url: "https://github.com/kroa/magichanjaadventure",
      label: "github.com/kroa/magichanjaadventure",
      glyph: "🀄",
    },
    {
      title: "여의도실용음악학원 소개 사이트",
      desc: "동생들이 요청해서 만든 실용음악학원 소개 웹사이트",
      url: "https://ydmusic.pages.dev/",
      label: "ydmusic.pages.dev",
      glyph: "🎹",
    },
  ],

  /* ---------- 채용 · 직무 상담 (최신순) ---------- */
  mentoring: [
    {
      period: "2023.03.02 – 03.03",
      title: "대한민국 채용박람회 참여 · 양재 aT센터",
      desc: "취업예정자와 이직희망자를 대상으로 채용 및 직무 상담을 진행했습니다.",
    },
    {
      period: "2022.10.12",
      title: "메타버스 직무 상담 · 사내 진행",
      desc: "취업예정자를 대상으로 신세계아이앤씨의 직무를 메타버스 환경에서 상담했습니다.",
    },
  ],

  /* ---------- 교육 수료 (서울대 EPM) ---------- */
  education: {
    period: "2026.03.27 – 2026.09.18",
    org: "서울대학교",
    title: "서울대학교 EPM (Engineering Project Manager) 과정 수료",
    points: [
      "리더십 워크샵 · AI4PM 워크샵 교육 수료",
      "AI4PM 워크샵 조별 발표 1등 — 메타 AI 글라스 수상",
      "최우수 프로젝트상 (서울대학교 공과대학장) · 우수 프로젝트상 표창 (신세계아이앤씨)",
      "서울대학교 EPM 동문 네트워크 구축",
    ],
    shots: [
      { src: "assets/img/snu-epm-award-1st.jpg",  alt: "우수 프로젝트상 표창장 · 신세계아이앤씨 대표이사 (제260918-02호)" },
      { src: "assets/img/snu-epm-award-best.jpg", alt: "최우수 프로젝트상 상장 · 서울대학교 공과대학장 (제30-33호)" },
      { src: "assets/img/snu-epm-cert-1.jpg",     alt: "Certified Engineering Project Manager 인증 명패 · 서울대학교 공과대학 (No. 03006)" },
      { src: "assets/img/snu-epm-cert-2.jpg",     alt: "엔지니어링 프로젝트 매니지먼트 과정 이수증서 · 서울대학교 (제30-07호)" },
    ],
  },

  /* ---------- 사내외 홍보 영상 ---------- */
  videos: [
    {
      title: "MS 협업 태블릿 POS 소개 영상",
      desc: "Microsoft와 협업한 국내 백화점 최초 윈도우 태블릿 POS 도입 사례",
      url: "https://www.youtube.com/watch?v=duj8Ejku9gQ",
      thumb: "assets/img/ms_youtube.jpg",
    },
    {
      title: "소프트웨어 개발 직무 소개 영상",
      desc: "신세계아이앤씨 소프트웨어 개발 직무 소개",
      url: "https://www.youtube.com/watch?v=R0P6jXCw4ic&t=3s",
      thumb: "assets/img/inc_youtube.jpg",
    },
  ],

  /* ---------- 논문 (게재 최신순) ---------- */
  papers: [
    {
      period: "2015.03",
      venue: "IEEE 48th International Conference on HICSS 2015, Hawaii",
      url: "https://ieeexplore.ieee.org/document/7070470/",
      site: "IEEE Xplore",
      title:
        "On PMIPv6-Based Mobility Support for Hierarchical P2P-SIP Architecture in Intelligent Transportation System",
      note: "",
    },
    {
      period: "2014.04",
      venue: "한국 정보처리학회",
      url: "https://doi.org/10.3745/KTCCS.2014.3.4.115",
      site: "KIPS · DOI",
      title:
        "지능형 홈네트워크에서 퍼지 논리 기반의 쿼럼 시스템을 적용한 P2P-SIP 구조의 설계 및 분석",
      note: "대학원 졸업 논문",
    },
    {
      period: "2013.12",
      venue: "IEEE 9th International Conference on MSN 2013, China",
      url: "https://ieeexplore.ieee.org/document/6726349/",
      site: "IEEE Xplore",
      title:
        "Design and Performance Analysis of a Novel P2P-SIP Architecture for Network-Based Mobility Support in Intelligent Home Networks",
      note: "",
    },
    {
      period: "2013.07",
      venue: "한국 정보처리학회",
      url: "https://doi.org/10.3745/KTCCS.2013.2.7.293",
      site: "KIPS · DOI",
      title:
        "지능형 홈네트워크에서 네트워크 기반의 이동성 지원을 위한 P2P-SIP 구조의 설계 및 성능 분석",
      note: "",
    },
  ],

  /* ---------- 세미나 & 해외 활동 ---------- */
  activities: [
    {
      period: "2018.03",
      title: "Retail Tech Japan 2018 전시회 참관",
      desc: "무인 점포·리테일 혁신 제품 견학 및 업계 네트워크 형성",
      imgs: [
        { src: "assets/img/act-retailtech-1.jpg", alt: "Retail Tech Japan 2018 전시 부스" },
        { src: "assets/img/act-retailtech-2.jpg", alt: "Retail Tech Japan 2018 제품 시연 장면" },
      ],
    },
    {
      period: "2017.04",
      title: "SuperSmart 도입 검토 출장 (이스라엘)",
      desc: "차별화된 쇼핑 경험을 위한 신기술 솔루션 검토, 신세계·이마트 워크샵 추진",
      imgs: [
        { src: "assets/img/act-supersmart-1.png", alt: "SuperSmart가 적용된 이스라엘 현지 매장" },
        { src: "assets/img/act-supersmart-2.png", alt: "SuperSmart 스캔 게이트 센서" },
      ],
    },
    {
      period: "2017.03",
      title: "EuroShop 2017 참관 & SuperSmart CEO 미팅",
      desc: "유통 전문 박람회 견학 및 이스라엘 SuperSmart 도입 검토",
      imgs: [
        { src: "assets/img/act-euroshop-1.png", alt: "EuroShop 2017 전시 부스 전경" },
        { src: "assets/img/act-euroshop-2.png", alt: "EuroShop 2017 셀프계산대 제품" },
      ],
    },
    {
      period: "2017.03",
      title: "신세계그룹 All About POS 세미나 발표",
      desc: "‘POS H/W 아키텍처의 이해’ 주제 발표 진행",
      imgs: [
        { src: "assets/img/act-allaboutpos-1.png", alt: "All About POS 세미나 발표 장면" },
        { src: "assets/img/act-allaboutpos-2.png", alt: "All About POS 세미나 강연장 전경" },
      ],
    },
    {
      period: "2015.09",
      title: "핀란드 오울루 해외 출장",
      desc: "전세계 유일 5인치 Windows Tablet POS 장비 도입 위해 제조사 방문",
      imgs: [
        { src: "assets/img/act-oulu1.png", alt: "도입 검토한 5인치 Windows Tablet POS 장비" },
        { src: "assets/img/act-oulu2.png", alt: "핀란드 오울루 제조사 현지 개발실" },
      ],
    },
  ],
};

/* classic <script> 환경에서 const는 window에 노출되지 않으므로 명시적으로 등록 */
if (typeof window !== "undefined") window.PROFILE = PROFILE;
