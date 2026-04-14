import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { productService } from '../../services/productService'
import { uploadService } from '../../services/uploadService'

export default function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const response = await productService.getProducts({ status: '' })
        const selected = (response.items || []).find((item) => item.id === id)
        if (!selected) {
          setError('Product not found')
          return
        }
        setForm(selected)
      } catch (err) {
        setError(err.response?.data?.detail || 'Unable to load product')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      const payload = {
        ...form,
        price: Number(form.price || 0),
        stock_quantity: Number(form.stock_quantity || 0),
      }
      await productService.updateProduct(id, payload)
      setSuccess('Product updated successfully.')
      setTimeout(() => navigate('/admin/products'), 600)
    } catch (err) {
      setError(err.response?.data?.detail || 'Update failed')
    }
  }

  const onUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const uploaded = await uploadService.uploadImage(file)
      setForm((prev) => ({
        ...prev,
        images: [{ url: uploaded.url, alt: prev.name || 'Product image', is_primary: true }],
      }))
      setSuccess('Image uploaded successfully.')
    } catch (err) {
      setError(err.response?.data?.detail || 'Image upload failed')
    } finally {
      setUploading(false)
    }
  }

  if (loading) return <div className="rounded-lg border bg-white p-4">Loading...</div>
  if (!form) return <div className="rounded-lg border bg-white p-4">{error || 'No product data'}</div>

  return (
    <form onSubmit={onSubmit} className="rounded-lg border bg-white p-4">
      <h2 className="font-serif text-2xl">Edit Product</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <input className="rounded border p-2" value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input className="rounded border p-2" value={form.slug || ''} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
        <input className="rounded border p-2" type="number" value={form.price || ''} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <input className="rounded border p-2" type="number" value={form.stock_quantity || ''} onChange={(e) => setForm({ ...form, stock_quantity: e.target.value })} required />
      </div>
      <textarea className="mt-3 w-full rounded border p-2" value={form.short_description || ''} onChange={(e) => setForm({ ...form, short_description: e.target.value })} required />
      <textarea className="mt-3 w-full rounded border p-2" value={form.long_description || ''} onChange={(e) => setForm({ ...form, long_description: e.target.value })} required />
      <div className="mt-3 rounded border border-dashed p-3">
        <p className="text-sm text-[#3D2030]">Replace product image</p>
        <input className="mt-2" type="file" accept="image/*" onChange={onUpload} />
        {uploading && <p className="mt-2 text-sm">Uploading image...</p>}
        {!!form.images?.[0]?.url && <p className="mt-2 text-xs text-green-700">Current: {form.images[0].url}</p>}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {success && <p className="mt-2 text-sm text-green-700">{success}</p>}
      <button className="mt-3 rounded bg-[#6B1C2E] px-4 py-2 text-white">Update Product</button>
    </form>
  )
}
