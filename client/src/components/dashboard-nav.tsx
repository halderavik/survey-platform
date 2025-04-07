"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, FileText, Home, Settings, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"
import { Avatar, AvatarFallback } from "./ui/avatar"

export function DashboardNav() {
  const pathname = usePathname()
  const { user } = useAuth()

  const routes = [
    {
      href: "/dashboard",
      icon: Home,
      title: "Overview",
    },
    {
      href: "/dashboard/surveys",
      icon: FileText,
      title: "Surveys",
    },
    {
      href: "/dashboard/analytics",
      icon: BarChart3,
      title: "Analytics",
    },
    {
      href: "/dashboard/team",
      icon: Users,
      title: "Team",
    },
    {
      href: "/dashboard/settings",
      icon: Settings,
      title: "Settings",
    },
  ]

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-gray-50/40">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <span className="text-xl font-bold text-indigo-600">SurveyPro</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-4">
        {routes.map((route) => {
          const isActive = pathname === route.href
          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <route.icon className="h-4 w-4" />
              {route.title}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user?.name || 'User'}</span>
            <span className="text-xs text-gray-500">Pro Plan</span>
          </div>
        </div>
      </div>
    </div>
  )
}

