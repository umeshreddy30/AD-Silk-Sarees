import { Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { items, total, updateQuantity, removeFromCart } = useCart()
  return (
    <div className="page-shell">
      <Navbar />
      <main className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[2fr_1fr]">
        <section className="space-y-3">
          <h1 className="font-serif text-3xl">Your Cart</h1>
          {items.map((item) => (
            <CartItem key={item.sku} item={item} onUpdate={updateQuantity} onRemove={removeFromCart} />
          ))}
        </section>
        <section>
          <CartSummary total={total} />
          <Link to="/checkout" className="mt-4 inline-block w-full rounded-md bg-[#6B1C2E] px-4 py-3 text-center text-white">Proceed to Checkout</Link>
        </section>
      </main>
      <Footer />
    </div>
  )
}
