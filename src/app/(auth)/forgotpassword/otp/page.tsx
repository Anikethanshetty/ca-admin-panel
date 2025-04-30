"use client"

import { ForgotPasswordOtpForm } from "@/components/authComponents/forgotpassword/forgotpasswordotp";
import { Card, CardTitle } from "@/components/ui/card";


export default function ForgotPasswordOtp() {

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-[50%] max-w-sm">
        <Card className="flex flex-col gap-6 items-start px-7"> 
            <CardTitle>
                Enter the OTP sent to your email
            </CardTitle>
        <ForgotPasswordOtpForm />
        </Card>
      </div>
    </div>
  )
}
