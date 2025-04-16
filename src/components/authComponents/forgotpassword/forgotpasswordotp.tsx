"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { handleOtpVerify } from "@/lib/authApi/forgotpassword/otpVerify"
import { useAppSelector } from "@/redux/hooks"
import { useRouter } from "next/navigation"
import { storeToken } from "@/lib/cookie/storeCookie"

const FormSchema = z.object({
  pin: z.string().length(4, {
    message: "Your one-time password must be exactly 4 characters.",
  }),
})


export function ForgotPasswordOtpForm() {
  const router = useRouter()
  const email = useAppSelector((state) => state.email.email)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })
  
 async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
    if(!email){
      toast("Please email not found")
      return
    }
    const reponse = await handleOtpVerify(email,data.pin)
    const Otptoken = reponse.data.token
        storeToken(Otptoken)
    if(reponse.status === "success"){
      toast("OTP verified")
      router.push("/forgotpassword/newpassword")
      return
    }
    toast("OTP verification failed")

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP {...field} maxLength={4} onChange={field.onChange}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="font-semibold ">Submit</Button>
      </form>
    </Form>
  )
}
