import type { Metadata } from 'next'
import { Bebas_Neue, Montserrat } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import CookieConsent from '@/components/public/CookieConsent'

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
  verification: { yandex: '35690697c3773b47' },
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
