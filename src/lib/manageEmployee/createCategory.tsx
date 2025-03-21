import { jwtDecode } from "jwt-decode"

interface DecodedToken {
    email: string
    expiry: number
    id: string
    user_name: string
}

export async function handelCreateCategory(category: { name: string; description: string }, token: string) {
    try {
        const decoded: DecodedToken = jwtDecode(token)

        const payload = {
            category_name: category.name,
            admin_id: decoded.id,
            category_description: category.description
        }

        const response = await fetch("http://34.133.203.207:8080/admin/create/employee_category", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || `Request failed with status ${response.status}`)
        }

        return data // Return success response to be handled in the UI
    } catch (error) {
        console.error("Fetch Error:", error)
        throw new Error("Failed to create category. Please try again.")
    }
}
