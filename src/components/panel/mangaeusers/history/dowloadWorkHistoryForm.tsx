"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Cookies from "js-cookie"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "sonner"
import { handleDownloadHistory } from "@/lib/manageEmployee/downloadWorkHistory"
import useAuthToken from "@/hooks/privateToken/authToken"

interface EmplCreateFormProps {
  userId: string
  className?: string
}

export function DowloadWorkHistoryForm({ userId, className }: EmplCreateFormProps) {
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
  })
  const {authToken} = useAuthToken()

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const token = Cookies.get("token")

    if (!token) {
      toast.error("Authentication error: Please log in first.")
      return
    }

    setLoading(true)
    setError("")

    try {
    if(authToken){
      const response = await handleDownloadHistory(formData.start_date, formData.end_date, userId,authToken)
      
      response ? toast.success("History downloaded successfully.") : toast.error("History downloaded Unsuccessfully.")
    }
    } catch (error) {
      console.error("Download error:", error)
      setError("Failed to download history. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        
        <CardContent>
          {error && (
            <div className="p-3 bg-red-100 text-red-700 border border-red-400 rounded-md mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="sd">Start Date</Label>
              <Input
                id="sd"
                name="start_date"
                type="date"
                value={formData.start_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="ed">End Date</Label>
              <Input
                id="ed"
                name="end_date"
                type="date"
                value={formData.end_date}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <span className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></span>
              ) : (
                "Download History"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
