'use client'

import { useEffect, useState } from 'react'
import { getSupabaseBrowser } from '@/lib/supabase-browser'

const FIELDS = [
  { key: 'hero_title', label: 'Заголовок (Hero)', placeholder: 'САХГРУЗ', hint: 'Крупный заголовок на главном экране' },
  { key: 'hero_subtitle', label: 'Подзаголовок (Hero)', placeholder: 'Грузоперевозки по Сахалину', hint: 'Строка под заголовком' },
  { key: 'phone', label: 'Телефон', placeholder: '+7 914 123 45 67', hint: 'Используется для кнопки "Позвонить"' },
  { key: 'telegram', label: 'Telegram (ссылка)', placeholder: 'https://t.me/username', hint: 'Полная ссылка на Telegram' },
  { key: 'whatsapp', label: 'WhatsApp (ссылка)', placeholder: 'https://wa.me/79141234567', hint: 'Полная ссылка wa.me/...' },
  { key: 'address', label: 'Адрес', placeholder: 'Южно-Сахалинск, ул. Ленина 1', hint: 'Необязательно' },
  { key: 'work_hours', label: 'Режим работы', placeholder: 'Пн–Вс 8:00–20:00', hint: 'Необязательно' },
]

export default function SettingsPage() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      const supabase = getSupabaseBrowser()
      const { data } = await supabase.from('settings').select('key, value')
      const map: Record<string, string> = {}
      for (const row of data ?? []) map[row.key] = row.value
      setValues(map)
      setLoading(false)
    }
    load()
  }, [])

  async function handleSave() {
    setSaving(true)
    setError('')
    setSaved(false)
    try {
      const supabase = getSupabaseBrowser()
      const upserts = FIELDS.map(({ key }) => ({
        key,
        value: (values[key] ?? '').trim(),
      }))
      const { error: dbError } = await supabase.from('settings').upsert(upserts, { onConflict: 'key' })
      if (dbError) throw dbError
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      setError('Ошибка при сохранении')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-white/40 text-sm">Загрузка…</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">Настройки</h1>
      <p className="text-white/40 text-sm mb-8">Телефон, мессенджеры, тексты на сайте</p>

      <div className="bg-[#1F2937] rounded-2xl border border-white/5 p-6 flex flex-col gap-5">
        {FIELDS.map(({ key, label, placeholder, hint }) => (
          <div key={key}>
            <label className="block text-xs text-white/50 uppercase tracking-wider mb-1">
              {label}
            </label>
            <input
              type="text"
              value={values[key] ?? ''}
              onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
              placeholder={placeholder}
              className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-[#F97316]/50 transition-colors text-sm"
            />
            {hint && <p className="text-white/25 text-xs mt-1">{hint}</p>}
          </div>
        ))}

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
            {error}
          </div>
        )}

        {saved && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 text-green-400 text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Настройки сохранены
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          className="self-start bg-[#F97316] hover:bg-[#ea6c10] disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
        >
          {saving ? 'Сохранение…' : 'Сохранить'}
        </button>
      </div>
    </div>
  )
}
