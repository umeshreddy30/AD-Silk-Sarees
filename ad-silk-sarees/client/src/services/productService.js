import api from './api'

export const productService = {
  async getProducts(params = {}) {
    const { data } = await api.get('/api/products', { params })
    return data
  },
  async getProductBySlug(slug) {
    const { data } = await api.get(`/api/products/${slug}`)
    return data
  },
  async createProduct(payload) {
    const { data } = await api.post('/api/products', payload)
    return data
  },
  async updateProduct(id, payload) {
    const { data } = await api.put(`/api/products/${id}`, payload)
    return data
  },
  async deleteProduct(id) {
    const { data } = await api.delete(`/api/products/${id}`)
    return data
  },
}
