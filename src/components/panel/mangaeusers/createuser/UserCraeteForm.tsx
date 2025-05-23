"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Cookies from "js-cookie"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { handelCreateUser } from "@/lib/manageEmployee/createUser"
import { CategorySelect } from "./selectCategory"
import { toast } from "sonner"

import { doc, setDoc} from "firebase/firestore"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "@/utils/firestore"
import { jwtDecode } from "jwt-decode"


export function EmplCreateForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    phone_number: "",
    password: "",
    position: "",
    category_id: "",
  })

  const [error, setError] = useState("" )
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [adminId, setAdminId] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = Cookies.get("token")
    if (!storedToken) {
      setError("No authentication token found. Please log in.")
      return
    }
    setToken(storedToken)
 
  }, [])

  useEffect(() => {
    if(token){
      // @ts-expect-error
      const adminId = jwtDecode(token).id
      setAdminId(adminId)
    }
  }, [token])



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCategorySelect = (category: { id: string; name: string }) => {
    setFormData((prev) => ({
      ...prev,
      category_id: category.id,
      position: category.name,
    }))
  }
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!token) {
      toast("Authentication error: Please log in first.")
      return
    }

    setLoading(true)

    try {
      const response = await handelCreateUser(formData, token)
      
      if (response && response.status) {
        toast("User registered successfully!")
        if(adminId){
          const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
          const user = userCredential.user
            const user_id = user.uid

            const userData = {
              email: formData.email,
              name: formData.name,
              user_id: user_id,
              empl_id:response.data.user_id
            }

            const userDocRef = doc(db, "Admins", adminId, "AdminUsers", user_id)
            await setDoc(userDocRef, userData)
            toast("User registered successfully in FB!")
        }
        else{
          toast("Admin not found!")
        }
        
        setFormData({
          name: "",
          dob: "",
          email: "",
          phone_number: "",
          password: "",
          position: "",
          category_id: "",
        })
        setError("")
      } else {
        toast("Failed to register user.")
      }
      
    } catch (error) {
      console.error("Registration error:", error)
      setError("Failed to register user. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Enter Employee Details</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="p-3 bg-red-100 text-red-700 border border-red-400 rounded-md mb-10">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" type="text" placeholder="Enter full name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" name="dob" type="date" value={formData.dob} onChange={handleChange} required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input id="phone_number" name="phone_number" type="tel" placeholder="Enter phone number" value={formData.phone_number} onChange={handleChange} required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Enter a secure password" value={formData.password} onChange={handleChange} required />
            </div>

            <div className="grid gap-2">
              <Label>Category</Label>
              <CategorySelect onSelect={handleCategorySelect} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="position">Position </Label>
              <Input id="position" name="position" type="text" placeholder="Position" value={formData.position} readOnly />
            </div>

            <Button type="submit" className="w-full flex items-center justify-center" disabled={loading}>
              {loading ? <span className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></span> : "Create Employee"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


