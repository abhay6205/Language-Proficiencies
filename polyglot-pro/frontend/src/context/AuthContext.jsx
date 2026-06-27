import React, { createContext, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loginSuccess, logout } from '../slices/authSlice'

export const AuthContextValue = createContext()

export default function AuthContext({ children }) {
  const [isInitialized, setIsInitialized] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // Verify token and fetch user
      dispatch(loginSuccess({
        user: JSON.parse(localStorage.getItem('user') || '{}'),
        token,
      }))
    }
    setIsInitialized(true)
  }, [dispatch])

  return (
    <AuthContextValue.Provider value={{ isInitialized }}>
      {children}
    </AuthContextValue.Provider>
  )
}
