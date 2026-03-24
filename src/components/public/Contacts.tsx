import FadeIn from './FadeIn'
import { Settings } from '@/types'

interface Props {
  settings: Settings
}

export default function Contacts({ settings }: Props) {
  const phone = settings.phone || ''
  const telegram = settings.telegram || ''
  const whatsapp = settings.whatsapp || ''
  const address = settings.address || ''
  const workHours = settings.work_hours || ''

  return (
    <section id="contacts" className="bg-[#0d1120] py-24 px-6 sm:px-10 relative overflow-hidden">
      {/* Orange corner accent */}
      <div
        className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(249,115,22,0.1) 0%, transparent 65%)',
        }}
      />

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
                Связаться
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
              Контакты
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — big call to action */}
          <FadeIn delay={50}>
            <div>
              <p
                className="text-white/60 text-base leading-relaxed mb-10 max-w-md"
                style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
              >
                Позвоните или напишите удобным способом — ответим быстро и рассчитаем стоимость бесплатно.
              </p>

              {/* Big phone */}
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="group block mb-8"
                >
                  <span
                    className="text-white/40 text-xs font-semibold uppercase tracking-[0.3em] block mb-2"
                    style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
                  >
                    Телефон
                  </span>
                  <span
                    className="text-white group-hover:text-[#F97316] transition-colors duration-300 leading-none block"
                    style={{
                      fontFamily: 'var(--font-bebas), Impact, sans-serif',
                      fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
                      letterSpacing: '0.03em',
                    }}
                  >
                    {phone}
                  </span>
                  <div className="mt-2 h-[2px] bg-[#F97316] w-0 group-hover:w-full transition-all duration-500" />
                </a>
              )}

              {/* Messenger buttons */}
              {(telegram || whatsapp) && (
                <div className="flex flex-wrap gap-3">
                  {telegram && (
                    <a
                      href={telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2.5 bg-[#229ED9] hover:bg-[#1a87bb] text-white px-6 py-3.5 transition-all duration-300 text-sm font-bold uppercase tracking-wider"
                      style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
                    >
                      <TelegramIcon />
                      Telegram
                      <span className="group-hover:translate-x-0.5 transition-transform ml-1">→</span>
                    </a>
                  )}
                  {whatsapp && (
                    <a
                      href={whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1db954] text-white px-6 py-3.5 transition-all duration-300 text-sm font-bold uppercase tracking-wider"
                      style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
                    >
                      <WhatsAppIcon />
                      WhatsApp
                      <span className="group-hover:translate-x-0.5 transition-transform ml-1">→</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </FadeIn>

          {/* Right — info blocks */}
          <FadeIn delay={120}>
            <div className="flex flex-col gap-6">
              {address && (
                <div className="border-l-[3px] border-[#F97316] pl-6 py-1">
                  <p
                    className="text-white/35 text-xs font-semibold uppercase tracking-[0.25em] mb-2"
                    style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
                  >
                    Адрес
                  </p>
                  <p
                    className="text-white text-base font-medium"
                    style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
                  >
                    {address}
                  </p>
                </div>
              )}

              {workHours && (
                <div className="border-l-[3px] border-white/15 pl-6 py-1">
                  <p
                    className="text-white/35 text-xs font-semibold uppercase tracking-[0.25em] mb-2"
                    style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
                  >
                    Режим работы
                  </p>
                  <p
                    className="text-white text-base font-medium"
                    style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
                  >
                    {workHours}
                  </p>
                </div>
              )}

              {/* Always-on badge */}
              <div className="mt-4 bg-[#F97316]/10 border border-[#F97316]/20 p-5 flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-[#F97316] flex-shrink-0 animate-pulse" />
                <div>
                  <p
                    className="text-[#F97316] font-bold text-sm uppercase tracking-wider"
                    style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
                  >
                    На связи 24/7
                  </p>
                  <p
                    className="text-white/40 text-xs mt-0.5"
                    style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
                  >
                    Звоните в любое время
                  </p>
                </div>
              </div>

              {/* Yandex Maps embed */}
              <div className="mt-2 overflow-hidden border border-white/[0.08]">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?text=%D0%AE%D0%B6%D0%BD%D0%BE-%D0%A1%D0%B0%D1%85%D0%B0%D0%BB%D0%B8%D0%BD%D1%81%D0%BA+%D1%83%D0%BB+%D0%97%D0%B5%D0%BB%D1%91%D0%BD%D0%B0%D1%8F+15"
                  width="100%"
                  height="240"
                  frameBorder="0"
                  title="Адрес на карте"
                  allowFullScreen
                  style={{ display: 'block' }}
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

function TelegramIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}
