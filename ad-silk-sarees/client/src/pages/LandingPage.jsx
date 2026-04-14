import { Link } from 'react-router-dom'
import AnnouncementBar from '../components/common/AnnouncementBar'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import GoldDivider from '../components/common/GoldDivider'
import CustomerReviews from '../components/common/CustomerReviews'
import ProductGrid from '../components/product/ProductGrid'
import { useProducts } from '../hooks/useProducts'

export default function LandingPage() {
  const { products, loading } = useProducts({})
  return (
    <div className="page-shell">
      <AnnouncementBar />
      <Navbar />
      <main className="content-wrap">
        <section className="rounded-2xl bg-gradient-to-r from-[#6B1C2E] to-[#8B2E42] p-10 text-[#FAF6EE] shadow-xl">
          <h1 className="font-serif text-4xl">Handwoven Silk Heritage</h1>
          <p className="mt-3 max-w-2xl">Curated Kanchipuram, Banarasi and Mysore silk sarees sourced directly from weaving clusters.</p>
          <Link to="/collection" className="mt-5 inline-block rounded-md bg-[#C9A84C] px-4 py-2 font-medium text-[#1A0A0F]">Explore Collection</Link>
        </section>
        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="card-surface p-4">
            <p className="font-serif text-xl">Silk Mark Trust</p>
            <p className="mt-1 text-sm text-[#3D2030]">Every premium piece is verified for authenticity and weave quality.</p>
          </div>
          <div className="card-surface p-4">
            <p className="font-serif text-xl">Cluster Direct</p>
            <p className="mt-1 text-sm text-[#3D2030]">Source directly from weaving families across Kanchipuram and Banaras.</p>
          </div>
          <div className="card-surface p-4">
            <p className="font-serif text-xl">Insured Delivery</p>
            <p className="mt-1 text-sm text-[#3D2030]">Careful packaging and insured shipping for every saree order.</p>
          </div>
        </section>
        <GoldDivider />
        <h2 className="mb-4 font-serif text-3xl text-[#1A0A0F]">Featured Sarees</h2>
        {loading ? <p className="text-sm text-[#3D2030]">Loading featured sarees...</p> : <ProductGrid products={products.slice(0, 6)} />}
        <GoldDivider />
        <CustomerReviews />
      </main>
      <Footer />
    </div>
  )
}
