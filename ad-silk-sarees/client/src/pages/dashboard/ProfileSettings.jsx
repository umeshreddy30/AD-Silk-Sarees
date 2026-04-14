import { useAuth } from '../../context/AuthContext'

export default function ProfileSettings() {
  const { user } = useAuth()
  return (
    <div className="rounded-lg border bg-white p-4">
      <h2 className="font-serif text-2xl">Profile</h2>
      <p className="mt-3 text-sm">Name: {user?.name || '-'}</p>
      <p className="text-sm">Email: {user?.email || '-'}</p>
      <p className="text-sm">Role: {user?.role || 'customer'}</p>
    </div>
  )
}
