import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { handelCreateCategory } from "@/lib/manageEmployee/createCategory"

export function CreateCategory() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [errors, setErrors] = useState({ name: "", description: "" })
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken")

    if (!storedToken) {
      alert("Please login. You are not authenticated.")
      router.push("/login")
      return
    }

    setToken(storedToken)
  }, [router])

  const handleSubmit = async () => {
    let newErrors = { name: "", description: "" }

    if (!name.trim()) newErrors.name = "Please enter a category name."
    if (!description.trim()) newErrors.description = "Please enter a description."

    setErrors(newErrors)

    if (newErrors.name || newErrors.description) return

    const categoryData = { name, description }

    if (token) {
        try {
            const response = await handelCreateCategory(categoryData, token)
            alert(response.message) // Show success message from API
            setName("")
            setDescription("")
            setErrors({ name: "", description: "" })
        } catch (error:any) {
            alert(error.message) 
        }
    } else {
        alert("Authentication token not found. Please log in again.")
        router.push("/login")
    }
}

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer">Create Category</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
          <DialogDescription>Describe the category</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-14">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <div className="col-span-3">
              <Input
                id="name"
                placeholder="CA"
                className={`w-full ${errors.name ? "border-red-500" : ""}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <p className="text-red-500 text-[15px] mt-1">{errors.name}</p>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-14">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <div className="col-span-3">
              <Input
                id="description"
                placeholder="Accounting"
                className={`w-full ${errors.description ? "border-red-500" : ""}`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && <p className="text-red-500 text-[15px] mt-1">{errors.description}</p>}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
