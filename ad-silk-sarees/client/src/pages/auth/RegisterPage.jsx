import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [message, setMessage] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()
  const onRegister = async () => {
    try {
      await register(form.name, form.email, form.password)
      setMessage('Account created. Please login.')
      setTimeout(() => navigate('/auth/login'), 700)
    } catch (err) {
      setMessage(err.response?.data?.detail || 'Registration failed')
    }
  }

  return (
    <main className="mx-auto mt-20 w-full max-w-md rounded-xl bg-white p-6 shadow">
      <h1 className="font-serif text-3xl">Register</h1>
      <input className="mt-4 w-full rounded border p-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className="mt-3 w-full rounded border p-2" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="mt-3 w-full rounded border p-2" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      {message && <p className="mt-2 text-sm text-[#6B1C2E]">{message}</p>}
      <button onClick={onRegister} className="mt-3 w-full rounded bg-[#6B1C2E] py-2 text-white">Create account</button>
      <Link to="/auth/login" className="mt-3 block text-sm text-[#6B1C2E]">Back to login</Link>
    </main>
  )
}
