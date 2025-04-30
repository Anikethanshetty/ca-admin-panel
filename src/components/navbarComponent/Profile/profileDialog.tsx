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
import { useAdminProfile } from "@/hooks/manageEmployees/getProfileDetails"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Trash2, UserCircle2 } from "lucide-react"
import useAuthToken from "@/hooks/privateToken/authToken"
import { jwtDecode } from "jwt-decode"
import {  updateAdminProfilePhoto } from "@/lib/manageEmployee/profile/profileUpdate"
import { toast } from "sonner"
import { updateAdminProfile } from "@/lib/manageEmployee/profile/profilePhotoUpdate"
import { handelDelete } from "@/lib/manageEmployee/profile/profileDelete"
interface AdminProfile {
  name: string
  dob: string
  email: string
  phone_number: string
  profile_url: string
  position: string
  updated_at: string
}

export function ProfileDialog() {
  const [profiles, setProfiles] = useState<AdminProfile>()
  const [adminId, setAdminId] = useState<string | undefined>()
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [disabled,setDisabled] = useState(false)

  

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    position: "",
    dob: "",
  })

  const { profile, loading, error } = useAdminProfile()
  const { authToken } = useAuthToken()

  useEffect(() => {
    if (authToken) {
      try {
        const decoded: any = jwtDecode(authToken)
        setAdminId(decoded?.id)
      } catch (e) {
        console.error("Invalid token",e)
      }
    }
  }, [authToken])

  useEffect(() => {
    if (profile) {
      setProfiles(profile)
      const [day, month, year] = profile?.dob.split("/")
      const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`

      setFormData({
        name: profile?.name || "",
        email: profile?.email || "",
        phone_number: profile?.phone_number || "",
        position: profile?.position || "",
        dob: formattedDate || "",
      })

      setPhotoPreview(profile?.profile_url !== "pending" ? profile?.profile_url : null)
    }
  }, [profile])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhotoFile(file)
      setPhotoPreview(URL.createObjectURL(file))
    }
  }

  

  const handlePhotoDelete = async () => {
    try {
      if (authToken && adminId) {
        setDisabled(true)
        await handelDelete(adminId, authToken)
        toast.success("Profile photo deleted successfully")
        setPhotoFile(null)
        setPhotoPreview(null)
      }
    } catch (error) {
      console.error(error)
      toast.error("Error deleting profile photo")
    }
    finally{
      setDisabled(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setDisabled(true)
    const formattedDob = new Date(formData.dob).toLocaleDateString("en-GB") 

    const profileData = {
      admin_id: adminId,
      name: formData.name,
      dob: formattedDob,
      email: formData.email,
      phone_number: formData.phone_number,
      position: formData.position,
    }


    

    if (authToken) {
      try {
        await updateAdminProfile(profileData, authToken)
        toast.success("Profile updated successfully")
    
     
        try {
          if (photoFile && adminId) {
            const photoForm = new FormData()
            photoForm.append("profile_picture", photoFile)
            await updateAdminProfilePhoto(photoForm, authToken,adminId)
            toast.success("Profile photo updated successfully")
          }
        } catch (error) {
          console.error(error)
          toast.error("Error updating profile ")
        }
    
      } catch (err) {
        console.error(err)
        toast.error("Error updating profile ")
      } finally {
        setDisabled(false)
      }
    }
    

  }

  if (loading || error) 
  return ( <Button variant="outline" className="w-10 h-10 p-0">
          <Avatar>
            <AvatarImage src={ undefined} />
            <AvatarFallback>
              <UserCircle2 className="w-6 h-6" />
            </AvatarFallback>
          </Avatar>
          </Button>
      )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-10 h-10 p-0">
          <Avatar>
            <AvatarImage src={photoPreview || undefined} />
            <AvatarFallback>
              <UserCircle2 className="w-6 h-6" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>Update your profile information here.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={photoPreview || undefined} />
                  <AvatarFallback>
                    <UserCircle2 className="w-12 h-12" />
                  </AvatarFallback>
                </Avatar>
                <label
                  htmlFor="photo-upload"
                  className="absolute bottom-0 right-0 p-1 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </label>
                <input
                  type="file"
                  id="photo-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </div>
              {photoPreview && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handlePhotoDelete}
                  className="flex items-center gap-2"
                  disabled={disabled}
                >
                  <Trash2 className="w-4 h-4"/>
                  Remove Photo
                </Button>
              )}
            </div>

            {["name", "email", "phone_number", "position"].map((field, i) => (
              <div className="grid grid-cols-4 items-center gap-4" key={i}>
                <Label htmlFor={field} className="text-right capitalize">
                  {field.replace("_", " ")}
                </Label>
                <Input
                  id={field}
                  name={field}
                  type={field === "email" ? "email" : field === "phone_number" ? "tel" : "text"}
                  value={(formData as any)[field]}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            ))}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dob" className="text-right">
                DOB
              </Label>
              <Input
                id="dob"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={disabled}>Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
