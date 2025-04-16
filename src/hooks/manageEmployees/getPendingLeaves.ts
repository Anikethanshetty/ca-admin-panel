import { useState, useEffect } from "react"
import axios from "axios"
import useAuthToken from "../privateToken/authToken"
import { jwtDecode } from "jwt-decode"
// import { set } from "date-fns"

interface Leave {
  user_id: string
  user_name: string
  user_email: string
  user_category: string
  leave_id: string
  leave_from: string
  leave_to: string
  leave_reason: string
  leave_created_at: string
}

interface ApiResponse {
  status: string
  message?: string
  data: {
    leaves: Leave[]
    total_count: number
  }
  error?: string
}
const usePendingLeaves = (adminId: string, page: number) => {
  console.log(adminId)
    const [pendingLeaves, setPendingLeaves] = useState<ApiResponse["data"] | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { authToken, tokenLoading } = useAuthToken()

    const decoded = authToken ? jwtDecode(authToken) : null


    useEffect(() => {
      if (tokenLoading) {
        setLoading(true)
        return
      }
  
      const controller = new AbortController()
      const fetchPendingLeaves = async () => {
        setLoading(true)
        setError(null)
  
        try {
          
        
          const response = await axios.get<ApiResponse>(
            `https://ca.http.vithsutra.com/admin/get/users_pending_leaves/${adminId}`,
            {
              params: { page },
              signal: controller.signal,
              headers: { Authorization: `Bearer ${authToken}` },
            }
          )
        
          if (response.data.status === "success") {
            setPendingLeaves(response.data.data)
          }
          else {
            throw new Error(response.data.message || "Failed to fetch pending leaves")
          }
        } catch (err: any) {
          console.log(err.data.error)
            setError(err.data.error)
          if (!axios.isCancel(err)) {
            setError(err.message)
            setPendingLeaves(null)
          }
        } finally {
          setLoading(false)
        }
      }
      
      fetchPendingLeaves()
      return () => controller.abort()
    }, [adminId, page, authToken, tokenLoading])
  
    // Function to remove granted leave from state
    const removeLeave = (leaveId: string) => {
      setPendingLeaves((prevLeaves) =>
        prevLeaves ? { ...prevLeaves, leaves: prevLeaves.leaves.filter(leave => leave.leave_id !== leaveId) } : null
      )
    }
  
    return { pendingLeaves, loading, error, removeLeave }
  }
  
  export default usePendingLeaves
  