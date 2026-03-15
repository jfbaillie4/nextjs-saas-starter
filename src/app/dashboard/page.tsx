import { auth } from '@clerk/nextjs/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function DashboardPage() {
  const { userId, orgId } = await auth()

  return (
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
  )
}
