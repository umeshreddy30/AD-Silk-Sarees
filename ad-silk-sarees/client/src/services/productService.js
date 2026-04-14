import api from './api'

export const productService = {
  async getProducts(params = {}) {
    const { data } = await api.get('/products', { params })
    return data
  },
  async getProductBySlug(slug) {
    const { data } = await api.get(`/products/${slug}`)
    return data
  },
  async createProduct(payload) {
    const { data } = await api.post('/products', payload)
    return data
  },
  async updateProduct(id, payload) {
    const { data } = await api.put(`/products/${id}`, payload)
    return data
  },
  async deleteProduct(id) {
    const { data } = await api.delete(`/products/${id}`)
    return data
  },
}
