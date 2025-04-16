
import axios from 'axios'



export const updateAdminProfilePhoto = async (
  photoForm: FormData,
  authToken?: string,
  adminId?:string
) => {
  try {
    const response = await axios.put(
        `https://ca.http.vithsutra.com/admin/update/profile_picture/${adminId}`,
        photoForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      )

    // console.log('Profile updated successfully:', response.data)
    return response.data
  } catch (error: any) {
    console.log('Error updating profile:', error.response?.data || error.message)
    throw error
  }
}
