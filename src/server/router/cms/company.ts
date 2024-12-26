import prisma from "@/lib/db";
import { adminProcedure, procedure, route } from "@/server/trpc";
import { z } from "zod";

export const companyRoute = route({
    createCompany: adminProcedure.mutation(async () => {
        const created = await prisma.company.create({
            data: {
                name: "Untitled",
                link: "Not Assigned",
            }
        })
        return created
    }),
    updateCompany: adminProcedure.input(z.object({
        id: z.string().min(1),
        name: z.optional(z.string()),
        link: z.optional(z.string()),
        mediaId: z.optional(z.union([z.string(),z.null()]))
    })).mutation(async ({ input }) => {
        const { id, ...data } = input
        const updated = await prisma.company.update({
            where: {
                id
            },
            data
        })

        return updated
    }),
    deleteCompany: adminProcedure.input(z.object({
        id: z.string()
    })).mutation(async ({ input }) => {
        const deleted = await prisma.company.delete({
            where:input
        })
        return deleted
    }),
    getCompany: procedure.query(async () => {
        const data = await prisma.company.findMany({
            include:{
                pic:true
            }
        })
        return data
    }),
    getCompanyId: adminProcedure.input(z.object({
        id: z.string().min(1)
    })).query(async ({ input }) => {
        const data = await prisma.company.findUnique({
            where:input
        })
        return data
    }),
})