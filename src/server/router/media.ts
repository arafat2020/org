import { z } from "zod";
import { adminProcedure, route } from "../trpc";
import { uploadForServer } from "@/lib/uploadFotServer";
import prisma from "@/lib/db";
import { TRPCError } from "@trpc/server";

export const mediaRoute = route({
    createMedia: adminProcedure.input(z.object({
        name: z.string().min(1),
        file: z.instanceof(File)
            .refine(
                (file) => file.type.startsWith("image/"),
                { message: "File must be an image" }
            )
    })).mutation(async ({ input }) => {
        const img = await uploadForServer(input.file)
        if (!img.success || !img.url) throw new TRPCError({code:"INTERNAL_SERVER_ERROR"})
        const created = await prisma.media.create({
            data:{
                name: input.name,
                url: img.url
            }
        })
        return created
    }),
    deleMedia: adminProcedure.input(z.object({
        id: z.string().min(1),
    })).mutation(async ({input}) => {
        const deleted = prisma.media.delete({
            where: input
        })
        return deleted
    })
})