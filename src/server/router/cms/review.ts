import prisma from "@/lib/db";
import { adminProcedure, procedure, route } from "@/server/trpc";
import { z } from "zod";

export const reviewRoute = route({
  addReview: adminProcedure.mutation(async () => {
    return prisma.review.create({
      data: {
        name: "Untitled",
        text: "Unassigned"
      }
    })
  }),

  deleteReview: adminProcedure.input(z.object({
    id: z.string().min(1)
  })).mutation(async ({ input }) => {
    const deleted = await prisma.review.delete({
      where: input
    })
    return deleted
  }),

  editReview: adminProcedure.input(z.object({
    id: z.string().min(1),
    name: z.optional(z.string()),
    text: z.optional(z.string()),
    link: z.optional(z.union([z.string(), z.null()])),
    mediaId: z.optional(z.union([z.string(), z.null()]))
  })).mutation(async ({ input }) => {
    const { id, ...data } = input
    const update = await prisma.review.update({
      where: {
        id
      },
      data
    })
    return update
  }),
  getReview: procedure.query(async () => {
    return prisma.review.findMany({
      include:{
        pic: true
      }
    })
  }),
  getReviewById: procedure.input(z.object({
    id: z.string()
  })).query(async ({input}) => {
    return prisma.review.findUnique({
      where:input,
      include:{
        pic: true
      }
    })
  })
})