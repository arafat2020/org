import { z } from "zod";

export const EditKeyContactSchema = z.object({
    id: z.string().min(1),
    data: z.object({
        name: z.optional(z.string()),
        pic: z.optional(z.string()),
        designation: z.optional(z.string()),
        LinkedInLink: z.optional(z.string()),
        twitterLink: z.optional(z.string()),
        emailLink: z.optional(z.string()),
        faceBookLink: z.optional(z.string()),
        speach: z.optional(z.string()),
    })
})