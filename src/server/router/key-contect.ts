import prisma from "@/lib/db"
import { adminProcedure, procedure, route } from "../trpc"
import { EditKeyContactSchema } from "@/schema/key-contact"
import { z } from "zod"

export const keyContactRouter = route({
    getKeyContact: procedure.query(async () => {
        const data = await prisma.keyContact.findMany({
            select: {
                name: true,
                designation: true,
                emailLink: true,
                LinkedInLink: true,
                faceBookLink: true,
                twitterLink: true,
                id: true,
                pic: true
            }
        })
        return data
    }),

    getKeyContactById: procedure.input(z.object({ id: z.string().min(1) })).query(async ({ input }) => {
        const data = await prisma.keyContact.findUnique({
            where: input
        })
        return data
    }),

    editKeyContact: adminProcedure.input(EditKeyContactSchema).mutation(async ({ input }) => {
        const {
            data,
            id
        } = input
        const updated = await prisma.keyContact.update({
            where: {
                id
            },
            data
        })

        return updated
    }),

    addKeyContact: adminProcedure.mutation(async () => {
        const init = await prisma.keyContact.create({
            data: {
                name: "untitled",
                designation: "untitled",
                pic: "./person.svg"
            }
        })

        return init
    }),

    deleteKeyContact: adminProcedure.input(z.object({ id: z.string().min(1), origin: z.string().min(1) })).mutation(async ({ input, ctx:ctx2 }) => {
        
        const deleted = await prisma.keyContact.delete({
            where:{
                id: input.id
            }
        })
        return deleted
    })
})