"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { handelDeleteUser } from "@/lib/manageEmployee/deleteUser"
import { Ellipsis } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export function EmplMenu({ emplId }: { emplId: string}) {
  const [token, setToken] = useState<string | null>(null)


  useEffect(() => {
    const storedToken = localStorage.getItem("authToken")
    if (!storedToken) {
      alert("You are not authenticated")
      return
    }
    setToken(storedToken)
  }, [])

  const handleDelete = () => {
    if (!token) {
      alert("You are not authenticated")
      return
    }

    handelDeleteUser(emplId, token)
      .then(() => {
        alert("User deleted successfully")
        window.location.reload() 
      })
      .catch((error) => {
        alert("User not deleted: " + error.message)
      })
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



