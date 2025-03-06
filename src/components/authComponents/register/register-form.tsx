import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
      <h1 className="text-2xl font-bold">Create an <span className="text-primary">Account</span></h1>
            <p className="text-balance text-sm text-muted-foreground">
            Sign up with your details to get started.
            </p>

      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Email" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input id="password" type="password" required placeholder="Password"/>
        </div>
        <Button type="submit" className="w-full bg-primary hover:bg-blue-500 font-semibold text-lg" >
          Create
        </Button>
      </div>
   
    </form>
  )
}
