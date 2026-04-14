import { useState } from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import ProductFilters from '../components/product/ProductFilters'
import ProductGrid from '../components/product/ProductGrid'
import { useProducts } from '../hooks/useProducts'

export default function CollectionPage() {
  const [filters, setFilters] = useState({})
  const { products, loading } = useProducts(filters)

  return (
    <div className="page-shell">
      <Navbar />
      <main className="content-wrap">
        <h1 className="mb-2 font-serif text-3xl">Silk Collection</h1>
        <p className="mb-4 text-sm text-[#3D2030]">Browse by silk type, motif preference, and festive styling.</p>
        <ProductFilters value={filters} onChange={setFilters} />
        {loading ? (
          <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="card-surface animate-pulse p-3">
                <div className="h-72 rounded-lg bg-[#f0e8d8]" />
                <div className="mt-3 h-4 w-3/4 rounded bg-[#f0e8d8]" />
                <div className="mt-2 h-4 w-1/2 rounded bg-[#f0e8d8]" />
              </div>
            ))}
          </section>
        ) : (
          <ProductGrid products={products} />
        )}
      </main>
      <Footer />
    </div>
  )
}
