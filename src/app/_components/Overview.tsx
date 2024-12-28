import Link from "next/link";
import { serverClient } from "../_trpc/serverClient";

export default async function Overview() {
  const data = await serverClient.cms.aboutCompany.getAboutCompanyInfo();
  if (data.isPublish) {
    return <section className="py-16 bg-transparent">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Company Overview</h2>
          <p className="text-gray-700 dark:text-slate-100 mb-4">
            {data.description}
          </p>
          <Link href='/about-us' className="bg-gradient-to-tr from-white via-cyan-400 to-white dark:from-black dark:via-cyan-900 dark:to-black dark:text-white px-6 py-2 rounded">More About Us</Link>
        </div>
        <div>
          <img src={data.media?.url || "/bg.jpg"} alt="Company Overview" className="rounded-lg w-full" />
        </div>
      </div>
    </section>
  }
  return (
    <section className="py-16 bg-transparent">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Company Overview</h2>
          <p className="text-gray-700 dark:text-slate-100 mb-4">
            At Anha Trade International, we are a leading name in the clothing export industry, dedicated to delivering exceptional quality garments to clients worldwide. From innovative fabric design to state-of-the-art manufacturing, we provide comprehensive solutions tailored to meet the unique requirements of our clients. With a strong focus on sustainability and ethical practices, we ensure that every product we create aligns with global standards of quality and craftsmanship. Our extensive experience in exporting a diverse range of apparel has enabled us to build long-term relationships with partners across multiple markets. At Anha Trade International, we are committed to transforming your vision into reality while upholding excellence in every stitch.
          </p>
          <Link href='/about-us' className="bg-gradient-to-tr from-white via-cyan-400 to-white dark:from-black dark:via-cyan-900 dark:to-black dark:text-white px-6 py-2 rounded">More About Us</Link>
        </div>
        <div>
          <img src="/bg.jpg" alt="Company Overview" className="rounded-lg w-full" />
        </div>
      </div>
    </section>
  );
}
