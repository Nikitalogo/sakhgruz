import { Settings } from '@/types'

interface Props {
  settings: Settings
}

export default function Footer({ settings }: Props) {
  const phone = settings.phone || ''
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#0a0f1a] border-t border-white/5 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-white font-bold text-xl tracking-wider">САХГРУЗ</p>
          <p className="text-white/40 text-xs mt-1">Грузоперевозки в Южно-Сахалинске</p>
        </div>

        {phone && (
          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            className="text-white/60 hover:text-[#F97316] transition-colors text-sm"
          >
            {phone}
          </a>
        )}

        <p className="text-white/30 text-xs text-center sm:text-right">
          © {year} САХГРУЗ. Все права защищены.
        </p>
      </div>
    </footer>
  )
}
