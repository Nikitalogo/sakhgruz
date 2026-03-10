import FadeIn from './FadeIn'
import { Review } from '@/types'

interface Props {
  reviews: Review[]
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? 'text-[#F97316]' : 'text-white/15'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Reviews({ reviews }: Props) {
  return (
    <section id="reviews" className="bg-[#111827] py-24 px-6 sm:px-10 relative overflow-hidden">
      {/* Ghost text decoration */}
      <div
        className="absolute -top-4 -right-4 select-none pointer-events-none leading-none"
        style={{
          fontFamily: 'var(--font-bebas), Impact, sans-serif',
          fontSize: 'clamp(10rem, 20vw, 20rem)',
          color: 'rgba(249,115,22,0.035)',
        }}
        aria-hidden
      >
        ★★★
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <FadeIn>
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-[3px] bg-[#F97316]" />
              <span
                className="text-[#F97316] text-xs font-semibold uppercase tracking-[0.35em]"
                style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
              >
                Клиенты о нас
              </span>
            </div>
            <h2
              className="text-white uppercase leading-none"
              style={{
                fontFamily: 'var(--font-bebas), Impact, Arial Black, sans-serif',
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                letterSpacing: '0.02em',
              }}
            >
              Отзывы
            </h2>
          </div>
        </FadeIn>

        {reviews.length === 0 ? (
          <FadeIn>
            <p
              className="text-white/30 text-sm uppercase tracking-widest"
              style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
            >
              Отзывы появятся скоро
            </p>
          </FadeIn>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((review, i) => (
              <FadeIn key={review.id} delay={i * 70}>
                <div className="group relative bg-[#141b28] hover:bg-[#1a2236] border border-white/[0.06] hover:border-[#F97316]/25 p-7 transition-all duration-300 h-full flex flex-col">

                  {/* Big quote mark */}
                  <div
                    className="absolute top-4 right-6 text-[#F97316]/10 group-hover:text-[#F97316]/20 transition-colors duration-300 leading-none select-none"
                    style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: '5rem',
                      lineHeight: 1,
                    }}
                    aria-hidden
                  >
                    &ldquo;
                  </div>

                  {/* Stars */}
                  <div className="mb-4">
                    <Stars rating={review.rating} />
                  </div>

                  {/* Review text */}
                  <p
                    className="text-white/65 text-sm leading-relaxed flex-1 mb-6 relative z-10"
                    style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
                  >
                    {review.text}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                    <div className="w-8 h-8 bg-[#F97316]/15 flex items-center justify-center flex-shrink-0">
                      <span
                        className="text-[#F97316] text-sm font-bold leading-none"
                        style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
                      >
                        {review.author.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p
                        className="text-white font-semibold text-sm leading-tight"
                        style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
                      >
                        {review.author}
                      </p>
                      {review.source && (
                        <p
                          className="text-white/30 text-xs mt-0.5"
                          style={{ fontFamily: 'var(--font-montserrat), Arial, sans-serif' }}
                        >
                          {review.source}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
