# 김승원 · System & Cloud Architect — Profile

### 🔗 라이브 사이트 → **https://kroa.github.io/profile/**

개발자 · 프로젝트 매니저 · 아키텍트를 모두 수행하는 IT솔루션 스페셜리스트의 프로필 웹사이트입니다.
빌드 단계가 없는 **순수 정적 사이트**(HTML/CSS/JS)로, GitHub Pages에서 바로 서비스됩니다.

## ✨ 특징

- 다크 테마 + 샴페인 골드 액센트의 프리미엄 디자인
- 스크롤 리빌 애니메이션 · 카운트업 통계 · 커서 글로우 · 진행 바
- 콘텐츠와 로직 분리 (`js/data.js` 수정만으로 내용 갱신)
- 완전 반응형 (모바일 메뉴 포함) · 접근성/모션 최소화 대응

## 📁 구조

```
.
├── index.html            # 페이지 구조
├── css/styles.css        # 디자인 시스템
├── js/data.js            # 콘텐츠 데이터 (여기만 고치면 내용 갱신)
├── js/main.js            # 렌더링 & 인터랙션
└── .nojekyll             # GitHub Pages Jekyll 처리 비활성화
```

## 🖥 로컬 실행

정적 파일이라 열기만 해도 되지만, 폰트/모듈 로딩을 위해 로컬 서버 사용을 권장합니다.

```bash
python -m http.server 8080
# http://localhost:8080
```

## 🚀 배포 (GitHub Pages)

이 저장소는 **브랜치 배포** 방식으로 서비스됩니다.

1. GitHub → **Settings → Pages → Build and deployment → Source** 를 **Deploy from a branch** → `main` / `/ (root)` 로 지정합니다.
2. 이후 `main` 브랜치에 push 하면 GitHub 내장 빌드가 자동으로 재배포합니다.
   ```bash
   git add .
   git commit -m "update"
   git push
   ```
3. 공개 주소: **https://kroa.github.io/profile/**

> `.nojekyll` 이 있어 Jekyll 처리 없이 정적 파일이 그대로 서비스됩니다.
> (Private 저장소는 무료 플랜에서 Pages를 쓸 수 없으므로 저장소는 Public 이어야 합니다.)

## 🔒 개인정보 보호

- 전화번호·주소 등 민감정보는 저장소에 포함하지 않습니다.
- 이력서/포트폴리오 원본 파일은 `.gitignore` 로 커밋을 차단합니다.
- 공개된 이메일·링크만 사이트에 노출합니다.

## ✅ 테스트

```bash
cd tests
npm install
npm test
```

`tests/`의 jsdom 기반 테스트가 데이터 렌더링과 스크립트 무결성을 검증합니다.
(테스트 도구는 `.gitignore`로 커밋에서 제외되며 배포에 포함되지 않습니다.)
