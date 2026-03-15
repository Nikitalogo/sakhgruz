'use client'

import { useState, useEffect } from 'react'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    console.log('Cookie banner rendered, accepted:', localStorage.getItem('cookie_accepted'))
    if (!localStorage.getItem('cookie_accepted')) {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem('cookie_accepted', '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-[#1F2937]/95 backdrop-blur-sm border-t border-white/10 px-4 py-4 sm:px-6">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-sm text-white/80 leading-relaxed">
          Мы используем файлы cookie для улучшения работы сайта. Оставаясь на сайте, вы соглашаетесь с{' '}
          <a href="/privacy" className="underline underline-offset-2 hover:text-white transition-colors">
            Политикой конфиденциальности
          </a>
          .
        </p>
        <button
          onClick={accept}
          className="shrink-0 bg-[#F97316] hover:bg-[#ea6c10] text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors duration-150"
        >
          Принять
        </button>
      </div>
    </div>
  )
}
