"use client"
import { Search, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter} from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { LoginUserContext } from "@/provider/LoginContext"
import ExpandableSearch from "../search/ExpandableSearch"
import Login from "../Login/Login"
import Image from "next/image"
import { OrderCountContext } from "@/provider/CartContext"
// import { toast, Toaster } from "sonner"

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [loginOpen, setLoginOpen] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { isLoggedIn } = useContext(LoginUserContext)!
  const [userId, setUserId] = useState(null)
  const [loginCart, setLoginCart] = useState(false)
  const { orderCount, setOrderCount } = useContext(OrderCountContext)!
  const { setIsLoggedIn } = useContext(LoginUserContext)!;
  const router = useRouter();


  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsVisible(window.scrollY < lastScrollY)
          setLastScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  //to get user id
  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
  
    if (userDetails && userDetails !== "undefined") {
      try {
        const parsedData = JSON.parse(userDetails);
        if (parsedData && parsedData._id) {
          setUserId(parsedData._id);
        }
      } catch (error) {
        console.error("Error parsing userDetails from localStorage:", error);
        localStorage.removeItem("userDetails"); // Clean up invalid data
      }
    }
  }, []);
  
  


  useEffect(() => {
    const getUserOrderData = async () => {
      if (!userId) return; // Don't fetch if userId is null
      if (isLoggedIn) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/cart/get/${userId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
  
          if (response.status === 404) {
            // Treat 404 as no cart found, set count to 0
            setOrderCount(0);
            return;
          }
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const data = await response.json();
  
          if (data.success && Array.isArray(data.data)) {
            setOrderCount(data.data.length);
          } else {
            setOrderCount(0);
          }
        } catch (error) {
          console.error("Error fetching user order data:", error);
        }
      }
    };
  
    getUserOrderData();
  }, [userId, isLoggedIn]);
  
  // Dependency array ensures re-fetch when userId changes
  
  // handle the search click
  const handleSearch = () => {
    setIsOpen(!isOpen)
  }

  const handleLoginModel = () => {
    setLoginOpen(!loginOpen)
  }

  const handleCartLogin = () => {
    setLoginCart(true);
    setLoginOpen(true); // opens login modal
    localStorage.setItem("redirectAfterLogin", "/cart"); 
  };
  
  const handleSignOut = () => {
    router.push("/");  
    setIsLoggedIn(false);
    setOrderCount(0);
    setLoginCart(false);
    setLoginOpen(false);
    localStorage.removeItem("userDetails");
  };
  
  

  console.log(loginCart)

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
          <div className={"flex flex-1 items-center justify-center sm:justify-start"}>
            <div className="flex shrink-0 items-center">
              <Link href="home" className="text-orange-700 no-underline hover:text-gray-300 hover:duration-500">
                <Image
                  className={`h-auto overflow-hidden w-40 sm:w-44 md:w-48 transition-all duration-300`}
                  width={120}
                  height={120}
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
                  href="/design"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${pathname === "/design" ? "text-white font-semibold" : "text-gray-300 hover:text-white"}`}
                >
                  Designs
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
            <button className="text-gray-300 hover:text-white p-1" onClick={handleSearch} aria-label={"Open search"}>
              <Search className="size-5 sm:size-6" />
            </button>

            {/* Cart Icon */}
            {userId ? (
              <Link href={`/cart/${userId}`} className="relative text-gray-300 hover:text-white p-1">
                <ShoppingCart className="size-5 sm:size-6 text-gray-300 dark:text-white" />
                {orderCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md animate-bounce">
                    {orderCount}
                  </span>
                )}
              </Link>
            ) : (
              <ShoppingCart
                onClick={handleCartLogin}
                className="text-gray-300 hover:text-white cursor-pointer size-5 sm:size-6"
              />
            )}

            {/* Profile Dropdown */}
            <div className="relative ml-1">
              {isLoggedIn ? (
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
                <div className="flex space-x-4 sm:ml-4">
                  <p className="text-[15px] sm:text-xl pl-3 text-gray-300 hover:text-white cursor-pointer" onClick={handleLoginModel}>
                    Login
                  </p>
                </div>
              )}

              {isDropdownOpen && isLoggedIn && (
                <div
                  id="user-dropdown"
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5"
                >
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Your Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </a>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
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
              href="/design"
              className={`block rounded-md px-3 py-2 text-base font-medium ${pathname === "/design" ? "text-white bg-gray-700" : "text-gray-300"}`}
            >
              Designs
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
      <ExpandableSearch isOpen={isOpen} onOpenChange={setIsOpen} />
      <Login loginOpen={loginOpen} onLoginChange={setLoginOpen} />
    </nav>
  )
}

export default Nav

