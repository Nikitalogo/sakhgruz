import { Settings } from '@/types'

interface Props {
  settings: Settings
}

const navLinks = [
  { label: 'Услуги', href: '#services' },
  { label: 'Галерея', href: '#gallery' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Контакты', href: '#contacts' },
]

export default function Footer({ settings }: Props) {
  const phone = settings.phone || ''
  const telegram = settings.telegram || ''
  const whatsapp = settings.whatsapp || ''
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#FFF4E6] relative overflow-hidden">
      {/* Orange top accent bar */}
      <div className="h-[4px] bg-[#FF7A00] w-full" />

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">

          {/* Brand */}
          <div>
            <div
              className="text-[#1A3D8F] leading-none mb-3"
              style={{
                fontFamily: 'var(--font-bebas), Impact, Arial Black, sans-serif',
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                letterSpacing: '0.05em',
              }}
            >
              САХГРУЗ
            </div>
            <p
              className="text-[#1A3D8F]/60 text-sm leading-relaxed max-w-[220px]"
              style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
            >
              Грузоперевозки и грузчики в Южно-Сахалинске
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p
              className="text-[#1A3D8F]/50 text-xs font-semibold uppercase tracking-[0.3em] mb-5"
              style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
            >
              Навигация
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[#1A3D8F]/70 hover:text-[#FF7A00] text-sm transition-colors duration-200 flex items-center gap-2 group"
                    style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
                  >
                    <span className="w-3 h-[1px] bg-[#1A3D8F]/20 group-hover:bg-[#FF7A00] group-hover:w-5 transition-all duration-300 inline-block" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <p
              className="text-[#1A3D8F]/50 text-xs font-semibold uppercase tracking-[0.3em] mb-5"
              style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
            >
              Контакты
            </p>
            <div className="flex flex-col gap-3">
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="text-[#1A3D8F] hover:text-[#FF7A00] text-sm transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
                >
                  {phone}
                </a>
              )}
              {telegram && (
                <a
                  href={telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#229ED9]/70 hover:text-[#229ED9] text-sm transition-colors duration-200 flex items-center gap-1.5"
                  style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
                >
                  <TelegramIcon />
                  Telegram
                </a>
              )}
              {whatsapp && (
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366]/70 hover:text-[#25D366] text-sm transition-colors duration-200 flex items-center gap-1.5"
                  style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
                >
                  <WhatsAppIcon />
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#e8d8c4]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-[#1A3D8F]/40 text-xs"
            style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
          >
            © {year} САХГРУЗ. Все права защищены.
          </p>
          <p
            className="text-[#1A3D8F]/30 text-xs"
            style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
          >
            Южно-Сахалинск, Сахалинская область
          </p>
        </div>
      </div>
    </footer>
  )
}

function TelegramIcon() {
  return (
    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}
