import fp from 'fastify-plugin'
import { createYoga, createSchema, useSchema } from 'graphql-yoga'

export default fp(
    (app) => {

  const schema = createSchema({
    typeDefs: `type Query { ping: String! }`,
    resolvers: { 
      Query: {
        ping () {
          return "pong"
        }
      },
    },
  });

  const yoga = createYoga({
    schema,
  });


  app.route({
    method: ["GET", "POST", "OPTIONS"],
    url : yoga.graphqlEndpoint,
    async handler(req, reply) {
      // 요청에 대해 매번 context 생성
      const context ={};

      // context가 스키마에 들어간다
      const response = await yoga.handleNodeRequestAndResponse(req, reply, context);

      response.headers.forEach((value, key) => {
        reply.header(key,value);
      }) 

      reply.status(response.status)
      reply.send(response.body)

      return reply;
    }
  })
 
}, {
  name : "app.graphql"
})