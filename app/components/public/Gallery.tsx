'use client'

import { useState } from 'react'
import Image from 'next/image'
import FadeIn from './FadeIn'
import { Photo } from '@/types'

interface Props {
  photos: Photo[]
}

export default function Gallery({ photos }: Props) {
  const [lightbox, setLightbox] = useState<Photo | null>(null)

  return (
    <section id="gallery" className="bg-[#111827] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Галерея</h2>
            <p className="text-white/50">Наши работы</p>
          </div>
        </FadeIn>

        {photos.length === 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div className="aspect-square bg-[#1F2937] rounded-xl border border-white/5 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {photos.map((photo, i) => (
              <FadeIn key={photo.id} delay={i * 60}>
                <button
                  onClick={() => setLightbox(photo)}
                  className="group relative aspect-square bg-[#1F2937] rounded-xl overflow-hidden border border-white/5 hover:border-[#F97316]/30 transition-all duration-300 w-full"
                >
                  <Image
                    src={photo.url}
                    alt={photo.caption || ''}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {photo.caption && (
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                      <p className="text-white text-xs text-left">{photo.caption}</p>
                    </div>
                  )}
                </button>
              </FadeIn>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
            onClick={() => setLightbox(null)}
            aria-label="Закрыть"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="relative max-w-4xl max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.url}
              alt={lightbox.caption || ''}
              width={1200}
              height={800}
              className="object-contain max-h-[80vh] w-auto mx-auto rounded-lg"
            />
            {lightbox.caption && (
              <p className="text-center text-white/70 mt-3 text-sm">{lightbox.caption}</p>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
