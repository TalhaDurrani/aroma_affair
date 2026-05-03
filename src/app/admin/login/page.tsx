// src/app/admin/login/page.tsx
import { login } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 border bg-card">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-headline font-bold mb-2">Atelier Admin</h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest">Authorized Personnel Only</p>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 mb-6 border border-destructive/20 text-center">
            {error}
          </div>
        )}

        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs uppercase tracking-widest font-bold">Email</Label>
            <Input id="email" name="email" type="email" required className="h-12 rounded-none" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-xs uppercase tracking-widest font-bold">Password</Label>
            <Input id="password" name="password" type="password" required className="h-12 rounded-none" />
          </div>
          <Button formAction={login} className="w-full h-12 rounded-none uppercase tracking-widest font-bold">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  )
}