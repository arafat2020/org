import prisma from "@/lib/db";
import { adminProcedure, procedure, route } from "@/server/trpc";
import { z } from "zod";

export const whyUsRoute = route({
    getWhyUs: procedure.query(async () => {
        return prisma.$transaction(async ctx => {
            const isExist = await ctx.whyUs.findFirst({
                include:{
                    media: true
                }
            })
            if (isExist) return isExist
            return ctx.whyUs.create({
                data: {
                    description: "No Description Provided"
                },
                include: {
                    media: true                }
            })
        })
    }),
    editWhyUs: adminProcedure.input(z.object({
        id: z.string().min(1),
        description: z.optional(z.string()),
        mediaId: z.optional(z.union([z.string(),z.null()])),
        isPublish: z.optional(z.boolean())
    })).mutation(async ({ input }) => {
        const {id, ...data} = input
        return prisma.whyUs.update({
            where: {
                id
            },
            data
        })
    })
})