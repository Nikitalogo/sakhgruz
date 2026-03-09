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
          className={`w-4 h-4 ${i < rating ? 'text-[#F97316]' : 'text-white/20'}`}
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
    <section id="reviews" className="bg-[#0f1623] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Отзывы</h2>
            <p className="text-white/50">Что говорят наши клиенты</p>
          </div>
        </FadeIn>

        {reviews.length === 0 ? (
          <FadeIn>
            <p className="text-center text-white/40">Отзывы появятся скоро</p>
          </FadeIn>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((review, i) => (
              <FadeIn key={review.id} delay={i * 80}>
                <div className="bg-[#1F2937] rounded-2xl p-6 border border-white/5 flex flex-col gap-4 h-full">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{review.author}</p>
                      {review.source && (
                        <p className="text-xs text-white/40 mt-0.5">{review.source}</p>
                      )}
                    </div>
                    <Stars rating={review.rating} />
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed flex-1">{review.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
