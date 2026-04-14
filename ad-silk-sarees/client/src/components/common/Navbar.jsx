import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const { items } = useCart()
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)

  const closeMenu = () => setOpen(false)
  return (
    <header className="sticky top-0 z-20 border-b border-[#e8dccc] bg-[#faf6ee]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-3" onClick={closeMenu} aria-label="AD Silk Sarees home">
          <img
            src="/ad-silk-logo.png"
            alt="AD Silk Sarees"
            className="h-10 w-auto md:h-11"
            loading="eager"
          />
          <div className="leading-tight">
            <span className="block font-serif text-xl font-semibold tracking-wide text-[#6B1C2E] md:text-2xl">
              AD Silk Sarees
            </span>
            <span className="hidden text-[11px] font-medium tracking-[0.22em] text-[#3D2030] md:block">
              HERITAGE HANDLOOM
            </span>
          </div>
        </Link>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="rounded border border-[#6B1C2E] px-3 py-1 text-xs text-[#6B1C2E] md:hidden"
        >
          Menu
        </button>
        <div className={`${open ? 'flex' : 'hidden'} w-full flex-col gap-3 pt-3 text-sm font-medium text-[#3D2030] md:flex md:w-auto md:flex-row md:items-center md:gap-5 md:pt-0`}>
          <Link to="/collection" onClick={closeMenu}>Collection</Link>
          {user && <Link to="/dashboard" onClick={closeMenu}>Dashboard</Link>}
          {user?.role === 'admin' && <Link to="/admin" onClick={closeMenu}>Admin</Link>}
          <Link to="/cart" onClick={closeMenu}>Cart ({items.length})</Link>
          {!user && <Link to="/auth/login" onClick={closeMenu}>Login</Link>}
          {user && (
            <button onClick={() => { logout(); closeMenu() }} className="rounded border border-[#6B1C2E] px-2 py-1 text-[#6B1C2E]">
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}
