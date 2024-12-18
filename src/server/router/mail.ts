import { z } from "zod";
import { procedure, route } from "../trpc";
import { Mailer } from "@/lib/mailer";

export const mailRouter = route({
    sendMail: procedure.input(z.object({
        name: z.string().min(1),
        email: z.string().min(1),
        message: z.string().min(1)
    })).mutation(async ({input}) => {
        const mailForRequestSender = new Mailer(
            input.email,
            "Request for contact info",
            "We recived your request for contact. We will contact you soon in no time."
        )

        const mailForRequestReceiver = new Mailer(
            "contact@anhabd.com",
            `Request form ${input.name}`,
            `${input.message}\nName: ${input.name}\nE-mail: ${input.email}`
        )
         
        return {
            sender: await mailForRequestSender.sendMail(),
            receiver: await mailForRequestReceiver.sendMail()
        }
    })
})