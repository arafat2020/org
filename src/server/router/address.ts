import prisma from "@/lib/db";
import { adminProcedure, procedure, route } from "../trpc";
import { z } from "zod";

export const addressRoute = route({
    getAddress: procedure.query(async () => {
        const getOrCrateAddress = await prisma.$transaction(async (ctx) => {
            const isExist = await prisma.address.findFirst()
            if (isExist) return isExist
            const init = await ctx.address.create({
                data: {
                    email: "untitled",
                    house: "untitled",
                    road: "untitled",
                    phone: "00000000000"
                }
            })
            return init
        })
        return getOrCrateAddress
    }),

    editAddress: adminProcedure.input(z.object({
        id: z.string().min(1),
        data: z.object({
            email: z.optional(z.string().min(1)),
            house: z.optional(z.string().min(1)),
            road: z.optional(z.string().min(1)),
            phone: z.optional(z.string().min(1))
        })
    })).mutation(async ({ input }) => {
        const {
            id,
            data
        } = input
        const edited = await prisma.address.update({
            where:{
                id: id 
            }, data
        })
        return edited
    })
})