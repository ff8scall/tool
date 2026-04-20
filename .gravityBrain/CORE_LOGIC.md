# ⚙️ CORE_LOGIC (핵심 비즈니스 로직)

## 🚀 1. 도구 확장 및 통합 로직
- **페이지 기반 아키텍처**: 모든 유틸리티는 `src/pages/` 하위에 독립적인 JSX 파일로 존재합니다.
- **라우팅 자동화(준비 중)**: 현재 `App.jsx`에서 수동으로 경로를 매핑하고 있으나, 파일 시스템 기반 라우팅 도입 가능성이 높음.

## 📦 2. 빌드 및 배포 파이프라인 (`package.json`)
빌드 시 다음 단계가 순차적으로 실행됩니다:
1. `vite build`: React 소스 컴파일 및 번들링.
2. `scripts/generate-sitemap.js`: `src/pages` 목록을 기반으로 `sitemap.xml` 생성.
3. `scripts/copy-404.js`: SPA 특성상 루트 이외의 경로에서 새로고침 시 404가 발생하는 것을 방지하기 위해 `index.html`을 `404.html`로 복사.
4. `npm run indexnow`: 생성된 사이트맵의 모든 URL을 검색 엔진(Bing, Naver 등)에 즉시 제출.

## 🔍 3. SEO 및 검색 엔진 가시성
- **Prerendering**: `vite-plugin-prerender`를 통해 주요 페이지를 정적 HTML로 생성하여 크롤러 가독성 향상.
- **IndexNow Integration**:
  - **Bing Key**: `bbd0d9a6843c450eb3e9d811a0fd504a`
  - **Naver Key**: `6687659b44b1f1d304f1068df35daec0`
  - **지원 엔진**: 
    - Bing/Yandex (`api.indexnow.org`)
    - Naver (`searchadvisor.naver.com`)
  - 빌드 시 자동으로 최신 콘텐츠를 검색 엔진에 통보함.

## ☯️ 4. 특수 로직 (사주/운세)
- `lunar-javascript` 라이브러리를 활용하여 생년월일시 데이터를 절기 및 육십갑자로 변환.
- `src/pages/Saju.jsx` 및 `src/pages/saju_components/`에서 해당 로직을 처리함.
