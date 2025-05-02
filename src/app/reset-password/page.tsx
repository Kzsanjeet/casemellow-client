"use client"
import Login from "@/components/Login/Login"
import { LoginUserContext } from "@/provider/LoginContext"
import { UserContext } from "@/provider/UserContext"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useContext, useEffect, useState } from "react"

// interface SignUpProps {
//   onBackToLogin: () => void
// }

const ResetPassword = ()  => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const { isLoggedIn,setIsLoggedIn } = useContext(LoginUserContext)!
  const { setUser } = useContext(UserContext)!

  // const searchParams = useSearchParams()
    const router = useRouter()

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
        setSuccess(data.message || "Password changed successfully")
        setPassword("")
        setConfirmPassword("")
        setIsLoggedIn(true);
        localStorage.setItem("userDetails", JSON.stringify(data.data))
        setUser(data.data)
        router.push("/")
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("t")
    if (t) {
      setToken(t)
    } else {
      setError("Invalid token")
    }
  }, [])

  return (
    <div className="flex h-full sm:h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md py-20 lg:py-40">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Change Password
        </h1>
        <p className="mt-2 text-center text-gray-600 text-sm">
          Enter your new password below to reset your account.
        </p>
        {error && (
          <p className="text-sm text-red-600 mt-2 bg-red-50 p-4">{error}</p>
        )}
        {success && (
          <p className="text-sm text-green-600 mt-2 bg-green-50 p-4">
            {success}
          </p>
        )}
        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              name="newPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? <p>Changing Password...</p> : <p>Change Password</p>}
          </button>
        </form>
        {/* <div className="mt-4 text-center">
          <button onClick={onBackToLogin} className="text-red-600 hover:text-red-700 hover:underline">Login</button>
        </div> */}
      </div>
    </div>
  )
}

export default ResetPassword