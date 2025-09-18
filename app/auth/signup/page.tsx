"use client"

import Link from "next/link"
import { Suspense, useState } from "react"
import { useRouter } from "next/navigation"
import { CustomInput } from "@/components/ui/custom-input"
import { CustomButton } from "@/components/ui/custom-button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
//import { useAuth } from "@/lib/auth/auth-context"
import { toast } from 'sonner'

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-binary" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
]

function SignupContent() {
  //const { signUp } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    age: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleGenderChange = (value: string) => {
    setFormData(prev => ({ ...prev, gender: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    
    try {
      setIsLoading(true)
      // Sign up with Supabase and include additional metadata
      //await signUp(formData.email, formData.password, {
        name: formData.name,
       // gender: formData.gender,
        //age: formData.age,
      //})
      
      toast.success('Signup successful! Please check your email for verification.')
      router.push('/auth/login')
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign up')
      console.error('Signup error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Sign up</h2>
        <p className="text-sm text-gray-500 mt-2">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-semibold text-[#20B8B4]">
            Login here
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <CustomInput
          id="name"
          name="name"
          type="text"
          label="NAME"
          autoComplete="name"
          required
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          disabled={isLoading}
        />

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

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 uppercase">
              GENDER
            </label>
            <Select 
              name="gender" 
              value={formData.gender} 
              onValueChange={handleGenderChange}
              disabled={isLoading}
            >
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {genderOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <CustomInput 
            id="age" 
            name="age" 
            type="text" 
            label="AGE" 
            placeholder="Enter here" 
            required 
            value={formData.age}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <CustomInput
          id="password"
          name="password"
          type="password"
          label="PASSWORD"
          autoComplete="new-password"
          required
          placeholder="Enter your password"
          showPasswordToggle
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
        />

        <CustomInput
          id="confirm-password"
          name="confirmPassword"
          type="password"
          label="CONFIRM PASSWORD"
          autoComplete="new-password"
          required
          placeholder="Enter your password"
          showPasswordToggle
          value={formData.confirmPassword}
          onChange={handleChange}
          disabled={isLoading}
        />

        <CustomButton type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </CustomButton>
      </form>
    </>
  )
}

// Loading fallback for Suspense
function SignupLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#20B8B4]"></div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={<SignupLoading />}>
      <SignupContent />
    </Suspense>
  )
}

