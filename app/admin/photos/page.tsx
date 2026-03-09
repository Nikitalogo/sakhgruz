'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { getSupabaseBrowser } from '@/lib/supabase-browser'
import { Photo } from '@/types'

const MAX_SIZE = 5 * 1024 * 1024 // 5 MB

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function load() {
    const supabase = getSupabaseBrowser()
    const { data } = await supabase
      .from('photos')
      .select('*')
      .order('created_at', { ascending: false })
    setPhotos(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function uploadFile(file: File) {
    if (!file.type.startsWith('image/')) {
      setError('Только изображения (image/*)')
      return
    }
    if (file.size > MAX_SIZE) {
      setError('Файл слишком большой (максимум 5 МБ)')
      return
    }
    setError('')
    setUploading(true)
    try {
      const supabase = getSupabaseBrowser()
      const ext = file.name.split('.').pop() ?? 'jpg'
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      const { error: storageErr } = await supabase.storage
        .from('photos')
        .upload(fileName, file, { contentType: file.type })
      if (storageErr) throw storageErr

      const { data: urlData } = supabase.storage.from('photos').getPublicUrl(fileName)

      const { error: dbErr } = await supabase
        .from('photos')
        .insert({ url: urlData.publicUrl, caption: '', category: '' })
      if (dbErr) throw dbErr

      load()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Ошибка загрузки')
    } finally {
      setUploading(false)
    }
  }

  async function handleFiles(files: FileList | null) {
    if (!files) return
    for (const file of Array.from(files)) {
      await uploadFile(file)
    }
  }

  async function deletePhoto(photo: Photo) {
    if (!confirm('Удалить фото?')) return
    const supabase = getSupabaseBrowser()
    // Extract storage path from URL
    const parts = photo.url.split('/photos/')
    if (parts.length === 2) {
      await supabase.storage.from('photos').remove([parts[1]])
    }
    await supabase.from('photos').delete().eq('id', photo.id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Фото</h1>
          <p className="text-white/40 text-sm">{photos.length} фотографий</p>
        </div>
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 bg-[#F97316] hover:bg-[#ea6c10] disabled:opacity-60 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          {uploading ? 'Загрузка…' : 'Загрузить'}
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm mb-4">
          {error}
        </div>
      )}

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          handleFiles(e.dataTransfer.files)
        }}
        onClick={() => fileRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 mb-6 text-center cursor-pointer transition-colors ${
          dragOver
            ? 'border-[#F97316] bg-[#F97316]/5'
            : 'border-white/10 hover:border-white/20 bg-[#1F2937]/50'
        }`}
      >
        <svg className="w-10 h-10 text-white/20 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <p className="text-white/50 text-sm">
          {uploading ? 'Загружаем…' : 'Перетащите фото или нажмите для выбора'}
        </p>
        <p className="text-white/25 text-xs mt-1">PNG, JPG, WebP — до 5 МБ</p>
      </div>

      {loading ? (
        <div className="text-white/40 text-sm">Загрузка…</div>
      ) : photos.length === 0 ? (
        <div className="text-center py-12 text-white/30 text-sm">Фото пока нет</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {photos.map((photo) => (
            <div key={photo.id} className="group relative aspect-square bg-[#1F2937] rounded-xl overflow-hidden border border-white/5">
              <Image
                src={photo.url}
                alt={photo.caption || ''}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => deletePhoto(photo)}
                  className="bg-red-500/90 hover:bg-red-500 text-white p-2 rounded-lg transition-colors"
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
          ))}
        </div>
      )}
    </div>
  )
}
