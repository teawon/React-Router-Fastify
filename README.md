# React-Router & Fastify

| 프론트엔드 개발자의 역할이 웹 서버 영역으로 확장되고있다 (BFF, SSR)

### [1주차: Fastify 서버 기초와 빌드, 배포](./docs/week-1.md)

- Fastify
- 초기 개발 환경 설정
  - 무중단 배포 : `Graceful Shutdown`
  - 린터 및 포멧 : `biome`

### [2주차: React Router V7과 Fastify 연동](./docs/week-2.md)

- React Router(v7)
  - SSR 환경에서의 Next.js와 비교
  - Web 표준 기반 접근방식
  - Vite를 통한 빌드와 `react-router-serve` 활용
- Fastify 연동
  - React Router 초기 설정
  - `@mcansh/remix-fastify` 플러그인 활용

### [3주차: GraphQL 서버 설정](./docs/week-3.md)

- GraphQL 서버 구성
  - GraphQL Yoga 도구 활용
  - Context 및 Plugin 설계
  - TypeScript 지원을 위한 GraphQL Code Generation
- DataLoader를 통한 N+1 문제 해결
- GraphQL Hive를 통한 스키마 변경 관리
