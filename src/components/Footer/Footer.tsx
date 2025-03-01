import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="text-slate-200 bg-foot body-font flex flex-col mt-4">
      <div className="container px-5 py-10 mx-auto flex flex-col md:flex-row md:flex-nowrap justify-between">
        {/* Logo & Info Section */}
        <div className="w-full md:w-1/4 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a className="flex title-font font-medium items-center justify-center md:justify-start text-gray-900">
            <img
              src="/image/logo2.png"
              alt="logo"
              className="h-auto object-cover w-auto max-w-[150px]"
            />
          </a>
          <p className="mt-2 text-sm text-slate-200">&copy; {new Date().getFullYear()} Casemellow</p>
          <p className="text-sm text-slate-200">All rights reserved.</p>
        </div>

        {/* Links Section */}
        <div className="flex-grow flex flex-wrap justify-center md:justify-between md:pl-20 mt-8 md:mt-0 gap-8">
          {/* Useful Links */}
          <div className="w-1/2 md:w-auto px-4 text-center md:text-left">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
              Useful Links
            </h2>
            <nav className="list-none">
              {['Home', 'Customize', 'Products', 'Order', 'About'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-slate-200 hover:text-white hover:underline text-sm cursor-pointer">
                    {item}
                  </Link>
                </li>
              ))}
            </nav>
          </div>

          {/* Social Media */}
          <div className="w-1/2 md:w-auto px-4 text-center md:text-left">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
              Social Media
            </h2>
            <nav className="list-none">
              {['Facebook', 'Instagram', 'WhatsApp', 'TikTok'].map((item) => (
                <li key={item}>
                  <a className="text-slate-200 hover:text-white hover:underline text-sm cursor-pointer">
                    {item}
                  </a>
                </li>
              ))}
            </nav>
          </div>

          {/* Contact Section */}
          <div className="w-full md:w-auto px-4 text-center md:text-left">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
              Contact Us
            </h2>
            <nav className="list-none">
              <li>
                <a className="text-slate-200 hover:text-white hover:underline text-sm">
                  casemellow@gmail.com
                </a>
              </li>
              <li>
                <a className="text-slate-200 hover:text-white hover:underline text-sm">
                  Pepsicola, Kathmandu
                </a>
              </li>
            </nav>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-black mt-8">
        <div className="container mx-auto py-4 px-5 flex flex-col sm:flex-row justify-center sm:justify-between items-center">
          <p className="text-[15px] text-slate-200 font-medium text-center">
            &copy; {new Date().getFullYear()} Casemellow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
