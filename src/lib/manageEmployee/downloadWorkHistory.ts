import axios from "axios"

export async function handleDownloadHistory(
  start_date: FormDataEntryValue,
  end_date: FormDataEntryValue,
  userId: string,
  authToken: string
) {
  try {
    const response = await axios.get("https://ca.http.vithsutra.com/admin/download/user/report", {
      params: {
        user_id: userId,
        start_date,
        end_date
      },
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      responseType: 'blob'  
    })


    const blob = new Blob([response.data], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'report.pdf') 
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)

    return 'Download initiated'
  } catch (error) {
    console.log("There was an error:", error)
    return error
  }
}
