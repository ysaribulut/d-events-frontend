import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { API_URL, NEXT_URL } from '@/config/index'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)


  useEffect(() => checkUserLoggedIn(), [])

  // Register user
  const register = async (user) => {
    console.log(user)
  }

  // Login user
  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${API_URL}/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    })

    const data = await res.json()

    console.log(data)

    if (res.ok) {
      setUser(data.user)
    } else {
      setError(data.message)
      setError(null)
    }
  }

  // Logout user
  const logout = async () => {
    console.log('Logout')
  }

  // Check if user is logged in
  const checkUserLoggedIn = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/user`)
    //const data = await res.json()

  }

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext