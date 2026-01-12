"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Bell, Search, Settings, LogOut, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { useIsMobile } from "@/hooks/use-mobile"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { SidebarContent } from "@/components/sidebar"

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/weighing": "Weighing",
  "/transactions": "Transactions",
  "/vehicles": "Vehicles",
  "/customers": "Customers",
  "/products": "Products",
  "/reports": "Reports",
  "/settings": "Settings",
}

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const isMobile = useIsMobile()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to transactions page with search query
      router.push(`/transactions?search=${encodeURIComponent(searchQuery)}`)
      toast({
        title: "Searching...",
        description: `Searching for "${searchQuery}"`,
      })
    }
  }

  const handleSignOut = () => {
    toast({
      title: "Signed Out",
      description: "You have been signed out successfully",
    })
  }

  const currentTitle = pageTitles[pathname] || "Dashboard"

  return (
    <>
      <header className="flex items-center justify-between h-16 px-4 sm:px-6 border-b border-border bg-card">
        <div className="flex items-center gap-2 sm:gap-4">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>
          )}
          <h1 className="text-lg sm:text-xl font-semibold truncate">{currentTitle}</h1>
          <span className="hidden sm:inline-flex px-2 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary">
            Workstation 1
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {!isMobile && (
            <form onSubmit={handleSearch} className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="pl-9 bg-secondary border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          )}

          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                // Open search on mobile - could be a dialog or navigate to search page
                router.push("/transactions")
              }}
            >
              <Search className="w-5 h-5" />
            </Button>
          )}

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary animate-pulse" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">JD</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline text-sm">John Doe</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/settings")}>
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/settings")}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {isMobile && (
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="left" className="w-64 p-0 bg-sidebar border-sidebar-border">
            <div className="flex flex-col h-full">
              <SidebarContent onNavigate={() => setMobileMenuOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  )
}
