import { auth } from '@clerk/nextjs/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SetMobileTitle } from '@/components/set-mobile-title'

export default async function DashboardPage() {
  const { userId, orgId } = await auth()

  return (
    <div className="flex flex-col gap-8">
      <SetMobileTitle title="Welcome to your starter app!" />
      <h1 className="hidden md:block text-3xl font-semibold tracking-tight">Welcome to your starter app!</h1>
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>User</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-mono text-sm text-muted-foreground">{userId}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Organisation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-mono text-sm text-muted-foreground">{orgId}</p>
        </CardContent>
      </Card>
    </div>
    </div>
  )
}
