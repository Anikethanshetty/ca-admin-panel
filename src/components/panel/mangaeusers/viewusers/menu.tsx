"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { handelDeleteUser } from "@/lib/manageEmployee/deleteUser"
import { Ellipsis } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { useGetFbEmpl } from "@/hooks/manageEmployees/getFbEmployees"
import { toast } from "sonner"
import { jwtDecode } from "jwt-decode"

export function EmplMenu({ emplId }: { emplId: string}) {
  const [token, setToken] = useState<string | null>(null)
  const [adminId,setAdminId] = useState()

  useEffect(() => {
    const storedToken = Cookies.get("token")
    if (!storedToken) {
      alert("You are not authenticated")
      return
    }
    setToken(storedToken)
    //@ts-expect-error
    const decode = jwtDecode(storedToken)?.id
    setAdminId(decode)
  }, [])

  const handleDelete = async() => {
    if (!token) {
      alert("You are not authenticated")
      return
    }

    // const FbUser = fbUsers.find((user) =>{
    //   if( user.empl_id === emplId) return emplId
    // })

    // if (!FbUser) {
    //   toast("User not found")
    //   return
    // }


    handelDeleteUser(emplId, token)
      .then(async() => {
        toast("User deleted successfully")
        window.location.reload() 
      })
      .catch((error) => {
        toast("User not deleted: " + error.message)
      })

  //   if(adminId){
  //   const userDocRef = doc(db, "Admins",adminId , "AdminUsers", emplId)
  //   await deleteDoc(userDocRef)
  // }
    toast("User deleted successfully")
    window.location.reload()
     
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel >Employee Info..</DropdownMenuLabel>
        <DropdownMenuSeparator />
      

        <DropdownMenuGroup>
          <Link href={`/history/${emplId}`}> <DropdownMenuItem variant="default" >
          Work History
        </DropdownMenuItem></Link>
        </DropdownMenuGroup>


        <DropdownMenuItem variant="destructive" onClick={handleDelete}>
          Delete Employee
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}




