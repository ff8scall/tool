# 🧠 MEMORY (단기 기억 및 맥락)

## 📅 현재 상황 (2026-04-20)
- **목표**: 네이버 IndexNow API 추가 연동 및 시스템 통합.
- **상태**: 
  - `scripts/submit-indexnow.js` 수정 완료 (Bing + Naver 복수 엔진 지원).
  - 로컬 테스트 결과 두 엔진 모두 Status 200 응답 확인.
  - 시스템 문서(`SYSTEM_MAP`, `CORE_LOGIC`) 현행화 완료.

## 🔗 외부 연동 정보
- **IndexNow**: `https://tool.lego-sia.com` 도메인 연동 중.
- **API Keys**:
  - Bing: `bbd0d9a6843c450eb3e9d811a0fd504a`
  - Naver: `6687659b44b1f1d304f1068df35daec0`
- **지원 엔진**: Bing, Naver (엔진별 별도 키 사용)

## 📌 단기 할 일
1. [x] 네이버 IndexNow 가이드 분석 및 설계
2. [x] `scripts/submit-indexnow.js` 멀티 엔드포인트 지원 수정
3. [x] 인덱싱 요청 테스트 및 결과 확인
4. [ ] 배포 후 네이버 검색 어드바이저에서 색인 현황 모니터링
