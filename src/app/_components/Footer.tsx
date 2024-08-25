import React from 'react';
import Logo from './Logo';
import { FooterIcon } from './FooterIcon';

const Footer = () => {
    return (
            <footer className=" text-white py-8 mt-10 bg-gradient-to-l from-slate-900 via-slate-800 to-slate-900 shadow-inner">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-between ">
                        {/* Logo and Description */}
                        <div className="w-full md:w-1/3 mb-6 md:mb-0 px-2">
                            <Logo />
                            <p className="mt-4 text-gray-400">
                                Creating amazing websites that drive results. Let us bring your ideas to life.
                            </p>
                        </div>
                        {/* Links */}
                        <div className="w-full md:w-1/3 mb-6 md:mb-0">
                            <h3 className="text-xl font-semibold">Quick Links</h3>
                            <ul className="mt-4 space-y-2">
                                <li><a href="#" className="hover:underline text-gray-400">About Us</a></li>
                                <li><a href="#" className="hover:underline text-gray-400">Services</a></li>
                                <li><a href="#" className="hover:underline text-gray-400">Contact</a></li>
                                <li><a href="#" className="hover:underline text-gray-400">Privacy Policy</a></li>
                            </ul>
                        </div>
                        {/* Contact Info */}
                        <div className="w-full md:w-1/3 mb-6 md:mb-0">
                            <h3 className="text-xl font-semibold">Contact Us</h3>
                            <p className="mt-4 text-gray-400">
                                123 Main Street, City, Country<br />
                                Email: info@example.com<br />
                                Phone: (123) 456-7890
                            </p>
                        </div>
                    </div>
                    <div className="mt-8 text-center text-gray-400 border border-x-0 border-t-0 border-b-cyan-800 w-fit p-1 mx-auto">
                        &copy; 2024 Your Company. All rights reserved.
                    </div>
                    <FooterIcon/>
                </div>
            </footer>
    );
};

export default Footer;
