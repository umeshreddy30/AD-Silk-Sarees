import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const onLogin = async () => {
    setError('')
    try {
      const user = await login(email, password)
      if (user?.role !== 'admin') {
        setError('This account is not an admin account.')
        return
      }
      navigate('/admin')
    } catch (err) {
      setError(err.response?.data?.detail || 'Admin login failed')
    }
  }

  return (
    <main className="mx-auto mt-20 w-full max-w-md rounded-xl bg-white p-6 shadow">
      <h1 className="font-serif text-3xl">Admin Login</h1>
      <input className="mt-4 w-full rounded border p-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Admin email" />
      <input className="mt-3 w-full rounded border p-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <button onClick={onLogin} className="mt-3 w-full rounded bg-[#6B1C2E] py-2 text-white">Continue to Admin</button>
      <Link to="/auth/login" className="mt-3 block text-sm text-[#6B1C2E]">Back to user login</Link>
    </main>
  )
}
