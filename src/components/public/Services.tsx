'use client'

import { Service, Settings } from '@/types'

// ─── SVG-иконки ──────────────────────────────────────────────────────────────
const IconWorker = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)
const IconTruck = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="1" y="3" width="15" height="13" rx="1"/>
    <path d="M16 8h4l3 4v3h-7V8z"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
)
const IconBus = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 6v6M15 6v6M2 12h19.6M18 18h2a1 1 0 0 0 1-1V7a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v10a1 1 0 0 0 1 1h2"/>
    <circle cx="8" cy="18" r="2"/>
    <circle cx="16" cy="18" r="2"/>
  </svg>
)
const IconCrane = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 22V4l-5 5h14l-5-5"/>
    <path d="M8 4h12v4H8"/>
    <path d="M20 8v14"/>
    <path d="M14 8v14"/>
    <path d="M14 15h6"/>
  </svg>
)

// ─── Данные карточек ──────────────────────────────────────────────────────────
const CARDS = [
  {
    icon: <IconWorker />,
    title: 'Грузчики',
    description: 'Профессиональный переезд и подъём вещей на любой этаж. Бережно обращаемся с мебелью и хрупкими предметами.',
    price: 'от 1 000 ₽/час',
    cta: 'Заказать грузчиков',
  },
  {
    icon: <IconTruck />,
    title: 'Фургоны',
    description: 'Доставка грузов по городу и области. Крытые фургоны разной грузоподъёмности — ваш груз прибудет сухим.',
    price: 'от 2 000 ₽/час',
    cta: 'Заказать фургон',
  },
  {
    icon: <IconBus />,
    title: 'Микроавтобусы',
    description: 'Перевозка малогабаритных грузов и мебели. Манёвренно работаем в тесных дворах и пробках.',
    price: 'от 1 500 ₽/час',
    cta: 'Заказать авто',
  },
  {
    icon: <IconCrane />,
    title: 'Кран-балки',
    description: 'Погрузка и перевозка тяжёлых грузов — станки, сейфы, спецоборудование. Без рисков и повреждений.',
    price: 'от 3 000 ₽/час',
    cta: 'Подобрать технику',
  },
]

// ─── Карточка ─────────────────────────────────────────────────────────────────
function ServiceCard({
  icon, title, description, price, cta, phone, index,
}: {
  icon: React.ReactNode
  title: string
  description: string
  price: string
  cta: string
  phone: string
  index: number
}) {
  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-[#1A3D8F]/10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* top accent */}
      <div className="h-[3px] w-full bg-[#F97316] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

      <div className="flex flex-col flex-1 p-6 sm:p-7 gap-5">
        {/* icon + index */}
        <div className="flex items-start justify-between">
          <div className="w-[52px] h-[52px] rounded-full bg-[#FFF4E6] flex items-center justify-center text-[#F97316] flex-shrink-0">
            {icon}
          </div>
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#1A3D8F]/30 select-none">
            {String(index + 1).padStart(2, '0')}
          </span>
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
          className="mt-auto inline-flex items-center justify-center w-full bg-[#F97316] hover:bg-[#e56d00] active:scale-95 text-white font-bold text-[11px] tracking-[0.12em] uppercase font-mono rounded-xl transition-all duration-200 hover:scale-[1.03] min-h-[48px] px-4"
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

        {/* Grid 1 → 2 → 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARDS.map((card, i) => (
            <ServiceCard key={card.title} {...card} phone={phone} index={i} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl border border-[#1A3D8F]/10 shadow-sm px-6 py-5">
          <p className="text-[#1A3D8F]/70 text-sm leading-relaxed text-center sm:text-left">
            Нужна помощь с выбором? Позвоните — подберём оптимальный вариант бесплатно.
          </p>
          <a
            href={`tel:${phone}`}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#e56d00] text-white font-bold font-mono text-[11px] tracking-widest uppercase px-6 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.03] active:scale-95 min-h-[48px] whitespace-nowrap"
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
