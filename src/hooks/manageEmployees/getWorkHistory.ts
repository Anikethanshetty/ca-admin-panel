import { useState, useEffect } from "react"
import axios from "axios"
// import useAuthToken from "../privateToken/authToken"
import Cookies from "js-cookie"


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
  data: {
    history: WorkHistory[]
    total_count: number
  }
}

const useWorkHistory = (userId: string, page: number) => {
  const [workHistory, setWorkHistory] = useState<WorkHistoryResponse["data"] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const authToken = Cookies.get("token")

  const ITEMS_PER_PAGE = 10
  const totalPages = workHistory ? Math.ceil(workHistory.total_count / ITEMS_PER_PAGE) : 0

  useEffect(() => {
    if (!authToken) return

    const controller = new AbortController()
    const fetchWorkHistory = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await axios.get<WorkHistoryResponse>(
          `https://ca.http.vithsutra.com/admin/get/user_work_history/${userId}`,
          {
            params: { page },
            headers: { Authorization: `Bearer ${authToken}` },
            signal: controller.signal,
          }
        )

        if (response.data.status === "success") {
          setWorkHistory(response.data.data)
        } else {
          throw new Error(response.data.message || "Failed to fetch work history")
        }
      } catch (err: any) {
        if (!axios.isCancel(err)) {
          setError(err.message)
          setWorkHistory(null)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchWorkHistory()

    return () => controller.abort()
  }, [userId, page, authToken])

  return { workHistory, loading, error, totalPages }
}

export default useWorkHistory