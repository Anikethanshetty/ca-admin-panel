import { RegisterForm } from "@/components/authComponents/register/register-form"
import Link from "next/link"


export default function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
      <div className="flex justify-center gap-2 self-end">
          <Link href="/login" className={`flex items-center gap-3 text-white py-2.5 border font-medium text-sm border-gray-500 bg-primary rounded-xl ml-4 relative overflow-hidden group transition-colors duration-500  hover:text-black `}>
                    <span className="relative z-10 px-10 ">Login</span>
                    <span className="absolute inset-0 bg-white scale-x-0 origin-right transition-transform duration-1000 ease-out group-hover:scale-x-100"></span>
                </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:flex justify-center items-center text-center text-xl font-semibold font-sans">
            <blockquote className="mt-6 border-l-2 pl-6 italic">
            "Every successful business has one thing in common—a great accountant."
            </blockquote>
      </div>
    </div>
  )
}
