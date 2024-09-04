import { z } from "zod";
import { procedure, route } from "../trpc";
import prisma from "@/lib/db";

export const productRouter = route({
    postProduct: procedure.input(z.object({
        name: z.string().min(1),
        description: z.string().min(1),
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

    getProductById: procedure.input(z.object({
        id: z.string().min(1)
    })).query(async ({ input }) => {
        const data = await prisma.product.findUnique({
            where: {
                id: input.id
            },
            include: {
                showcaseImg: true
            }
        })
        return data
    }),

    updateProduct: procedure.input(z.object({
        id: z.string().min(1),
        name: z.optional(z.string()),
        description: z.optional(z.string()),
        primaryImg: z.optional(z.string()),
    })).mutation(async ({ input }) => {
        const data = await prisma.product.update({
            where: {
                id: input.id
            },
            data: {
                name: input.name,
                description: input.description,
                primaryImg: input.primaryImg
            },
            include: {
                showcaseImg: {
                    select: {
                        id: true,
                        img: true
                    }
                }
            }
        })

        return data
    }),

    addShowCaseImage: procedure.input(z.object({
        id: z.string().min(1),
        img: z.string().min(1)
    })).mutation(async ({ input }) => {
        const data = await prisma.showcaseImage.create({
            data: {
                img: input.img,
                productId: input.id
            }
        })
        return data
    }),

    removeShowCaseImage: procedure.input(z.object({
        id: z.string().min(1),
        productId: z.string().min(1),
    })).mutation(async ({ input }) => {
        const data = prisma.showcaseImage.delete({
            where:{
                id: input.id,
                productId: input.productId
            }
        })
        return data
    })
})