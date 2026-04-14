import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { productService } from '../../services/productService'

export default function ProductManagement() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const loadProducts = async () => {
    try {
      const response = await productService.getProducts({ status: '' })
      setProducts(response.items || [])
    } catch (err) {
      setError(err.response?.data?.detail || 'Unable to load products')
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const onDelete = async (id) => {
    try {
      await productService.deleteProduct(id)
      setSuccess('Product archived successfully.')
      loadProducts()
    } catch (err) {
      setError(err.response?.data?.detail || 'Delete failed')
    }
  }

  return (
    <div className="rounded-lg border bg-white p-4">
      <h2 className="font-serif text-2xl">Product Management</h2>
      <p className="mt-2 text-sm">Total products: {products.length}</p>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {success && <p className="mt-2 text-sm text-green-700">{success}</p>}
      <div className="mt-4 overflow-x-auto rounded border border-[#e8dccc]">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-[#F5EDD6] text-left text-[#3D2030]">
            <tr>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">SKU</th>
              <th className="px-3 py-2">Price</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id || product.sku} className="border-t">
                <td className="px-3 py-2">{product.name}</td>
                <td className="px-3 py-2">{product.sku}</td>
                <td className="px-3 py-2">Rs. {Number(product.price || 0).toLocaleString()}</td>
                <td className="px-3 py-2">{product.status}</td>
                <td className="px-3 py-2">
                  <div className="flex gap-2">
                    <Link to={`/admin/products/edit/${product.id}`} className="rounded border border-[#6B1C2E] px-3 py-1 text-xs text-[#6B1C2E]">Edit</Link>
                    <button onClick={() => onDelete(product.id)} className="rounded bg-red-600 px-3 py-1 text-xs text-white">Delete</button>
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
