import path from "node:path";
import FastifyAutoload from "@fastify/autoload";
import Fastify from "fastify";

export async function makeApp() {
  /**
   * 앱을 생성합니다
   */
  const app = Fastify({
    logger: true,
  });

  app.get("/", () => ({
    message: "가보자고~~",
  }));

  /**
   * 플러그인을 등록(매번 register를 하지 않고 autoload플로그인을 활용한다.)
   */
  await app.register(FastifyAutoload, {
    dir: path.resolve("./dist/plugins"),
  });

  /**
   * 헬스체크 엔드포인트를 등록합니다
   *
   * GET /healthz
   */
  app.get("/healthz", () => ({
    ok: true,
  }));

  /**
   * 모든 Fastify 플러그인이 준비될때까지 대기합니다
   */
  await app.ready();
  app.log.info({}, "[system] completed - app.ready()");

  return app;
}
