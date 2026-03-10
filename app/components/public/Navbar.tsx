'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const links = [
  { label: 'Услуги', href: '#services' },
  { label: 'Галерея', href: '#gallery' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Контакты', href: '#contacts' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = (href: string) => {
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0e18]/98 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent'
      }`}
    >
      {/* Orange top accent line */}
      <div className="h-[3px] bg-[#F97316] w-full" />

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.png"
            alt="САХГРУЗ"
            width={160}
            height={44}
            className="h-9 w-auto object-contain transition-opacity duration-200 group-hover:opacity-80"
            priority
            unoptimized
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-0">
          {links.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => handleLink(l.href)}
                className="relative px-5 py-2 text-white/70 hover:text-white font-montserrat text-sm font-semibold uppercase tracking-[0.12em] transition-colors duration-200 group"
              >
                {l.label}
                <span className="absolute bottom-0 left-5 right-5 h-[2px] bg-[#F97316] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            </li>
          ))}
        </ul>

        {/* Burger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-[5px]"
          aria-label="Меню"
        >
          <span
            className={`block h-[2px] w-6 bg-white transition-all duration-300 origin-center ${
              open ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`block h-[2px] bg-white transition-all duration-300 ${
              open ? 'w-0 opacity-0' : 'w-6 opacity-100'
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-white transition-all duration-300 origin-center ${
              open ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden border-t border-[#F97316]/20 overflow-hidden transition-all duration-400 ${
          open ? 'max-h-80 bg-[#0a0e18]/98 backdrop-blur-md' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col">
          {links.map((l, i) => (
            <li key={l.href} style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}>
              <button
                onClick={() => handleLink(l.href)}
                className="w-full text-left px-6 py-4 text-white/80 hover:text-white hover:bg-[#F97316]/10 font-montserrat text-sm font-semibold uppercase tracking-[0.12em] transition-colors border-b border-white/5 flex items-center justify-between"
              >
                {l.label}
                <span className="text-[#F97316] text-xs">→</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
