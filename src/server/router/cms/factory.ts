import prisma from "@/lib/db";
import { adminProcedure, procedure, route } from "@/server/trpc";
import { z } from "zod";

export const factoryRoute = route({
    getFactory: procedure.query(async () => {
        return prisma.$transaction(async ctx => {
            const isExist = await ctx.factory.findFirst({
                include: {
                    media:{
                        select:{
                            id:true,
                            url: true
                        }
                    }
                }
            })
            if (isExist) return isExist
             const created = await ctx.factory.create({
                data: {
                    description: "No Description Provided",
                },
                include:{
                    media:{
                        select:{
                            id:true,
                            url: true
                        }
                    }
                }
            })
            return created
        })
    }),
    editFactory: adminProcedure.input(z.object({
        id: z.string().min(1),
        description: z.optional(z.string()),
        isPublish: z.optional(z.boolean())
    })).mutation(async ({ input }) => {
        const { id, ...data } = input
        return prisma.factory.update({
            where: {
                id
            },
            data
        })
    }),
    connectToMedia: adminProcedure.input(z.object({
        id: z.string().min(1),
        mediaId: z.string().min(1)
    })).mutation(async ({ input }) => {
        return prisma.factory.update({
            where: {
                id: input.id
            },
            data: {
                media: {
                    connect: { id: input.mediaId }
                }
            }
        })
    })
})