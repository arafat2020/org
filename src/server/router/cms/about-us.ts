import prisma from "@/lib/db";
import { adminProcedure, procedure, route } from "@/server/trpc";
import { z } from "zod";

export const aboutUsRoute = route({
    getAboutUs: procedure.query(async () => {
        return prisma.$transaction(async ctx => {
            const isExist = await ctx.aboutUs.findFirst()
            if (isExist) return isExist
            return ctx.aboutUs.create({
                data: {
                    description: "No Description Provided"
                },
                include: {
                    media: true                }
            })
        })
    }),
    editAboutUs: adminProcedure.input(z.object({
        id: z.string().min(1),
        description: z.optional(z.string()),
        mediaId: z.optional(z.union([z.string(),z.null()])),
        isPublish: z.optional(z.boolean())
    })).mutation(async ({ input }) => {
        const {id, ...data} = input
        return prisma.aboutUs.update({
            where: {
                id
            },
            data
        })
    })
})