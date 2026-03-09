import AdminNav from '@/components/admin/AdminNav'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#111827] text-white">
      <AdminNav />
      <div className="lg:pl-56 pt-14 lg:pt-0">
        <main className="p-4 sm:p-6 lg:p-8 max-w-5xl">{children}</main>
      </div>
    </div>
  )
}
