# 🧠 MEMORY (단기 기억 및 맥락)

## 📅 현재 상황 (2026-04-26)
- **목표**: Google Search Console 색인 문제 해결 및 노출 최적화.
- **상태**:## 🎯 현재 목표 (Current Goal)
- **Google Search Console 색인 문제 해결**: 250개 이상의 페이지가 '발견됨 - 현재 색인이 생성되지 않음' 상태인 원인을 파악하고 해결.
- **SSG(정적 사이트 생성) 도입**: Puppeteer 없이 빌드 타임에 각 경로별로 SEO 메타데이터가 주입된 HTML 파일을 생성하여 Googlebot이 모든 도구의 내용을 즉시 파악할 수 있도록 개선.

## 📅 작업 로그 (Work Log)
- **2026-04-26**: 
  - GSC 현황 분석: 287개 경로 중 3개만 색인됨.
  - 원인 파악: Vercel 빌드 시 `vite-plugin-prerender`가 비활성화되어 모든 페이지가 빈 SPA 쉘만 서빙됨.
  - 대안 수립: Puppeteer 기반 프리에린더링 대신, 빌드 후 `index.html`을 템플릿으로 사용하여 각 도구별 메타데이터를 주입한 정적 페이지 생성 스크립트(`generate-static-pages.js`) 도입 결정.
  - 경로Alias 및 Canonical 일관성 부족 확인 -> 수정 계획 포함.

## 🔗 외부 연동 정보
- **IndexNow**: `https://tool.lego-sia.com` 도메인 연동 중.
- **Google Search Console**: 색인 생성 보고서 모니터링 중.

## 📌 단기 할 일
1. [ ] Google 색인 누락 원인 정밀 분석 (Prerender, Canonical 등)
2. [ ] `sitemap.xml` 내 URL 및 메타 데이터 정합성 검토
3. [ ] `generate-static-pages.js` 구현 및 배포 테스트
4. [ ] 색인 최적화를 위한 기술적 수정 및 재제출
