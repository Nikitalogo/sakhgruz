'use client'

import { Users, Truck, Bus, Construction } from 'lucide-react'
import { Service, Settings } from '@/types'

// ─── Данные карточек ──────────────────────────────────────────────────────────
const CARDS = [
  {
    icon: Users,
    title: 'Грузчики',
    description: 'Профессиональный переезд и подъём вещей на любой этаж. Бережно обращаемся с мебелью и хрупкими предметами.',
    price: 'от 1 000 ₽/час',
    cta: 'Заказать грузчиков',
  },
  {
    icon: Truck,
    title: 'Фургоны',
    description: 'Доставка грузов по городу и области. Крытые фургоны разной грузоподъёмности — ваш груз прибудет сухим.',
    price: 'от 2 000 ₽/час',
    cta: 'Заказать фургон',
  },
  {
    icon: Bus,
    title: 'Микроавтобусы',
    description: 'Перевозка малогабаритных грузов и мебели. Манёвренно работаем в тесных дворах и пробках.',
    price: 'от 1 500 ₽/час',
    cta: 'Заказать авто',
  },
  {
    icon: Construction,
    title: 'Кран-балки',
    description: 'Погрузка и перевозка тяжёлых грузов — станки, сейфы, спецоборудование. Без рисков и повреждений.',
    price: 'от 3 000 ₽/час',
    cta: 'Подобрать технику',
  },
]

// ─── Карточка ─────────────────────────────────────────────────────────────────
function ServiceCard({
  icon: Icon, title, description, price, cta, phone,
}: {
  icon: React.ElementType
  title: string
  description: string
  price: string
  cta: string
  phone: string
}) {
  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-[#1A3D8F]/10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* top accent */}
      <div className="h-[3px] w-full bg-[#F97316] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

      <div className="flex flex-col flex-1 p-6 sm:p-7 gap-5">
        {/* icon */}
        <div className="w-[52px] h-[52px] rounded-full bg-[#FFF4E6] flex items-center justify-center text-[#F97316] flex-shrink-0">
          <Icon size={28} strokeWidth={1.75} aria-hidden="true" />
        </div>

        {/* title */}
        <h3
          className="text-[#1A3D8F] leading-none tracking-wide"
          style={{
            fontFamily: "'Bebas Neue', Impact, sans-serif",
            fontSize: 'clamp(1.4rem, 3vw, 1.75rem)',
          }}
        >
          {title}
        </h3>

        {/* description */}
        <p className="text-[#1A3D8F]/60 text-sm leading-relaxed flex-1">{description}</p>

        {/* price */}
        <div className="inline-flex items-center self-start bg-[#FFF4E6] text-[#F97316] font-mono text-sm font-semibold tracking-wide px-3 py-1.5 rounded-lg">
          {price}
        </div>

        {/* CTA */}
        <a
          href={`tel:${phone}`}
          className="mt-auto inline-flex items-center justify-center w-full bg-[#F97316] hover:bg-[#e56d00] active:scale-95 text-white font-bold text-[11px] tracking-[0.12em] uppercase font-mono rounded-xl transition-all duration-200 hover:scale-105 min-h-[48px] px-4"
        >
          {cta}
        </a>
      </div>
    </article>
  )
}

// ─── Главный компонент ────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Services({ services, settings }: { services: Service[]; settings?: Settings }) {
  const phone = settings?.phone ?? ''

  return (
    <section
      id="services"
      className="bg-[#FFF4E6] relative overflow-hidden"
      style={{
        backgroundImage: [
          'repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(26,61,143,.025) 79px,rgba(26,61,143,.025) 80px)',
          'repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(26,61,143,.025) 79px,rgba(26,61,143,.025) 80px)',
        ].join(','),
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">

        {/* Section header */}
        <div className="mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[3px] bg-[#F97316] rounded-sm" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#F97316]">
              Что мы делаем
            </span>
          </div>
          <h2
            className="text-[#1A3D8F] leading-none tracking-wide mb-4"
            style={{
              fontFamily: "'Bebas Neue', Impact, sans-serif",
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            }}
          >
            Наши услуги
          </h2>
          <p className="text-[#1A3D8F]/60 text-base sm:text-lg max-w-xl leading-relaxed">
            Грузоперевозки по Южно-Сахалинску и в радиусе 60&nbsp;км.
            Фиксированные тарифы, опытные экипажи, работаем без выходных.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {CARDS.map((card) => (
            <ServiceCard key={card.title} {...card} phone={phone} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl border border-[#1A3D8F]/10 shadow-sm px-6 py-5">
          <p className="text-[#1A3D8F]/70 text-sm leading-relaxed text-center sm:text-left">
            Нужна помощь с выбором? Позвоните — подберём оптимальный вариант бесплатно.
          </p>
          <a
            href={`tel:${phone}`}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#e56d00] text-white font-bold font-mono text-[11px] tracking-widest uppercase px-6 py-3.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 min-h-[48px] whitespace-nowrap"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.58.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.18 21 3 13.82 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.24 1.02L6.6 10.8z"/>
            </svg>
            Позвонить
          </a>
        </div>

      </div>
    </section>
  )
}
