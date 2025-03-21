export async function handelDeleteUser(emplId: string, token: string) {
    console.log("Deleting User:", emplId, "with token:", token)

    try {
        const response = await fetch(`https://ca.http.vithsutra.com/admin/delete/user/${emplId}`, {
            method: "DELETE",
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
