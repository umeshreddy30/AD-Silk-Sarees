import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import CollectionPage from './pages/CollectionPage'
import ProductDetail from './pages/ProductDetail'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import LoginPage from './pages/auth/LoginPage'
import AdminLoginPage from './pages/auth/AdminLoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import DashboardLayout from './pages/dashboard/DashboardLayout'
import OrderHistory from './pages/dashboard/OrderHistory'
import Wishlist from './pages/dashboard/Wishlist'
import ProfileSettings from './pages/dashboard/ProfileSettings'
import AdminLayout from './admin/AdminLayout'
import AdminDashboard from './admin/pages/AdminDashboard'
import ProductManagement from './admin/pages/ProductManagement'
import AddProduct from './admin/pages/AddProduct'
import EditProduct from './admin/pages/EditProduct'
import OrderManagement from './admin/pages/OrderManagement'
import ProtectedRoute from './components/common/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/collection" element={<CollectionPage />} />
      <Route path="/product/:slug" element={<ProductDetail />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/admin-login" element={<AdminLoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<OrderHistory />} />
        <Route path="orders" element={<OrderHistory />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="profile" element={<ProfileSettings />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<ProductManagement />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="orders" element={<OrderManagement />} />
      </Route>
    </Routes>
  )
}

export default App