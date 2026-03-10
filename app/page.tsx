import { supabase } from '@/lib/supabase'
import Navbar from '@/components/public/Navbar'
import Hero from '@/components/public/Hero'
import HorizontalSlider from '@/components/public/HorizontalSlider'
import { Settings, Service, Review } from '@/types'

export const revalidate = 60

export default async function HomePage() {
  const [settingsRes, servicesRes, reviewsRes] = await Promise.all([
    supabase.from('settings').select('key, value'),
    supabase.from('services').select('*').eq('visible', true).order('order', { ascending: true }),
    supabase.from('reviews').select('*').eq('visible', true).order('created_at', { ascending: false }),
  ])

  const settings: Settings = Object.fromEntries(
    (settingsRes.data ?? []).map((s) => [s.key, s.value])
  )
  const services: Service[] = servicesRes.data ?? []
  const reviews: Review[] = reviewsRes.data ?? []

  return (
    <>
      <Navbar settings={settings} />
      <main>
        <Hero settings={settings} />
        <HorizontalSlider services={services} reviews={reviews} settings={settings} />
      </main>
    </>
  )
}
