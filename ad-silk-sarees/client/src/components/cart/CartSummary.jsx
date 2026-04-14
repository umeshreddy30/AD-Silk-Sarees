export default function CartSummary({ total }) {
  return (
    <aside className="rounded-lg border border-[#e8dccc] bg-white p-4">
      <h4 className="font-serif text-lg">Order Summary</h4>
      <div className="mt-4 flex justify-between">
        <span>Total</span>
        <strong>Rs. {total.toLocaleString()}</strong>
      </div>
    </aside>
  )
}
