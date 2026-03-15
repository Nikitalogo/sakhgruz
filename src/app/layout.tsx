import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://sakhgruz.ru'),
  title: 'САХГРУЗ — Услуги грузчиков и грузоперевозки в Южно-Сахалинске',
  description:
    'Профессиональные грузчики, переезды и доставка в Южно-Сахалинске. Работаем с 2019 года. Надежно, аккуратно, без выходных.',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'САХГРУЗ — Услуги грузчиков и переезды',
    description: 'Грузоперевозки по Южно-Сахалинску и области. Позвоните нам: 412-000',
    url: 'https://sakhgruz.ru',
    siteName: 'САХГРУЗ',
    images: [{ url: '/logo_final.png', width: 1200, height: 630 }],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'САХГРУЗ — Грузоперевозки',
    description: 'Профессиональные услуги грузчиков в Южно-Сахалинске.',
    images: ['/logo_final.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${geist.variable} antialiased bg-[#111827] text-white`}>
        {children}
      </body>
    </html>
  )
}
