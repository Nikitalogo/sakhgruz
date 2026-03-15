import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import CookieConsent from '@/components/public/CookieConsent'

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
        <CookieConsent />
      </body>
      <Script id="yandex-metrika" strategy="afterInteractive">{`
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=107254714','ym');
        ym(107254714,'init',{webvisor:true,clickmap:true,accurateTrackBounce:true,trackLinks:true});
      `}</Script>
      <noscript><img src="https://mc.yandex.ru/watch/107254714" style={{position:'absolute',left:'-9999px'}} alt="" /></noscript>
    </html>
  )
}
