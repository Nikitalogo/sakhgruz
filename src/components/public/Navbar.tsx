'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Settings } from '@/types'

const slides = [
  { label: 'УСЛУГИ', target: 'services' as const },
  { label: 'ОТЗЫВЫ', target: 'slider' as const, idx: 0 },
  { label: 'ВАКАНСИИ', target: 'slider' as const, idx: 1 },
  { label: 'КОНТАКТЫ', target: 'slider' as const, idx: 2 },
]

export default function Navbar({ settings }: { settings: Settings }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const phone = settings?.phone || '+74242412000'

  const goToSlide = (target: 'services' | 'slider', idx?: number) => {
    if (target === 'services') {
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    const el = document.getElementById('slider')
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => window.dispatchEvent(new CustomEvent('goto-slide', { detail: idx ?? 0 })), 450)
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
      boxShadow: scrolled ? '0 2px 20px rgba(26,61,143,.10)' : 'none',
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
            <li key={s.label}>
              <button onClick={() => goToSlide(s.target, s.idx)} style={{
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
