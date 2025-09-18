"use client"

import Link from "next/link"
import { useState } from "react"
import { CustomInput } from "@/components/ui/custom-input"
import { CustomButton } from "@/components/ui/custom-button"
//import { useAuth } from "@/lib/auth/auth-context"
import { toast } from 'sonner'

export default function ForgotPasswordPage() {
 // const { resetPassword } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    try {
      setIsLoading(true)
      
      // Request password reset
    //  await resetPassword(email)
      
      // Show success message
      setEmailSent(true)
      toast.success('Password reset email sent')
      
    } catch (error: any) {
      toast.error(error.message || 'Failed to send password reset email')
      console.error('Password reset error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (emailSent) {
    return (
      <div className="text-center space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Check Your Email</h2>
          <p className="mt-4 text-gray-600">
            We've sent a password reset link to <strong>{email}</strong>. 
            Please check your inbox and follow the instructions to reset your password.
          </p>
        </div>
        
        <div className="pt-4">
          <p className="text-sm text-gray-500">
            Didn't receive the email?{" "}
            <button 
              onClick={() => handleSubmit(new Event('submit') as any)} 
              className="font-semibold text-[#20B8B4] hover:underline"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Resend email'}
            </button>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Or, go back to{" "}
            <Link href="/auth/login" className="font-semibold text-[#20B8B4] hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Forgot Password</h2>
        <p className="text-sm text-gray-500 mt-2">
          Enter your email and we'll send you a link to reset your password
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <CustomInput
          id="email"
          name="email"
          type="email"
          label="EMAIL"
          autoComplete="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />

        <div className="flex items-center justify-end">
          <div className="text-sm">
            <Link href="/auth/login" className="font-medium text-[#282829] hover:text-[#2c7a94]">
              Back to Sign In
            </Link>
          </div>
        </div>

        <CustomButton type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Reset Password'}
        </CustomButton>
      </form>
    </>
  )
}

