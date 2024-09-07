import { z } from "zod";
import { procedure, route } from "../trpc";
import { Mailer } from "@/lib/mailer";

export const mailRouter = route({
    sendMail: procedure.input(z.object({
        name: z.string().min(1),
        email: z.string().min(1),
        message: z.string().min(1)
    })).mutation(async ({input}) => {
        const mail = new Mailer(
            input.email,
            "Request for contact info",
            `${input.message}-${input.name}`
        )

        return mail.sendMail()
    })
})