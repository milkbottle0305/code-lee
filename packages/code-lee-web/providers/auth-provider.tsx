"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

export type User = {
  id: string
  name: string
  email: string
  image?: string
  bio?: string
  role: "user" | "admin"
  createdAt: string
  reviewCount: number
  problemCount: number
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Simulate fetching user from API/localStorage
        const savedUser = localStorage.getItem("user")
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error("Failed to restore auth session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, we'll create a mock user
      // In a real app, this would validate credentials with a backend
      if (email && password) {
        const mockUser: User = {
          id: "user-1",
          name: email.split("@")[0],
          email,
          role: "user",
          createdAt: new Date().toISOString(),
          reviewCount: 12,
          problemCount: 3,
          bio: "코드 리뷰를 좋아하는 개발자입니다.",
        }

        setUser(mockUser)
        localStorage.setItem("user", JSON.stringify(mockUser))
        return true
      }
      return false
    } catch (error) {
      console.error("Login failed:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, create a mock user
      if (name && email && password) {
        const mockUser: User = {
          id: "user-" + Date.now(),
          name,
          email,
          role: "user",
          createdAt: new Date().toISOString(),
          reviewCount: 0,
          problemCount: 0,
          bio: "",
        }

        setUser(mockUser)
        localStorage.setItem("user", JSON.stringify(mockUser))
        return true
      }
      return false
    } catch (error) {
      console.error("Registration failed:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return false

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
      return true
    } catch (error) {
      console.error("Profile update failed:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
