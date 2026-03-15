import { DashboardNav } from '@/components/dashboard-nav'
import { SidebarUserCard } from '@/components/sidebar-user-card'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <aside className="flex w-60 flex-col gap-6 border-r bg-sidebar p-4">
        <SidebarUserCard />
        <DashboardNav />
      </aside>

      {/* Page content — each dashboard page renders here, full height */}
      <main className="flex-1 p-8">
        {children}
      </main>

    </div>
  )
}
