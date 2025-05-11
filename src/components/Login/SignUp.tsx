"use client"
import React, {useState, FormEvent } from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { Eye, EyeOff, Lock, Mail, X, Phone } from 'lucide-react'
import { Input } from '../ui/input'
import { toast } from 'sonner'
import Login from './Login'

interface SignUpProps {
  onBackToLogin: () => void
}

const SignUp: React.FC<SignUpProps> = ({ onBackToLogin }) => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  // const [error, setError] = useState("")
  const [status, setStatus] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/client/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, number, password }),
        credentials: "include"
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Signup successful!")
        setStatus("Success")
        setEmail("");
        setName("");
        setNumber("");
        setPassword("");
        // onBackToLogin(); 
      } else {
        toast.error(data.message || "Signup failed.")
      }
    } catch (error) {
      console.error("Signup error:", error)
      toast.error("Something went wrong. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed h-screen w-full z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-4/5 sm:3/12 md:3/12 xl:w-3/12 p-8 bg-white shadow-xl rounded-lg space-y-6">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onBackToLogin}>
          <X size={24} />
        </button>

        <h1 className="text-3xl font-bold text-center">Create Account</h1>
        <p className="text-gray-500 text-center">Join <span className="text-red-700 font-semibold">Casemellow</span></p>

        <Button variant="outline" className="w-full flex items-center justify-center space-x-2 border-gray-300">
          <Image src={"/image/google.png"} className="w-10 mix-blend-multiply" width={30} height={30} alt="Google Logo" />
          <span>Continue with Google</span>
        </Button>

        <div className="border-t border-gray-300 relative">
          <span className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 bg-white px-3 text-gray-500">OR</span>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          {status === "Success" && (
              <div className="p-2 bg-green-50 rounded-xl shadow-md border border-green-200">
              <p className="text-green-700 text-xl">
                Email has been sent to you, Please verify it.
              </p>
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="pl-10" required />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="pl-10" required />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input type="number" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="Phone number" className="pl-10" required />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="pl-10 pr-10" required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg">
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <button onClick={onBackToLogin} className="text-red-600 hover:text-red-700 hover:underline">Login</button>
        </p>
      </div>
    </div>
  )
}

export default SignUp
