# ✅ 체크리스트: 네이버 IndexNow API 연동

## 1. 사전 준비 및 분석
- [x] 네이버 IndexNow 가이드 숙지 (POST 방식 활용)
- [x] 기존 `scripts/submit-indexnow.js` 로직 분석
- [x] 네이버 검증용 키 파일 확인 (`public/bbd0d9a6843c450eb3e9d811a0fd504a.txt`)

## 2. 코드 수정 (Implementation)
- [x] `scripts/submit-indexnow.js`에 네이버 엔드포인트(`https://searchadvisor.naver.com/indexnow`) 추가
- [x] 복수 엔드포인트 지원을 위한 루프 처리 로직 구현
- [x] 응답 코드(200, 202 등)에 따른 성공/실패 로그 세분화

## 3. 검증 및 테스트
- [x] 로컬 환경에서 스크립트 실행 테스트 (`node scripts/submit-indexnow.js`)
- [x] 네이버 및 Bing 엔드포인트 응답 확인 (둘 다 Status 200 확인)
- [x] 빌드 파이프라인(`npm run build`) 연동 확인

## 4. 마무리
- [x] `SYSTEM_MAP.md` 및 `CORE_LOGIC.md` 갱신
- [x] `MEMORY.md` 진행 상황 기록
- [x] 최종 결과 보고
