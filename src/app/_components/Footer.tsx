import React from 'react';
import Logo from './Logo';
import { FooterIcon } from './FooterIcon';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="text-white py-8 mt-10
            bg-gradient-to-tl from-slate-200 via-zinc-200 to-slate-200 
            dark:bg-gradient-to-l dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 shadow-inner">
            <div className="container mx-auto px-4 text-slate-800 dark:text-slate-100">
                <div className="flex flex-wrap justify-between ">
                    {/* Logo and Description */}
                    <div className="w-full md:w-1/3 mb-6 md:mb-0 px-2">
                        <Logo />
                        <p className="mt-4 dark:text-gray-400 capitalize font-sans font-medium">
                            100% export warranted buying  house
                        </p>
                    </div>
                    {/* Links */}
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-xl font-semibold">Quick Links</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link href="/about-us" className="hover:underline dark:text-gray-400">About Us</Link></li>
                            <li><Link href="/services" className="hover:underline dark:text-gray-400">Services</Link></li>
                            <li><Link href="/Contact" className="hover:underline dark:text-gray-400">Contact</Link></li>
                        </ul>
                    </div>
                    {/* Contact Info */}
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-xl font-semibold">Contact Us</h3>
                        <p className="mt-4 dark:text-gray-400">
                            House 34 Road 5 Sector 13 Uttara 1230 Dhaka, Bangladesh<br />
                            <a href="mailto:anhatradeinternational1@gmail.com">Email: anhatradeinternational1@gmail.com</a><br />
                            Phone: +8801511560330
                        </p>
                    </div>
                </div>
                <div className="mt-8 text-center dark:text-gray-400 border border-x-0 border-t-0 border-b-cyan-800 w-fit p-1 mx-auto">
                    &copy; 2024 Your Company. All rights reserved.
                </div>
                <FooterIcon />
            </div>
        </footer>
    );
};

export default Footer;
