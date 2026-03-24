import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(req: NextRequest) {
  let response = NextResponse.next({ request: req })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value))
          response = NextResponse.next({ request: req })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const isLoginPage = req.nextUrl.pathname === '/admin/login'

  if (!session && !isLoginPage) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  if (session && isLoginPage) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url))
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*'],
}
