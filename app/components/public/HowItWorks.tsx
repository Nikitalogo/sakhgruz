import FadeIn from './FadeIn'

const steps = [
  {
    step: '01',
    title: 'Звонок',
    desc: 'Позвоните или напишите в Telegram. Опишите, что нужно перевезти и откуда–куда.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Расчёт',
    desc: 'Рассчитываем стоимость. Согласовываем удобное время и все детали перевозки.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Выезд',
    desc: 'Приезжаем точно в срок, бережно грузим и доставляем в целости и сохранности.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
        />
      </svg>
    ),
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-[#0d1120] py-24 px-6 sm:px-10 relative overflow-hidden">
      {/* Big ghost text */}
      <div
        className="absolute -bottom-12 -left-8 select-none pointer-events-none leading-none"
        style={{
          fontFamily: 'var(--font-bebas), Impact, sans-serif',
          fontSize: 'clamp(10rem, 20vw, 20rem)',
          color: 'rgba(255,255,255,0.025)',
        }}
        aria-hidden
      >
        HOW
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <FadeIn>
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-[3px] bg-[#F97316]" />
              <span
                className="text-[#F97316] text-xs font-semibold uppercase tracking-[0.35em]"
                style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
              >
                Процесс
              </span>
            </div>
            <h2
              className="text-white uppercase leading-none"
              style={{
                fontFamily: 'var(--font-bebas), Impact, Arial Black, sans-serif',
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                letterSpacing: '0.02em',
              }}
            >
              Как мы работаем
            </h2>
          </div>
        </FadeIn>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-px bg-transparent md:bg-white/[0.06]">
          {steps.map((s, i) => (
            <FadeIn key={s.step} delay={i * 100}>
              <div className="relative bg-[#0d1120] p-8 md:p-10 group hover:bg-[#131825] transition-colors duration-300 border-b md:border-b-0 border-white/[0.06]">

                {/* Giant step number — ghost behind content */}
                <div
                  className="absolute top-4 right-6 leading-none select-none pointer-events-none group-hover:text-[#F97316]/10 transition-colors duration-500"
                  style={{
                    fontFamily: 'var(--font-bebas), Impact, sans-serif',
                    fontSize: '8rem',
                    color: 'rgba(249,115,22,0.06)',
                  }}
                  aria-hidden
                >
                  {s.step}
                </div>

                {/* Step number pill */}
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="text-[#F97316] leading-none"
                    style={{
                      fontFamily: 'var(--font-bebas), Impact, sans-serif',
                      fontSize: '1.4rem',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {s.step}
                  </span>
                  <div className="h-[1px] w-8 bg-[#F97316]/40" />
                </div>

                {/* Icon */}
                <div className="text-[#F97316] mb-5 opacity-80">{s.icon}</div>

                {/* Title */}
                <h3
                  className="text-white text-2xl font-bold mb-4 leading-tight"
                  style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
                >
                  {s.title}
                </h3>

                {/* Description */}
                <p
                  className="text-white/50 text-sm leading-relaxed"
                  style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
                >
                  {s.desc}
                </p>

                {/* Arrow connector — only on desktop, not last */}
                {i < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-20 text-[#F97316]/40"
                    style={{ fontSize: '1.5rem' }}
                    aria-hidden
                  >
                    ›
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
