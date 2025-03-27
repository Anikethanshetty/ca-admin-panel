"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { handleForgotPassword } from "@/lib/authApi/forgotpassword/forgotPasswod"
import { useRouter } from "next/navigation"
import { setEmail } from "@/redux/Admin/emailSlice"
import { useDispatch } from "react-redux"




export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const router  = useRouter()    
    const dispatch = useDispatch()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const email = formData.get("email") as string
      const response = await handleForgotPassword(email)
       if (response.status === "success") {
          dispatch(setEmail(email))
          router.push(`/forgotpassword/otp`)
       } else {
        alert("Email sent failed")
       }
       
    }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Change Password</CardTitle>
          <CardDescription>
            Code will be sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-primary font-semibold text-md">
                Send Code
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
