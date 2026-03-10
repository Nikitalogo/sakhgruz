import FadeIn from './FadeIn'
import { Service } from '@/types'

interface Props {
  services: Service[]
}

const DEFAULT_DESCRIPTIONS: Record<string, string> = {
  'Кран-балки': 'Подъём и перемещение тяжёлых грузов, спуск мебели с этажей',
  'Клининг': 'Уборка после переезда, генеральная уборка квартир и офисов',
}

export default function Services({ services }: Props) {
  return (
    <section id="services" className="bg-[#111827] py-24 px-6 sm:px-10 relative overflow-hidden">
      {/* Decorative large background number */}
      <div
        className="absolute -top-8 -right-8 select-none pointer-events-none leading-none"
        style={{
          fontFamily: 'var(--font-bebas), Impact, sans-serif',
          fontSize: 'clamp(10rem, 22vw, 22rem)',
          color: 'rgba(249,115,22,0.04)',
        }}
        aria-hidden
      >
        01
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <FadeIn>
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-[3px] bg-[#F97316]" />
              <span
                className="text-[#F97316] text-xs font-semibold uppercase tracking-[0.35em]"
                style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
              >
                Что мы делаем
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
              Наши услуги
            </h2>
          </div>
        </FadeIn>

        {services.length === 0 ? (
          <FadeIn>
            <p
              className="text-white/30 text-sm uppercase tracking-widest"
              style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
            >
              Услуги скоро появятся
            </p>
          </FadeIn>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06]">
            {services.map((service, i) => (
              <FadeIn key={service.id} delay={i * 70}>
                <div className="group relative bg-[#111827] hover:bg-[#1a2032] p-8 transition-all duration-300 h-full flex flex-col overflow-hidden">
                  {/* Card number — large ghost */}
                  <span
                    className="absolute top-4 right-5 text-white/[0.04] group-hover:text-[#F97316]/10 transition-colors duration-300 leading-none select-none"
                    style={{
                      fontFamily: 'var(--font-bebas), Impact, sans-serif',
                      fontSize: '5.5rem',
                    }}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Orange top border — animates on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#F97316] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

                  {/* Icon */}
                  {service.icon && (
                    <div className="text-3xl mb-5 relative z-10">{service.icon}</div>
                  )}

                  {/* Title */}
                  <h3
                    className="text-white text-xl font-bold mb-3 relative z-10 leading-snug"
                    style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  {(service.description || DEFAULT_DESCRIPTIONS[service.title]) && (
                    <p
                      className="text-white/50 text-sm leading-relaxed flex-1 relative z-10 mb-5"
                      style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
                    >
                      {service.description || DEFAULT_DESCRIPTIONS[service.title]}
                    </p>
                  )}

                  {/* Price */}
                  {service.price && (
                    <div className="relative z-10 mt-auto">
                      <span
                        className="inline-block bg-[#F97316] text-white text-sm font-bold px-4 py-1.5 uppercase tracking-wider"
                        style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
                      >
                        {service.price}
                      </span>
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
