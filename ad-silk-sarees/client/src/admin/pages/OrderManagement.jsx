import { useEffect, useState } from 'react'
import { orderService } from '../../services/orderService'

export default function OrderManagement() {
  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const loadOrders = async () => {
    try {
      const response = await orderService.getAllOrders()
      setOrders(response.items || [])
    } catch (err) {
      setError(err.response?.data?.detail || 'Unable to fetch orders')
    }
  }

  useEffect(() => {
    loadOrders()
  }, [])

  const onStatusChange = async (id, status) => {
    try {
      await orderService.updateOrderStatus(id, status)
      setSuccess(`Order marked as ${status}.`)
      loadOrders()
    } catch (err) {
      setError(err.response?.data?.detail || 'Unable to update status')
    }
  }

  return (
    <div className="rounded-lg border bg-white p-4">
      <h2 className="font-serif text-2xl">Order Management</h2>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {success && <p className="mt-2 text-sm text-green-700">{success}</p>}
      <div className="mt-4 overflow-x-auto rounded border border-[#e8dccc]">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-[#F5EDD6] text-left">
            <tr>
              <th className="px-3 py-2">Order ID</th>
              <th className="px-3 py-2">Customer</th>
              <th className="px-3 py-2">Amount</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-3 py-2">{order.id}</td>
                <td className="px-3 py-2">{order.customer_email}</td>
                <td className="px-3 py-2">Rs. {Number(order.total || 0).toLocaleString()}</td>
                <td className="px-3 py-2">{order.order_status}</td>
                <td className="px-3 py-2">
                  <div className="flex gap-2">
                    {['packed', 'shipped', 'delivered'].map((status) => (
                      <button
                        key={status}
                        onClick={() => onStatusChange(order.id, status)}
                        className="rounded border border-[#6B1C2E] px-2 py-1 text-xs text-[#6B1C2E]"
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
