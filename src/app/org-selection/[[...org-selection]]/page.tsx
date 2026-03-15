import { OrganizationList } from '@clerk/nextjs'

// Clerk's <OrganizationList /> renders a UI that lets the user:
//   - See and switch to organisations they already belong to
//   - Create a brand new organisation
//   - Request to join an org (if that org has domain matching enabled)
//
// The afterSelectOrganizationUrl prop tells Clerk where to send the user
// once they've selected or created an org.
export default function OrgSelectionPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <OrganizationList
        hidePersonal
        afterSelectOrganizationUrl="/dashboard"
        afterCreateOrganizationUrl="/dashboard"
      />
    </main>
  )
}
