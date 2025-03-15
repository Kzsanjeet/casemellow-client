// "use client";
// import { Search, ShoppingCart } from "lucide-react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { Input } from "../ui/input";

// const Nav = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isVisible, setIsVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const pathname = usePathname(); 
//   const [search, setSearch] = useState("")


//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > lastScrollY) {
//         setIsVisible(false); // Hide navbar when scrolling down
//       } else {
//         setIsVisible(true); // Show navbar when scrolling up
//       }
//       setLastScrollY(window.scrollY);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   return (
//     <nav
//       className={`fixed top-0 left-0 w-full bg-nav p-2 transition-transform duration-300 z-50 ${
//         isVisible ? "translate-y-0" : "-translate-y-full"
//       }`}
//     >
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
//                 <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
//                 </svg>
//               ) : (
//                 <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
//                 </svg>
//               )}
//             </button>
//           </div>


//           {/* Logo */}
//           <div className="flex flex-1 items-center justify-center sm:justify-start">
//             <div className="flex shrink-0 items-center">
//               <a href="home" className="text-orange-700 no-underline hover:text-gray-300 hover:duration-500">
//                 <img className="h-auto overflow-hidden w-56 sm:w-44 md:w-48" src="/image/logo2.png" alt="Casemellow" />
//               </a>
//             </div>


//             {/* Desktop Navigation Links */}
//             <div className="hidden sm:ml-16 sm:block lg:ml-24">
//               <div className="flex space-x-4">
//                 <Link href="/home" className={`rounded-md px-3 py-2 text-sm font-medium text-gray-300 ${pathname === "/home"? 'text-white font-semibold':"text-gray-300 hover:text-white"}`}>Home</Link>
//                 <Link href="/customize" className={`rounded-md px-3 py-2 text-sm font-medium text-gray-300 ${pathname === "/customize"? 'text-white font-semibold':"text-gray-300 hover:text-white"}`}>Customize</Link>
//                 <Link href="/products" className={`rounded-md px-3 py-2 text-sm font-medium text-gray-300 ${pathname === "/products"? 'text-white font-semibold':"text-gray-300 hover:text-white"}`}>Products</Link>
//                 <Link href="/order" className={`rounded-md px-3 py-2 text-sm font-medium text-gray-300 ${pathname === "/order"? 'text-white font-semibold':"text-gray-300 hover:text-white"}`}>Order</Link>
//                 <Link href="/about" className={`rounded-md px-3 py-2 text-sm font-medium text-gray-300 ${pathname === "/about"? 'text-white font-semibold':"text-gray-300 hover:text-white"}`}>About</Link>
//               </div>
//             </div>
//           </div>

//           <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-2">
//             <div className="relative group">
//                 <Input
//                   placeholder="Search products..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   className="pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 w-full text-white text-sm sm:text-base rounded-full border border-slate-500 focus:border-white focus:ring-2 focus:ring-white transition-all duration-300 outline-none"
//                 />
//             </div>
//           </div>
//           {/* Right Side Icons and Profile */}
//           <div className="flex items-center gap-2 sm:gap-4">
//             {/* Search Icon */}
//             <Link href={`/search?search=${search}`}>
//             <button className="text-gray-300 hover:text-white">
//               <Search className="size-5 sm:size-6" />
//             </button>
//             </Link>

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
//                   <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
//                   <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
//                   <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
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
//             <Link href="/home" className={`block rounded-md px-3 py-2 text-base font-medium ${pathname === "/home" ?"text-white bg-gray-700":"text-gray-300"}`}>Home</Link>
//             <Link href="/customize" className={`block rounded-md px-3 py-2 text-base font-medium ${pathname === "/customize" ?"text-white bg-gray-700":"text-gray-300"}`}>Customize</Link>
//             <Link href="/products" className={`block rounded-md px-3 py-2 text-base font-medium ${pathname === "/products" ?"text-white bg-gray-700":"text-gray-300"}`}>Products</Link>
//             <Link href="/order" className={`block rounded-md px-3 py-2 text-base font-medium ${pathname === "/order" ?"text-white bg-gray-700":"text-gray-300"}`}>Order</Link>
//             <Link href="/about" className={`block rounded-md px-3 py-2 text-base font-medium ${pathname === "/about" ?"text-white bg-gray-700":"text-gray-300"}`}>About</Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Nav;






"use client"
import { Search, ShoppingCart, X } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { FormEvent, useContext, useEffect, useState } from "react"
import { Input } from "../ui/input"
import { UserContext } from "@/provider/UserContext"
import { LoginUserContext } from "@/provider/LoginContext"
import { toast } from "sonner"

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("")
  const pathname = usePathname()
  const router = useRouter()
  // const userContext = useContext(UserContext);
  // if (!userContext) throw new Error("UserContext must be used within a UserProvider");
  const {isLoggedIn} = useContext(LoginUserContext)!
  const { user } = useContext(UserContext);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > lastScrollY) {
  //       setIsVisible(false) // Hide navbar when scrolling down
  //     } else {
  //       setIsVisible(true) // Show navbar when scrolling up
  //     }
  //     setLastScrollY(window.scrollY)
  //   }

  //   window.addEventListener("scroll", handleScroll)
  //   return () => window.removeEventListener("scroll", handleScroll)
  // }, [lastScrollY])

  useEffect(() => {
    let ticking = false;
  
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsVisible(window.scrollY < lastScrollY);
          setLastScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);


  //handle the search click
  const handleSearchClick = () => {
    if (search.trim() && isSearchVisible) {
      // If search input is visible and has content, perform search
      router.push(`/search?search=${encodeURIComponent(search)}`)
    } else {
      // Toggle search visibility
      setIsSearchVisible(!isSearchVisible)
      if (isSearchVisible) {
        setSearch("") // Clear search when hiding
      }
    }
  }

      //for the cart click
      const handleCartClick = (e: FormEvent) => {
        if (!isLoggedIn) {
            e.preventDefault();
            toast.error("Please log in to access your cart");
    
            console.log("nav test: ", user?._id);
    
            if (user?._id) {
                localStorage.setItem("redirectAfterLogin", `/cart/${user._id}`);
            } else {
                localStorage.setItem("redirectAfterLogin", "/cart");
            }
    
            router.push("/login");
        } else {
            router.push(`/cart/${user?._id}`);
        }
    };

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-nav p-2 transition-transform duration-300 z-50 ${
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
          <div
            className={`flex flex-1 items-center ${isSearchVisible ? "justify-start" : "justify-center sm:justify-start"}`}
          >
            <div className="flex shrink-0 items-center">
              <a href="home" className="text-orange-700 no-underline hover:text-gray-300 hover:duration-500">
                <img
                  className={`h-auto overflow-hidden ${isSearchVisible ? "w-32 sm:w-36" : "w-56 sm:w-44 md:w-48"} transition-all duration-300`}
                  src="/image/logo2.png"
                  alt="Casemellow"
                />
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <div className={`hidden sm:ml-6 sm:block lg:ml-12 ${isSearchVisible ? "lg:hidden xl:block" : ""}`}>
              <div className="flex space-x-4">
                <Link
                  href="/home"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${pathname === "/home" ? "text-white font-semibold" : "text-gray-300 hover:text-white"}`}
                >
                  Home
                </Link>
                <Link
                  href="/customize"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${pathname === "/customize" ? "text-white font-semibold" : "text-gray-300 hover:text-white"}`}
                >
                  Customize
                </Link>
                <Link
                  href="/products"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${pathname === "/products" ? "text-white font-semibold" : "text-gray-300 hover:text-white"}`}
                >
                  Products
                </Link>
                <Link
                  href="/order"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${pathname === "/order" ? "text-white font-semibold" : "text-gray-300 hover:text-white"}`}
                >
                  Order
                </Link>
                <Link
                  href="/about"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${pathname === "/about" ? "text-white font-semibold" : "text-gray-300 hover:text-white"}`}
                >
                  About
                </Link>
              </div>
            </div>
          </div>

          {/* Search Input - Conditionally rendered */}
          {isSearchVisible && (
            <div className="absolute right-16 sm:right-20 top-1/2 transform -translate-y-1/2 w-[60%] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              <div className="relative">
                <Input
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 pr-8 py-1.5 w-4/5 text-white text-sm rounded-full border border-slate-500 focus:border-white focus:ring-2 focus:ring-white transition-all duration-300 outline-none bg-gray-700"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && search.trim()) {
                      router.push(`/search?search=${encodeURIComponent(search)}`)
                    } else if (e.key === "Escape") {
                      setIsSearchVisible(false)
                      setSearch("")
                    }
                  }}
                />
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
                <button
                  onClick={() => {
                    setIsSearchVisible(false)
                    setSearch("")
                  }}
                  className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="size-4" />
                  <span className="sr-only">Clear search</span>
                </button>
              </div>
            </div>
          )}

          {/* Right Side Icons and Profile */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Icon */}
            <button
              className="text-gray-300 hover:text-white p-1"
              onClick={handleSearchClick}
              aria-label={isSearchVisible ? "Search" : "Open search"}
            >
              <Search className="size-5 sm:size-6" />
            </button>

            {/* Cart Icon */}
              <button onClick={handleCartClick} className="text-gray-300 hover:text-white p-1">
              <ShoppingCart className="size-5 sm:size-6" />
            </button>
  

            {/* Profile Dropdown */}
            <div className="relative ml-1">
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
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Your Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign out
                  </a>
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
            <Link
              href="/home"
              className={`block rounded-md px-3 py-2 text-base font-medium ${pathname === "/home" ? "text-white bg-gray-700" : "text-gray-300"}`}
            >
              Home
            </Link>
            <Link
              href="/customize"
              className={`block rounded-md px-3 py-2 text-base font-medium ${pathname === "/customize" ? "text-white bg-gray-700" : "text-gray-300"}`}
            >
              Customize
            </Link>
            <Link
              href="/products"
              className={`block rounded-md px-3 py-2 text-base font-medium ${pathname === "/products" ? "text-white bg-gray-700" : "text-gray-300"}`}
            >
              Products
            </Link>
            <Link
              href="/order"
              className={`block rounded-md px-3 py-2 text-base font-medium ${pathname === "/order" ? "text-white bg-gray-700" : "text-gray-300"}`}
            >
              Order
            </Link>
            <Link
              href="/about"
              className={`block rounded-md px-3 py-2 text-base font-medium ${pathname === "/about" ? "text-white bg-gray-700" : "text-gray-300"}`}
            >
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Nav

