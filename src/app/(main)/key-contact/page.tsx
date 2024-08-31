import React from 'react';
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const KeyContacts = () => {
  const contacts = [
    {
      name: "John Doe",
      position: "CEO",
      image: "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      linkedin: "#",
      twitter: "#",
      email: "john.doe@example.com",
    },
    {
      name: "Jane Smith",
      position: "HR Manager",
      image: "https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      linkedin: "#",
      twitter: "#",
      email: "jane.smith@example.com",
    },
    {
      name: "Emily Johnson",
      position: "Chief Financial Officer",
      image: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      linkedin: "#",
      twitter: "#",
      email: "emily.johnson@example.com",
    },
    {
      name: "Michael Brown",
      position: "Head of Marketing",
      image: "https://plus.unsplash.com/premium_photo-1675129779554-dc86569708c8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      linkedin: "#",
      twitter: "#",
      email: "michael.brown@example.com",
    },
  ];

  return (
    <div className="w-full h-full bg-white text-gray-900 dark:bg-slate-950 dark:text-gray-100">
      <header className="p-4 flex justify-between items-center border-b">
        <h1 className="text-2xl font-bold">Key Contacts</h1>
      </header>
      <main className="p-8">
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="bg-gray-100 dark:bg-slate-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform transition duration-300 hover:scale-105 hover:bg-gray-200"
            >
              <img
                src={contact.image}
                alt={contact.name}
                className="w-24 h-24 object-cover rounded-full mb-4 shadow-md"
              />
              <h2 className="text-xl font-semibold mb-2">{contact.name}</h2>
              <p className="text-gray-600 mb-4">{contact.position}</p>
              <div className="flex space-x-4">
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="text-blue-600 w-6 h-6 hover:text-blue-800" />
                </a>
                <a href={contact.twitter} target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="text-blue-400 w-6 h-6 hover:text-blue-600" />
                </a>
                <a href={`mailto:${contact.email}`}>
                  <FaEnvelope className="text-gray-600 w-6 h-6 hover:text-gray-800" />
                </a>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default KeyContacts;
