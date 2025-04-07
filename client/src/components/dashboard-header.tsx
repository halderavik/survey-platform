"use client"

import { useAuth } from "@/hooks/useAuth"
import { Button } from "./ui/button"

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function DashboardHeader({ heading, text, children }: DashboardHeaderProps) {
  const { user, logout } = useAuth()

  return (
    <div className="flex items-center justify-between pb-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{heading}</h1>
        {text && <p className="text-sm text-muted-foreground">{text}</p>}
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
        <Button
          variant="secondary"
          className="bg-indigo-600 text-white hover:bg-indigo-700"
          onClick={() => logout()}
        >
          Logout
        </Button>
        {children && <div className="flex items-center space-x-2">{children}</div>}
      </div>
    </div>
  )
}

