import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const projectRef = new URL(supabaseUrl).hostname.split('.')[0]
  const baseName = `sb-${projectRef}-auth-token`

  // auth-helpers-nextjs splits large sessions into chunks: baseName, baseName.0, baseName.1 …
  const allCookies = req.cookies.getAll()
  const isAuthenticated = allCookies.some(
    (c) => c.name === baseName || c.name.startsWith(`${baseName}.`)
  )

  const isLoginPath = req.nextUrl.pathname === '/admin/login'

  if (!isLoginPath && !isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  if (isLoginPath && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
