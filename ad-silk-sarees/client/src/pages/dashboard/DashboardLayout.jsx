import { Link, Outlet } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'

export default function DashboardLayout() {
  return (
    <div>
      <Navbar />
      <main className="content-wrap grid gap-4 lg:grid-cols-[220px_1fr]">
        <aside className="card-surface h-fit p-4">
          <p className="mb-3 font-serif text-xl">My Account</p>
          <div className="grid gap-2 text-sm text-[#3D2030]">
            <Link to="/dashboard/orders" className="rounded px-2 py-1 hover:bg-[#F5EDD6]">Order History</Link>
            <Link to="/dashboard/wishlist" className="rounded px-2 py-1 hover:bg-[#F5EDD6]">Wishlist</Link>
            <Link to="/dashboard/profile" className="rounded px-2 py-1 hover:bg-[#F5EDD6]">Profile</Link>
          </div>
        </aside>
        <section><Outlet /></section>
      </main>
    </div>
  )
}
