import { Link, Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'

export default function AdminLayout() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-8 lg:grid-cols-[220px_1fr]">
        <aside className="rounded-lg border bg-white p-4">
          <div className="grid gap-2 text-sm">
            <Link to="/admin">Overview</Link>
            <Link to="/admin/products">Products</Link>
            <Link to="/admin/products/add">Add Product</Link>
            <Link to="/admin/orders">Orders</Link>
          </div>
        </aside>
        <section><Outlet /></section>
      </main>
    </div>
  )
}
