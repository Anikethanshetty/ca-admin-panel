
import axios from 'axios'

type AdminProfileUpdate = {
  admin_id?: string
  name?: string
  dob?: string 
  email?: string
  phone_number?: string
  position?: string
}

export const updateAdminProfile = async (
  profileData: AdminProfileUpdate,
  authToken?: string
) => {
  try {
    console.log(profileData)
    const response = await axios.put(
      'https://ca.http.vithsutra.com/admin/update/profile_info',
      profileData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        }
      }
    )

    console.log('Profile updated successfully:', response.data)
    return response.data
  } catch (error: any) {
    console.log('Error updating profile:', error.response?.data || error.message)
    throw error
  }
}
