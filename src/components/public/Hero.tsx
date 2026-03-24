'use client'

import { useState, useEffect } from 'react'
import { Settings } from '@/types'

const TgIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-2.04 9.613c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 14.4l-2.95-.924c-.641-.2-.654-.641.136-.948l11.527-4.447c.537-.194 1.006.131.37.167z"/>
  </svg>
)
const WaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const STATS = [
  { num: '5.0 ★', label: 'рейтинг на 2ГИС' },
  { num: '500+', label: 'выполненных заказов' },
  { num: '24/7', label: 'принимаем звонки' },
]

export default function Hero({ settings }: { settings: Settings }) {
  const phone = settings?.phone || '+74242412000'
  const tg = settings?.telegram_url || ''
  const wa = settings?.whatsapp_url || ''

  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-center bg-[#FFF4E6] overflow-hidden">

      {/* Subtle grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            'repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(26,61,143,.04) 79px,rgba(26,61,143,.04) 80px)',
            'repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(26,61,143,.04) 79px,rgba(26,61,143,.04) 80px)',
          ].join(','),
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-36 md:pb-20 gap-8 md:gap-10">

        {/* Eyebrow */}
        <p
          className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase font-mono text-[#FF7A00]"
        >
          <span aria-hidden className="block w-6 h-px bg-[#FF7A00]" />
          Южно-Сахалинск · с&nbsp;2019&nbsp;года
          <span aria-hidden className="block w-6 h-px bg-[#FF7A00]" />
        </p>

        {/* Headline */}
        <h1
          lang="ru"
          className="flex flex-col items-center max-w-5xl w-full text-[#1A3D8F] text-[clamp(1.75rem,8vw,5rem)] leading-[1.1] hyphens-auto break-words"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          <span className="whitespace-nowrap">ГРУЗЧИКИ</span>
          <span className="whitespace-nowrap">ДОСТАВКА</span>
          <span>ЮЖНО-САХАЛИНСК</span>
        </h1>

        {/* Subline */}
        <p
          className="max-w-lg text-[#1A3D8F]/70 text-base md:text-lg font-light leading-relaxed"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          По городу и в радиусе 60&nbsp;км.
          Грузчики, фургоны, кран-балки.
          Работаем без выходных.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          <a
            href={`tel:${phone}`}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-[#FF7A00] text-white text-sm font-semibold tracking-wide px-7 py-3.5 rounded-full shadow-md hover:bg-[#e56d00] transition-colors duration-150"
          >
            Позвонить: {phone}
          </a>

          {tg && (
            <a
              href={tg}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-white text-[#1A3D8F] text-sm font-medium px-5 py-3.5 rounded-full border border-[#1A3D8F]/20 shadow-sm hover:border-[#229ED9] hover:text-[#229ED9] transition-colors duration-150"
            >
              <TgIcon /> Telegram
            </a>
          )}

          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-white text-[#1A3D8F] text-sm font-medium px-5 py-3.5 rounded-full border border-[#1A3D8F]/20 shadow-sm hover:border-[#25D366] hover:text-[#25D366] transition-colors duration-150"
            >
              <WaIcon /> WhatsApp
            </a>
          )}
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-4 mt-16">
          {STATS.map(({ num, label }) => (
            <div
              key={label}
              className="flex flex-col items-center bg-white border border-[#1A3D8F]/12 rounded-xl shadow-sm px-7 py-4 min-w-[120px]"
            >
              <span
                className="text-[#1A3D8F] text-3xl md:text-4xl tabular-nums"
                style={{ fontFamily: "'Bebas Neue', sans-serif", lineHeight: 1 }}
              >
                {num}
              </span>
              <span className="text-[#1A3D8F]/50 text-[10px] uppercase tracking-widest font-mono mt-1">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <button
          aria-label="Смотреть услуги"
          onClick={() => document.getElementById('slider')?.scrollIntoView({ behavior: 'smooth' })}
          className="mt-2 flex items-center gap-2.5 text-[10px] uppercase tracking-widest font-mono text-[#1A3D8F]/50 hover:text-[#FF7A00] transition-colors duration-150 cursor-pointer bg-transparent border-none"
        >
          <span aria-hidden className="block w-8 h-px bg-current" />
          Смотреть услуги
        </button>

      </div>
    </section>
  )
}
