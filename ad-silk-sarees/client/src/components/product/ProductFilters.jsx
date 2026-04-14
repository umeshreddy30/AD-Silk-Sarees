export default function ProductFilters({ value, onChange }) {
  return (
    <div className="mb-6 flex gap-3">
      <input
        value={value.search || ''}
        onChange={(e) => onChange({ ...value, search: e.target.value })}
        className="w-full rounded-md border border-[#d8c8b0] bg-white px-3 py-2"
        placeholder="Search by name, motif or silk type"
      />
      <select
        value={value.silk_type || ''}
        onChange={(e) => onChange({ ...value, silk_type: e.target.value })}
        className="rounded-md border border-[#d8c8b0] bg-white px-3 py-2"
      >
        <option value="">All Silks</option>
        <option value="Kanchipuram">Kanchipuram</option>
        <option value="Banarasi">Banarasi</option>
        <option value="Mysore Silk">Mysore Silk</option>
      </select>
    </div>
  )
}
