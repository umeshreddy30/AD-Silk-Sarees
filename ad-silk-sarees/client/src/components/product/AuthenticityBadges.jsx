export default function AuthenticityBadges({ authenticity }) {
  return (
    <div className="flex flex-wrap gap-2">
      <span className="rounded-full bg-[#F5EDD6] px-3 py-1 text-xs">Handwoven</span>
      {authenticity?.silk_mark_certified && (
        <span className="rounded-full bg-[#F5EDD6] px-3 py-1 text-xs">Silk Mark Certified</span>
      )}
      {authenticity?.gi_tag_certified && <span className="rounded-full bg-[#F5EDD6] px-3 py-1 text-xs">GI Tagged</span>}
    </div>
  )
}
