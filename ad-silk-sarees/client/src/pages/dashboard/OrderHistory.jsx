import { useEffect, useState } from 'react'
import { orderService } from '../../services/orderService'

export default function OrderHistory() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const response = await orderService.getOrders()
        setOrders(response.items || [])
      } catch (err) {
        setError(err.response?.data?.detail || 'Unable to fetch orders')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="rounded-lg border bg-white p-4">
      <h2 className="font-serif text-2xl">Order History</h2>
      {loading && <p className="mt-3 text-sm">Loading orders...</p>}
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      {!loading && !orders.length && <p className="mt-3 text-sm">No orders yet.</p>}
      <div className="mt-4 space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="rounded border border-[#e8dccc] p-3">
            <p className="text-sm">Order ID: {order.id}</p>
            <p className="text-sm">Status: {order.order_status}</p>
            <p className="font-medium text-[#6B1C2E]">Total: Rs. {Number(order.total || 0).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
