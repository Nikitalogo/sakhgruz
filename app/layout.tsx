import type { Metadata } from 'next'
import { Bebas_Neue, Montserrat } from 'next/font/google'
import './globals.css'

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
})

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'САХГРУЗ — Грузоперевозки в Южно-Сахалинске',
  description: 'Грузоперевозки по Южно-Сахалинску и в радиусе 60 км. Грузчики, фургоны, кран-балки. Работаем 24/7 без выходных. Звоните: 412-000',
  keywords: 'грузоперевозки южно-сахалинск, грузчики южно-сахалинск, переезд южно-сахалинск, газель южно-сахалинск',
  openGraph: {
    title: 'САХГРУЗ — Грузоперевозки в Южно-Сахалинске',
    description: 'Грузоперевозки по Южно-Сахалинску и в радиусе 60 км. Грузчики, фургоны, кран-балки. Работаем 24/7 без выходных. Звоните: 412-000',
    url: 'https://sakhgruz.ru',
    siteName: 'САХГРУЗ',
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
      <body className={`${bebas.variable} ${montserrat.variable} antialiased bg-[#111827] text-white`}>
        {children}
      </body>
    </html>
  )
}
