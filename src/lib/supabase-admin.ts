// ВНИМАНИЕ: Этот файл содержит service_role ключ с полным доступом к БД.
// Импортировать ТОЛЬКО в Server Actions, API Routes и серверных компонентах.
// НИКОГДА не импортировать в 'use client' компонентах.

import { createClient } from '@supabase/supabase-js'

if (typeof window !== 'undefined') {
  throw new Error('supabase-admin.ts нельзя использовать на клиенте')
}

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)
