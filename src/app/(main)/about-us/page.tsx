const About = () => {
 
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100">
      <header className="p-4 flex justify-between items-center border-b">
        <h1 className="text-2xl font-bold">About <b>Anha Trade International</b></h1>
      </header>
      <main className="p-8">
        <section className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-4">
            At <b>Anha Trade International</b>, our mission is to create high-quality, sustainable clothing that meets the global demand for excellence. We are dedicated to delivering fashionable and durable garments, supporting our clients’ brands with authenticity and craftsmanship.
          </p>
          
          <h2 className="text-xl font-semibold mb-4">Our Values</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Quality</strong>: We uphold strict quality standards to ensure that every piece reflects the skill and dedication of our team.</li>
            <li><strong>Sustainability</strong>: Committed to sustainable sourcing and production practices, we reduce waste and minimize our environmental impact.</li>
            <li><strong>Innovation</strong>: By embracing the latest technology and fashion trends, we stay at the forefront of the industry and meet the evolving needs of our clients.</li>
            <li><strong>Integrity</strong>: We build long-lasting partnerships based on transparency, trust, and respect with both our clients and suppliers.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">Our Story</h2>
          <p className="mb-4">
            Founded with a commitment to quality craftsmanship, [Your Company Name] has grown from a small family business into a trusted exporter of top-tier clothing products. Our journey reflects a dedication to fashion, integrity, and sustainable growth, making us a preferred partner worldwide.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">Why Choose <b>Anha Trade International</b>?</h2>
          <ul className="list-disc pl-5 space-y-2 mb-8">
            <li>Exceptional quality control to meet international standards.</li>
            <li>Commitment to sustainable and ethical production processes.</li>
            <li>Versatile product range tailored to various global markets and styles.</li>
            <li>Skilled team with expertise in design, manufacturing, and export logistics.</li>
            <li>Focus on customer satisfaction through transparency and reliable delivery.</li>
          </ul>

          <div className="flex justify-center mb-8 w-2/3 mx-auto">
            <img src="./aboutbg.jpg" alt="Clothing Production" className="rounded-lg shadow-lg" />
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-4">Join Our Global Network</h2>
          <p>
            Become part of the [Your Company Name] community. Our team works closely with partners around the world to deliver high-quality garments that meet your brand’s standards. Connect with us, stay updated through our newsletter, and let us help you bring your fashion vision to life.
          </p>
        </section>
      </main>
    </div>
  );
};

export default About;
