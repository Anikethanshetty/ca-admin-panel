import useAuthToken from "@/hooks/privateToken/authToken"
import { handelDeleteUser } from "@/lib/manageEmployee/deleteUser"
import { useEffect, useState } from "react"

export function handleDeleteUser({emplId}:{emplId:string}){
   const {authToken} = useAuthToken()
  
   
      if (!authToken) {
        alert("You are not authenticated")
        return
      }
  
      handelDeleteUser(emplId, authToken)
        .then(() => {
          alert("User deleted successfully")
          window.location.reload() 
        })
        .catch((error) => {
          alert("User not deleted: " + error.message)
        })
    }
