import axios from "axios";

export async function handleForgotPassword(email: FormDataEntryValue) {
  try {
    const response = await axios.post("https://ca.http.vithsutra.com/auth/admin/forgot/password", {
      email,
    })
    
    console.log("Login Response:", response.data) 
    return response.data 

  } catch (error) {
    console.error("There was an error:", error)
    throw error 
  }
}
