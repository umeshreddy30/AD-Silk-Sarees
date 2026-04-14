import { createContext, useContext, useState } from 'react'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([])
  const toggleWishlist = (product) => {
    setItems((prev) =>
      prev.some((item) => item.sku === product.sku)
        ? prev.filter((item) => item.sku !== product.sku)
        : [...prev, product],
    )
  }

  return <WishlistContext.Provider value={{ items, toggleWishlist }}>{children}</WishlistContext.Provider>
}

export const useWishlist = () => useContext(WishlistContext)
