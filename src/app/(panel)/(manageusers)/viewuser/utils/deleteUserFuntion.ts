import { handelDeleteUser } from "@/lib/manageEmployee/deleteUser"
import { useEffect, useState } from "react"

export function handleDeleteUser({emplId}:{emplId:string}){
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
      const storedToken = localStorage.getItem("authToken")
      if (!storedToken) {
        alert("You are not authenticated")
        return
      }
      setToken(storedToken)
    }, [])
  
   
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
