import type { Resolvers } from './__generated__/resolvers';

export const resolvers : Resolvers = {
    Query: {
        // @ts-expect-error
        ping () {
            return 1 
            // 타입이 스키마에 정의된 형식 (!== "pong")이므로 에러가 발생한다.
            // return 'pong';
        }
    }
}