import { route } from "@/server/trpc";
import { companyRoute } from "./company";

export const cmsRoute = route({
    company: companyRoute
})