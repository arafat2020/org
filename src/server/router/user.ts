import { z } from "zod";
import { procedure, route } from "../trpc";
import prisma from "@/lib/db";
import { UserRole } from "@/lib/userRole";
import * as argon2 from "argon2"

export const userRouter = route({
    isAdminExist: procedure.query(async () => {
        const isAdminExist = await prisma.user.findFirst({
            where:{
                UserRole: UserRole.ADMIN
            }
        })

        return isAdminExist
    }),

    signUpAsAdmin: procedure.input(z.object({
        username: z.string().min(1),
        email: z.string().min(1).email(),
        password: z.string().min(1)
    })).mutation(async ({ input }) => {
        const admin = await prisma.user.create({
            data:{
                name: input.username,
                email: input.email,
                password: await argon2.hash(input.password),
                UserRole: UserRole.ADMIN
            }
        })

        return admin
    })
})