"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import Cookies from "js-cookie"

interface DecodedToken {
    email: string
    expiry: number
    id: string
    user_name: string
}

export function useUsers() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let timeoutId: NodeJS.Timeout
        const controller = new AbortController() 

        async function fetchUsers() {
            try {
                const token = Cookies.get("token")
                if (!token) {
                    setError("No authentication token found. Please log in.")
                    return
                }

                const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token)
                if (!decodedToken.id) {
                    throw new Error("Invalid token structure. Missing user ID.")
                }

                // Start timeout
                timeoutId = setTimeout(() => {
                    setError("No users found (request timeout)")
                    controller.abort() 
                    setLoading(false)
                }, 10000) // 10 seconds

                const apiUrl = `https://ca.http.vithsutra.com/admin/get/users/${decodedToken.id}`
                
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    signal: controller.signal // for aborting if needed
                })

                clearTimeout(timeoutId) // clear timeout if response returns

                if (response.data.status === "success") {
                    setUsers(response.data.data)
                } else {
                    throw new Error(response.data.message || "Failed to fetch users")
                }
            } catch (err: any) {
                if (err.name !== "CanceledError") {
                    setError(err.message || "An unexpected error occurred")
                }
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()

        return () => clearTimeout(timeoutId)
    }, [])

    return { users, loading, error }
}
