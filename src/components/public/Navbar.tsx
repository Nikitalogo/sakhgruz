'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Settings } from '@/types'

const slides = [
  { label: 'УСЛУГИ', idx: 0 },
  { label: 'ОТЗЫВЫ', idx: 1 },
  { label: 'ВАКАНСИИ', idx: 2 },
  { label: 'КОНТАКТЫ', idx: 3 },
]

export default function Navbar({ settings }: { settings: Settings }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const phone = settings?.phone || '+74242412000'

  const goToSlide = (idx: number) => {
    const el = document.getElementById('slider')
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth' })
    // dispatch custom event for slider to pick up
    setTimeout(() => window.dispatchEvent(new CustomEvent('goto-slide', { detail: idx })), 450)
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, height: 58,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 clamp(16px,4vw,44px)',
      transition: 'all .3s',
      background: scrolled ? 'rgba(255,244,230,.97)' : 'transparent',
      borderBottom: scrolled ? '1px solid #e8d8c4' : '1px solid transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
    }}>
      <Link href="/">
        <Image
          src="/logo_final.png"
          alt="САХГРУЗ"
          width={180}
          height={60}
          className="h-12 w-auto object-contain"
        />
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        <ul style={{ display: 'flex', gap: 24, listStyle: 'none', margin: 0, padding: 0 }}
          className="nav-links-hide">
          {slides.map(s => (
            <li key={s.idx}>
              <button onClick={() => goToSlide(s.idx)} style={{
                fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, letterSpacing: 2,
                textTransform: 'uppercase', color: '#1A3D8F', background: 'none',
                border: 'none', cursor: 'pointer', transition: 'color .2s', padding: 0,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#FF7A00')}
              onMouseLeave={e => (e.currentTarget.style.color = '#1A3D8F')}>
                {s.label}
              </button>
            </li>
          ))}
        </ul>
        <a href={`tel:${phone}`} style={{
          fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: 2,
          color: '#FF7A00', textDecoration: 'none',
          border: '1px solid #FF7A00', padding: '6px 14px', transition: 'all .2s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#FF7A00'; (e.currentTarget as HTMLAnchorElement).style.color = '#fff' }}
        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = '#FF7A00' }}>
          {phone}
        </a>
      </div>
      <style>{`
        @media(max-width:768px){.nav-links-hide{display:none!important}}
      `}</style>
    </nav>
  )
}
