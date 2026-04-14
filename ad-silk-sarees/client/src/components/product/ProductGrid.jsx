import ProductCard from './ProductCard'

export default function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <section className="card-surface p-8 text-center">
        <h3 className="font-serif text-2xl text-[#1A0A0F]">No sarees found</h3>
        <p className="mt-2 text-sm text-[#3D2030]">Try changing filters or search with another silk type.</p>
      </section>
    )
  }

  return (
    <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.sku} product={product} />
      ))}
    </section>
  )
}
