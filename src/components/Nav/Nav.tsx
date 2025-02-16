// "use client"
// import { Search, ShoppingCart } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { Input } from "../ui/input";

// const Nav = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
//   const [lastScrollY,setLastScrollY] = useState(0);

//   useEffect(()=>{
//     const handleScroll = () => {
//       if(window.scrollY > lastScrollY){
//         setIsVisible(false);
//       }else{
//         setIsVisible(true);
//       }
//       setLastScrollY(window.scrollY);
//     }

//     window.addEventListener("Scroll",handleScroll)
//     return ()=>   window.removeEventListener("Scroll",handleScroll)
//   },[lastScrollY])

//   return (
//     <nav className="bg-nav p-3">
//       <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//         <div className="relative flex h-16 items-center justify-between">
//           {/* Mobile Menu Button */}
//           <div className="flex items-center sm:hidden">
//             <button
//               type="button"
//               className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-inset"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               aria-controls="mobile-menu"
//               aria-expanded={isMenuOpen}
//             >
//               <span className="sr-only">Open main menu</span>
//               {isMenuOpen ? (
//                 <svg
//                   className="size-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
//                 </svg>
//               ) : (
//                 <svg
//                   className="size-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
//                 </svg>
//               )}
//             </button>
//           </div>

//           {/* Logo */}
//           <div className="flex flex-1 items-center justify-center sm:justify-start">
//             <div className="flex shrink-0 items-center">
//               <a
//                 href="#"
//                 className="text-orange-700 no-underline hover:text-gray-300 hover:duration-500"
//               >
//                 {/* <h1 className="font-bold text-2xl">Casemellow</h1> */}
//                 <img className="mix-blend-lighten h-auto overflow-hidden w-64" src="/image/logo1.png" alt="Casemellow" />
//               </a>
//             </div>
            
//             {/* Desktop Navigation Links */}
//             <div className="hidden sm:ml-16 sm:block lg:ml-24">
//               <div className="flex space-x-4">
//                 <a href="home" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white">Home</a>
//                 <a href="Product" className={`rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-gray-300 ${pathname === "/home"? 'text-white font-semibold':"text-gray-300 hover:text-white hover:font-semibold"}`}>Customize</a>
//                 <a href="#" className={`rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-gray-300 ${pathname === "/home"? 'text-white font-semibold':"text-gray-300 hover:text-white hover:font-semibold"}`}>Products</a>
//                 <a href="#" className={`rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-gray-300 ${pathname === "/home"? 'text-white font-semibold':"text-gray-300 hover:text-white hover:font-semibold"}`}>Order</a>
//                 <a href="#" className={`rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-gray-300 ${pathname === "/home"? 'text-white font-semibold':"text-gray-300 hover:text-white hover:font-semibold"}`}>About</a>
//               </div>
//             </div>
//           </div>

//           {/* Right Side Icons and Profile */}
//           <div className="flex items-center gap-2 sm:gap-4">

//             {/* Search Icon */}
//             <button className="text-gray-300 hover:text-white">
//               <Search className="size-5 sm:size-6" />
//             </button>

//             {/* Cart Icon */}
//             <button className="text-gray-300 hover:text-white">
//               <ShoppingCart className="size-5 sm:size-6" />
//             </button>

//             {/* Profile Dropdown */}
//             <div className="relative">
//               <button
//                 type="button"
//                 className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                 id="user-menu-button"
//                 aria-expanded={isDropdownOpen}
//                 aria-haspopup="true"
//               >
//                 <span className="sr-only">Open user menu</span>
//                 <img 
//                   className="size-8 rounded-full" 
//                   src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
//                   alt="" 
//                 />
//               </button>

//               {isDropdownOpen && (
//                 <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
//                   <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</a>
//                   <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a>
//                   <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="sm:hidden" id="mobile-menu">
//           <div className="space-y-1 px-2 pt-2 pb-3">
//             <a href="#" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white">Home</a>
//             <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Customize</a>
//             <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Products</a>
//             <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Order</a>
//             <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">About</a>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Nav;


"use client";
import { Search, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false); // Hide navbar when scrolling down
      } else {
        setIsVisible(true); // Show navbar when scrolling up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-nav p-3 transition-transform duration-300 z-50 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
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
                <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>


          {/* Logo */}
          <div className="flex flex-1 items-center justify-center sm:justify-start">
            <div className="flex shrink-0 items-center">
              <a href="home" className="text-orange-700 no-underline hover:text-gray-300 hover:duration-500">
                <img className="mix-blend-lighten h-auto overflow-hidden w-64" src="/image/logo2.png" alt="Casemellow" />
              </a>
            </div>


            {/* Desktop Navigation Links */}
            <div className="hidden sm:ml-16 sm:block lg:ml-24">
              <div className="flex space-x-4">
                <a href="home" className={`rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-gray-300 ${pathname === "/home"? 'text-white font-semibold':"text-gray-300 hover:text-white"}`}>Home</a>
                <a href="customize" className={`rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-gray-300 ${pathname === "/customize"? 'text-white font-semibold':"text-gray-300 hover:text-white"}`}>Customize</a>
                <a href="products" className={`rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-gray-300 ${pathname === "/products"? 'text-white font-semibold':"text-gray-300 hover:text-white"}`}>Products</a>
                <a href="order" className={`rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-gray-300 ${pathname === "/order"? 'text-white font-semibold':"text-gray-300 hover:text-white"}`}>Order</a>
                <a href="about" className={`rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-gray-300 ${pathname === "/about"? 'text-white font-semibold':"text-gray-300 hover:text-white"}`}>About</a>
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
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
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
            <a href="home" className={`block rounded-md px-3 py-2 text-base font-medium ${pathname === "/home" ?"text-white bg-gray-700":"text-gray-300"}`}>Home</a>
            <a href="customize" className={`block rounded-md px-3 py-2 text-base font-medium ${pathname === "/customize" ?"text-white bg-gray-700":"text-gray-300"}`}>Customize</a>
            <a href="product" className={`block rounded-md px-3 py-2 text-base font-medium ${pathname === "/product" ?"text-white bg-gray-700":"text-gray-300"}`}>Products</a>
            <a href="order" className={`block rounded-md px-3 py-2 text-base font-medium ${pathname === "/order" ?"text-white bg-gray-700":"text-gray-300"}`}>Order</a>
            <a href="about" className={`block rounded-md px-3 py-2 text-base font-medium ${pathname === "/about" ?"text-white bg-gray-700":"text-gray-300"}`}>About</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;



