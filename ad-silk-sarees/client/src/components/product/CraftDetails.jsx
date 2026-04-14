export default function CraftDetails({ details }) {
  if (!details) return null
  return (
    <div className="rounded-lg border border-[#e8dccc] bg-white p-4">
      <h4 className="font-serif text-lg">Craft Details</h4>
      <p>Weave: {details.weave_type}</p>
      <p>Loom: {details.loom_type}</p>
      <p>Motif: {details.motif_name || 'Classic Temple Border'}</p>
    </div>
  )
}
