import { Link } from 'react-router-dom'
import SilkMarkBadge from '../common/SilkMarkBadge'

export default function ProductCard({ product }) {
  const image = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1610030469668-06a8f01c4e4d?auto=format&fit=crop&w=900&q=80'
  return (
    <article className="rounded-xl border border-[#e8dccc] bg-white p-3 shadow-sm">
      <img src={image} alt={product.name} className="h-72 w-full rounded-lg object-cover" />
      <div className="mt-3 flex items-start justify-between">
        <div>
          <h3 className="font-serif text-xl text-[#1A0A0F]">{product.name}</h3>
          <p className="text-sm text-[#3D2030]">{product.silk_type}</p>
        </div>
        <SilkMarkBadge />
      </div>
      <div className="mt-2 flex items-center justify-between">
        <p className="font-semibold text-[#6B1C2E]">Rs. {product.price?.toLocaleString()}</p>
        <Link to={`/product/${product.slug}`} className="rounded-md bg-[#6B1C2E] px-3 py-2 text-sm text-white">
          View
        </Link>
      </div>
    </article>
  )
}
