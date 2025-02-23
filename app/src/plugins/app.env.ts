/**
 * 환경변수는 app 전체에서 전역적으로 사용되므로 app레벨에서 사용
 */
import FastifyEnv from "@fastify/env";
// typebox : 환경변수를 위한 스키마를 만들기 위해 사용
import { type Static, Type } from "@sinclair/typebox";
import fp from "fastify-plugin";

/**
 * env에서 이미 검증을 하지만 Feastify에서도 타입을 추가로 검증한다.
 */
const schema = Type.Object({
  COOKIE_SECRET: Type.String(),
});

declare module "fastify" {
  // 인스턴스에 env 타입을 확장한다. (declare merging)
  // 전역변수를 따로 쓰는게 아니라 app 인스턴스에 넣어 관리한다.
  interface FastifyInstance {
    env: Static<typeof schema>;
  }
}

export default fp(
  async (app) => {
    await app.register(FastifyEnv, {
      confKey: "env",
      schema,
      data: {
        ...process.env,
      },
    });
  },
  { name: "app.env" }
);
