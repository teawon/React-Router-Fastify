import { Route } from "./+types/Home";

export function loader({}: Route.LoaderArgs) {
  // Fastify의 Context를 사용하려면... -> `reactRouter파일의 플로그인에서 `await app.register(reactRouterFastify)`에 context를 주입해서 넘겨준다.
}

export default function Home() {
  return <div>Hello World</div>;
}
