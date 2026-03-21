'use client'

import { Settings } from '@/types'

interface Props {
  settings: Settings
}

const PhoneIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.58.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.18 21 3 13.82 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.24 1.02L6.6 10.8z"/>
  </svg>
)

const TelegramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
)

export default function FloatingButton({ settings }: Props) {
  const phone = settings.phone || '+74242412000'
  const telegram = settings.telegram || settings.telegram_url || ''

  // На мобильных: Telegram выше (bottom-24), телефон внизу (bottom-6).
  // На десктопе: только Telegram у bottom-6 (телефон скрыт).
  const telegramBottom = telegram ? 'bottom-24 md:bottom-6' : 'hidden'

  return (
    <>
      {/* Телефонная FAB — только мобильный */}
      <a
        href={`tel:${phone}`}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#FF7A00] hover:bg-[#e56d00] active:scale-95 shadow-lg shadow-orange-500/40 flex items-center justify-center transition-all duration-200 text-white md:hidden"
        aria-label="Позвонить"
      >
        <PhoneIcon />
      </a>

      {/* Telegram FAB — если задан */}
      {telegram && (
        <a
          href={telegram}
          target="_blank"
          rel="noopener noreferrer"
          className={`fixed right-6 z-40 w-14 h-14 rounded-full bg-[#229ED9] hover:bg-[#1a8fc2] active:scale-95 shadow-lg shadow-sky-500/30 flex items-center justify-center transition-all duration-200 text-white ${telegramBottom}`}
          aria-label="Написать в Telegram"
        >
          <TelegramIcon />
        </a>
      )}
    </>
  )
}
