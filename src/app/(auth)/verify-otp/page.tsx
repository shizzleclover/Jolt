"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { verifyEmailOtp, resendEmailVerification } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"

export default function VerifyOtpPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const email = searchParams.get("email") || ""
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    const { success, error } = await verifyEmailOtp(email, otp)
    setIsLoading(false)
    if (success) {
      toast({ title: "Email verified!", description: "You can now log in." })
      router.push("/login")
    } else {
      toast({ variant: "destructive", title: "Verification failed", description: error?.message })
    }
  }

  async function handleResend() {
    const { error } = await resendEmailVerification(email)
    if (error) {
      toast({ variant: "destructive", title: "Failed to resend", description: error.message })
    } else {
      toast({ title: "OTP sent!", description: "Check your email for the new code." })
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">Verify Your Email</h2>
      <p className="mb-4 text-muted-foreground">Enter the OTP sent to <span className="font-medium">{email}</span></p>
      <form onSubmit={handleVerify} className="space-y-4">
        <Input
          type="text"
          placeholder="Enter OTP code"
          value={otp}
          onChange={e => setOtp(e.target.value)}
          required
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Verifying..." : "Verify"}
        </Button>
      </form>
      <button
        onClick={handleResend}
        className="mt-4 text-sm text-primary underline"
        type="button"
      >
        Resend OTP
      </button>
    </div>
  )
}
