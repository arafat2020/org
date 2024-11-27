
import prisma from "@/lib/db";
import { adminProcedure, route } from "../trpc";
import { z } from "zod";

export const tagRouter = route({
    getTag: adminProcedure.query(async () => {
        const tag = await prisma.tag.findMany({
            include:{
                Product: true
            }
        })
        return tag
    }),
    addTag: adminProcedure.mutation(async () => {
        const newTag = await prisma.tag.create({
            data: {
                name: "Untitled"
            }
        })
        return newTag
    }),
    removeTag: adminProcedure.input(z.object({
        id: z.string().min(1)
    })).mutation(async ({ input }) => {
        const deleteTag = await prisma.tag.delete({
            where: input
        })
        return deleteTag
    }),
    editTag: adminProcedure.input(z.object({
        id: z.string().min(1),
        name: z.string().min(1)
    })).mutation(async ({ input }) => {
        const deleteTag = await prisma.tag.update({
            where: {
                id: input.id
            },
            data:{
                name: input.name
            }
        })
        return deleteTag
    }),
    tagToProduct: adminProcedure.input(z.object({
        tagTd: z.string().min(1),
        productId: z.string().min(1)
    })).mutation(async ({ input }) => {
        const updated = await prisma.tag.update({
            where: {
                id: input.tagTd
            },
            data: {
                Product:{
                    connect:{
                        id: input.productId
                    }
                }
            }
        })
        return updated
    }),
    unTagToProduct: adminProcedure.input(z.object({
        tagTd: z.string().min(1),
        productId: z.string().min(1)
    })).mutation(async ({ input }) => {
        const updated = await prisma.tag.update({
            where: {
                id: input.tagTd
            },
            data: {
                Product:{
                    disconnect:{
                        id: input.productId
                    }
                }
            }
        })
        return updated
    }),
})