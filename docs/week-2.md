# React Router V7과 Fastify 연동

## React Router(v7)

- Next.js는 SSR환경의 이해 및 커스텀 가능성 측면에서 비교적 무거운 부분이 있다.
  - [참고하면 좋은 글](https://www.epicweb.dev/why-i-wont-use-nextjs)

| 사용하기 편하고 추상화 되어있는 API vs 래핑 없이 직접적인 API제공
|
| 기능을 추가하거나 문제가 발생했을때 해결하는 것.. 전자는 쉽지 않은 부분이 있다

---

- Next.js vs React Router SSR 접근 방식 비교

| 구분          | Next.js                                                                  | React Router                                                                 |
| ------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| **빌드 방식** | • Webpack 내장 및 커스텀<br>• Turbopack 개발 중                          | • Vite 활용<br>• Vite 플러그인 시스템 사용                                   |
| **서빙 전략** | • 자체 서빙 로직 구현<br>• Vercel 플랫폼 통합                            | • Adaptor 기반 아키텍처<br>• 다중 환경 지원 (Node.js, Cloudflare Workers 등) |
| **코드 구조** | • pages 디렉토리 구조<br>• app 디렉토리 구조<br>• React Server Component | • Web 표준 기반 시맨틱<br>• loader, action 인터페이스 활용                   |
|               |

| 우리는 Vite를 통해 빌드된 결과물을 `react-router-serve`를 사용해 Node.js에서 실행 가능하게 한다.

- Remix에 능숙해지면 웹 영역에 대한 이해를 높이는데 도움이 된다

  - 웹 표준 API를 내려주기 떄문 (URLSearchParams 등 근본 기술에 능숙해지는것은 중요하다)

### 초기 세팅

- `yarn create react-router ./file_name`

- `yarn build`

  - 현재는 `react-router` 명령어가 찍히나 추후 vite만 남게된다는 듯
  - `server` / `client` 두 파일이 생성된다.

![Image](https://github.com/user-attachments/assets/df572d02-e7d6-4294-b5bf-d15b0df34c5b)

- 실제 실행 시 다음과 같이 html가 그려진 상태로 서버에서 응답을 받는다

  - `body` 내부의 스크립트에서 필요한 데이터들을 로더
  - 사전 준비 이후, 로더에서 내려준 데이터를 스트림안에 넣어줌
  - 그 후 브라우저에서 실제 스크립트가 이루어진 후 `head`의 스크립트가 읽어와지면서 hydration이 이루어진다

  - 즉 빈화면 -> 데이터 및 스크립트가 비동기적으로 로드되고 최종적으로 이러한 hydration과정을 통해 ReactApp이 완성

### 라우팅 등록

- 라우팅 등록은 두 가지 방법이 있다
  - Next.js의 파일 컨벤션에 맞춰 자동으로 등록해주는 방법
    - `
  - 개발자가 직접 정의하는 방법
    - `routes.ts`파일에 선언

### 예시

- ```js
  // 서버에서만 실행
  export const loader = async ({ request, params, context }) => {
    const header = reqeust.headers.get("x-api-key");

    if (true) {
      const newHeader = new Headers();
      headers.set("Location", "/");
      return new Response(null, {
        status: 302,
        headers: newHeader,
      });
    }

    return {
      message: "Hello World",
    };
  };

  export default function Home() {
    const { message } = useLoaderData();
    return <div>{message}</div>;
  }
  ```

- Next의 `getServerSideProps`와 같은 기능
- `request.header` 내부 객체는 실제 웹 표준에서 제공하는 객체
  - 웹 표준 문서인 MDN에서 관련문서 참고
- redirect처리는 다음과 같이 헤더 설정을 통해 처리한다.
  - **웹상에서는 헤더 설정을 통해 리다이렉트를 처리한다.** (표준)

| React-router를 사용해 (웹 표준 기반) 폼 제출 코드를 구현하면 JS를 비활성화 하더라도 정상적으로 동작한다고 한다.
|
| > "JavaScript는 선택사항이며, 웹의 본질은 HTML이라는 철학이 드러남."

## Fastify에서 React Router 사용하기

- 패키지 설치

  - ` yarn add @mcansh/remix-fastify`
  - `yarn add @react-router/node isbot react react-dom react-router`
  - `yarn add --dev @react-router/dev @types/react @types/react-dom vite vite-tsconfig-paths`

- react-router 파일 이동
  - `react-router-config` 복사
  - `tsconfig.json` 수정
  - `vite.config.ts` 수정
  - `yarnrc.yml` 에 `isbot` 의존성 추가
  - `package.json` 에 `@react-router/dev` 의존성 추가


- 플러그인에서 context주입
   - `getLoaderContext`를 통해 설정한 값을 loader에서 접근가능하게 처리한다.


  
---

Q. 왜 단순 Remix를 사용하지 않고 Fastify를 쓰는걸까?
- 만약 매우 큰 파일의 sitemap파일을 내려줘야한다고 가정하자
  - 이 경우 단순히 Next나 remix를 사용해서는 처리할 수 없다.
  - 앞단에서 스트리밍해주는 서버작업을 추가로 확장하는 등의 low레벨의 처리는 이러한 환경에서 가능

