


export async function handelDeclineLeaves(leave_id: string, token: string, user_id: string) {
    try {
        const response = await fetch(`https://ca.http.vithsutra.com/admin/cancel/user_leave/${user_id}/${leave_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })  

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || `Request failed with status ${response.status}`)
        }

        return data 
    } catch (error: any) {
        console.error("Fetch Error:", error.message || error)
        throw new Error("Failed to delete user. Please try again.")
    }
}
