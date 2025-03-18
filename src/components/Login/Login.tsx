// "use client"
// import React, { FormEvent, use, useContext, useEffect, useState } from 'react'
// import { toast } from 'sonner'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { useRouter } from 'next/navigation'
// import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
// import { LoginUserContext } from '@/provider/LoginContext'
// import Loader from '../Loading/Loader'


// interface LoginModalProps {
//     loginOpen: boolean;
//     onLoginChange: (open: boolean) => void;
// }

// const Login : React.FC<LoginModalProps> = ({ loginOpen, onLoginChange }) => {
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const [loading, setLoading] = useState(false)
//     const router = useRouter()
//     const [showPassword, setShowPassword] = useState(false)
//     const {setIsLoggedIn} = useContext(LoginUserContext)!

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();
//         setLoading(true);
    
//         try {
//           const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/client/login`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email, password }),
//             credentials: "include",  // Important to include cookies
//           });
    
//           const data = await response.json();
    
//           if (response.ok) {
//             toast.success("Login successful");
            
//             setIsLoggedIn(true); // Set login state to true in context

//             localStorage.setItem("userDetails",JSON.stringify(data.data))
           
//             // Redirect to home or to the previously saved path
//             const redirectPath = localStorage.getItem("redirectAfterLogin") || "/home";
//             localStorage.removeItem("redirectAfterLogin");
//             router.push(redirectPath);
//           } else {
//             toast.error(data.message || "Login failed.");
//             setIsLoggedIn(false); // Set login state to false in context
//           }
//         } catch (error) {
//           console.error("Error:", error);
//           toast.error("An unexpected error occurred. Please try again.");
//         } finally {
//           setLoading(false);
        
//         }
//       };

//     if (loading) return <Loader />
//   return (
//         <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
//             <div className="w-full max-w-md p-8 space-y-8 bg-gray-200 shadow-xl rounded-sm">
//                 <div className="text-center space-y-2">
//                     <h1 className="text-3xl font-bold tracking-tight">
//                         Welcome Back
//                     </h1>
//                     <p className="text-gray-500">
//                         Login to <span className="text-red-700 font-semibold">Casemellow</span>
//                     </p>
//                 </div>

//                 <div className="bg-white w-full p-8 rounded-xl shadow-lg space-y-6">
//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         <div className="space-y-4">
//                             <div className="relative">
//                                 <label className="text-sm font-medium text-gray-700 mb-1 block">
//                                     Email Address
//                                 </label>
//                                 <div className="relative">
//                                     <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
//                                     <Input
//                                         type="email"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         placeholder="admin@casemellow.com"
//                                         className="pl-10 py-5 bg-gray-50"
//                                         required
//                                     />
//                                 </div>
//                             </div>

//                             <div className="space-y-1">
//                                 <label className="text-sm font-medium text-gray-700 mb-1 block">
//                                     Password
//                                 </label>
//                                 <div className="relative">
//                                     <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
//                                     <Input
//                                         type={showPassword ? "text" : "password"}
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         placeholder="Enter your password"
//                                         className="pl-10 py-5 bg-gray-50 pr-10"
//                                         required
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={() => setShowPassword(!showPassword)}
//                                         className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                                     >
//                                         {showPassword ? (
//                                             <EyeOff className="h-5 w-5" />
//                                         ) : (
//                                             <Eye className="h-5 w-5" />
//                                         )}
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="flex items-center justify-end">
//                             <a
//                                 href="#"
//                                 className="text-sm text-red-600 hover:text-red-700 hover:underline"
//                             >
//                                 Forgot password?
//                             </a>
//                         </div>

//                         <Button
//                             type="submit"
//                             disabled={loading}
//                             className="w-full bg-red-600 hover:bg-red-700 text-white py-6 rounded-lg transition-colors"
//                         >
//                             {loading ? (
//                                 <div className="flex items-center justify-center space-x-2">
//                                     <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
//                                     <span>Authenticating...</span>
//                                 </div>
//                             ) : (
//                                 "Sign In"
//                             )}
//                         </Button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//   )
// }

// export default Login





"use client";
import React, { FormEvent, useContext,useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, X } from "lucide-react";
import { LoginUserContext } from "@/provider/LoginContext";
import Loader from "../Loading/Loader";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface LoginModalProps {
    loginOpen: boolean;
    onLoginChange: (open: boolean) => void;
}

const Login: React.FC<LoginModalProps> = ({ loginOpen, onLoginChange }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    // const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { setIsLoggedIn } = useContext(LoginUserContext)!;

    // Handle form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/client/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Login successful");
                setIsLoggedIn(true);
                onLoginChange(false); 
                 // Redirect to home or to the previously saved path
                 localStorage.setItem("userDetails",JSON.stringify(data.data))
                 const redirectPath = localStorage.getItem("redirectAfterLogin") || "/home";
                 localStorage.removeItem("redirectAfterLogin");
                 router.push(redirectPath);
            } else {
                toast.error(data.message || "Login failed.");
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!loginOpen) return null; // Hide modal if not open

    if(loading) return <Loader/>

    return (
        <div className="fixed h-screen w-full z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => onLoginChange(false)}>
        <div className="relative w-4/5 sm:3/12 md:3/12 xl:w-3/12 p-8 bg-white shadow-xl rounded-lg space-y-6" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={() => onLoginChange(false)}>
                <X size={24} />
            </button>
            
            <h1 className="text-3xl font-bold text-center">Welcome Back</h1>
            <p className="text-gray-500 text-center">Login to <span className="text-red-700 font-semibold">Casemellow</span></p>
            
            <Button variant="outline" className="w-full flex items-center justify-center space-x-2 border-gray-300" onClick={() => toast.info("Google login coming soon!")}>  
            <Image src="/google.png" className="w-10 mix-blend-multiply" width={40} height={40} alt="Google Logo" />
                <span>Continue with Google</span>
            </Button>

            <div className="border-t border-gray-300 relative">
                <span className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 bg-white px-3 text-gray-500">OR</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@casemellow.com" className="pl-10" required />
                </div>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="pl-10 pr-10" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                </div>
                <div className="flex items-center justify-between">
                    <Link href={"#"} className="text-sm text-red-600 hover:text-red-700">Forgot password?</Link>
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg">
                    {loading ? "Authenticating..." : "Sign In"}
                </Button>
            </form>
            
            <p className="text-center text-gray-600">Don&apos;t have an account? <a href="#" className="text-red-600 hover:text-red-700">Sign Up</a></p>
        </div>
    </div>
    );
};

export default Login;
