import { FaStore, FaFlask, FaShieldAlt, FaClipboardList, FaShippingFast, FaDollarSign, FaConciergeBell } from 'react-icons/fa';

const services = [
  {
    title: 'Selection Of Vendors',
    icon: <FaStore className="text-blue-400 text-4xl" />,
    description: 'We assess factories in terms of product range, quality, production capacity, facilities, financial capability, technology orientation, manpower, working conditions, managerial efficiency, and vendor quality. Based on these assessments, we share our findings with our principals to select approved vendors.',
  },
  {
    title: 'Sampling',
    icon: <FaFlask className="text-green-400 text-4xl" />,
    description: 'Samples are provided to match buyers’ requirements in colors, fabrics, and styles. We manufacture samples for marketing and buyer evaluation, aiding in competitive positioning.',
  },
  {
    title: 'Total Quality Management',
    icon: <FaShieldAlt className="text-red-400 text-4xl" />,
    description: 'From sampling to shipment, quality management is ensured through multi-step inspections, using ERP systems to identify issues and take corrective measures for timely delivery.',
  },
  {
    title: 'Status Reporting',
    icon: <FaClipboardList className="text-yellow-400 text-4xl" />,
    description: 'Status reports provide ongoing updates on production progress, ensuring shipments match the buyer’s quality expectations and are delivered on time.',
  },
  {
    title: 'Shipping Coordination',
    icon: <FaShippingFast className="text-purple-400 text-4xl" />,
    description: 'Documents are prepared and checked as per buyer instructions before shipment to avoid discrepancies.',
  },
  {
    title: 'Price',
    icon: <FaDollarSign className="text-teal-400 text-4xl" />,
    description: 'We compare prices from various suppliers, using our experience to obtain the most realistic prices.',
  },
  {
    title: 'Other Services',
    icon: <FaConciergeBell className="text-pink-400 text-4xl" />,
    description: 'We provide market insights, assist with travel arrangements, and support buyers with local coordination for a comfortable experience.',
  },
];

const ServicesSection = () => {
  return (
    <section className="py-16 px-4 bg-slate-950">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-white">Our Services</h2>
        <p className="mb-12 text-gray-300">
          We provide a range of services to ensure a smooth and efficient buying process, from vendor selection to shipping coordination.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div key={index} className="p-6 bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
