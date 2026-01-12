"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden w-0 min-w-0">
        <Header />
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="max-w-[1600px] mx-auto space-y-4 sm:space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
