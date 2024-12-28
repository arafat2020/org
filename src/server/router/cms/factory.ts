import prisma from "@/lib/db";
import { adminProcedure, procedure, route } from "@/server/trpc";
import { z } from "zod";

export const factoryRoute = route({
    getFactory: procedure.query(async () => {
            const isExist = await prisma.factory.findFirst({
                include: {
                    media:{
                        select:{
                            id:true,
                            url: true
                        }
                    }
                }
            })
            if (isExist) return isExist
             const created = await prisma.factory.create({
                data: {
                    description: "No Description Provided",
                },
                include:{
                    media:{
                        select:{
                            id:true,
                            url: true
                        }
                    }
                }
            })
            return created
        
    }),
    editFactory: adminProcedure.input(z.object({
        id: z.string().min(1),
        description: z.optional(z.string()),
        isPublish: z.optional(z.boolean())
    })).mutation(async ({ input }) => {
        const { id, ...data } = input
        return prisma.factory.update({
            where: {
                id
            },
            data
        })
    }),
    connectToMedia: adminProcedure.input(z.object({
        id: z.string().min(1),
        mediaId: z.string().min(1)
    })).mutation(async ({ input }) => {
        return prisma.$transaction(async ctx=>{
            const isConnect = await ctx.factory.findUnique({
                where:{
                    id: input.id,
                    media:{
                        some:{
                            id: input.mediaId
                        }
                    }
                },
            })
            if(isConnect){
                return ctx.factory.update({
                    where: {
                        id: input.id
                    },
                    data: {
                        media: {
                            disconnect: { id: input.mediaId }
                        }
                    }
                })
            }
            return ctx.factory.update({
                where: {
                    id: input.id
                },
                data: {
                    media: {
                        connect: { id: input.mediaId }
                    }
                }
            })
        })
    })
})