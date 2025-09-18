"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  User, 
  Settings, 
  LogOut, 
  Bell, 
  ChevronDown
} from "lucide-react"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
//import { useAuth } from "@/lib/auth/auth-context"
import { toast } from "sonner"

export function UserMenu() {
 // const { user, signOut } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    try {
      setIsLoading(true)
     // await signOut()
      toast.success("Logged out successfully")
      router.push("/auth/login")
    } catch (error) {
      console.error("Error logging out:", error)
      toast.error("Error logging out")
    } finally {
      setIsLoading(false)
    }
  }

  // Get user initials for avatar fallback
 /* const getUserInitials = () => {
   // if (!user?.user_metadata?.name) return "U"
    
   // const name = user.user_metadata.name as string
    const parts = name.split(" ")
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }*/

  // Get user display name
  const getUserName = () => {
   // return user?.user_metadata?.name || user?.email?.split("@")[0] || "User"
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={isLoading}>
        <button className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-md transition-colors">
          <Avatar className="h-8 w-8">
            {/*<AvatarImage src={user?.user_metadata?.avatar_url} alt={getUserName()} />*/}
            {/*<AvatarFallback>{getUserInitials()}</AvatarFallback>*/}
          </Avatar>
          <div className="flex items-center">
            {/*<span className="text-sm font-medium">{getUserName()}</span>*/}
            <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile" className="cursor-pointer flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings" className="cursor-pointer flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/notifications" className="cursor-pointer flex items-center">
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleLogout} 
          disabled={isLoading} 
          className="cursor-pointer text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isLoading ? "Logging out..." : "Log out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 