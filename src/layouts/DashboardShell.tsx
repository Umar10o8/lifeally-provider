"use client"
import { ReactNode } from "react";

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/ui/sidebar"
import { Header } from "@/components/header"

export default function DashboardShell({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      setSidebarOpen(window.innerWidth >= 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="flex h-screen bg-gradient-to-b from-[#0670BA] to-[#044065]">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50 w-60 transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <Sidebar />
      </div>

      {/* Main */}
      <div className={`flex-1 flex flex-col min-h-screen overflow-hidden ${isMobile ? "p-4" : "py-4"}`}>
        <div className={`flex-1 flex flex-col bg-[#F9F9F9] ${isMobile ? "rounded-[2rem]" : "rounded-l-[2rem]"} overflow-hidden`}>
          <Header title="Dashboard" />
          <main className="flex-1 overflow-y-auto p-8">{children}</main>
        </div>
      </div>

      {/* Mobile toggle */}
      {isMobile && (
        <button
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          className="fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full bg-[#282829] text-white flex items-center justify-center shadow-lg"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "×" : "☰"}
        </button>
      )}
    </div>
  )
}
