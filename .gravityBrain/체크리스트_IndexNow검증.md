# ✅ 체크리스트_IndexNow검증

## 📋 작업 목표
배포 프로세스에서 사이트맵 업데이트와 IndexNow 호출이 정상적으로 연동되는지 확인하고, 제공된 API Key가 올바르게 사용되는지 검증한다.

## 🛠️ 작업 단계
1. **[x] 스크립트 실행 순서 확인**: `package.json`의 `build` 및 `indexnow` 스크립트 선후 관계 분석.
2. **[x] 사이트맵 생성 로직 검토**: `scripts/generate-sitemap.js`가 모든 도구(138개)의 URL을 정확히 추출하는지 확인.
3. **[x] IndexNow 호출 로직 검토**: `scripts/submit-indexnow.js`가 업데이트된 `sitemap.xml`을 파싱하여 API를 호출하는지 분석.
4. **[x] 실제 호출 테스트 (Dry-run)**: 배포 환경과 동일한 조건에서 스크립트 실행 테스트 및 로그 확인.
5. **[x] 결과 보고**: 연동 상태 확인 결과 및 개선 제안 보고.

## 🧪 검증 포인트
- `sitemap.xml` 파일의 타임스탬프가 빌드 시점에 갱신되는가?
- IndexNow API가 응답 코드 `200 OK` 혹은 `202 Accepted`를 반환하는가?
- 전달되는 `urlList`에 새로운 도구 페이지가 포함되어 있는가?
