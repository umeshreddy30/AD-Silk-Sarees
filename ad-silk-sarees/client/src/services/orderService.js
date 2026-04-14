import api from './api'

export const orderService = {
  async createOrder(payload) {
    const { data } = await api.post('/api/orders', payload)
    return data
  },
  async getOrders() {
    const { data } = await api.get('/api/orders')
    return data
  },
  async getAllOrders() {
    const { data } = await api.get('/api/orders/all')
    return data
  },
  async updateOrderStatus(orderId, status) {
    const { data } = await api.put(`/api/admin/orders/${orderId}`, null, { params: { status } })
    return data
  },
  async getAnalytics() {
    const { data } = await api.get('/api/admin/analytics')
    return data
  },
}
