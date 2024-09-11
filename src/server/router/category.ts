import prisma from "@/lib/db";
import { adminProcedure, procedure, route } from "../trpc";
import { z } from "zod";

export const categoryRouter = route({
    getCategories: procedure.query(async () => {
        const categories = await prisma.category.findMany({
            select: {
                id: true,
                name: true,
                subCategory: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy:{
                date:"asc"
            }
        })

        return categories
    }),

    addCategory: adminProcedure.input(z.object({
        name: z.string().min(1)
    })).mutation(async ({ input }) => {
        const data = await prisma.category.create({
            data: input
        })

        return data
    }),

    removeCategory: adminProcedure.input(z.object({
        id: z.string().min(1)
    })).mutation(async ({ input }) => {
        const data = await prisma.category.delete({
            where:{
                id:input.id
            }
        })

        return data
    }),

    editCategory: adminProcedure.input(z.object({
        id: z.string().min(1),
        data: z.object({
            name: z.optional(z.string())
        })
    })).mutation(async ({ input }) => {
        const data = await prisma.category.update({
            where:{
                id:input.id
            },
            data: input.data
        })

        return data
    }),

    addSubCategory: adminProcedure.input(z.object({
        categoryId: z.string().min(1),
        name: z.string().min(1)
    })).mutation(async ({ input }) => {
        const data = await prisma.subCategory.create({
            data: input
        })

        return data
    }),

    removeSubCategory: adminProcedure.input(z.object({
        id: z.string().min(1)
    })).mutation(async ({ input }) => {
        const data = await prisma.subCategory.delete({
            where:{
                id:input.id
            }
        })

        return data
    }),

    editSubCategory: adminProcedure.input(z.object({
        id: z.string().min(1),
        data: z.object({
            name: z.optional(z.string())
        })
    })).mutation(async ({ input }) => {
        const data = await prisma.subCategory.update({
            where:{
                id:input.id
            },
            data: input.data
        })

        return data
    })
})