import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'САХГРУЗ — Грузоперевозки в Южно-Сахалинске',
  description:
    'Надёжные грузоперевозки по Сахалину. Переезды, доставка грузов, вывоз мусора. Звоните!',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
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
