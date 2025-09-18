"use client"

import type React from "react"
import "@/styles/globals.css"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/ui/sidebar"
import { Header } from "@/components/ui/header"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case "/":
      return "Dashboard"
    case "/schedule":
      return "Schedule"
    case "/subscription":
      return "Subscription"
    case "/members":
      return "Life Ally Members"
    default:
      return "Dashboard"
  }
}

export default function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()
  const pageTitle = getPageTitle(pathname)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
      setSidebarOpen(window.innerWidth >= 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-gradient-to-b from-[#0670BA] to-[#0C2526]">
          {/* Sidebar */}
          <div
            className={`${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
          >
            <Sidebar />
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col min-h-screen overflow-hidden p-4 pl-4 pr-0">
            <div className="flex-1 flex flex-col bg-white rounded-l-[2rem] overflow-hidden">
              {/* Header */}
              <Header title={pageTitle} />

              {/* Page content */}
              <main className="flex-1 overflow-y-auto p-8">{children}</main>
            </div>
          </div>

          {/* Mobile sidebar toggle */}
          {isMobile && (
            <button
              className="fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full bg-[#282829] text-white flex items-center justify-center shadow-lg"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? "×" : "☰"}
            </button>
          )}
        </div>
      </body>
    </html>
  )
}

