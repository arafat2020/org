import { route } from "@/server/trpc";
import { companyRoute } from "./company";
import { reviewRoute } from "./review";
import { bannerRoute } from "./banner";
import { aboutCompanyRoute } from "./about-company";
import { whyUsRoute } from "./why-us";
import { aboutUsRoute } from "./about-us";
import { factoryRoute } from "./factory";

export const cmsRoute = route({
    company: companyRoute,
    review: reviewRoute,
    banner: bannerRoute,
    aboutCompany: aboutCompanyRoute,
    whyUs: whyUsRoute,
    aboutUs: aboutUsRoute,
    factory: factoryRoute
})