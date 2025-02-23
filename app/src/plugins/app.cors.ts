import FastifyCors from "@fastify/cors";
import fp from "fastify-plugin";

export default fp(
  async (app) => {
    await app.register(FastifyCors, {
      // cors를 허용
      preflightContinue: true,
    });
  },
  { name: "app.cors" }
);
