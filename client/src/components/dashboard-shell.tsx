import type React from "react"
import { cn } from "@/lib/utils"
import { DashboardNav } from "./dashboard-nav"

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({ children, className, ...props }: DashboardShellProps) {
  return (
    <div className="flex h-screen">
      <DashboardNav />
      <main className={cn("flex-1 overflow-y-auto bg-gray-50/40 p-8", className)} {...props}>
        {children}
      </main>
    </div>
  )
}

