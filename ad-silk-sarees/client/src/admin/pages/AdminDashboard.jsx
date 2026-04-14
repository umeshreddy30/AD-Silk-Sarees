import { useEffect, useState } from 'react'
import { orderService } from '../../services/orderService'

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState({ orders: 0, revenue: 0, period: '30 days' })
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const data = await orderService.getAnalytics()
        setAnalytics(data)
      } catch (err) {
        setError(err.response?.data?.detail || 'Unable to fetch analytics')
      }
    }
    load()
  }, [])

  return (
    <div className="card-surface p-5">
      <h2 className="font-serif text-2xl">Admin Dashboard</h2>
      <p className="mt-1 text-sm text-[#3D2030]">Track sales and fulfillment performance at a glance.</p>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-[#e8dccc] bg-[#F5EDD6] p-4">
          <p className="text-xs uppercase tracking-wide text-[#3D2030]">Orders</p>
          <p className="mt-1 text-2xl font-semibold">{analytics.orders}</p>
        </div>
        <div className="rounded-lg border border-[#e8dccc] bg-[#F5EDD6] p-4">
          <p className="text-xs uppercase tracking-wide text-[#3D2030]">Revenue</p>
          <p className="mt-1 text-2xl font-semibold">Rs. {Number(analytics.revenue || 0).toLocaleString()}</p>
        </div>
        <div className="rounded-lg border border-[#e8dccc] bg-[#F5EDD6] p-4">
          <p className="text-xs uppercase tracking-wide text-[#3D2030]">Period</p>
          <p className="mt-1 text-2xl font-semibold">{analytics.period}</p>
        </div>
      </div>
    </div>
  )
}
