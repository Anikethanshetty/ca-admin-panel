import axios from "axios";
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode";



export async function handleUpdatePassword(password: FormDataEntryValue) {
    console.log(password)
    const spass = password as string
    const token = Cookies.get("token")
    if (!token) {
        return {
            status: "error",
            message: "No authentication token found"
        }
    }
    //@ts-ignore
    const adminId = jwtDecode(token).id
    console.log(adminId)
    try {
    const response = await axios.patch(`https://ca.http.vithsutra.com/admin/update/password/${adminId}`,  { password: spass },{
        headers: {
            Authorization: `Bearer ${token}`
        },

    })
    return response.data 

  } catch (error) {
    console.log("There was an error:", error)
    
  }
}
