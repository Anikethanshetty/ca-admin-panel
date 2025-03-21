import axios from "axios";

export async function handleLoginForm(email: FormDataEntryValue, password: FormDataEntryValue) {
  try {
    const response = await axios.post("http://34.133.203.207:8080/auth/login/admin", {
      email,
      password
    })
    
    console.log("Login Response:", response.data) 
    return response.data 

  } catch (error) {
    console.error("There was an error:", error)
    throw error 
  }
}
