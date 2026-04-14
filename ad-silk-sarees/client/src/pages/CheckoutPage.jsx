import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import AddressForm from '../components/checkout/AddressForm'
import PaymentForm from '../components/checkout/PaymentForm'
import OrderConfirmation from '../components/checkout/OrderConfirmation'
import { orderService } from '../services/orderService'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const { user } = useAuth()
  const [address, setAddress] = useState({ name: '', address: '', pincode: '' })
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const placeOrder = async () => {
    setError('')
    try {
      await orderService.createOrder({ items, total, shipping_address: address, payment_method: 'razorpay' })
      setDone(true)
      clearCart()
    } catch (err) {
      setError(err.response?.data?.detail || 'Unable to place order')
    }
  }

  return (
    <div className="page-shell">
      <Navbar />
      <main className="mx-auto w-full max-w-4xl px-4 py-8">
        <h1 className="mb-4 font-serif text-3xl">Checkout</h1>
        {!user && (
          <p className="mb-3 rounded bg-[#F5EDD6] p-3 text-sm">
            Please <Link to="/auth/login" className="font-semibold text-[#6B1C2E]">login</Link> to place orders.
          </p>
        )}
        <div className="grid gap-4">
          <AddressForm value={address} onChange={setAddress} />
          <PaymentForm />
          <button disabled={!user} onClick={placeOrder} className="rounded-md bg-[#6B1C2E] px-4 py-3 text-white disabled:opacity-60">
            Place Order - Rs. {total.toLocaleString()}
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {done && <OrderConfirmation />}
        </div>
      </main>
      <Footer />
    </div>
  )
}
