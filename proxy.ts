import { createServerClient } from '@supabase/auth-helpers-nextjs'
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

  // Проверяет JWT подпись через Supabase
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const isLoginPath = req.nextUrl.pathname === '/admin/login'

  // Неавторизованных — редирект на /admin/login
  if (!isLoginPath && !session) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  // Авторизованных на странице логина — редирект в панель
  if (isLoginPath && session) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url))
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*'],
}
