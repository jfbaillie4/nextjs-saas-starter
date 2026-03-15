import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'
import { Button } from '@/components/ui/button'
import { SignInButton, UserButton } from '@clerk/nextjs'

// This is the public landing page — visible to everyone.
//
// Because this is a Server Component (no "use client" at the top),
// it runs on the server before anything is sent to the browser.
// That means we can call auth() directly to find out if the user
// is logged in — no need for special wrapper components.
export default async function HomePage() {
  const { userId } = await auth()
  const isSignedIn = !!userId // !! converts a value to true/false

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold">My App</h1>
      <p className="text-muted-foreground">A multi-tenant B2B SaaS foundation.</p>

      <div className="flex gap-4">
        {isSignedIn ? (
          // User is logged in — show a link to the dashboard and their avatar
          <>
            <Link href="/dashboard">
              <Button>Go to dashboard</Button>
            </Link>
            <UserButton />
          </>
        ) : (
          // User is not logged in — show a sign in button
          <SignInButton>
            <Button>Sign in</Button>
          </SignInButton>
        )}
      </div>
    </main>
  )
}
