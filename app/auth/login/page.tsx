"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect, Suspense } from "react"
import { CustomInput } from "@/components/ui/custom-input"
import { CustomButton } from "@/components/ui/custom-button"
//import { useAuth } from "@/lib/auth/auth-context"
import { toast } from 'sonner'
//import { setAuthCookie, patchFetchWithAuth } from "@/lib/auth/auth-utils"

function LoginForm() {
  //const { signIn } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/dashboard'
  const resetSuccess = searchParams.get('reset') === 'success'

  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loginSuccess, setLoginSuccess] = useState(false)

  // Show toast when coming from password reset
  useEffect(() => {
    if (resetSuccess) {
      toast.success('Your password has been reset successfully. Please sign in with your new password.')
    }
  }, [resetSuccess])
  
  // Handle redirect after successful login
  useEffect(() => {
    if (loginSuccess) {
      console.log('Login successful, preparing redirect');
      
      // Force a page reload to ensure auth headers are properly applied
      const timer = setTimeout(() => {
        console.log('Now redirecting to:', redirectTo);
        window.location.href = redirectTo || '/dashboard';
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [loginSuccess, redirectTo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    try {
      setIsLoading(true)
      
      // Use the auth context to sign in
      console.log('Attempting to sign in with:', formData.email)
      try {
        console.log('Before signIn call')
        
        // Create a promise race between signIn and a timeout
      //  const signInPromise = signIn(formData.email, formData.password)
        const timeoutPromise = new Promise((resolve) => {
          // Check for token every 200ms as a sign of successful auth
          const checkInterval = setInterval(() => {
            const token = localStorage.getItem('sb-access-token')
            if (token) {
              console.log('Auth detected via token presence, proceeding with login')
              clearInterval(checkInterval)
              
              // IMPORTANT: Immediately init auth token injection when token is detected
              // This ensures all subsequent API calls include auth headers
            //  import('@/lib/auth/auth-utils').then(utils => {
                console.log('Explicitly initializing auth token injection after token detection')
            //    utils.initAuthTokenInjection()
                
                // Set auth cookie explicitly for good measure
                document.cookie = `sb-access-token=${token}; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`
            //  })
              
              resolve('auth_success')
            }
          }, 200)
          
          // Fallback timeout after 5 seconds
          setTimeout(() => {
            clearInterval(checkInterval)
            resolve('timeout')
          }, 5000)
        })
        
        // Race the promises
      //  const result = await Promise.race([signInPromise, timeoutPromise])
        
        // console.log('After signIn resolution:', result)
        
        // If we get here, either signIn resolved or we detected auth via token
        // Success toast
        toast.success('Logged in successfully')
        
        // Set loading to false
        setIsLoading(false)
        
        // Trigger redirect immediately without waiting for user state
        console.log('Setting loginSuccess state to trigger redirect')
        setLoginSuccess(true)
        
        // Add explicit initialization of auth token injection
        if (typeof window !== 'undefined') {
          console.log('Initializing auth after successful login')
          // Make sure the token is properly saved before redirecting
          const token = localStorage.getItem('sb-access-token')
          
          if (token) {
            console.log('Found auth token, ensuring proper initialization')
            
            // Set auth cookie explicitly 
            document.cookie = `sb-access-token=${token}; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`
          }
        }
        
        // Force redirect after a delay as a failsafe
        setTimeout(() => {
          console.log('Forced redirect as failsafe')
          window.location.href = redirectTo || '/dashboard'
        }, 1500)
      } catch (signInError) {
        console.error('Detailed signIn error:', signInError)
        throw signInError
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to log in')
      console.error('Login error:', error)
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Welcome back!</h2>
        <p className="text-sm text-gray-500 mt-2">
          New Here?{" "}
          <Link href="/auth/signup" className="font-semibold text-[#20B8B4]">
            Sign Up Now
          </Link>
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
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
        />

        <CustomInput
          id="password"
          name="password"
          type="password"
          label="PASSWORD"
          autoComplete="current-password"
          required
          placeholder="Enter your password"
          showPasswordToggle
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
        />

        <div className="flex items-center justify-end">
          <div className="text-sm">
            <Link href="/auth/forgot-password" className="font-medium text-[#20B8B4] hover:text-[#2c7a94]">
              Forgot password?
            </Link>
          </div>
        </div>

        <CustomButton type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Signing In...' : 'Sign In'}
        </CustomButton>
      </form>
    </>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}

    