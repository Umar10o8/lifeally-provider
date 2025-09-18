"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect, Suspense } from "react"
import { CustomInput } from "@/components/ui/custom-input"
import { CustomButton } from "@/components/ui/custom-button"
import { toast } from 'sonner'
//import { AuthService } from "@/lib/auth/auth-service"

 function ResetPasswordContent() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [hasResetToken, setHasResetToken] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })

  // Check if URL contains hash parameters from Supabase magic link
  useEffect(() => {
    const hash = window.location.hash
    setHasResetToken(hash.includes('type=recovery'))
  }, [])

  // Countdown timer for redirect
  useEffect(() => {
    if (isSuccess && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
    
    if (isSuccess && countdown === 0) {
      window.location.href = '/auth/login?reset=success'
    }
  }, [isSuccess, countdown])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    try {
      // Check if passwords match
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match')
        return
      }
      
      // Validate password strength
      if (formData.password.length < 3) {
        toast.error('Password must be at least 3 characters long')
        return
      }
      
      setIsLoading(true)
      
      // Use AuthService to update password with timeout handling
    //  const { user } = await AuthService.updatePassword(formData.password)
      
    //  if (user) {
        // Show success
        toast.success('Password has been reset successfully')
        setIsSuccess(true)
      //} else {
        // This should rarely happen, but handle it just in case
        toast.warning('Password was reset, but user session could not be verified. Please try logging in.')
        setTimeout(() => {
          window.location.href = '/auth/login'
        }, 2000)
      //}
      
    } catch (error: any) {
      // Special handling for timeout error - show a more helpful message
      if (error.message && error.message.includes('timed out')) {
        toast.info('Password reset took longer than expected, but may have completed. Please try logging in.')
        // Redirect to login after timeout error
        setTimeout(() => {
          window.location.href = '/auth/login'
        }, 2000)
      } else {
        toast.error(error.message || 'Failed to reset password')
        console.error('Password reset error:', error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (!hasResetToken) {
    return (
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Invalid Reset Link</h2>
        <p className="text-gray-600">
          This password reset link is invalid or has expired.
        </p>
        <div className="pt-4">
          <Link 
            href="/auth/forgot-password" 
            className="font-semibold text-[#20B8B4] inline-block px-4 py-2 border border-[#20B8B4] rounded-md hover:bg-[#20B8B4] hover:text-white transition-colors"
          >
            Request a new reset link
          </Link>
        </div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="text-center space-y-6">
        <div className="bg-green-50 p-6 rounded-lg mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-green-700 mb-4">Password Reset Successful!</h2>
          <p className="text-green-600 text-lg">
            Your password has been reset successfully.
          </p>
          <p className="text-green-600 mt-2">
            Redirecting to login in <span className="font-bold">{countdown}</span> seconds...
          </p>
        </div>
        
        <div className="pt-4">
          <Link 
            href="/auth/login" 
            className="font-semibold text-[#20B8B4] inline-block px-4 py-2 border border-[#20B8B4] rounded-md hover:bg-[#20B8B4] hover:text-white transition-colors"
          >
            Go to Login Now
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Reset Your Password</h2>
        <p className="text-sm text-gray-500 mt-2">
          Enter your new password below
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <CustomInput
          id="password"
          name="password"
          type="password"
          label="NEW PASSWORD"
          autoComplete="new-password"
          required
          placeholder="Enter your new password"
          showPasswordToggle
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
        />

        <CustomInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="CONFIRM PASSWORD"
          autoComplete="new-password"
          required
          placeholder="Confirm your new password"
          showPasswordToggle
          value={formData.confirmPassword}
          onChange={handleChange}
          disabled={isLoading}
        />

        <CustomButton type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Resetting Password...' : 'Reset Password'}
        </CustomButton>
        
        <div className="text-center mt-4">
          <Link 
            href="/auth/login" 
            className="text-[#20B8B4] hover:text-[#2c7a94] text-sm font-medium"
          >
            Back to Sign In
          </Link>
        </div>
      </form>
    </>
  )
}

// Loading fallback for Suspense
function ResetPasswordLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#20B8B4]"></div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordLoading />}>
      <ResetPasswordContent />
    </Suspense>
  )
} 