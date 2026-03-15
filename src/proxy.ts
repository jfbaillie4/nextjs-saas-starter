import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/org-selection(.*)'])

// Routes that a signed-in user without an organisation is allowed to visit.
// All other protected routes require an active organisation.
const isOrgSelectionRoute = createRouteMatcher(['/org-selection(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    // auth.protect() ensures the user is signed in.
    // If not, Clerk redirects them to the sign-in page automatically.
    await auth.protect()

    const { orgId } = await auth()

    // If the user is signed in but has no active organisation,
    // redirect them to org-selection — unless they're already there.
    if (!orgId && !isOrgSelectionRoute(req)) {
      const orgSelectionUrl = new URL('/org-selection', req.url)
      return NextResponse.redirect(orgSelectionUrl)
    }
  }
})

export const config = {
  // Run on all routes except Next.js internals and static files
  matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)', '/(api|trpc)(.*)'],
}
