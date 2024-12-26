import Marquee from '@/components/magicui/marquee';
import { cn } from '@/lib/utils';
import React from 'react'
import { serverClient } from '../_trpc/serverClient';

interface CompanyProp {
    img: string;
    name: string;
}

const CompanyData: CompanyProp[] = [
    {
        img: "https://img.freepik.com/free-vector/golden-elegant-logo-flat-style_52683-17266.jpg?w=740&t=st=1724271584~exp=1724272184~hmac=5acdd209408f9a816e18c520192d09a1acdff2eedac971a13ac4292f4d01081f",
        name: "Luxury"
    },
    {
        img: "https://img.freepik.com/premium-photo/white-golden-letter-logo-design-business-identity-digital-design-company_971166-54223.jpg?w=740",
        name: "Ascertain"
    },
    {
        img: "https://img.freepik.com/free-vector/abstract-logo-flame-shape_1043-44.jpg?w=740&t=st=1724272227~exp=1724272827~hmac=95e16fa72ee528ca1300e5f3e0e8a11ed2ff6a4816ac4a0d5f92e3d3e8aa179c",
        name: "Company"
    },
    {
        img: "https://img.freepik.com/premium-photo/free-vector-colorful-bird-illustration-gradient-bird-colorful-logo-gradient-vector_971166-59253.jpg?w=740",
        name: "Lorem Ipsum"
    },
    {
        img: "https://img.freepik.com/free-vector/golden-elegant-logo-with-frame_52683-13462.jpg?w=740&t=st=1724272341~exp=1724272941~hmac=08400a69b4821e0999a054d73a4c9ca8d459b80de5cc76bb29e58fcda9e83bda",
        name: "Melanous"
    },
    {
        img: "https://img.freepik.com/premium-vector/colorful-bird-gradient-logotype-vector-illustration_1253202-57956.jpg?w=740",
        name: "Parrot"
    }
]

const Company = ({
    img,
    name,
}: CompanyProp) => {
    return (
        <figure
            className={cn(
                "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                // light styles
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                // dark styles
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <img className="rounded-full" width="70" height="70" alt="" src={img} />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">
                        {name}
                    </figcaption>
                </div>
            </div>
        </figure>
    )
}

async function MarqueeTwo() {
    const data = await serverClient.cms.company.getCompany()

    return (
        <div className="relative flex h-auto w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl">
            <Marquee pauseOnHover className="[--duration:20s]">
                {
                    data.length < 3 ? data.map(e => (
                        <Company key={e.id} img={e?.pic?.url || '/industry.svg'} name={e.name}/>
                    )) : CompanyData.map((review) => (
                        <Company key={review.name} {...review} />
                    ))
                }
            </Marquee>
            {/* <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee> */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
        </div>
    )
}

export default MarqueeTwo