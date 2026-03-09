import { supabase } from '@/lib/supabase'
import Navbar from '@/components/public/Navbar'
import Hero from '@/components/public/Hero'
import Services from '@/components/public/Services'
import HowItWorks from '@/components/public/HowItWorks'
import Gallery from '@/components/public/Gallery'
import Reviews from '@/components/public/Reviews'
import Contacts from '@/components/public/Contacts'
import FloatingButton from '@/components/public/FloatingButton'
import Footer from '@/components/public/Footer'
import { Settings, Service, Photo, Review } from '@/types'

export const revalidate = 60

export default async function HomePage() {
  const [settingsRes, servicesRes, photosRes, reviewsRes] = await Promise.all([
    supabase.from('settings').select('key, value'),
    supabase
      .from('services')
      .select('*')
      .eq('visible', true)
      .order('order', { ascending: true }),
    supabase
      .from('photos')
      .select('*')
      .order('created_at', { ascending: false }),
    supabase
      .from('reviews')
      .select('*')
      .eq('visible', true)
      .order('created_at', { ascending: false }),
  ])

  const settings: Settings = Object.fromEntries(
    (settingsRes.data ?? []).map((s) => [s.key, s.value])
  )
  const services: Service[] = servicesRes.data ?? []
  const photos: Photo[] = photosRes.data ?? []
  const reviews: Review[] = reviewsRes.data ?? []

  return (
    <>
      <Navbar />
      <main>
        <Hero settings={settings} />
        <Services services={services} />
        <HowItWorks />
        <Gallery photos={photos} />
        <Reviews reviews={reviews} />
        <Contacts settings={settings} />
      </main>
      <Footer settings={settings} />
      <FloatingButton settings={settings} />
    </>
  )
}
