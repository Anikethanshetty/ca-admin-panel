"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"


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
        async function fetchUsers() {
            try {
                const token = localStorage.getItem("authToken")

                if (!token) {
                    setError("No authentication token found. Please log in.")
                }

                //@ts-ignore
                const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token)

                if (!decodedToken.id) {
                    throw new Error("Invalid token structure. Missing user ID.")
                }

               

                const apiUrl = `http://34.133.203.207:8080/admin/get/users/48d223d7-c502-412a-a9a3-69b83709adc9`
                
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(response)
                if (response.data.status === "success") {
                    setUsers(response.data.data)
                } else {
                    throw new Error(response.data.message || "Failed to fetch users")
                }
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    return { users, loading, error }
}
