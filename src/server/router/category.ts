import prisma from "@/lib/db";
import { procedure, route } from "../trpc";

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
        })

        return categories
    }),
  
})