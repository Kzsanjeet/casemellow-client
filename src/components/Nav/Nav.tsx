"use client"
import { Search, ShoppingCart } from "lucide-react";
import React, { useState } from "react";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-nav p-3">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-inset"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>

          {/* Logo */}
          <div className="flex flex-1 items-center justify-center sm:justify-start">
            <div className="flex shrink-0 items-center">
              <a
                href="#"
                className="text-orange-700 no-underline hover:text-gray-300 hover:duration-500"
              >
                {/* <h1 className="font-bold text-2xl">Casemellow</h1> */}
                <img className="mix-blend-lighten h-auto overflow-hidden w-64" src="/image/logo1.png" alt="Casemellow" />
              </a>
            </div>
            
            {/* Desktop Navigation Links */}
            <div className="hidden sm:ml-16 sm:block lg:ml-24">
              <div className="flex space-x-4">
                <a href="home" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white">Home</a>
                <a href="Product" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-white">Customize</a>
                <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-white">Products</a>
                <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-white">Order</a>
                <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-white">About</a>
              </div>
            </div>
          </div>

          {/* Right Side Icons and Profile */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Icon */}
            <button className="text-gray-300 hover:text-white">
              <Search className="size-5 sm:size-6" />
            </button>

            {/* Cart Icon */}
            <button className="text-gray-300 hover:text-white">
              <ShoppingCart className="size-5 sm:size-6" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                type="button"
                className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                id="user-menu-button"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                <span className="sr-only">Open user menu</span>
                <img 
                  className="size-8 rounded-full" 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="" 
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pt-2 pb-3">
            <a href="#" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white">Home</a>
            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Customize</a>
            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Products</a>
            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Order</a>
            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">About</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;