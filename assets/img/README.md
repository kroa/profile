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

> 파일명은 [js/data.js](../../js/data.js) 기준입니다 — 히어로 사진은 `profilePhoto`, 프로젝트·AI 카드는 `img`, 세미나·해외 활동은 `imgs` 배열과 일치합니다.
> 다른 이름을 쓰고 싶으면 `data.js`의 경로만 바꾸면 됩니다.