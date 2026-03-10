import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Только для серверных компонентов и Server Actions — anon key
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ВАЖНО: supabaseAdmin (service_role) вынесен в src/lib/supabase-admin.ts
// Использовать ТОЛЬКО в Server Actions / API Routes, никогда в 'use client' компонентах
