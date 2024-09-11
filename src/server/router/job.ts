import { z } from "zod";
import { adminProcedure, procedure, route } from "../trpc";
import prisma from "@/lib/db";
import { TRPCError } from "@trpc/server";

export const jobRouter = route({
    sendJobLetter: procedure.input(z.object({
        firstname: z.string().min(1),
        lastname: z.string().min(1),
        email: z.string().min(1).email(),
        address: z.string().min(1),
        phone: z.string().min(1),
        cv: z.string().min(1),
        jobTypeId: z.string().min(1),
    })).mutation(async ({ input }) => {
        const data = await prisma.jobApplication.create({
            data: input
        })

        return data
    }),

    getJobType: adminProcedure.query(async () => {
        const data = await prisma.jobType.findMany({
            orderBy: {
                date: "desc"
            }
        });
        return data
    }),

    getJobForJobApplication: procedure.query(async () => {
        const data = await prisma.jobType.findMany({
            where: {
                active: true
            }
        });
        return data
    }),

    addJobType: adminProcedure.input(z.object({
        type: z.string().min(1)
    })).mutation(async ({ input }) => {
        const data = await prisma.jobType.create({
            data: input
        })
        return data
    }),

    editJobType: adminProcedure.input(z.object({
        id: z.string().min(1),
        data: z.object({
            type: z.optional(z.string().min(1)),
            active: z.optional(z.boolean())
        })
    })).mutation(async ({ input }) => {
        const data = await prisma.jobType.update({
            where: {
                id: input.id
            },
            data: input.data
        })

        return data
    }),

    deleteJobType: adminProcedure.input(z.object({
        id: z.string().min(1),
    })).mutation(async ({ input }) => {
        const data = await prisma.jobType.delete({
            where: {
                id: input.id
            },
        })

        return data
    }),

    getJobApplications: adminProcedure.query(async () => {
        const data = await prisma.jobApplication.findMany({
            include: {
                jobtype: true
            }
        })
        return data
    }),

    deleteJob: adminProcedure.input(z.object({
        id: z.string().min(0),
        origin: z.string().min(0)
    })).mutation(async ({ input }) => {
        const job = await prisma.jobApplication.findUnique({
            where: {
                id: input.id
            }
        })

        if (!job) throw new TRPCError({ code: "NOT_FOUND" })

        try {
            await fetch(`${input.origin}/api/delete?fileName=${encodeURIComponent(job.cv)}`, {
                method: 'DELETE',
            });
        } catch (error) {
            throw new TRPCError({code:"INTERNAL_SERVER_ERROR"})
        }

        const data = prisma.jobApplication.delete({
            where:{
                id: input.id
            }
        })

        return data
    })
})