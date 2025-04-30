import { collection, onSnapshot } from "@firebase/firestore"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import { db } from "@/utils/firestore"

interface User {
    user_id: string
    name: string
    email: string
    login_status?: boolean
    empl_id:string
  }
  
  interface DecodedToken {
    id: string
    [key: string]: any
  }
export function useGetFbEmpl(){
  const [fbUsers, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const adminFbId= Cookies.get('adminFbId')

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      setError(true)
      setLoading(false)
      return
    }

    let adminId: string
    try {
      const decoded = jwtDecode<DecodedToken>(token)
      adminId = decoded.id
    } catch (err) {
      setError(true)
      setLoading(false)
      return
    }

    const unsubscribe = getUsersStream(adminId)
    return () => unsubscribe()
  }, [])

  const getUsersStream = (adminId: string) => {
    const usersRef = collection(db, 'Admins', adminId, 'AdminUsers')
    const unsubscribe = onSnapshot(
      usersRef,
      (snapshot) => {
        const users = snapshot.docs.map((doc) => doc.data() as User)
        const filteredAdmin = users.filter((user) => user.user_id != adminFbId)
        setUsers(filteredAdmin)
        setLoading(false)
      },
      (err) => {
        console.error('Firestore error:', err)
        setError(true)
        setLoading(false)
        
      }
    )
    return unsubscribe
  }

  return {fbUsers,loading,error}
}