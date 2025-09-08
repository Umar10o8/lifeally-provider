"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calendar, CreditCard, Users, Facebook, Instagram } from "lucide-react"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "My Appointments",
      href: "/dashboard/appointment",
      icon: Calendar,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: CreditCard,
    },
    {
      name: "Notes",
      href: "/dashboard/notes",
      icon: Users,
    },
  ]

  return (
    <div className="flex flex-col h-full text-white bg-[#0670BA] md:bg-transparent">
      {/* Logo */}
      <div className="p-8">
        <h1 className="text-3xl font-bold">Life Ally</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-6 py-3 rounded-xl transition-colors",
                    isActive ? "bg-[#20B8B4] text-white" : "hover:bg-white/10",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Social Links */}
      <div className="p-8 flex gap-4 justify-end">
        <Link href="#" className="hover:text-white/80 transition-colors" aria-label="Facebook">
          <Facebook className="h-5 w-5" />
        </Link>
        <Link href="#" className="hover:text-white/80 transition-colors" aria-label="Instagram">
          <Instagram className="h-5 w-5" />
        </Link>
      </div>
    </div>
  )
}

export const SidebarContent = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
export const SidebarFooter = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
export const SidebarGroup = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
export const SidebarGroupAction = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
export const SidebarGroupContent = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
export const SidebarGroupLabel = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
export const SidebarHeader = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
export const SidebarInput = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
export const SidebarInset = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
export const SidebarMenu = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
export const SidebarMenuAction = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
export const SidebarMenuBadge = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
export const SidebarMenuButton = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
export const SidebarMenuItem = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
export const SidebarMenuSkeleton = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
export const SidebarMenuSub = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
export const SidebarMenuSubButton = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
export const SidebarMenuSubItem = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
export const SidebarProvider = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
export const SidebarRail = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
export const SidebarSeparator = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
export const SidebarTrigger = ({ children }: { children: React.ReactNode }) => <div>{children}</div>

