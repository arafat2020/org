import prisma from "@/lib/db";
import { adminProcedure, procedure, route } from "@/server/trpc";
import { z } from "zod";

export const bannerRoute = route({
    createBanner: adminProcedure.mutation(async ({ }) => {
        return prisma.bannerPic.create({
            data: {
                name: "Untitled",
            }
        })
    }),
    updateBanner: adminProcedure.input(z.object({
        id: z.string().min(1),
        name: z.optional(z.string()),
        mediaId: z.optional(z.union([z.string(), z.null()]))
    })).mutation(async ({ input }) => {
        const { id, ...data } = input
        return prisma.bannerPic.update({
            where: {
                id
            },
            data
        })
    }),
    deleteBanner: adminProcedure.input(z.object({
        id: z.string().min(1)
    })).mutation(async ({ input }) => {
        return prisma.bannerPic.delete({
            where: input
        })
    }),
    getBanner: procedure.query(async ({ }) => {
        return prisma.bannerPic.findMany({
            include: {
                pic: true
            }
        })
    }),
    getBannerForHome: procedure.query(async () => {
        return prisma.bannerPic.findMany({
            include: {
                pic: true
            },
            where: {
                mediaId: {
                    not: null
                }
            }
        })
    }),
    getBannerById: procedure.input(z.object({
        id: z.string().min(1)
    })).query(async ({ input }) => {
        return prisma.bannerPic.findUnique({
            where: input,
            include:{
                pic: true
            }
        })
    })
})