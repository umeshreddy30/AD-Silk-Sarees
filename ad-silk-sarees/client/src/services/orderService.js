import api from './api'

export const orderService = {
  async createOrder(payload) {
    const { data } = await api.post('/orders', payload)
    return data
  },
  async getOrders() {
    const { data } = await api.get('/orders')
    return data
  },
  async getAllOrders() {
    const { data } = await api.get('/orders/all')
    return data
  },
  async updateOrderStatus(orderId, status) {
    const { data } = await api.put(`/admin/orders/${orderId}`, null, { params: { status } })
    return data
  },
  async getAnalytics() {
    const { data } = await api.get('/admin/analytics')
    return data
  },
}
