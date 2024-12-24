import { z } from "zod";
import { adminProcedure, route } from "../trpc";
import { uploadForServer } from "@/lib/uploadFotServer";
import prisma from "@/lib/db";
import { TRPCError } from "@trpc/server";
import { deleteFileFromServer } from "@/lib/deleteFormServer";

export const mediaRoute = route({
    createMedia: adminProcedure
        .input(
            z.object({
                name: z.string().min(1),
                bucketId: z.string().min(0),
                file: z.union([
                    z.instanceof(File), // File object
                    z.string().refine(
                        (file) => file.startsWith("data:image/"), // Base64 validation
                        { message: "File must be a base64-encoded image" }
                    ),
                ]),
            })
        )
        .mutation(async ({ input }) => {
            const { name, file, bucketId } = input;

            let bufferOrFile;

            if (typeof file === "string") {
                // Convert base64 string to Buffer
                const base64Data = file.split(",")[1]; // Extract base64 content
                bufferOrFile = Buffer.from(base64Data, "base64");
            } else if (file instanceof File) {
                bufferOrFile = file; // Use the File directly
            } else {
                throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid file type" });
            }

            const img = await uploadForServer(bufferOrFile);

            if (!img.success || !img.url) {
                throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
            }

            const created = await prisma.media.create({
                data: {
                    bucketId,
                    name,
                    url: img.url,
                },
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