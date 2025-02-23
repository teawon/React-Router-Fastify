# Fastify 서버 기초와 빌드, 배포

## 초기 환경 설정

- Express는 너무 Minimal, Next.js는 다소 진입장벽이 있다(DI)
- Fastify는 학습에 적절

### Graceful Shutdown (무중단 배포)

- Q. 만약 서버에 요청을 보낸 시점에 배포가 이루어져 서버가 죽어버린다면??
  - 사용자의 요청이 날아간다
  - 이를 해결하기 위해 들어온 요청을 다 받고, 클린업 이후 서버를 죽여야 함
- fastify에서는 `fastify-graceful-shutdown` 패키지를 사용해 해결
- 프론트엔드에서도 동일한 문제가 발생할 수 있다고 한다(요청이 많으면 500에러떠서 죽을 수 있음)

### 파일 변경 시 재빌드, 재시작 설정

- `yarn dev` 명령어 실행 시 파일 변경 시 재빌드, 재시작을 처리
  - `nodemon` 패키지를 사용
  - `package.json` 파일에서 `nodemonConfig` 설정 추가
  - `yarn build, yarn start` 명령어를 중복하지 않고 개발환경과의 분리를 위해 중복해서 작성

### 환경변수

- `dotenv` 패키지 사용 (Node)에서 환경변수를 관리
  - `yarn add dotnev doenv-safe`
  - `.env` 파일에 `KEY=VALUE` 형식으로 환경 변수를 정의

## Fastify

- Decorate

  - `app.decorate()` : app 전역적으로 사용 (ex 환경변수)
  - `app.decorateRequest()` : 각 요청에 대해 유지되고 끝나면 삭제

- 플러그인

  - `autoload` 플러그인을 하나하나 등록하지 않고 `plugins` 폴더 하위의 파일을 자동으로 등록
  - `cors` 플러그인
  - `gracefulShutdown`
  - 의존관계(순서)를 명시하기 위해 플러그인간의 순서를 `dependencies` 속성을 사용해 명시

- pnpm과 fastify를 함께 사용하면 타입추론이 안되는 문제가 있어 `.yarnrc.yml` 파일에 `peerDependencies` 설정을 추가해야 함

- fastify는 `declare merging` 기법을 사용한다
  - 따로 declare을 선언했을때 확장해서 사용하게 되는 것
  - 이를 활용해 기본 인터페이스를 확장할 수 있다.
    - ex `{ name : "app.db" , dependencies : ["app.env"] }`

---

Q. `nvmrc` 파일은 왜 씀?

- 프로젝트 내 Node.js 버전관리를 자동화하는데 도움을 줌
- `nvm use` 명령어를 사용 시 현재 디렉토리에서 `.nvmrc` 파일을 찾아 명시된 버전을 읽어 전환을 처리한다.

Q. 'Biome'이란?

- 린터, 포멧터 설정과 같은 도구를 포함하는 통합 개발 도구
  - `yarn add --dev @biomejs/biome`
  - `biome.json` 파일 생성 후 설정 추가
  - `.vscode` 폴더 하위의 `settings.json` 파일에서 `defualtFormatter`를 `biome`로 설정
