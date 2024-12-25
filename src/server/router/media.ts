import { z } from "zod";
import { adminProcedure, route } from "../trpc";
import { uploadForServer } from "@/lib/uploadFotServer";
import prisma from "@/lib/db";
import { TRPCError } from "@trpc/server";
import { deleteFileFromServer } from "@/lib/deleteFormServer";
import { mediaSchema } from "@/schema/media";

export const mediaRoute = route({
    createMedia: adminProcedure
        .input(z.object({
            name: z.string().min(1),
            bucketId: z.string().min(1),
            url: z.string().min(1)
        }))
        .mutation(async ({ input }) => {
            const created = await prisma.media.create({
                data: input,
            });

            return created;
        }),
    deleMedia: adminProcedure.input(z.object({
        id: z.string().min(1),
    })).mutation(async ({ input }) => {
        const deleted = prisma.$transaction(async ctx=>{
            const prev = await ctx.media.findUnique({
                where: input
            })
            if (!prev) throw new TRPCError({code:"BAD_REQUEST"})
            await deleteFileFromServer(prev.url)
            const deleted = ctx.media.delete({
                where: input
            })
            return deleted
        })
        return deleted
    }),
    getMediaByBucket: adminProcedure.input(z.object({
        id: z.string().min(1),
    })).query(async ({ input }) => {
        const data = await prisma.media.findMany({
            where: {
                bucketId: input.id
            }
        })
        return data
    })
})