import React, { createContext, useContext, useState } from "react"
import { User } from "../types/user"

type AuthContextType = {
  user: User | null
  login: (name: string, email: string) => void
  logout: () => void
  joinMission: (missionId: number) => void
  cancelMission: (missionId: number) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  const login = (name: string, email: string) => {
    setUser({
      id: 1,
      name,
      email,
      missions: [],
    })
  }

  const logout = () => setUser(null)

  const joinMission = (missionId: number) => {
    if (!user) return

    if (!user.missions.includes(missionId)) {
      setUser({
        ...user,
        missions: [...user.missions, missionId],
      })
    }
  }

  const cancelMission = (missionId: number) => {
    if (!user) return

    setUser({
      ...user,
      missions: user.missions.filter((id) => id !== missionId),
    })
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, joinMission, cancelMission }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider")
  }

  return context
}
