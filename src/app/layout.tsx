import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'САХГРУЗ — Услуги грузчиков и переезды в Южно-Сахалинске',
  description:
    'Профессиональные грузчики, доставка и переезды по городу и области. Работаем круглосуточно с 2019 года. Надежно и аккуратно.',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'САХГРУЗ — Грузоперевозки Южно-Сахалинск',
    description: 'Грузчики, фургоны, кран-балки. Работаем без выходных. Позвоните нам: 412-000',
    url: 'https://sakhgruz.ru',
    siteName: 'САХГРУЗ',
    images: [
      {
        url: '/logo_final.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ru_RU',
    type: 'website',
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
