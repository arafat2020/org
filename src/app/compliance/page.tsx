import React from 'react';

const Compliance = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100">
      <header className="p-4 flex justify-between items-center border-b">
        <h1 className="text-2xl font-bold">Compliance & Ethics</h1>
      </header>
      <main className="p-8">
        <section className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Our Commitment to Compliance</h2>
          <p className="mb-4">
            At Gurmant, we are dedicated to upholding the highest standards of compliance and ethics in all aspects of our business. Our commitment extends to the ethical sourcing of ingredients, ensuring sustainability, maintaining rigorous food safety standards, and adhering to all applicable regulations.
          </p>
          
          <h2 className="text-xl font-semibold mb-4">Ethical Sourcing</h2>
          <p className="mb-4">
            We believe in sourcing our ingredients responsibly. Gurmant partners with suppliers who share our values, ensuring that all products are obtained through fair labor practices and without harm to the environment. Our ethical sourcing practices include:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li><strong>Fair Trade</strong>: Ensuring that our suppliers are compensated fairly and work in safe conditions.</li>
            <li><strong>Transparency</strong>: Full visibility into our supply chain to guarantee that all ingredients meet our ethical standards.</li>
            <li><strong>Respect for Local Communities</strong>: Supporting local farmers and producers by sourcing locally whenever possible.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mb-4">Sustainability Practices</h2>
          <p className="mb-4">
            Sustainability is at the core of our operations. We are committed to reducing our environmental impact through various initiatives, including:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li><strong>Eco-Friendly Packaging</strong>: Utilizing recyclable and biodegradable materials for our product packaging.</li>
            <li><strong>Waste Reduction</strong>: Implementing practices that minimize waste during production and distribution.</li>
            <li><strong>Energy Efficiency</strong>: Adopting energy-efficient technologies in our facilities to reduce our carbon footprint.</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">Food Safety Standards</h2>
          <p className="mb-4">
            Ensuring the safety and quality of our products is of utmost importance. Gurmant adheres to stringent food safety protocols to protect our customers, including:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li><strong>HACCP Compliance</strong>: Implementing Hazard Analysis and Critical Control Points to identify and manage food safety risks.</li>
            <li><strong>Regular Audits</strong>: Conducting frequent internal and third-party audits to maintain high safety standards.</li>
            <li><strong>Quality Assurance</strong>: Comprehensive testing of all products to ensure they meet our strict quality criteria.</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">Regulatory Adherence</h2>
          <p className="mb-4">
            We comply with all relevant laws and regulations, both domestically and internationally. Our regulatory adherence includes:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li><strong>FDA Compliance</strong>: Ensuring that all products meet the standards set by the Food and Drug Administration (FDA).</li>
            <li><strong>International Standards</strong>: Adhering to global regulations for the export and import of food products.</li>
            <li><strong>Labeling Accuracy</strong>: Providing clear, accurate, and honest labeling of all our products.</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">Our Code of Conduct</h2>
          <p className="mb-8">
            Gurmant maintains a strict Code of Conduct for all employees and partners. This code emphasizes integrity, respect, and accountability in every aspect of our operations. We expect all team members to adhere to these principles and contribute to a culture of ethical behavior.
          </p>

          <h2 className="text-xl font-semibold mb-4">Reporting Concerns</h2>
          <p>
            We encourage our employees, suppliers, and customers to report any concerns regarding our compliance practices. Gurmant is committed to addressing all issues promptly and transparently. You can reach out to us at <a href="mailto:compliance@gurmant.com" className="text-blue-600 underline">compliance@gurmant.com</a>.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Compliance;
