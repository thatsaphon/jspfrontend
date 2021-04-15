import axios from '../config/axios'
import { createContext, useEffect, useState } from 'react'
import localStorageService from '../services/localStorageService'

export const ProfileContext = createContext()

function ProfileContextProvider({ children }) {
  const [profile, setProfile] = useState({})
  const fetchProfile = async () => {
    const res = await axios.get('/user/me')
    setProfile(res.data)
  }

  useEffect(() => {
    if (
      localStorageService.getToken() &&
      !localStorageService.getToken().startsWith('{')
    ) {
      fetchProfile()
    }
  }, [])

  return (
    <ProfileContext.Provider value={{ profile, setProfile, fetchProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}
export default ProfileContextProvider
