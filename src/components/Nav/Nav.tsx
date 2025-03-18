// "use client"
// import { Search, ShoppingCart, X } from "lucide-react"
// import Link from "next/link"
// import { usePathname, useRouter } from "next/navigation"
// import { FormEvent, useContext, useEffect, useState } from "react"
// import { Input } from "../ui/input"
// import { UserContext } from "@/provider/UserContext"
// import { LoginUserContext } from "@/provider/LoginContext"
// import { toast } from "sonner"
// import ExpandableSearch from "../search/ExpandableSearch"
// import Login from "../Login/Login"

// const Nav = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [isVisible, setIsVisible] = useState(true)
//   const [loginOpen, setLoginOpen] = useState(false)
//   const [lastScrollY, setLastScrollY] = useState(0)
//   const [isOpen, setIsOpen] = useState(false);
//   const pathname = usePathname()
//   const router = useRouter()
//   const {isLoggedIn} = useContext(LoginUserContext)!
//   const { user } = useContext(UserContext);

//   useEffect(() => {
//     let ticking = false;
  
//     const handleScroll = () => {
//       if (!ticking) {
//         requestAnimationFrame(() => {
//           setIsVisible(window.scrollY < lastScrollY);
//           setLastScrollY(window.scrollY);
//           ticking = false;
//         });
//         ticking = true;
//       }
//     };
  
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);


//   // //handle the search click
//   const handleSearch = () => {
//     setIsOpen(!isOpen)
//   }

//       //for the cart click
//       const handleCartClick = (e: FormEvent) => {
//         if (!isLoggedIn) {
//             e.preventDefault();
//             toast.error("Please log in to access your cart");
    
//             console.log("nav test: ", user?._id);
    
//             if (user?._id) {
//                 localStorage.setItem("redirectAfterLogin", `/cart/${user._id}`);
//             } else {
//                 localStorage.setItem("redirectAfterLogin", "/cart");
//             }
    
//             router.push("/login");
//         } else {
//             router.push(`/cart/${user?._id}`);
//         }
//     };

//     const handleModelOpen = () =>{
//       if(!isLoggedIn && loginOpen){
//         <Login/>
//       }
//     }

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
//           <div
//             className={"flex flex-1 items-center justify-center sm:justify-start"}
//           >
//             <div className="flex shrink-0 items-center">
//               <a href="home" className="text-orange-700 no-underline hover:text-gray-300 hover:duration-500">
//                 <img
//                   className={`h-auto overflow-hidden w-40 sm:w-44 md:w-48 transition-all duration-300`}
//                   src="/image/logo2.png"
//                   alt="Casemellow"
//                 />
//               </a>
//             </div>

//             {/* Desktop Navigation Links */}
//             <div className={`hidden sm:ml-6 sm:block lg:ml-12`}>
//               <div className="flex space-x-4">
//                 <Link
//                   href="/home"
//                   className={`rounded-md px-3 py-2 text-sm font-medium ${pathname === "/home" ? "text-white font-semibold" : "text-gray-300 hover:text-white"}`}
//                 >
//                   Home
//                 </Link>
//                 <Link
//                   href="/customize"
//                   className={`rounded-md px-3 py-2 text-sm font-medium ${pathname === "/customize" ? "text-white font-semibold" : "text-gray-300 hover:text-white"}`}
//                 >
//                   Customize
//                 </Link>
//                 <Link
//                   href="/products"
//                   className={`rounded-md px-3 py-2 text-sm font-medium ${pathname === "/products" ? "text-white font-semibold" : "text-gray-300 hover:text-white"}`}
//                 >
//                   Products
//                 </Link>
//                 <Link
//                   href="/order"
//                   className={`rounded-md px-3 py-2 text-sm font-medium ${pathname === "/order" ? "text-white font-semibold" : "text-gray-300 hover:text-white"}`}
//                 >
//                   Order
//                 </Link>
//                 <Link
//                   href="/about"
//                   className={`rounded-md px-3 py-2 text-sm font-medium ${pathname === "/about" ? "text-white font-semibold" : "text-gray-300 hover:text-white"}`}
//                 >
//                   About
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Right Side Icons and Profile */}
//           <div className="flex items-center gap-1 sm:gap-2">
//             {/* Search Icon */}
//             <button
//               className="text-gray-300 hover:text-white p-1"
//               onClick={handleSearch}
//               aria-label={"Open search"}
//             >
//               <Search className="size-4" />
//             </button>
  

//             {/* Cart Icon */}
//               <button onClick={handleCartClick} className="text-gray-300 hover:text-white p-1">
//               <ShoppingCart className="size-5 sm:size-6" />
//             </button>
  

//             {/* Profile Dropdown */}
//             <div className="relative ml-1">
//               {
//                 isLoggedIn ? (
//                   <button
//                     type="button"
//                     className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                     onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                     id="user-menu-button"
//                     aria-expanded={isDropdownOpen}
//                     aria-haspopup="true"
//                   >
//                     <span className="sr-only">Open user menu</span>
//                     <img
//                       className="size-8 rounded-full"
//                       src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                       alt="User Avatar"
//                     />
//                   </button>
//                 ) : (
//                   <div className="flex space-x-4">
//                     <Link href="/login" className="text-sm text-gray-300 hover:text-white cursor-pointer" onClick={(e)=>setLoginOpen(true)} >Login</Link>
//                     <Link href="/signup" className="text-sm text-gray-300 hover:text-white cursor-pointer">Sign Up</Link>
//                   </div>
//                 )
//               }

//               {isDropdownOpen && isLoggedIn && (
//                 <div
//                   id="user-dropdown"
//                   className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5"
//                 >
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
//             <Link
//               href="/home"
//               className={`block rounded-md px-3 py-2 text-base font-medium ${pathname === "/home" ? "text-white bg-gray-700" : "text-gray-300"}`}
//             >
//               Home
//             </Link>
//             <Link
//               href="/customize"
//               className={`block rounded-md px-3 py-2 text-base font-medium ${pathname === "/customize" ? "text-white bg-gray-700" : "text-gray-300"}`}
//             >
//               Customize
//             </Link>
//             <Link
//               href="/products"
//               className={`block rounded-md px-3 py-2 text-base font-medium ${pathname === "/products" ? "text-white bg-gray-700" : "text-gray-300"}`}
//             >
//               Products
//             </Link>
//             <Link
//               href="/order"
//               className={`block rounded-md px-3 py-2 text-base font-medium ${pathname === "/order" ? "text-white bg-gray-700" : "text-gray-300"}`}
//             >
//               Order
//             </Link>
//             <Link
//               href="/about"
//               className={`block rounded-md px-3 py-2 text-base font-medium ${pathname === "/about" ? "text-white bg-gray-700" : "text-gray-300"}`}
//             >
//               About
//             </Link>
//           </div>
//         </div>
//       )}
//       {/* Expandable Search Component */}
//       <ExpandableSearch isOpen={isOpen} onOpenChange={setIsOpen} />
//     </nav>
//   )
// }

// export default Nav





"use client"
import { Search, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { usePathname} from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { LoginUserContext } from "@/provider/LoginContext"
import ExpandableSearch from "../search/ExpandableSearch"
import Login from "../Login/Login"
import Image from "next/image"
// import { toast, Toaster } from "sonner"

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [loginOpen, setLoginOpen] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname()
  const {isLoggedIn} = useContext(LoginUserContext)!
  const [userId, setUserId] = useState(null);
  const [loginCart, setLoginCart] = useState(false)
  // const { user } = useContext(UserContext);

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

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      const parsedData = JSON.parse(userDetails);
      setUserId(parsedData._id);
    }
  }, []);


  // handle the search click
  const handleSearch = () => {
    setIsOpen(!isOpen)
  }

  const handleLoginModel = () =>{
    setLoginOpen(!loginOpen)
  }

  const handleCartLogin = () => {
    setLoginCart(true);
    setLoginOpen(true); 
  }
 
  console.log(loginCart)
  // for the cart click
  // const handleCartClick = (e: FormEvent) => {
  //   if (!isLoggedIn) {
  //       e.preventDefault();
  //       toast.error("Please log in to access your cart");

  //       console.log("nav test: ", user?._id);

  //       if (user?._id) {
  //           localStorage.setItem("redirectAfterLogin", `/cart/${user._id}`);
  //       } else {
  //           localStorage.setItem("redirectAfterLogin", "/cart");
  //       }

  //       router.push("/login");
  //   } else {
  //       router.push(`/cart/${user?._id}`);
  //   }
  // };


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
            className={"flex flex-1 items-center justify-center sm:justify-start"}
          >
            <div className="flex shrink-0 items-center">
              <Link href="home" className="text-orange-700 no-underline hover:text-gray-300 hover:duration-500">
                <Image
                  className={`h-auto overflow-hidden w-40 sm:w-44 md:w-48 transition-all duration-300`}
                  width={80}
                  height={80}
                  src="/image/logo2.png"
                  alt="Casemellow"
                />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className={`hidden sm:ml-20 sm:block lg:ml-32`}>
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

          {/* Right Side Icons and Profile */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Icon */}
            <button
              className="text-gray-300 hover:text-white p-1"
              onClick={handleSearch}
              aria-label={"Open search"}
            >
              <Search className="size-5 sm:size-6" />
            </button>
  

            {/* Cart Icon */}
            {
              userId ? (
                <Link href={`/cart/${userId}`} className="text-gray-300 hover:text-white p-1">
                  <ShoppingCart className="size-5 sm:size-6" />
                </Link>
              ) : (
                <ShoppingCart onClick={handleCartLogin} className="text-gray-300 hover:text-white cursor-pointer size-5 sm:size-6" />
              )
            }
            
  

            {/* Profile Dropdown */}
            <div className="relative ml-1">
              {
                isLoggedIn ? (
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    id="user-menu-button"
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open user menu</span>
                    <Image
                      className="size-8 rounded-full"
                      height={20}
                      width={20}
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="User Avatar"
                    />
                  </button>
                ) : (
                  <div className="flex space-x-4">
                    <p className="text-sm text-gray-300 hover:text-white cursor-pointer" onClick={handleLoginModel} >Login</p>
                    <p className="text-sm text-gray-300 hover:text-white cursor-pointer" onClick={handleLoginModel}>Sign Up</p>
                  </div>
                )
              }

              {isDropdownOpen && isLoggedIn && (
                <div
                  id="user-dropdown"
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5"
                >
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
      {/* Expandable Search Component */}
      <ExpandableSearch isOpen={isOpen} onOpenChange={setIsOpen}/>
      <Login loginOpen = {loginOpen} onLoginChange={setLoginOpen}/>
    </nav>
  )
}

export default Nav

