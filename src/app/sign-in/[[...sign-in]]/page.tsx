import { SignIn } from '@clerk/nextjs'

// Clerk's <SignIn /> component renders the full sign-in UI automatically.
// The [[...sign-in]] folder name is a Next.js "catch-all" route — it means
// this page handles /sign-in and any sub-paths like /sign-in/factor-one
// that Clerk uses internally during its multi-step login flow.
export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <SignIn />
    </main>
  )
}
