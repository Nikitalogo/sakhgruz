'use client'

import { useState, useEffect } from 'react'
import { Settings } from '@/types'

const TgIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-2.04 9.613c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 14.4l-2.95-.924c-.641-.2-.654-.641.136-.948l11.527-4.447c.537-.194 1.006.131.37.167z"/>
  </svg>
)
const WaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

function useWindowWidth() {
  const [w, setW] = useState(390)
  useEffect(() => {
    setW(window.innerWidth)
    const fn = () => setW(window.innerWidth)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return w
}

export default function Hero({ settings }: { settings: Settings }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { setTimeout(() => setVisible(true), 80) }, [])

  const w = useWindowWidth()
  const isMobile = w < 640
  const isTablet = w >= 640 && w < 1024

  const phone = settings?.phone || '412-000'
  const tg = settings?.telegram_url || '#'
  const wa = settings?.whatsapp_url || '#'

  const titleSize = isMobile ? 48 : isTablet ? 72 : 'clamp(52px,12.5vw,162px)'

  return (
    <section style={{
      minHeight: '100vh', position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      background: '#0a0a0a', maxWidth: '100vw',
    }}>
      {/* Grid bg */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(255,255,255,.016) 79px,rgba(255,255,255,.016) 80px),repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(255,255,255,.016) 79px,rgba(255,255,255,.016) 80px)`,
      }}/>
      {/* Glow */}
      <div style={{
        position: 'absolute', top: -120, right: -60, width: 520, height: 520,
        background: 'radial-gradient(circle,rgba(249,115,22,.08) 0%,transparent 65%)',
        pointerEvents: 'none',
      }}/>
      {/* Diagonal — hidden on mobile */}
      {!isMobile && <>
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '48%', height: '100%',
          background: 'linear-gradient(135deg,transparent 36%,rgba(249,115,22,.035) 36%)',
          pointerEvents: 'none',
        }}/>
        <div style={{
          position: 'absolute', top: 0, right: '43%', width: 2, height: '100%',
          background: 'linear-gradient(to bottom,transparent,#F97316 12%,#F97316 88%,transparent)',
          transform: 'skewX(-5deg)',
        }}/>
      </>}

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        padding: isMobile
          ? '100px 16px 80px'
          : isTablet
          ? '120px 24px 80px'
          : 'clamp(100px,14vw,160px) clamp(20px,4vw,44px) 80px',
        flex: 1,
      }}>
        {visible && (
          <>
            <div className="h-anim-0" style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 10, letterSpacing: 4, color: '#F97316',
              textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 12,
              marginBottom: 22,
            }}>
              <span style={{ width: 22, height: 1, background: '#F97316', display: 'block' }}/>
              Южно-Сахалинск · с 2019 года
            </div>

            <h1 className="h-anim-1" style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: titleSize, lineHeight: .88,
              letterSpacing: -2, color: '#e8e0d0', marginBottom: 30,
            }}>
              ГРУЗО<br/>
              <span style={{ color: '#F97316' }}>ПЕРЕВОЗКИ</span>
            </h1>

            <p className="h-anim-2" style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: 16, fontWeight: 300, color: '#666',
              maxWidth: 360, lineHeight: 1.75, marginBottom: 38,
              borderLeft: '2px solid #F97316', paddingLeft: 16,
            }}>
              По городу и в радиусе 60 км.<br/>
              Грузчики. Фургоны. Кран-балки.<br/>
              Работаем без выходных.
            </p>

            <div className="h-anim-3" style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
              <a href={`tel:${phone}`} style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 12, letterSpacing: 2, textTransform: 'uppercase',
                background: '#F97316', color: '#000', padding: '15px 32px',
                textDecoration: 'none', fontWeight: 700,
                clipPath: 'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))',
                transition: 'all .2s',
              }}>
                Позвонить: {phone}
              </a>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
                {[
                  { href: tg, icon: <TgIcon/>, label: 'Telegram', color: '#229ED9' },
                  { href: wa, icon: <WaIcon/>, label: 'WhatsApp', color: '#25D366' },
                ].map(({ href, icon, label, color }) => (
                  <a key={label} href={href} style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase' as const,
                    textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 7,
                    padding: '9px 14px', border: '1px solid #1e1e1e', color: '#666',
                    background: 'transparent', transition: 'all .22s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.background = color
                    el.style.borderColor = color
                    el.style.color = '#fff'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.background = 'transparent'
                    el.style.borderColor = '#1e1e1e'
                    el.style.color = '#666'
                  }}>
                    {icon}<span>{label}</span>
                    {href === '#' && <span style={{ fontSize: 7, background: 'rgba(255,255,255,.07)', color: '#666', padding: '2px 5px' }}>СКОРО</span>}
                  </a>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Stats — hidden on mobile */}
      {visible && !isMobile && (
        <div style={{
          position: 'absolute', bottom: 44, right: isTablet ? 24 : 'clamp(20px,4vw,44px)',
          display: 'flex', gap: 40, zIndex: 2,
        }}>
          {[['5.0 ★', 'на 2ГИС'], ['500+', 'заказов'], ['24/7', 'на связи']].map(([n, l], i) => (
            <div key={l} className={`s-anim-${i}`} style={{ textAlign: 'right' }}>
              <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 48, color: '#e8e0d0', lineHeight: 1, display: 'block' }}>{n}</span>
              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 9, color: '#666', letterSpacing: 2.5, textTransform: 'uppercase' as const }}>{l}</span>
            </div>
          ))}
        </div>
      )}

      {/* Scroll cue */}
      <button
        onClick={() => document.getElementById('slider')?.scrollIntoView({ behavior: 'smooth' })}
        style={{
          position: 'absolute', bottom: 44, left: isMobile ? 16 : isTablet ? 24 : 'clamp(20px,4vw,44px)', zIndex: 2,
          display: 'flex', alignItems: 'center', gap: 10,
          fontFamily: "'IBM Plex Mono',monospace", fontSize: 9, letterSpacing: 2,
          color: '#666', textTransform: 'uppercase', cursor: 'pointer',
          border: 'none', background: 'none',
        }}
      >
        <span style={{ width: 32, height: 1, background: 'currentColor', position: 'relative', display: 'block' }}>
          <span style={{
            position: 'absolute', right: 0, top: -3,
            borderTop: '3px solid transparent', borderBottom: '3px solid transparent',
            borderLeft: '6px solid currentColor',
          }}/>
        </span>
        Смотреть услуги
      </button>
    </section>
  )
}
