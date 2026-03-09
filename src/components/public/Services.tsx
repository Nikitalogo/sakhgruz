import FadeIn from './FadeIn'
import { Service } from '@/types'

interface Props {
  services: Service[]
}

export default function Services({ services }: Props) {
  return (
    <section id="services" className="bg-[#111827] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Наши услуги</h2>
            <p className="text-white/50">Выберите подходящий вариант перевозки</p>
          </div>
        </FadeIn>

        {services.length === 0 ? (
          <FadeIn>
            <p className="text-center text-white/40">Услуги скоро появятся</p>
          </FadeIn>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <FadeIn key={service.id} delay={i * 80}>
                <div className="bg-[#1F2937] rounded-2xl p-6 border border-white/5 hover:border-[#F97316]/30 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/5 h-full">
                  {service.icon && (
                    <div className="text-4xl mb-4">{service.icon}</div>
                  )}
                  <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                  {service.description && (
                    <p className="text-white/60 text-sm mb-4 leading-relaxed">{service.description}</p>
                  )}
                  {service.price && (
                    <div className="mt-auto">
                      <span className="inline-block bg-[#F97316]/10 text-[#F97316] text-sm font-semibold px-3 py-1 rounded-lg">
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
