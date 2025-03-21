import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"

interface DecodedToken {
    email: string
    expiry: number
    id: string
    user_name: string
}

interface EmployeeCategory {
    category_id: string
    category_name: string
    category_description: string
}

interface ApiResponse {
    status: string
    message: string
    data: EmployeeCategory[]
}

export function useEmployeeCategories() {
    const [categories, setCategories] = useState<EmployeeCategory[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const token = localStorage.getItem("authToken")
        if (!token) {
            setError("No authentication token found. Please log in.")
            setLoading(false)
            return
        }

        let decodedToken: DecodedToken
        try {
            decodedToken = jwtDecode<DecodedToken>(token)
            if (!decodedToken.id) throw new Error("Invalid token structure. Missing user ID.")
        } catch (error) {
            setError("Invalid authentication token. Please log in again.")
            setLoading(false)
            return
        }

        const fetchCategories = async () => {
            try {
                const response = await fetch(`http://34.133.203.207:8080/admin/get/employee_categories/${decodedToken.id}`,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const result: ApiResponse = await response.json()

                if (!response.ok) {
                    throw new Error(result.message || "Failed to fetch categories")
                }

                setCategories(result.data)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [])

    return { categories, loading, error }
}
