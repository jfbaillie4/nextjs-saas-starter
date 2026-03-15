"use client"

import { useState } from 'react'
import { PanelLeft } from 'lucide-react'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { DashboardNav } from '@/components/dashboard-nav'
import { SidebarUserCard } from '@/components/sidebar-user-card'
import { useMobileHeader } from '@/components/mobile-header-context'

export function MobileHeader() {
  const [open, setOpen] = useState(false)
  const { title } = useMobileHeader()

  return (
    <header className="flex items-center gap-3 border-b bg-background px-4 py-3 md:hidden">
      <button
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <PanelLeft className="size-5" />
      </button>

      {title && (
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      )}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-60 bg-sidebar p-4" showCloseButton={false}>
          <SidebarUserCard />
          <DashboardNav />
        </SheetContent>
      </Sheet>
    </header>
  )
}
