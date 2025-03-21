"use client"
import { useState, useEffect } from 'react'
import axios from 'axios'

interface WorkHistory {
  work_date: string
  login_time: string
  logout_time: string
  latitude: string
  longitude: string
  uploaded_work: string
  timestamp: string
}

const useWorkHistory = (userId:string) => {
  const [workHistory, setWorkHistory] = useState<WorkHistory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [location, setLocation] = useState(null)

  useEffect(() => {
    const fetchWorkHistory = async () => {
      try {
        const response = await axios.get(`https://ca.http.vithsutra.com/user/get/work_history/${userId}`)
        if (response.data.status === 'success') {
          setWorkHistory(response.data.data)
         
        } else {
          throw new Error(response.data.message || 'Failed to fetch work history')
        }

       
      } catch (err:any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    

    fetchWorkHistory()
  }, [])



  
  // useEffect(() => {
  //   workHistory.map((workHistory) => {
  //   const fetchLocation = async () => {
  //     try {
  //       const locationDetails = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${workHistory.latitude}&lon=${workHistory.longitude}&format=json`)
          
  //       console.log(locationDetails.data)
  //       if(locationDetails.data.address.town){
  //         setLocation(locationDetails.data.address.town)
  //       }
  //     } catch (err:any) {
  //       setError(err.message)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   fetchLocation()
  // }, [])

  // });
  
  

  return { workHistory, loading, error }
}

export default useWorkHistory
