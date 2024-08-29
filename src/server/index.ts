import prisma from "@/lib/db";
import { route, procedure } from "./trpc";
import { initTRPC } from "@trpc/server";
import { string, z } from "zod";
const { createCallerFactory } = initTRPC.create()

export const appRouter = route({
    hello: procedure.query(() => {
        return {
            msg: "hello from next js"
        }
    }),
    // get categories for the menu
    getCategories: procedure.query(async () => {
        const categories = await prisma.category.findMany({
            select: {
                id: true,
                name: true,
                subCategory: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })

        return categories
    })
})

export const createCaller = createCallerFactory(appRouter)
export type AppRouter = typeof appRouter;

