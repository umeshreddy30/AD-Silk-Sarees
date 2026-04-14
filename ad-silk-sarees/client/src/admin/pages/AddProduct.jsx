import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { productService } from '../../services/productService'
import { uploadService } from '../../services/uploadService'

export default function AddProduct() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    sku: '',
    name: '',
    slug: '',
    short_description: '',
    long_description: '',
    silk_type: 'Kanchipuram',
    category: 'Festive',
    price: '',
    stock_quantity: 1,
    color_primary: 'Maroon',
    image_url: '',
  })

  const validate = () => {
    if (!form.sku || !form.name || !form.slug) return 'SKU, name and slug are required.'
    if (Number(form.price) <= 0) return 'Price must be greater than 0.'
    if (Number(form.stock_quantity) < 0) return 'Stock cannot be negative.'
    return ''
  }

  const onUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const uploaded = await uploadService.uploadImage(file)
      setForm((prev) => ({ ...prev, image_url: uploaded.url }))
      setSuccess('Image uploaded successfully.')
    } catch (err) {
      setError(err.response?.data?.detail || 'Image upload failed')
    } finally {
      setUploading(false)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }
    const payload = {
      ...form,
      tags: ['admin'],
      price: Number(form.price || 0),
      stock_quantity: Number(form.stock_quantity || 1),
      currency: 'INR',
      status: 'active',
      images: form.image_url ? [{ url: form.image_url, alt: form.name, is_primary: true }] : [],
      authenticity: {
        silk_mark_certified: true,
        gi_tag_certified: false,
        handwoven: true,
        zari_type: 'No Zari',
      },
      craft_details: {
        weave_type: 'Korvai',
        loom_type: 'Pit Loom',
        motif_name: 'Temple Border',
      },
      dimensions: {
        length_meters: 6,
        width_inches: 44,
        blouse_piece_included: true,
        blouse_piece_meters: 0.8,
      },
    }
    try {
      await productService.createProduct(payload)
      setSuccess('Product created successfully.')
      setTimeout(() => navigate('/admin/products'), 600)
    } catch (err) {
      setError(err.response?.data?.detail || 'Unable to add product')
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg border bg-white p-4">
      <h2 className="font-serif text-2xl">Add Product</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <input className="rounded border p-2" placeholder="SKU" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} required />
        <input className="rounded border p-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input className="rounded border p-2" placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
        <input className="rounded border p-2" placeholder="Silk Type" value={form.silk_type} onChange={(e) => setForm({ ...form, silk_type: e.target.value })} required />
        <input className="rounded border p-2" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
        <input className="rounded border p-2" placeholder="Color" value={form.color_primary} onChange={(e) => setForm({ ...form, color_primary: e.target.value })} required />
        <input className="rounded border p-2" type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <input className="rounded border p-2" type="number" placeholder="Stock" value={form.stock_quantity} onChange={(e) => setForm({ ...form, stock_quantity: e.target.value })} required />
      </div>
      <textarea className="mt-3 w-full rounded border p-2" placeholder="Short description" value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })} required />
      <textarea className="mt-3 w-full rounded border p-2" placeholder="Long description" value={form.long_description} onChange={(e) => setForm({ ...form, long_description: e.target.value })} required />
      <div className="mt-3 rounded border border-dashed p-3">
        <p className="text-sm text-[#3D2030]">Product image</p>
        <input className="mt-2" type="file" accept="image/*" onChange={onUpload} />
        {uploading && <p className="mt-2 text-sm">Uploading image...</p>}
        {form.image_url && <p className="mt-2 text-xs text-green-700">Uploaded: {form.image_url}</p>}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {success && <p className="mt-2 text-sm text-green-700">{success}</p>}
      <button className="mt-3 rounded bg-[#6B1C2E] px-4 py-2 text-white">Create Product</button>
    </form>
  )
}
