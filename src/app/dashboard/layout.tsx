import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { DashboardNav } from '@/components/dashboard-nav'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <aside className="flex w-60 flex-col gap-6 border-r bg-sidebar p-6">
        <div className="text-lg font-bold">My App</div>
        <DashboardNav />
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col">

        {/* Top bar */}
        <header className="flex items-center justify-end gap-4 border-b px-6 py-3">
          <OrganizationSwitcher afterSelectOrganizationUrl="/dashboard" />
          <UserButton />
        </header>

        {/* Page content — each dashboard page renders here */}
        <main className="flex-1 p-8">
          {children}
        </main>

      </div>
    </div>
  )
}
