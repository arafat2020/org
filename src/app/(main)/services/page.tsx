import { FaStore, FaFlask, FaShieldAlt, FaClipboardList, FaShippingFast, FaDollarSign, FaConciergeBell } from 'react-icons/fa';

const services = [
  {
    title: 'Vendor Selection & Assessment',
    icon: <FaStore className="text-blue-400 text-4xl" />,
    description: 'We carefully assess factories based on product quality, production capacity, compliance, financial stability, and workforce conditions. Our findings help clients choose from a list of thoroughly vetted vendors that meet their production needs and standards.',
  },
  {
    title: 'Sampling & Prototyping',
    icon: <FaFlask className="text-green-400 text-4xl" />,
    description: 'Our team develops samples that align with buyers’ requirements in terms of design, color, fabric, and style. These samples are used for buyer evaluation and competitive positioning in the market.',
  },
  {
    title: 'Comprehensive Quality Management',
    icon: <FaShieldAlt className="text-red-400 text-4xl" />,
    description: 'From sample creation to final shipment, we implement strict quality control measures, ensuring each step meets international standards. ERP systems help us monitor and address quality concerns promptly.',
  },
  {
    title: 'Production Status Reporting',
    icon: <FaClipboardList className="text-yellow-400 text-4xl" />,
    description: 'We keep our clients updated on production progress through regular status reports, allowing them to monitor quality, timelines, and any necessary adjustments.',
  },
  {
    title: 'Shipping & Logistics Coordination',
    icon: <FaShippingFast className="text-purple-400 text-4xl" />,
    description: 'Our team handles all shipping documentation and logistics, ensuring compliance with buyer instructions to avoid any discrepancies during export.',
  },
  {
    title: 'Competitive Pricing',
    icon: <FaDollarSign className="text-teal-400 text-4xl" />,
    description: 'We negotiate with suppliers to secure competitive pricing without compromising on quality, leveraging our experience to provide cost-effective solutions.',
  },
  {
    title: 'Additional Support Services',
    icon: <FaConciergeBell className="text-pink-400 text-4xl" />,
    description: 'We offer market insights, travel coordination, and local support to ensure a smooth and comfortable experience for buyers visiting our production facilities.',
  },
];

const ServicesSection = () => {
  return (
    <section className="py-16 px-4 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 dark:text-white">Our Services</h2>
        <p className="mb-12 dark:text-gray-300">
          Our range of services is tailored to provide a seamless experience in clothing production and export, from vendor selection to logistics coordination.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div key={index} className="p-6 bg-slate-200 dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{service.title}</h3>
              <p className="dark:text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
