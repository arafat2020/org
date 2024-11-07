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
            At  <b>Anha Trade International</b>, we are committed to the highest standards of compliance and ethics in clothing production. Our dedication encompasses ethical sourcing of materials, sustainable production practices, and strict adherence to global manufacturing standards.
          </p>
          
          <h2 className="text-xl font-semibold mb-4">Ethical Sourcing</h2>
          <p className="mb-4">
            We believe in sourcing materials responsibly to protect people and the planet.  <b>Anha Trade International</b> partners with suppliers who share our values, ensuring all materials are obtained through fair labor practices and environmentally conscious methods. Our ethical sourcing practices include:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li><strong>Fair Labor</strong>: Ensuring fair wages, safe conditions, and respect for workers’ rights.</li>
            <li><strong>Supply Chain Transparency</strong>: Full visibility into our supply chain to confirm all materials meet our ethical standards.</li>
            <li><strong>Local Partnerships</strong>: Supporting local fabric producers and suppliers to reduce transportation impact.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mb-4">Sustainability Practices</h2>
          <p className="mb-4">
            Sustainability is essential to our operations. We minimize our environmental impact through various practices, including:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li><strong>Eco-Friendly Materials</strong>: Using organic, recycled, and biodegradable fabrics wherever possible.</li>
            <li><strong>Waste Reduction</strong>: Implementing measures to minimize waste during cutting, sewing, and packaging.</li>
            <li><strong>Energy Efficiency</strong>: Incorporating energy-efficient technology in our production facilities to reduce our carbon footprint.</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">Quality and Safety Standards</h2>
          <p className="mb-4">
            We uphold stringent quality standards to ensure safe, durable, and well-crafted products. Our safety and quality protocols include:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li><strong>ISO Compliance</strong>: Adhering to ISO standards to maintain consistency and quality in production.</li>
            <li><strong>Regular Audits</strong>: Conducting both internal and third-party audits to uphold our quality and safety standards.</li>
            <li><strong>Product Testing</strong>: Comprehensive testing of fabrics and finished products to ensure they meet regulatory and safety criteria.</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">International Regulatory Compliance</h2>
          <p className="mb-4">
            We comply with all relevant laws and regulations for clothing exports worldwide. Our regulatory adherence includes:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li><strong>REACH Compliance</strong>: Ensuring that all products meet EU standards for chemicals and environmental impact.</li>
            <li><strong>Labeling Standards</strong>: Providing clear and accurate labeling in compliance with international standards.</li>
            <li><strong>Customs Compliance</strong>: Following all export/import regulations to streamline international shipping and minimize delays.</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">Our Code of Conduct</h2>
          <p className="mb-8">
          <b>Anha Trade International</b> maintains a strict Code of Conduct for all employees and partners, emphasizing integrity, respect, and accountability across operations. We expect all team members to adhere to these principles, promoting a culture of ethical behavior.
          </p>

          <h2 className="text-xl font-semibold mb-4">Reporting Concerns</h2>
          <p>
            We encourage our employees, suppliers, and clients to report any compliance concerns. [Your Company Name] is committed to addressing all issues promptly and transparently. You can reach out to us at <a href="mailto:compliance@[yourcompanyname].com" className="text-blue-600 underline">compliance@[yourcompanyname].com</a>.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Compliance;
