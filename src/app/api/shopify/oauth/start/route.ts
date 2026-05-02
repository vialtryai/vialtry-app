import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const shop = searchParams.get('shop')

  if (!shop) {
    return NextResponse.json({ error: 'Shop parameter required' }, { status: 400 })
  }

  const clientId = process.env.SHOPIFY_CLIENT_ID!
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/shopify/oauth/callback`
  const scopes = 'read_products,read_inventory'
  const state = Buffer.from(Math.random().toString()).toString('base64')

  const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${clientId}&scope=${scopes}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`

  const response = NextResponse.redirect(authUrl)
  response.cookies.set('shopify_oauth_state', state, { httpOnly: true, maxAge: 600 })
  return response
}
