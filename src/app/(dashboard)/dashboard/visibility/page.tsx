import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import VisibilityPageClient from './VisibilityPageClient'

export default async function VisibilityPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: brands } = await supabase.from('brands').select('id,name,shopify_domain').limit(10)
  if (!brands || brands.length === 0) redirect('/onboarding')
  return <VisibilityPageClient brands={brands} />
}
