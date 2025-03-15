"use client"
import React, { FormEvent, use, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { LoginUserContext } from '@/provider/LoginContext'
import Loader from '../Loading/Loader'
import { UserContext } from '@/provider/UserContext'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const {setIsLoggedIn} = useContext(LoginUserContext)!
    const { user,setUser } = useContext(UserContext); // Move this up to component level

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
    
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/client/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include",  // Important to include cookies
          });
    
          const data = await response.json();
    
          if (response.ok) {
            toast.success("Login successful");
            setIsLoggedIn(true); // Set login state to true in context
    
            // Set user data in context
            setUser({
              _id: data.data._id,
              name: data.data.name,
              email: data.data.email,
              number: data.data.number
            });
    
            // Redirect to home or to the previously saved path
            const redirectPath = localStorage.getItem("redirectAfterLogin") || "/home";
            localStorage.removeItem("redirectAfterLogin");
            router.push(redirectPath);
          } else {
            toast.error(data.message || "Login failed.");
            setIsLoggedIn(false); // Set login state to false in context
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error("An unexpected error occurred. Please try again.");
        } finally {
          setLoading(false);
        }
      };

    useEffect(() => {
        if (user) {
            console.log("User has been set:", user); // This will log when user data is updated.
        }
    }, [user]); // The effect will run every time `user` changes
    
    
    if (loading) return <Loader />
  return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-200 shadow-xl rounded-sm">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Welcome Back
                    </h1>
                    <p className="text-gray-500">
                        Login to <span className="text-red-700 font-semibold">Casemellow</span>
                    </p>
                </div>

                <div className="bg-white w-full p-8 rounded-xl shadow-lg space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="relative">
                                <label className="text-sm font-medium text-gray-700 mb-1 block">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@casemellow.com"
                                        className="pl-10 py-5 bg-gray-50"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700 mb-1 block">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="pl-10 py-5 bg-gray-50 pr-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end">
                            <a
                                href="#"
                                className="text-sm text-red-600 hover:text-red-700 hover:underline"
                            >
                                Forgot password?
                            </a>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-red-600 hover:bg-red-700 text-white py-6 rounded-lg transition-colors"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                                    <span>Authenticating...</span>
                                </div>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default Login
