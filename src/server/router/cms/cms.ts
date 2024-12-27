import { route } from "@/server/trpc";
import { companyRoute } from "./company";
import { reviewRoute } from "./review";

export const cmsRoute = route({
    company: companyRoute,
    review: reviewRoute
})