import { DashboardNav } from '@/components/dashboard-nav'
import { MobileHeader } from '@/components/mobile-header'
import { MobileHeaderProvider } from '@/components/mobile-header-context'
import { SidebarUserCard } from '@/components/sidebar-user-card'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <MobileHeaderProvider>
      <div className="flex min-h-screen">

        {/* Desktop sidebar — hidden on mobile */}
        <aside className="hidden md:flex w-60 flex-col gap-6 border-r bg-sidebar p-4">
          <SidebarUserCard />
          <DashboardNav />
        </aside>

        {/* Content column — stacks mobile header above page content */}
        <div className="flex flex-1 flex-col">
          <MobileHeader />
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>

      </div>
    </MobileHeaderProvider>
  )
}
