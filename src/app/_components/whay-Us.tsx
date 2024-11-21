import Link from "next/link";
import { SparklesPreview } from "./SparkleHeading";

export default function WhyUs() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <SparklesPreview title="Why Us" />

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Image Section */}
                    <img 
                        src="/aboutbg.jpg" 
                        alt="Why Us" 
                        className="rounded-lg w-full max-h-96 object-cover"
                    />

                    {/* Text Section */}
                    <div>
                        <p className="text-gray-700 dark:text-slate-100 mb-4">
                            Choosing Anha Trade International means partnering with a company that stands at the forefront of the clothing export industry, combining years of expertise with an unwavering commitment to excellence. Since our establishment, we have built a reputation for delivering high-quality garments that exceed client expectations. Our unique approach integrates cutting-edge technology, skilled craftsmanship, and sustainable practices to ensure every product meets international standards. We pride ourselves on our ability to provide end-to-end solutions, from fabric innovation and garment production to seamless global distribution. By prioritizing client satisfaction, timely delivery, and uncompromising quality, Anha Trade International has become a trusted name among retailers and brands worldwide. With our dedicated team and state-of-the-art facilities, we offer a one-stop solution for all your apparel needs, ensuring reliability, transparency, and excellence in every step of the process.
                        </p>

                        {/* Call-to-Action Link */}
                        <Link 
                            href='/why-us' 
                            className="inline-block bg-gradient-to-tr from-white via-cyan-400 to-white dark:from-black dark:via-cyan-900 dark:to-black dark:text-white px-6 py-2 rounded">
                            More info
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
