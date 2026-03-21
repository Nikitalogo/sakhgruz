'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Service, Review, Settings } from '@/types'

// Icons
const TgIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-2.04 9.613c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 14.4l-2.95-.924c-.641-.2-.654-.641.136-.948l11.527-4.447c.537-.194 1.006.131.37.167z"/></svg>)
const WaIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>)

const SLIDES = [
  { label: 'УСЛУГИ',   num: '01' },
  { label: 'ОТЗЫВЫ',  num: '02' },
  { label: 'ВАКАНСИИ', num: '03' },
  { label: 'КОНТАКТЫ', num: '04' },
]

const VACANCIES = [
  {
    id: '01', title: 'ГРУЗЧИК', salary: 'от 2 500 ₽/смена',
    desc: 'Физически крепкий, ответственный. Опыт не обязателен — обучим.',
    conditions: ['График 2/2 или 5/2', 'Оплата ежедневно или еженедельно', 'Работа по городу и пригороду', 'Форма и инвентарь — наш'],
  },
  {
    id: '02', title: 'УБОРЩИЦА', salary: 'от 1 800 ₽/смена',
    desc: 'Аккуратность, пунктуальность. Опыт в клининге приветствуется.',
    conditions: ['Гибкий график', 'Оплата еженедельно', 'Работа на объектах клиентов', 'Средства уборки — наши'],
  },
]

const BORDER = '1px solid #e8d8c4'

interface Props {
  services: Service[]
  reviews: Review[]
  settings: Settings
}

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

export default function HorizontalSlider({ services, reviews, settings }: Props) {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [animDir, setAnimDir] = useState<'right'|'left'|null>(null)
  const [activeService, setActiveService] = useState(0)
  const touchStart = useRef<number|null>(null)

  const w = useWindowWidth()
  const isMobile = w < 640
  const isTablet = w >= 640 && w < 1024

  const phone = settings?.phone || '+74242412000'
  const tg = settings?.telegram_url || '#'
  const wa = settings?.whatsapp_url || '#'

  const goTo = useCallback((idx: number) => {
    if (animating || idx === current || idx < 0 || idx >= SLIDES.length) return
    setAnimDir(idx > current ? 'right' : 'left')
    setAnimating(true)
    setTimeout(() => { setCurrent(idx); setAnimating(false); setAnimDir(null) }, 380)
  }, [animating, current])

  // Listen for nav clicks from Navbar
  useEffect(() => {
    const handler = (e: Event) => goTo((e as CustomEvent).detail)
    window.addEventListener('goto-slide', handler)
    return () => window.removeEventListener('goto-slide', handler)
  }, [goTo])

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo(current + 1)
      if (e.key === 'ArrowLeft') goTo(current - 1)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [current, goTo])

  const outX = animDir === 'right' ? '-72px' : '72px'

  const S: React.CSSProperties = {
    background: '#FFF4E6', position: 'relative', minHeight: '100vh',
  }
  const panel: React.CSSProperties = {
    padding: isMobile
      ? '24px 16px 32px'
      : isTablet
      ? 'clamp(48px,6vw,72px) clamp(20px,4vw,36px) 44px'
      : 'clamp(72px,8vw,100px) clamp(20px,4vw,44px) 44px',
    minHeight: 'calc(100vh - 56px)', display: 'flex', flexDirection: 'column',
    transition: 'opacity .38s ease, transform .38s cubic-bezier(.16,1,.3,1)',
    opacity: animating ? 0 : 1,
    transform: animating ? `translateX(${outX})` : 'translateX(0)',
  }

  return (
    <div id="slider" style={S}>
      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(0,0,0,.04) 79px,rgba(0,0,0,.04) 80px),repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(0,0,0,.04) 79px,rgba(0,0,0,.04) 80px)`,
      }}/>

      {/* Progress */}
      <div style={{
        position: 'absolute', top: 0, left: 0, height: 2, background: '#FF7A00', zIndex: 5,
        width: `${((current + 1) / SLIDES.length) * 100}%`,
        transition: 'width .38s cubic-bezier(.16,1,.3,1)',
      }}/>

      {/* Tab nav */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10, height: 56,
        display: 'flex', alignItems: 'stretch',
        borderBottom: BORDER,
        background: 'rgba(255,244,230,.95)', backdropFilter: 'blur(10px)',
      }}>
        <div style={{ display: 'flex', flex: 1, overflowX: 'auto' }}>
          {SLIDES.map((s, i) => (
            <button key={i} onClick={() => goTo(i)} style={{
              fontFamily: "'IBM Plex Mono',monospace", fontSize: 9, letterSpacing: 2,
              textTransform: 'uppercase',
              border: 'none', borderRight: BORDER,
              ...(i === 0 ? { borderLeft: BORDER } : {}),
              padding: '0 20px', cursor: 'pointer',
              color: current === i ? '#FF7A00' : '#666',
              background: current === i ? 'rgba(255,122,0,.06)' : 'transparent',
              display: 'flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap',
              transition: 'all .2s',
            } as React.CSSProperties}>
              <span style={{ fontSize: 7, opacity: .5 }}>{s.num}</span>
              {s.label}
            </button>
          ))}
        </div>
        {!isMobile && (
          <span style={{
            fontFamily: "'IBM Plex Mono',monospace", fontSize: 9, color: '#999',
            letterSpacing: 2, display: 'flex', alignItems: 'center',
            padding: '0 20px', borderLeft: BORDER,
          }}>
            {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
          </span>
        )}
        <div style={{ display: 'flex', borderLeft: BORDER }}>
          {[{ dir: -1, path: 'M15 18l-6-6 6-6' }, { dir: 1, path: 'M9 18l6-6-6-6' }].map(({ dir, path }) => (
            <button key={dir} onClick={() => goTo(current + dir)}
              aria-label={dir === -1 ? 'Предыдущий' : 'Следующий'}
              disabled={dir === -1 ? current === 0 : current === SLIDES.length - 1}
              style={{
                width: 56, height: 56, border: 'none',
                borderRight: dir === -1 ? BORDER : 'none',
                background: 'transparent', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: (dir === -1 ? current === 0 : current === SLIDES.length - 1) ? .25 : 1,
                transition: 'all .2s',
              }}
              onMouseEnter={e => { if (!(e.currentTarget as HTMLButtonElement).disabled) (e.currentTarget as HTMLButtonElement).style.background = '#FF7A00' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A3D8F" strokeWidth="2.5">
                <path d={path}/>
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Slide content */}
      <div style={panel}
        onTouchStart={e => { touchStart.current = e.touches[0].clientX }}
        onTouchEnd={e => {
          if (!touchStart.current) return
          const dx = e.changedTouches[0].clientX - touchStart.current
          if (Math.abs(dx) > 48) dx < 0 ? goTo(current + 1) : goTo(current - 1)
          touchStart.current = null
        }}>

        {/* ─── УСЛУГИ ─── */}
        {current === 0 && (
          <>
            <SectionHead num="01" title="УСЛУГИ" isMobile={isMobile}/>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2,1fr)' : 'repeat(3,1fr)',
              gap: 16, flex: 1,
            }}>
              {services.map((s, i) => (
                <ServiceCard key={s.id} s={s} i={i} active={activeService === i} onHover={() => setActiveService(i)} isMobile={isMobile}/>
              ))}
            </div>
          </>
        )}

        {/* ─── ОТЗЫВЫ ─── */}
        {current === 1 && (
          <>
            <SectionHead num="02" title="ОТЗЫВЫ" isMobile={isMobile}/>
            <div className="rounded-2xl border border-[#1A3D8F]/10 shadow-sm bg-white" style={{
              display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24,
              padding: isMobile ? '16px 20px' : '20px 28px',
            }}>
              <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 64, color: '#FF7A00', lineHeight: 1 }}>5.0</span>
              <div>
                <div style={{ color: '#FF7A00', fontSize: 18, letterSpacing: 3 }}>★★★★★</div>
                <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: '#666', letterSpacing: 2, marginTop: 4 }}>9 ОЦЕНОК · 2ГИС</div>
              </div>
              <a href="https://2gis.ru/yuzhnosakhalinsk/firm/70000001099199325/tab/reviews"
                target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: '#FF7A00', textDecoration: 'none', letterSpacing: 2, marginLeft: 'auto', opacity: .8 }}>
                Все отзывы →
              </a>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)',
              gap: 16, flex: 1,
            }}>
              {reviews.map((r, i) => (
                <div key={r.id ?? i} className="rounded-2xl border border-[#1A3D8F]/10 shadow-sm bg-white" style={{ padding: isMobile ? 24 : 36 }}>
                  <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 60, color: '#FF7A00', opacity: .15, lineHeight: .8, marginBottom: 14, display: 'block' }}>"</span>
                  <p style={{ fontFamily: "'Oswald',sans-serif", fontSize: 15, fontWeight: 300, color: '#1A3D8F', opacity: 0.75, lineHeight: 1.75, marginBottom: 20 }}>{r.text}</p>
                  <div style={{ color: '#FF7A00', fontSize: 11, letterSpacing: 2, marginBottom: 8 }}>{'★'.repeat(r.rating ?? 5)}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: '#1A3D8F', letterSpacing: 1 }}>{r.author}</div>
                  {r.review_date && <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 9, color: '#1A3D8F', opacity: 0.4, letterSpacing: 1, marginTop: 4 }}>{r.review_date}</div>}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ─── ВАКАНСИИ ─── */}
        {current === 2 && (
          <>
            <SectionHead num="03" title="ВАКАНСИИ" isMobile={isMobile}/>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: 16, flex: 1,
            }}>
              {VACANCIES.map(v => (
                <div key={v.id} className="rounded-2xl border border-[#1A3D8F]/10 shadow-sm bg-white" style={{ padding: isMobile ? 24 : 44 }}>
                  <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 9, color: '#FF7A00', letterSpacing: 2, marginBottom: 12, display: 'block' }}>{v.id}</span>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: isMobile ? 40 : 52, letterSpacing: 2, color: '#1A3D8F', lineHeight: 1, marginBottom: 8 }}>{v.title}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, color: '#FF7A00', letterSpacing: 1, marginBottom: 24 }}>{v.salary}</div>
                  <p style={{ fontFamily: "'Oswald',sans-serif", fontSize: 14, fontWeight: 300, color: '#1A3D8F', opacity: 0.65, lineHeight: 1.6, marginBottom: 24 }}>{v.desc}</p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
                    {v.conditions.map((c, idx) => (
                      <li key={idx} style={{ fontFamily: "'Oswald',sans-serif", fontSize: 13, fontWeight: 300, color: '#1A3D8F', opacity: 0.7, display: 'flex', gap: 10 }}>
                        <span style={{ color: '#FF7A00', flexShrink: 0, opacity: 1 }}>—</span>{c}
                      </li>
                    ))}
                  </ul>
                  <a href={`tel:${phone}`} style={{
                    fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, letterSpacing: 2,
                    textTransform: 'uppercase', background: 'transparent',
                    border: '1px solid #FF7A00', color: '#FF7A00',
                    padding: '12px 24px', cursor: 'pointer', textDecoration: 'none',
                    display: 'inline-block', transition: 'all .2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#FF7A00'; (e.currentTarget as HTMLAnchorElement).style.color = '#fff' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = '#FF7A00' }}>
                    Позвонить по вакансии
                  </a>
                </div>
              ))}
              <div className="rounded-2xl border border-[#1A3D8F]/10 shadow-sm bg-white" style={{
                gridColumn: '1/-1', padding: isMobile ? '16px 24px' : '24px 44px',
                display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: 12,
              }}>
                <span style={{ fontFamily: "'Oswald',sans-serif", fontSize: 14, fontWeight: 300, color: '#1A3D8F', opacity: 0.65 }}>
                  Работа в Южно-Сахалинске · <strong style={{ color: '#1A3D8F', fontWeight: 600, opacity: 1 }}>Неполная или полная занятость</strong> · Оплата без задержек
                </span>
                <a href="https://2gis.ru/yuzhnosakhalinsk/firm/70000001099199325/tab/vacancies"
                  target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: '#FF7A00', textDecoration: 'none', letterSpacing: 2, whiteSpace: 'nowrap' }}>
                  Вакансии на 2ГИС →
                </a>
              </div>
            </div>
          </>
        )}

        {/* ─── КОНТАКТЫ ─── */}
        {current === 3 && (
          <>
            <SectionHead num="04" title="КОНТАКТЫ" isMobile={isMobile}/>
            <div style={{ border: BORDER, flex: 1, background: '#FFFFFF' }}>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
                {[
                  { label: 'Телефон', val: phone, href: `tel:${phone}`, sub: 'На связи 24/7' },
                  { label: 'Адрес', val: settings?.address || 'ул. Зелёная, 15', href: undefined, sub: 'Южно-Сахалинск' },
                ].map(({ label, val, href, sub }) => (
                  <div key={label} style={{ padding: isMobile ? '24px 20px' : 'clamp(32px,4vw,52px) clamp(20px,4vw,44px)', borderRight: isMobile ? 'none' : BORDER, borderBottom: BORDER }}>
                    <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 9, color: '#FF7A00', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 12, display: 'block' }}>{label}</span>
                    {href
                      ? <a href={href} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(28px,4vw,56px)', letterSpacing: 2, color: '#1A3D8F', textDecoration: 'none', display: 'block', lineHeight: 1.1, transition: 'color .2s' }}
                          onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#FF7A00'}
                          onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#1A3D8F'}>{val}</a>
                      : <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(28px,4vw,56px)', letterSpacing: 2, color: '#1A3D8F', display: 'block', lineHeight: 1.1 }}>{val}</span>
                    }
                    <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 13, fontWeight: 300, color: '#666', marginTop: 6 }}>{sub}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
                {[
                  { href: tg, icon: <TgIcon/>, name: 'Telegram', color: '#229ED9' },
                  { href: wa, icon: <WaIcon/>, name: 'WhatsApp', color: '#25D366' },
                ].map(({ href, icon, name, color }) => (
                  <a key={name} href={href} style={{
                    padding: isMobile ? '16px 20px' : 'clamp(16px,2vw,22px) clamp(20px,4vw,44px)',
                    borderRight: isMobile ? 'none' : BORDER, borderBottom: isMobile ? BORDER : 'none',
                    display: 'flex', alignItems: 'center', gap: 14,
                    textDecoration: 'none', transition: 'all .2s', cursor: 'pointer',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(0,0,0,.03)'}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'}>
                    <div style={{ width: 36, height: 36, border: BORDER, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .22s', color: '#1A3D8F' }}>
                      {icon}
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 15, color: '#000000' }}>{name}</div>
                      {href === '#' && <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 8, color: '#999', letterSpacing: 1.5, marginTop: 2 }}>СКОРО · ДОБАВИТЬ В НАСТРОЙКАХ</div>}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <div style={{
          borderTop: BORDER, padding: '18px 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto',
        }}>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, letterSpacing: 5, color: '#1A3D8F' }}>
            САХ<span style={{ color: '#FF7A00' }}>ГРУЗ</span>
          </span>
          <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 9, color: '#999', letterSpacing: 2, textTransform: 'uppercase' as const }}>
            © 2026 · Южно-Сахалинск
          </span>
        </div>
      </div>
    </div>
  )
}

function SectionHead({ num, title, isMobile }: { num: string; title: string; isMobile: boolean }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: isMobile ? 24 : 48 }}>
      <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: '#FF7A00', letterSpacing: 3, display: 'block', marginBottom: 8 }}>— {num}</span>
      <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: isMobile ? 'clamp(36px,10vw,52px)' : 'clamp(44px,6vw,88px)', letterSpacing: 2, lineHeight: 1, color: '#1A3D8F', margin: 0 }}>{title}</h2>
    </div>
  )
}

function ServiceCard({ s, i, active, onHover, isMobile }: { s: Service; i: number; active: boolean; onHover: () => void; isMobile: boolean }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => { setHov(true); onHover() }}
      onMouseLeave={() => setHov(false)}
      className="rounded-2xl bg-white border border-[#1A3D8F]/10 cursor-pointer"
      style={{
        padding: isMobile ? '20px 20px' : '32px 28px',
        transition: 'transform .3s ease, box-shadow .3s ease',
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hov
          ? '0 8px 24px rgba(26,61,143,.12)'
          : '0 1px 4px rgba(26,61,143,.06)',
      }}>
      <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 9, color: '#FF7A00', letterSpacing: 2, marginBottom: 12, display: 'block' }}>
        {String(i + 1).padStart(2, '0')}
      </span>
      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, letterSpacing: 2, color: '#1A3D8F', marginBottom: 10 }}>{s.title}</div>
      <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 13, fontWeight: 300, color: '#1A3D8F', opacity: 0.6, lineHeight: 1.6, marginBottom: 14 }}>{s.description || 'Подробности уточняйте по телефону'}</div>
      <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: '#FF7A00', letterSpacing: 1 }}>{s.price}</div>
    </div>
  )
}
