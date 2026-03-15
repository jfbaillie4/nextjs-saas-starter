import { SignUp } from '@clerk/nextjs'

// Clerk's <SignUp /> component renders the full sign-up UI automatically.
// Same catch-all route pattern as sign-in — handles /sign-up and any
// sub-paths Clerk needs for its multi-step registration flow.
export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <SignUp />
    </main>
  )
}
