import { useState, useEffect } from "react"
import axios from "axios"
import useAuthToken from "../privateToken/authToken"

interface WorkHistory {
  work_date: string
  login_time: string
  logout_time: string
  latitude: string
  longitude: string
  uploaded_work: string
  timestamp: string
}

interface WorkHistoryResponse {
  status: string
  message: string
  data: WorkHistory[]
  total_pages?: number
  total_items?: number
}

const useWorkHistory = (userId: string, page: number) => {
  const [workHistory, setWorkHistory] = useState<WorkHistory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const { authToken } = useAuthToken()

  useEffect(() => {
    if (!authToken) return // Don't fetch data if authToken is null

    const fetchWorkHistory = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await axios.get<WorkHistoryResponse>(
          `http://34.133.203.207:8080/admin/get/user_work_history/${userId}`,
          {
            params: { page },
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )

        if (response.data.status === "success") {
          setWorkHistory(response.data.data)
          setTotalItems(response.data.total_items || 0)
          setTotalPages(response.data.total_pages || 1)
        } else {
          throw new Error(response.data.message || "Failed to fetch work history")
        }
      } catch (err: any) {
        setError(err.message)
        setWorkHistory([])
      } finally {
        setLoading(false)
      }
    }

    fetchWorkHistory()
  }, [userId, page, authToken]) // Ensure the effect re-runs when authToken updates

  return { workHistory, loading, error, totalPages, totalItems }
}

export default useWorkHistory
