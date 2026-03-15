"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, type LucideIcon } from 'lucide-react'

interface NavItem {
  href: string
  label: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-2">
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href || pathname.startsWith(href + '/')
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-sm transition-colors ${
              isActive
                ? 'bg-sidebar-accent text-foreground'
                : 'text-muted-foreground hover:bg-sidebar-accent hover:text-foreground'
            }`}
          >
            <Icon className="size-4 shrink-0" />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
