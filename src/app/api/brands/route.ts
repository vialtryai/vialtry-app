import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data:{user} } = await supabase.auth.getUser()
  if(!user) return NextResponse.json({error:'Unauthorized'},{status:401})
  
  const {data:brands} = await supabase.from('brands').select('id,name,shopify_domain,status,plan,last_audit_at').order('created_at',{ascending:false}).limit(10)
  
  return NextResponse.json({brands:brands||[]})
}
