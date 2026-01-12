"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  Scale,
  LayoutDashboard,
  FileText,
  Truck,
  Users,
  Settings,
  BarChart3,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Scale, label: "Weighing", path: "/weighing" },
  { icon: FileText, label: "Transactions", path: "/transactions" },
  { icon: Truck, label: "Vehicles", path: "/vehicles" },
  { icon: Users, label: "Customers", path: "/customers" },
  { icon: Package, label: "Products", path: "/products" },
  { icon: BarChart3, label: "Reports", path: "/reports" },
  { icon: Settings, label: "Settings", path: "/settings" },
]

interface SidebarContentProps {
  collapsed?: boolean
  onNavigate?: () => void
}

export function SidebarContent({ collapsed = false, onNavigate }: SidebarContentProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
    onNavigate?.()
  }

  return (
    <>
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
          <Scale className="w-5 h-5 text-primary" />
        </div>
        {!collapsed && <span className="font-semibold text-lg tracking-tight">WeighPro</span>}
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <button
              key={item.label}
              onClick={() => handleNavigation(item.path)}
              className={cn(
                "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          )
        })}
      </nav>

      {!collapsed && (
        <div className="p-3 border-t border-sidebar-border">
          <div className="text-xs text-muted-foreground px-3 py-2">
            Press <kbd className="px-1.5 py-0.5 bg-secondary rounded text-xs">Ctrl+B</kbd> to toggle
          </div>
        </div>
      )}
    </>
  )
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const isMobile = useIsMobile()

  // On mobile, sidebar is handled by the header's mobile menu
  if (isMobile) {
    return null
  }

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <SidebarContent collapsed={collapsed} />
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full p-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </aside>
  )
}

