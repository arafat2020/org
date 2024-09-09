import prisma from "@/lib/db";
import { adminProcedure, route } from "../trpc";

export const siteRouter = route({
    getGeneralInfo: adminProcedure.query(async () => {
        const data = await prisma.$transaction([
            prisma.product.count(),
            prisma.product.count({
                where:{
                    published: true
                }
            }),
            prisma.product.count({
                where:{
                    published: false
                }
            }),
            prisma.jobApplication.count()
        ])

        return data
    })
})