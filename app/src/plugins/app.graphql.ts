import { FastifyInstance, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { createYoga, createSchema, useSchema } from "graphql-yoga";
import fs from "node:fs/promises";
import path from "node:path";
import { resolvers } from "../graphql/resolvers";
import { Context } from "../graphql/Context";

export default fp(
  async (app) => {
    const typeDefs = await fs.readFile(
      path.resolve("./src/graphql/__generated__/schema.graphql"),
      "utf-8"
    );

    const schema = createSchema<Context>({
      typeDefs,
      resolvers,
    });

    const yoga = createYoga<Context>({
      schema,
    });

    app.route({
      method: ["GET", "POST", "OPTIONS"],
      url: yoga.graphqlEndpoint,
      async handler(req, reply) {
        // 요청에 대해 매번 context 생성
        const context: Context = {
          app,
          req,
        };

        // context가 스키마에 들어간다
        const response = await yoga.handleNodeRequestAndResponse(
          req,
          reply,
          context
        );

        response.headers.forEach((value, key) => {
          reply.header(key, value);
        });

        reply.status(response.status);
        reply.send(response.body);

        return reply;
      },
    });
  },
  {
    name: "app.graphql",
  }
);
