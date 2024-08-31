import React from 'react';
import { FaLeaf, FaHandshake, FaRecycle, FaStar } from 'react-icons/fa';

const WhyUs = () => {
  const features = [
    {
      icon: <FaLeaf className="text-green-600 w-12 h-12" />,
      title: "Sustainability",
      description: "We are committed to eco-friendly practices, from sourcing to packaging, ensuring minimal environmental impact.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1613&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      icon: <FaHandshake className="text-blue-600 w-12 h-12" />,
      title: "Ethical Sourcing",
      description: "Our ingredients are sourced from suppliers who uphold the highest standards of fair trade and ethical practices.",
      image: "https://images.unsplash.com/photo-1625244514957-a8cdb2b7df0a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      icon: <FaRecycle className="text-yellow-600 w-12 h-12" />,
      title: "Recyclable Packaging",
      description: "We use recyclable and biodegradable packaging to reduce waste and promote environmental responsibility.",
      image: "https://plus.unsplash.com/premium_photo-1683063005230-ec93739b6dd8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      icon: <FaStar className="text-purple-600 w-12 h-12" />,
      title: "Top Quality",
      description: "Our products undergo rigorous quality checks to ensure that you get the best, every time.",
      image: "https://plus.unsplash.com/premium_photo-1681487810054-4bced4f73e24?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 dark:text-slate-100 text-gray-900">
      <header className="p-4 flex justify-between items-center border-b">
        <h1 className="text-2xl font-bold">Why Choose Us?</h1>
      </header>
      <main className="p-8">
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="dark:bg-gray-800 bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform transition duration-300 hover:scale-105"
            >
              {feature.icon}
              <h2 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h2>
              <p className="mb-4">{feature.description}</p>
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-40 object-cover rounded-lg"
              />
            </div>
          ))}
        </section>
      </main>
      <footer className=" p-6 mt-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-lg font-semibold mb-4">Why Us?</h2>
          <p className="mb-2">
            At Gurmant, we prioritize sustainability, ethical sourcing, and top-quality products. Our commitment to eco-friendly practices and recyclable packaging ensures that we contribute positively to the environment.
          </p>
          <p>
            Join us on our journey to bring the finest, ethically sourced ingredients to your kitchen. Experience the Gurmant difference today!
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WhyUs;
