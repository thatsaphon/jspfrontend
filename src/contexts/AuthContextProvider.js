import { createContext, useState } from 'react'
import localStorageService from '../services/localStorageService'

export const AuthContext = createContext()

function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorageService.getToken() &&
      !localStorageService.getToken().startsWith('{')
  )
  const [user, setUser] = useState({})
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
