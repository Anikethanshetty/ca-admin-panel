import { LoginForm } from "@/components/authComponents/login/login-form"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="fixed inset-0 flex lg:grid lg:grid-cols-2 overflow-hidden">
      <div className="flex flex-col gap-4 p-6 md:p-10 w-full h-full">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:flex justify-center items-center text-center text-xl font-semibold font-sans w-full h-full">
        <blockquote className="mt-6 border-l-2 pl-6 italic">
          "Behind every successful business, there is an astute accountant."
        </blockquote>
      </div>
    </div>
  )
}
