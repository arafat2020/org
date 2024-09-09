import { route, procedure } from "./trpc";
import { initTRPC } from "@trpc/server";
import { categoryRouter } from "./router/category";
import { productRouter } from "./router/product";
import { mailRouter } from "./router/mail";
import { userRouter } from "./router/user";
import { jobRouter } from "./router/job";
import { siteRouter } from "./router/site";
const { createCallerFactory } = initTRPC.create()

export const appRouter = route({
    category: categoryRouter,
    product: productRouter,
    mail: mailRouter,
    user: userRouter,
    job: jobRouter,
    site: siteRouter
})

export const createCaller = createCallerFactory(appRouter)
export type AppRouter = typeof appRouter;

