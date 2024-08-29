import { initTRPC } from "@trpc/server";
import { appRouter } from ".";
const t = initTRPC.create()

export const route = t.router
export const procedure = t.procedure