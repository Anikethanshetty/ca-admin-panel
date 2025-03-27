import { useState, useEffect } from "react"
import {jwtDecode} from "jwt-decode"

interface DecodedToken {
  email: string
  expiry: number
  id: string
  user_name: string
}

export default function useAuthToken() {
  const [authToken, setAuthToken] = useState<string | null>(null)
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    setAuthToken(token)

    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token)
        setDecodedToken(decoded)
      } catch (error) {
        console.error("Invalid token:", error)
      }
    }
  }, [])

  return { authToken, decodedToken }
}
