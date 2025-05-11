import { useState, useEffect } from "react"
import {jwtDecode} from "jwt-decode"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Cookies from "js-cookie"

interface DecodedToken {
  email: string
  expiry: number
  id: string
  user_name: string
  firebasepassword:string
}

export default function useAuthToken() {
  const [authToken, setAuthToken] = useState<string | null>(null)
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null)
  const [tokenLoading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get("token")
    if(token)
    setAuthToken(token)

    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token)
        setDecodedToken(decoded)
        setLoading(false)
      } catch (error) {
        console.error("Invalid token:", error)
      }
    }else{
      setDecodedToken(null)
      toast.error("You are not authenticated")
      router.push("/login")
    }

  }, [])

  
  return { authToken, decodedToken, tokenLoading }
}
