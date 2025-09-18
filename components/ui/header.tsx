"use client"

import { NotificationDropdown } from "@/components/ui/notification-dropdown"
import { UserMenu } from "@/components/ui/user-menu"

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-8 py-4">
      <h1 className="text-2xl font-semibold text-[#282829]">{title}</h1>

      <div className="flex items-center gap-6">
        <NotificationDropdown />
        <UserMenu />
      </div>
    </header>
  )
}

