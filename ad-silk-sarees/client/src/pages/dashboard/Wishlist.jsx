import { useWishlist } from '../../context/WishlistContext'

export default function Wishlist() {
  const { items } = useWishlist()
  return (
    <div className="rounded-lg border bg-white p-4">
      <h2 className="font-serif text-2xl">Wishlist</h2>
      <p className="mt-2 text-sm">Saved items: {items.length}</p>
      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <p key={item.sku} className="text-sm">{item.name}</p>
        ))}
      </div>
    </div>
  )
}
