import axios from "axios";

export async function handleOtpVerify(email: FormDataEntryValue,otp: FormDataEntryValue) {
  try {
    const response = await axios.post("https://ca.http.vithsutra.com/auth/admin/validate/otp", {
      email,
      otp
    })
    console.log("Login Response:", response.data) 
    return response.data 

  } catch (error) {
    console.log("There was an error:", error)
    throw error 
  }
}

