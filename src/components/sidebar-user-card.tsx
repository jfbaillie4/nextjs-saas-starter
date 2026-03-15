"use client"

import { useState } from 'react'
import { useClerk, useOrganization, useOrganizationList, useUser } from '@clerk/nextjs'
import { ArrowLeftRight, ChevronDown, LogOut, Plus, User, Users } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function SidebarUserCard() {
  const { user } = useUser()
  const { organization } = useOrganization()
  const { userMemberships, setActive } = useOrganizationList({ userMemberships: true })
  const clerk = useClerk()
  const [switchOrgOpen, setSwitchOrgOpen] = useState(false)

  if (!user) return null

  const initials = user.fullName
    ? user.fullName.split(' ').map((n) => n[0]).join('').toUpperCase()
    : '?'

  const memberships = userMemberships?.data ?? []
  const hasMultipleOrgs = memberships.length > 1

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex w-full items-center gap-3 rounded-md p-2 text-left text-sm hover:bg-sidebar-accent transition-colors">
          <Avatar className="size-10 shrink-0">
            <AvatarImage src={user.imageUrl} alt={user.fullName ?? ''} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate font-semibold text-foreground">{user.fullName}</span>
            <span className="truncate text-sm text-foreground">{organization?.name ?? 'No organisation'}</span>
          </div>
          <ChevronDown className="size-3 shrink-0 text-muted-foreground" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" side="bottom">

          {/* Personal section */}
          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-sm font-semibold text-foreground">{user.fullName}</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => clerk.openUserProfile()}>
              <User className="mr-2 size-4" />
              Manage Account
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => clerk.signOut()}>
              <LogOut className="mr-2 size-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {/* Organisation section */}
          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-sm font-semibold text-foreground">{organization?.name ?? 'Organisation'}</DropdownMenuLabel>
            {hasMultipleOrgs && (
              <DropdownMenuItem onClick={() => setSwitchOrgOpen(true)}>
                <ArrowLeftRight className="mr-2 size-4" />
                Switch Organisation
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => clerk.openCreateOrganization()}>
              <Plus className="mr-2 size-4" />
              Create Organisation
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => clerk.openOrganizationProfile()}>
              <Users className="mr-2 size-4" />
              Manage
            </DropdownMenuItem>
          </DropdownMenuGroup>

        </DropdownMenuContent>
      </DropdownMenu>

      {/* Switch organisation dialog — only reachable if hasMultipleOrgs */}
      <Dialog open={switchOrgOpen} onOpenChange={setSwitchOrgOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Switch Organisation</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-1">
            {memberships.map((membership) => (
              <button
                key={membership.organization.id}
                onClick={() => {
                  setActive?.({ organization: membership.organization.id })
                  setSwitchOrgOpen(false)
                }}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent ${
                  membership.organization.id === organization?.id
                    ? 'bg-accent font-medium'
                    : 'text-muted-foreground'
                }`}
              >
                <Users className="size-4 shrink-0" />
                {membership.organization.name}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
