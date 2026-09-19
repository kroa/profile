# 이미지 넣는 곳 (assets/img)

아래 **파일명 그대로** 이 폴더에 이미지를 넣으면 사이트에 자동으로 표시됩니다.
파일이 없으면 각 카드에는 우아한 그라데이션 + 아이콘 플레이스홀더가 표시됩니다.
(권장: 가로형 사진, JPG/PNG, 폭 800~1200px 내외)

| 파일명 | 위치 |
|---|---|
| `profile.png` | 히어로(대문) 프로필 사진 · **가로형 16:10 권장** |
| `proj-aws-architecture.png` | 차세대 영업정보·영업분석 시스템 (AWS 아키텍처) |
| `proj-piisp.png` | 차세대 시스템 PI/ISP 컨설팅 |
| `proj-devops.png` | POS DevOps 운영환경 구축 |
| `proj-ssg-pixel.png` | SSG.COM 주문픽업 KIOSK (PIXEL) |
| `proj-sco.png` | 셀프계산대(SCO) |
| `proj-cashterminal.png` | 캐시터미널(ATM+POS) |
| `proj-mobile-pos.png` | 모바일 POS |
| `proj-tablet-pos.png` | 차세대 POS 및 태블릿 POS |
| `ai-secudog.png` | SecuDog (AI League) |
| `ai-n8n.png` | n8n 성능분석 자동화 |


## 세미나 · 해외 활동 사진 (가로형 16:10 권장)

| 파일명 | 내용 |
|---|---|
| `act-allaboutpos-1.png` | All About POS 세미나 – 발표 장면 (첨부 1번) |
| `act-allaboutpos-2.png` | All About POS 세미나 – 강연장 전경 (첨부 2번) |
| `act-oulu1.png` | 핀란드 오울루 출장 – 5인치 Windows Tablet POS 장비 (첨부 3번) |
| `act-oulu2.png` | 핀란드 오울루 출장 – 제조사 현지 개발실 (첨부 4번) |
| `act-euroshop-1.png` | EuroShop 2017 – 전시 부스 전경 (첨부 5번) |
| `act-euroshop-2.png` | EuroShop 2017 – 셀프계산대 제품 (첨부 6번) |
| `act-supersmart-1.png` | SuperSmart 도입 검토 출장 – 현지 매장 적용 (첨부 7번) |
| `act-supersmart-2.png` | SuperSmart 도입 검토 출장 – 스캔 게이트 센서 (첨부 8번) |
| `act-retailtech-1.jpg` | Retail Tech Japan 2018 – 전시 부스 (첨부 9번) |
| `act-retailtech-2.jpg` | Retail Tech Japan 2018 – 제품 시연 (첨부 10번) |


## 교육 수료 · 홍보 영상

| 파일명 | 내용 |
|---|---|
| `snu-epm-award-1st.jpg` | 우수 프로젝트상 표창장 · 신세계아이앤씨 대표이사 (제260918-02호) |
| `snu-epm-award-best.jpg` | 최우수 프로젝트상 상장 · 서울대학교 공과대학장 (제30-33호) |
| `snu-epm-cert-1.jpg` | Certified Engineering Project Manager 인증 명패 (No. 03006, 가로형) |
| `snu-epm-cert-2.jpg` | 엔지니어링 프로젝트 매니지먼트 과정 이수증서 (제30-07호, 세로형) |
| `ms_youtube.jpg` | MS 협업 태블릿 POS 소개 영상 썸네일 |
| `inc_youtube.jpg` | 소프트웨어 개발 직무 소개 영상 썸네일 |


## 선택 슬롯 (없어도 동작 — 폴백 표시)

아래는 넣으면 표시되고, 없으면 폴백(회사 이니셜 / 등급 배지)으로 보입니다.

| 파일명 | 위치 |
|---|---|
| `logo-shinsegae-inc.png` | 경력 — 신세계아이앤씨 로고 (정사각 권장) |
| `logo-gaeasoft.png` | 경력 — 지어소프트 로고 |
| `cert-aws-ans.png` | AWS Advanced Networking – Specialty 배지 |
| `cert-aws-sap.png` | AWS Solutions Architect – Professional 배지 |
| `cert-aws-saa.png` | AWS Solutions Architect – Associate 배지 |
| `cert-gcp-ace.png` | Google Associate Cloud Engineer 배지 |
| `cert-aws-ccp.png` | AWS Certified Cloud Practitioner 배지 |
| `cert-azure-af.png` | Microsoft Azure Fundamentals 배지 |

> 자격증 배지는 Credly 등에서 본인 발급분을 내려받아 위 이름으로 저장하세요.
> 회사 로고는 상표권이 있으므로 사용 가능 여부를 확인한 뒤 넣어 주세요.

> ⚠ `snu-epm-cert-2.jpg` 는 원본에 **생년월일**이 인쇄되어 있어 해당 줄을 마스킹한 상태로 게시합니다.
> 증빙 사진을 교체할 때는 생년월일·주소 등 개인정보가 보이지 않는지 반드시 확인하세요.
>
> 원본 한글 파일명(서울대이수증서.jpg 등)은 URL 인코딩 문제를 피하기 위해 ASCII로 변경했고,
> 웹 배포용으로 가로 1280px·JPEG로 최적화했습니다 (합계 10.8MB → 0.7MB).

> 파일명은 [js/data.js](../../js/data.js) 기준입니다 — 히어로 사진은 `profilePhoto`, 프로젝트·AI 카드는 `img`, 세미나·해외 활동은 `imgs` 배열과 일치합니다.
> 다른 이름을 쓰고 싶으면 `data.js`의 경로만 바꾸면 됩니다.