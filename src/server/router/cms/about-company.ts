import prisma from "@/lib/db";
import { adminProcedure, procedure, route } from "@/server/trpc";
import { z } from "zod";

export const aboutCompanyRoute = route({
    getAboutCompanyInfo: procedure.query(async () => {
            const isExist = await prisma.companyOverView.findFirst({
                include: {
                    media: true
                }
            })
            if (isExist) return isExist
            return prisma.companyOverView.create({
                data: {
                    description: "No Description Provided"
                },
                include: {
                    media: true
                }
            })
    }),
    editAboutCompanyInfo: adminProcedure.input(z.object({
        id: z.string().min(1),
        description: z.optional(z.string()),
        mediaId: z.optional(z.union([z.string(), z.null()])),
        isPublish: z.optional(z.boolean())
    })).mutation(async ({ input }) => {
        const { id, ...data } = input
        return prisma.companyOverView.update({
            where: {
                id
            },
            data
        })
    })
})