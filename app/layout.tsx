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
  description:
    'Надёжные грузоперевозки по Сахалину. Переезды, доставка грузов, вывоз мусора. Звоните!',
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
