// hooks/useAdminProfile.ts
import { useEffect, useState } from 'react'
import useAuthToken from '../privateToken/authToken'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import { get } from 'http'

interface AdminProfile {
  name: string
  dob: string
  email: string
  phone_number: string
  profile_url: string
  position: string
  updated_at: string
}

interface DecodedToken {
  email: string
  expiry: number
  id: string
  user_name: string
}

export function useAdminProfile() {
  const [profile, setProfile] = useState<AdminProfile | null>(null)
  const [adminId, setAdminId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { authToken } = useAuthToken()
  
  
  useEffect(() => {
    // const token = Cookies.get('token')
    if (authToken) {
      const decode = jwtDecode<DecodedToken>(authToken)
      setAdminId(decode.id)
      console.log(adminId)
    }
  }, [authToken])

  const fetchProfile = async (id: string) => {
    try {
      setLoading(true)
      setError(null)
    
      const res = await fetch(`httpS://ca.http.vithsutra.com/admin/get/profile_details/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      // console.log(res)
      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message || 'Something went wrong')
      }
      setProfile(result.data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    if (adminId) {

      fetchProfile(adminId)
    }
  }, [adminId])

  return { profile, loading, error, refetch: () => adminId && fetchProfile(adminId) }
}
