import FastifyCors from "@fastify/cors";
import fp from "fastify-plugin";

export default fp(
  async (app) => {
    /**
     *  Method 'OPTIONS' already declared for route '/*' with constraints '{}'에러가 발생해 옵션 충돌 에러발생
     */
    // await app.register(FastifyCors, {
    //   // cors 허용
    //   preflightContinue: true,
    // });
  },
  { name: "app.cors" }
);
