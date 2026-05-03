// src/app/admin/layout.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  // 1. Check if user is logged in
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/admin/login')
  }

  // 2. Check if user is an admin in the profiles table
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || (profile.role !== 'superadmin' && profile.role !== 'manager')) {
    // If they are logged in but NOT an admin, kick them back to the home page
    redirect('/')
  }

  // If they pass both checks, render the admin dashboard!
  return <>{children}</>
}