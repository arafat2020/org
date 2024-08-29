import { appRouter } from '@/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

function handler(req: Request) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: ({info}) => {
      console.log(info,'info');
      
      return info
    }
  });
}

export { handler as GET, handler as POST };