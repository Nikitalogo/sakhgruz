'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getSupabaseBrowser } from '@/lib/supabase-browser'

interface Stats {
  services: number
  photos: number
  reviews: number
}

const cards = [
  {
    key: 'services' as const,
    label: 'Услуг',
    href: '/admin/services',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
  },
  {
    key: 'photos' as const,
    label: 'Фотографий',
    href: '/admin/photos',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    key: 'reviews' as const,
    label: 'Отзывов',
    href: '/admin/reviews',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    ),
  },
]

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ services: 0, photos: 0, reviews: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = getSupabaseBrowser()
      const [servicesRes, photosRes, reviewsRes] = await Promise.all([
        supabase.from('services').select('*', { count: 'exact', head: true }),
        supabase.from('photos').select('*', { count: 'exact', head: true }),
        supabase.from('reviews').select('*', { count: 'exact', head: true }),
      ])
      setStats({
        services: servicesRes.count ?? 0,
        photos: photosRes.count ?? 0,
        reviews: reviewsRes.count ?? 0,
      })
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">Сводка</h1>
      <p className="text-white/40 text-sm mb-8">Обзор контента сайта</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {cards.map((card) => (
          <Link
            key={card.key}
            href={card.href}
            className="bg-[#1F2937] rounded-2xl p-6 border border-white/5 hover:border-[#F97316]/30 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-[#F97316]/10 rounded-xl flex items-center justify-center text-[#F97316] group-hover:bg-[#F97316]/20 transition-colors">
                {card.icon}
              </div>
              <svg className="w-4 h-4 text-white/20 group-hover:text-[#F97316]/50 transition-colors mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-white mb-1">
              {loading ? '—' : stats[card.key]}
            </p>
            <p className="text-white/50 text-sm">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-[#1F2937] rounded-2xl p-6 border border-white/5">
        <h2 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4">Быстрые действия</h2>
        <div className="flex flex-col gap-2">
          {[
            { href: '/admin/settings', label: 'Редактировать контакты и телефон' },
            { href: '/admin/services', label: 'Обновить цены услуг' },
            { href: '/admin/photos', label: 'Загрузить новые фото' },
            { href: '/admin/reviews', label: 'Управление отзывами' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/70 hover:text-white transition-colors text-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
