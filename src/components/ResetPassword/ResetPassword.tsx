"use client"
import { LoginUserContext } from "@/provider/LoginContext"
import { UserContext } from "@/provider/UserContext"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useContext, useEffect, useState } from "react"
import Login from "../Login/Login"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { toast } from "sonner"
import Nav from "../Nav/Nav"
import Footer from "../Footer/Footer"



const ResetPassword = ()  => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  // const [token, setToken] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
    const [showLogin, setShowLogin] = useState(false) // <-- new state
  const { isLoggedIn,setIsLoggedIn } = useContext(LoginUserContext)!
  const { setUser } = useContext(UserContext)!

  const searchParams = useSearchParams()
  const token = searchParams.get("t")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!password || !confirmPassword) {
      return setError("Please fill all the fields")
    }
    if (password !== confirmPassword) {
      return setError("Passwords do not match")
    }
    try {
      setLoading(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_PORT}/client/password-reset/${token}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
          }
      )
      const data = await response.json()
      if (data.success) {
        toast.success("Password changed successfully")
        setSuccess(data.message || "Password changed successfully")
        setShowLogin(true)
        setPassword("")
        setConfirmPassword("")
        setIsLoggedIn(true);
        localStorage.setItem("userDetails", JSON.stringify(data.data))
        setUser(data.data)
      } else if (data.success === false) {
        setError(data.message || "Something went wrong, Try again !")
      }
    } catch (error: any) {
      setError(
        error?.response?.data?.message ||
          "An error occurred. Please try again later."
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (error || success) {
      setTimeout(() => {
        setError("")
        setSuccess("")
      }, 4000)
    }
  }, [error, success])

  if (showLogin) {
    return <Login loginOpen={true} onLoginChange={() => setShowLogin(false)} />
  }


  return (
    <div
      className="fixed h-screen w-full z-50 flex items-center justify-center bg-white"
    >
      <div
        className="relative w-4/5 sm:3/12 md:3/12 xl:w-3/12 p-8 bg-white shadow-xl rounded-lg space-y-6"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Reset Password
        </h1>
        <p className="text-sm text-center text-gray-600">
          Enter and confirm your new password
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg"
          >
            {loading ? "Changing Password..." : "Change Password"}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword