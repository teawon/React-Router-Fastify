import fp from 'fastify-plugin';

declare module "fastify" {
    interface FastifyRequest{
        dataloaders: {}
    }
}


export default fp(
    (app) => {
        // 서버 최적화에 대한 처리
        app.decorateRequest("dataloaders")
  

        // 요청 전 여기서 처리함
        app.addHook("onRequest", async (req) => {
            req.dataloaders = {};
          });
    },{
        name : 'req.dataloaders'
    }
)