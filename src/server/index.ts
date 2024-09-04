import { route, procedure } from "./trpc";
import { initTRPC } from "@trpc/server";
import { categoryRouter } from "./router/category";
import { productRouter } from "./router/product";
const { createCallerFactory } = initTRPC.create()

export const appRouter = route({
    category: categoryRouter,
    product: productRouter
})

export const createCaller = createCallerFactory(appRouter)
export type AppRouter = typeof appRouter;

