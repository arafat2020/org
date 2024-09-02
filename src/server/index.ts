import prisma from "@/lib/db";
import { route, procedure } from "./trpc";
import { initTRPC } from "@trpc/server";
import { z } from "zod";
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
            },
        })

        return categories
    }),

    postProduct: procedure.input(z.object({
        name: z.string().min(1).max(100),
        description: z.string().min(25),
        primaryImg: z.string().min(1),
        catagoryId: z.string().min(1),
        subCategoryId: z.string().min(1),
    })).mutation(async ({ input }) => {
        const data = await prisma.product.create({
            data: input,
            select: {
                name: true,
                id: true,
                primaryImg: true,
                showcaseImg: true,
                published: true,
                description: true,
                SubCategory: {
                    select: {
                        id: true,
                        name: true,
                        Category: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        })
        return data
    }),

    inactiveProduct: procedure.input(z.object({
        id: z.string().min(1),
        status: z.boolean()
    })).mutation(async ({ input }) => {
        const data = await prisma.product.update({
            where: {
                id: input.id
            },
            data: {
                published: input.status
            }
        })
        return data
    }),

    getProducts: procedure.query(async () => {
        return prisma.product.findMany({
            include: {
                SubCategory: true,
            }
        })
    }),


})

export const createCaller = createCallerFactory(appRouter)
export type AppRouter = typeof appRouter;

