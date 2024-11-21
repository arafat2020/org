import { SparklesPreview } from "./SparkleHeading";

export default function Factory() {
    return (
        <section className="py-16 bg-transparent">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Title */}
                <SparklesPreview title="Our Factory"/>

                {/* Description */}
                <p className="text-center text-gray-700 dark:text-slate-100 mb-8">
                    At Anha Trade International, our factory is the heart of our manufacturing process. Equipped with state-of-the-art technology, we ensure that every product meets the highest standards of quality and craftsmanship. Our skilled workforce and advanced machinery allow us to efficiently produce garments that align with international fashion trends while maintaining sustainability practices. Take a look at our facility where innovation and tradition come together to create top-quality apparel.
                </p>

                {/* Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <img
                        src="https://media.istockphoto.com/id/460735677/photo/textile-factory.jpg?s=1024x1024&w=is&k=20&c=l2r5Edp7LA3gLaU-VyCgR8D7Rf38_sOHggSuIoCLh_A="
                        alt="Factory 1"
                        className="rounded-lg w-full object-cover"
                    />
                    <img
                        src="https://media.istockphoto.com/id/1224153292/photo/interior-of-garment-factory-tailoring-industry-fashion-designer-workshop-industry-concept.jpg?s=1024x1024&w=is&k=20&c=hs2Un8PaoxAKBlJURasN67iCeRXZ-tLJDCWTb2evURg="
                        alt="Factory 2"
                        className="rounded-lg w-full object-cover"
                    />
                    <img
                        src="https://media.istockphoto.com/id/584866442/photo/manual-workers-working-at-a-factory.jpg?s=1024x1024&w=is&k=20&c=c6Dp4PKHMu_v8__0TFYPiimoN_pvTB3_KnN416ZH4j8="
                        alt="Factory 3"
                        className="rounded-lg w-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
