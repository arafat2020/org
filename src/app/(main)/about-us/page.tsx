
const About = () => {
 
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100">
    <header className="p-4 flex justify-between items-center border-b">
      <h1 className="text-2xl font-bold">About Gurmant</h1>
    </header>
    <main className="p-8">
      <section className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
        <p className="mb-4">
          At Gurmant, our mission is to celebrate and promote the rich culinary heritage of our community. We strive to bring authentic, high-quality ingredients to your kitchen, ensuring that every meal is a true reflection of tradition and flavor.
        </p>
        
        <h2 className="text-xl font-semibold mb-4">Our Values</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Authenticity</strong>: We source only the finest ingredients that honor traditional recipes and cooking methods.</li>
          <li><strong>Sustainability</strong>: We are committed to environmentally friendly practices in our sourcing and packaging.</li>
          <li><strong>Community</strong>: Gurmant is built on the belief that food brings people together. We support local farmers and producers.</li>
          <li><strong>Quality</strong>: Every product we offer undergoes rigorous quality checks to ensure it meets our high standards.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Our Story</h2>
        <p className="mb-4">
          Founded with a passion for traditional cooking, Gurmant began as a small family business. Over the years, we have grown into a beloved brand, known for our dedication to preserving the culinary arts. Our journey is one of love for food, respect for culture, and a commitment to excellence.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">Why Choose Gurmant?</h2>
        <ul className="list-disc pl-5 space-y-2 mb-8">
          <li>Wide range of authentic ingredients sourced from trusted suppliers.</li>
          <li>Commitment to sustainable and eco-friendly practices.</li>
          <li>Support for local farmers and producers, ensuring fresh and high-quality products.</li>
          <li>Dedication to preserving traditional culinary practices.</li>
          <li>Strong focus on customer satisfaction and community engagement.</li>
        </ul>

        <div className="flex justify-center mb-8">
          <img src="https://media.istockphoto.com/id/1868740441/photo/team-of-business-working-at-the-office-with-documents-on-desk-planning-analyzing-the.jpg?s=1024x1024&w=is&k=20&c=JmkO4mKZhtLqczp77HYunIv0tn4WqfiRILPlteQBSjo=" alt="Gurmant Products" className="rounded-lg shadow-lg" />
        </div>

        <h2 className="text-xl font-semibold mt-8 mb-4">Join Our Community</h2>
        <p>
          We invite you to join the Gurmant community. Whether you&apos; re a home cook or a professional chef, our products are designed to help you create delicious and memorable meals. Follow us on social media, sign up for our newsletter, and be a part of our journey in celebrating culinary excellence.
        </p>
      </section>
    </main>
  </div>

  );
};

export default About;
