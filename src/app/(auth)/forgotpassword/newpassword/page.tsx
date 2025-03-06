import { NewPasswordForm } from "@/components/authComponents/forgotpassword/newpasswordform";



export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-[50%] max-w-sm">
        <NewPasswordForm />
      </div>
    </div>
  )
}
