'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
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

  const phone = settings?.phone || '412-000'

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
      background: scrolled ? 'rgba(10,10,10,.96)' : 'transparent',
      borderBottom: scrolled ? '1px solid #1e1e1e' : '1px solid transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
    }}>
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <Image src="/logo.png" alt="САХГРУЗ" width={80} height={32}
          style={{ height: 32, width: 'auto', objectFit: 'contain' }}
          onError={() => {}} />
        <span style={{
          fontFamily: "'Bebas Neue',sans-serif", fontSize: 24, letterSpacing: 5,
          color: '#e8e0d0',
        }}>
          САХ<span style={{ color: '#F97316' }}>ГРУЗ</span>
        </span>
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        <ul style={{ display: 'flex', gap: 24, listStyle: 'none', margin: 0, padding: 0 }}
          className="nav-links-hide">
          {slides.map(s => (
            <li key={s.idx}>
              <button onClick={() => goToSlide(s.idx)} style={{
                fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, letterSpacing: 2,
                textTransform: 'uppercase', color: '#666', background: 'none',
                border: 'none', cursor: 'pointer', transition: 'color .2s', padding: 0,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F97316')}
              onMouseLeave={e => (e.currentTarget.style.color = '#666')}>
                {s.label}
              </button>
            </li>
          ))}
        </ul>
        <a href={`tel:${phone}`} style={{
          fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: 2,
          color: '#e8e0d0', textDecoration: 'none',
          border: '1px solid #1e1e1e', padding: '6px 14px', transition: 'all .2s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#F97316'; (e.currentTarget as HTMLAnchorElement).style.color = '#F97316' }}
        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#1e1e1e'; (e.currentTarget as HTMLAnchorElement).style.color = '#e8e0d0' }}>
          {phone}
        </a>
      </div>
      <style>{`
        @media(max-width:768px){.nav-links-hide{display:none!important}}
      `}</style>
    </nav>
  )
}
