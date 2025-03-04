import { ForgotPasswordForm } from "@/components/authComponents/forgotpassword/forgotpassword";


export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-[50%] max-w-sm">
        <ForgotPasswordForm />
      </div>
    </div>
  )
}
