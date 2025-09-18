"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { CustomButton } from "@/components/ui/custom-button"
import { VerificationCodeInput } from "@/components/ui/verification-code-input"

export default function VerifyCodePage() {
  const handleCodeComplete = (code: string) => {
    console.log("Verification code entered:", code)
    // You can add verification logic here
  }

  return (
    <div className="w-full">
      <Link
        href="/auth/login"
        className="inline-flex items-center text-sm font-medium text-[#282829] hover:text-[#2c7a94] mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to login
      </Link>

      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Verify code</h2>
        <p className="mt-2 text-sm text-gray-500">An authentication code has been sent to your email.</p>
      </div>

      <form action="#" method="POST" className="space-y-8">
        <VerificationCodeInput length={5} onComplete={handleCodeComplete} />

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Didn't get a code?
            <button
              type="button"
              className="ml-1 text-[#282829] hover:text-[#2c7a94] font-medium"
              onClick={() => console.log("Request new code")}
            >
              Request again
            </button>
          </p>
        </div>

        <CustomButton type="submit" className="w-full">
          Verify
        </CustomButton>
      </form>
    </div>
  )
}

