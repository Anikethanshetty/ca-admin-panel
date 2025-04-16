import { storeToken } from "@/lib/cookie/storeCookie";
import axios from "axios";

export async function handleLoginForm(email: FormDataEntryValue, password: FormDataEntryValue) {
  try {
    const response = await axios.post("https://ca.http.vithsutra.com/auth/login/admin", {
      email,
      password
    })
    return response.data 

  } catch (error) {
    console.log("There was an error:", error)
    return error 
  }
}
