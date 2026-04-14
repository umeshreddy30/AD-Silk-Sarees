import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import ProductImageZoom from '../components/product/ProductImageZoom'
import CraftDetails from '../components/product/CraftDetails'
import AuthenticityBadges from '../components/product/AuthenticityBadges'
import StyleWithSection from '../components/product/StyleWithSection'
import { productService } from '../services/productService'
import { useCart } from '../context/CartContext'

export default function ProductDetail() {
  const { slug } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    productService
      .getProductBySlug(slug)
      .then(setProduct)
      .catch((err) => setError(err.response?.data?.detail || 'Unable to load product'))
  }, [slug])

  if (error) {
    return (
      <div className="page-shell">
        <Navbar />
        <main className="content-wrap">
          <div className="card-surface p-6 text-center">
            <h2 className="font-serif text-2xl">Product unavailable</h2>
            <p className="mt-2 text-sm text-red-600">{error}</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="page-shell">
        <Navbar />
        <main className="content-wrap">
          <div className="card-surface animate-pulse p-6">
            <div className="h-10 w-1/2 rounded bg-[#f0e8d8]" />
            <div className="mt-3 h-4 w-2/3 rounded bg-[#f0e8d8]" />
            <div className="mt-2 h-4 w-1/3 rounded bg-[#f0e8d8]" />
          </div>
        </main>
        <Footer />
      </div>
    )
  }
  const image = product.images?.[0]?.url || ''

  return (
    <div className="page-shell">
      <Navbar />
      <main className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 lg:grid-cols-2">
        <ProductImageZoom image={image} alt={product.name} />
        <section>
          <h1 className="font-serif text-4xl">{product.name}</h1>
          <p className="mt-2 text-[#3D2030]">{product.long_description}</p>
          <p className="mt-4 text-2xl font-semibold text-[#6B1C2E]">Rs. {product.price?.toLocaleString()}</p>
          <div className="mt-4"><AuthenticityBadges authenticity={product.authenticity} /></div>
          <button onClick={() => addToCart(product)} className="mt-5 rounded-md bg-[#6B1C2E] px-5 py-3 text-white">Add to Cart</button>
          <div className="mt-6 grid gap-3">
            <CraftDetails details={product.craft_details} />
            <StyleWithSection />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
