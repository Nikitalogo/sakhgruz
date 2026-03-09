'use client'

import { useEffect, useState } from 'react'
import { getSupabaseBrowser } from '@/lib/supabase-browser'
import { Review } from '@/types'

const EMPTY_FORM = { author: '', text: '', rating: 5, source: '2ГИС' }

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function load() {
    const supabase = getSupabaseBrowser()
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
    setReviews(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function toggleVisible(review: Review) {
    const supabase = getSupabaseBrowser()
    await supabase.from('reviews').update({ visible: !review.visible }).eq('id', review.id)
    load()
  }

  async function deleteReview(id: string) {
    if (!confirm('Удалить отзыв? Это действие нельзя отменить.')) return
    const supabase = getSupabaseBrowser()
    await supabase.from('reviews').delete().eq('id', id)
    load()
  }

  async function addReview() {
    if (!form.author.trim()) { setError('Укажите автора'); return }
    if (!form.text.trim()) { setError('Укажите текст отзыва'); return }
    if (form.rating < 1 || form.rating > 5) { setError('Рейтинг от 1 до 5'); return }
    setError('')
    setSaving(true)
    try {
      const supabase = getSupabaseBrowser()
      const { error: dbErr } = await supabase.from('reviews').insert({
        author: form.author.trim(),
        text: form.text.trim(),
        rating: form.rating,
        source: form.source.trim() || '2ГИС',
        visible: true,
      })
      if (dbErr) throw dbErr
      setAdding(false)
      setForm(EMPTY_FORM)
      load()
    } catch {
      setError('Ошибка при добавлении')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="text-white/40 text-sm">Загрузка…</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Отзывы</h1>
          <p className="text-white/40 text-sm">{reviews.length} отзывов</p>
        </div>
        <button
          onClick={() => { setAdding(true); setError('') }}
          className="flex items-center gap-2 bg-[#F97316] hover:bg-[#ea6c10] text-white font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Добавить
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm mb-4">
          {error}
        </div>
      )}

      {/* Add form */}
      {adding && (
        <div className="bg-[#1F2937] rounded-2xl p-5 border border-[#F97316]/20 mb-4">
          <p className="text-xs text-white/40 uppercase tracking-wider mb-4">Новый отзыв</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-white/40 mb-1">Автор *</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                placeholder="Иван Иванов"
                className="w-full bg-[#111827] border border-white/10 rounded-xl px-3 py-2.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#F97316]/50"
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1">Источник</label>
              <input
                type="text"
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
                placeholder="2ГИС"
                className="w-full bg-[#111827] border border-white/10 rounded-xl px-3 py-2.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#F97316]/50"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-white/40 mb-1">Текст отзыва *</label>
              <textarea
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                placeholder="Отличная компания, всё доставили быстро…"
                rows={3}
                className="w-full bg-[#111827] border border-white/10 rounded-xl px-3 py-2.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#F97316]/50 resize-none"
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1">Рейтинг (1–5)</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setForm({ ...form, rating: n })}
                    className={`text-xl transition-colors ${n <= form.rating ? 'text-[#F97316]' : 'text-white/20'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={addReview}
              disabled={saving}
              className="bg-[#F97316] hover:bg-[#ea6c10] disabled:opacity-60 text-white font-medium px-5 py-2 rounded-xl text-sm transition-colors"
            >
              {saving ? 'Сохранение…' : 'Добавить'}
            </button>
            <button
              onClick={() => { setAdding(false); setError(''); setForm(EMPTY_FORM) }}
              className="text-white/50 hover:text-white px-5 py-2 rounded-xl text-sm transition-colors hover:bg-white/5"
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {reviews.map((review) => (
          <div
            key={review.id}
            className={`bg-[#1F2937] rounded-2xl p-5 border transition-colors ${
              review.visible ? 'border-white/5' : 'border-white/5 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-white text-sm">{review.author}</p>
                  {review.source && (
                    <span className="text-xs text-white/30">{review.source}</span>
                  )}
                  {!review.visible && (
                    <span className="text-xs text-white/30 bg-white/5 px-2 py-0.5 rounded">скрыт</span>
                  )}
                </div>
                {/* Stars */}
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={`text-sm ${i < review.rating ? 'text-[#F97316]' : 'text-white/15'}`}>★</span>
                  ))}
                </div>
                <p className="text-white/60 text-sm leading-relaxed line-clamp-3">{review.text}</p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => toggleVisible(review)}
                  className={`p-2 rounded-lg transition-colors ${
                    review.visible
                      ? 'text-green-400 bg-green-400/10 hover:bg-green-400/20'
                      : 'text-white/30 hover:text-white/60 hover:bg-white/5'
                  }`}
                  title={review.visible ? 'Скрыть' : 'Показать'}
                >
                  {review.visible ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={() => deleteReview(review.id)}
                  className="p-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                  title="Удалить"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}

        {reviews.length === 0 && !adding && (
          <div className="text-center py-16 text-white/30 text-sm">
            Отзывов пока нет. Нажмите «Добавить».
          </div>
        )}
      </div>
    </div>
  )
}
