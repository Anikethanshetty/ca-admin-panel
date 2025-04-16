

export async function handelDelete(adminId?: string, token?: string) {

    try {
        const response = await fetch(`https://ca.http.vithsutra.com/admin/delete/profile_picture/${adminId}`, {
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
        return error
    }
}
