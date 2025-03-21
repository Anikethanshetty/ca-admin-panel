import {jwtDecode} from "jwt-decode"

interface DecodedToken {
    email: string
    expiry: number
    id: string
    user_name: string
}

export async function handelCreateUser(formData: Record<string, any>, token: string) {
    try {
        const decoded: DecodedToken = jwtDecode(token)
        
        const payload = {
            ...formData,
            admin_id: decoded.id,
        }
       

        const response = await fetch("http://34.133.203.207:8080/admin/create/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Fetch Error:", error)
        throw error
    }
}
