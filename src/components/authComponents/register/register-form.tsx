"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { handelSubmitRegsiter } from "@/lib/authApi/register/handlesubmit"


export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() 
    const formData = new FormData(event.currentTarget)
    const name = formData.get("name")|| ""
    const password = formData.get("password") || ""
    const email = formData.get("email") || ""
    const dob = formData.get("dob") || ""
    const phone_number = formData.get("phoneNumber") || ""
    const position = formData.get("position") || ""


      const status = await handelSubmitRegsiter(name,password,email,dob,phone_number,position) 
      console.log(status)
  }


  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleFormSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
      <h1 className="text-2xl font-bold">Create an <span className="text-primary">Account</span></h1>
            <p className="text-balance text-sm text-muted-foreground">
            Sign up with your details to get started.
            </p>

      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email"  name="email" type="email" placeholder="Email" required />
        </div>
      
        <div className="grid gap-2">
          <Label htmlFor="email">Name</Label>
          <Input id="name"  name="name" type="string" placeholder="Name" required />
        </div> 
        <div className="grid gap-2">
          <Label htmlFor="email">DOB</Label>
          <Input id="dob"  name="dob" type="string" placeholder="Dob" required />
        </div> 
         <div className="grid gap-2">
          <Label htmlFor="email">Phone Number</Label>
          <Input id="phoneNumber"  name="phoneNumber" type="number" placeholder="Phone No." required />
        </div>  
        <div className="grid gap-2">
          <Label htmlFor="email">Position</Label>
          <Input id="position"  name="position" type="string" placeholder="CA | Staff" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input id="password" name="password" type="password" required placeholder="Password"/>
        </div>
        <Button type="submit" className="w-full bg-primary hover:bg-blue-500 font-semibold text-lg" >
          Create
        </Button>
      </div>
   
    </form>
  )
}
