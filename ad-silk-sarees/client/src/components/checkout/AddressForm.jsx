export default function AddressForm({ value, onChange }) {
  return (
    <div className="grid gap-3 rounded-lg border border-[#e8dccc] bg-white p-4">
      <input className="rounded border border-[#d8c8b0] p-2" placeholder="Full name" value={value.name} onChange={(e) => onChange({ ...value, name: e.target.value })} />
      <input className="rounded border border-[#d8c8b0] p-2" placeholder="Address" value={value.address} onChange={(e) => onChange({ ...value, address: e.target.value })} />
      <input className="rounded border border-[#d8c8b0] p-2" placeholder="Pincode" value={value.pincode} onChange={(e) => onChange({ ...value, pincode: e.target.value })} />
    </div>
  )
}
