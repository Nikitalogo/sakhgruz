'use client'

import { useEffect, useState } from 'react'
import { getSupabaseBrowser } from '@/lib/supabase-browser'
import { Service } from '@/types'

const EMPTY: Omit<Service, 'id'> = {
  title: '',
  description: '',
  price: '',
  icon: '',
  order: 0,
  visible: true,
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [editId, setEditId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Omit<Service, 'id'>>(EMPTY)
  const [adding, setAdding] = useState(false)
  const [newData, setNewData] = useState<Omit<Service, 'id'>>(EMPTY)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function load() {
    const supabase = getSupabaseBrowser()
    const { data } = await supabase.from('services').select('*').order('order', { ascending: true })
    setServices(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function startEdit(service: Service) {
    setEditId(service.id)
    setEditData({ title: service.title, description: service.description, price: service.price, icon: service.icon, order: service.order, visible: service.visible })
  }

  async function saveEdit() {
    if (!editData.title.trim()) { setError('Название обязательно'); return }
    setSaving(true); setError('')
    const supabase = getSupabaseBrowser()
    const { error: dbErr } = await supabase.from('services').update(editData).eq('id', editId!)
    if (dbErr) { setError('Ошибка сохранения'); setSaving(false); return }
    setEditId(null)
    setSaving(false)
    load()
  }

  async function toggleVisible(service: Service) {
    const supabase = getSupabaseBrowser()
    await supabase.from('services').update({ visible: !service.visible }).eq('id', service.id)
    load()
  }

  async function deleteService(id: string) {
    if (!confirm('Удалить услугу?')) return
    const supabase = getSupabaseBrowser()
    await supabase.from('services').delete().eq('id', id)
    load()
  }

  async function addService() {
    if (!newData.title.trim()) { setError('Название обязательно'); return }
    setSaving(true); setError('')
    const supabase = getSupabaseBrowser()
    const { error: dbErr } = await supabase.from('services').insert({ ...newData, order: services.length + 1 })
    if (dbErr) { setError('Ошибка при добавлении'); setSaving(false); return }
    setAdding(false)
    setNewData(EMPTY)
    setSaving(false)
    load()
  }

  if (loading) return <div className="text-white/40 text-sm">Загрузка…</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Услуги</h1>
          <p className="text-white/40 text-sm">{services.length} услуг</p>
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
        <ServiceForm
          data={newData}
          onChange={setNewData}
          onSave={addService}
          onCancel={() => { setAdding(false); setError('') }}
          saving={saving}
          title="Новая услуга"
        />
      )}

      <div className="flex flex-col gap-3">
        {services.map((service) =>
          editId === service.id ? (
            <ServiceForm
              key={service.id}
              data={editData}
              onChange={setEditData}
              onSave={saveEdit}
              onCancel={() => { setEditId(null); setError('') }}
              saving={saving}
              title="Редактирование"
            />
          ) : (
            <div
              key={service.id}
              className="bg-[#1F2937] rounded-2xl p-5 border border-white/5 flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-4 flex-1 min-w-0">
                {service.icon && <span className="text-2xl flex-shrink-0">{service.icon}</span>}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{service.title}</p>
                  {service.description && (
                    <p className="text-white/50 text-sm mt-0.5 line-clamp-2">{service.description}</p>
                  )}
                  {service.price && (
                    <span className="inline-block mt-2 text-xs text-[#F97316] bg-[#F97316]/10 px-2 py-0.5 rounded-lg">{service.price}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => toggleVisible(service)}
                  className={`p-2 rounded-lg transition-colors ${service.visible ? 'text-green-400 bg-green-400/10 hover:bg-green-400/20' : 'text-white/30 hover:text-white/60 hover:bg-white/5'}`}
                  title={service.visible ? 'Скрыть' : 'Показать'}
                >
                  {service.visible ? (
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
                  onClick={() => startEdit(service)}
                  className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                  title="Редактировать"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => deleteService(service.id)}
                  className="p-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                  title="Удалить"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          )
        )}

        {services.length === 0 && !adding && (
          <div className="text-center py-16 text-white/30">
            <p className="text-sm">Услуг пока нет. Нажмите «Добавить».</p>
          </div>
        )}
      </div>
    </div>
  )
}

function ServiceForm({
  data,
  onChange,
  onSave,
  onCancel,
  saving,
  title,
}: {
  data: Omit<Service, 'id'>
  onChange: (d: Omit<Service, 'id'>) => void
  onSave: () => void
  onCancel: () => void
  saving: boolean
  title: string
}) {
  return (
    <div className="bg-[#1F2937] rounded-2xl p-5 border border-[#F97316]/20">
      <p className="text-xs text-white/40 uppercase tracking-wider mb-4">{title}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="sm:col-span-2">
          <label className="block text-xs text-white/40 mb-1">Название *</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            placeholder="Перевозка мебели"
            className="w-full bg-[#111827] border border-white/10 rounded-xl px-3 py-2.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#F97316]/50"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs text-white/40 mb-1">Описание</label>
          <textarea
            value={data.description}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            placeholder="Краткое описание услуги…"
            rows={2}
            className="w-full bg-[#111827] border border-white/10 rounded-xl px-3 py-2.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#F97316]/50 resize-none"
          />
        </div>
        <div>
          <label className="block text-xs text-white/40 mb-1">Цена</label>
          <input
            type="text"
            value={data.price}
            onChange={(e) => onChange({ ...data, price: e.target.value })}
            placeholder="от 1 500 ₽"
            className="w-full bg-[#111827] border border-white/10 rounded-xl px-3 py-2.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#F97316]/50"
          />
        </div>
        <div>
          <label className="block text-xs text-white/40 mb-1">Иконка (emoji)</label>
          <input
            type="text"
            value={data.icon}
            onChange={(e) => onChange({ ...data, icon: e.target.value })}
            placeholder="🚚"
            className="w-full bg-[#111827] border border-white/10 rounded-xl px-3 py-2.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#F97316]/50"
          />
        </div>
        <div>
          <label className="block text-xs text-white/40 mb-1">Порядок</label>
          <input
            type="number"
            value={data.order}
            onChange={(e) => onChange({ ...data, order: Number(e.target.value) })}
            className="w-full bg-[#111827] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]/50"
          />
        </div>
        <div className="flex items-center gap-2 pt-5">
          <button
            type="button"
            onClick={() => onChange({ ...data, visible: !data.visible })}
            className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${data.visible ? 'bg-[#F97316]' : 'bg-white/20'}`}
          >
            <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform mt-0.5 ${data.visible ? 'translate-x-5' : 'translate-x-1'}`} />
          </button>
          <span className="text-sm text-white/60">{data.visible ? 'Видна на сайте' : 'Скрыта'}</span>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={onSave}
          disabled={saving}
          className="bg-[#F97316] hover:bg-[#ea6c10] disabled:opacity-60 text-white font-medium px-5 py-2 rounded-xl text-sm transition-colors"
        >
          {saving ? 'Сохранение…' : 'Сохранить'}
        </button>
        <button
          onClick={onCancel}
          className="text-white/50 hover:text-white px-5 py-2 rounded-xl text-sm transition-colors hover:bg-white/5"
        >
          Отмена
        </button>
      </div>
    </div>
  )
}
