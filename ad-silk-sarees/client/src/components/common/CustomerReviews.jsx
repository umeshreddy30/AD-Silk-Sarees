const REVIEWS = [
  { name: 'Meera S.', rating: 5, text: 'The zari work and finishing are stunning. Looks even richer in person.' },
  { name: 'Ananya R.', rating: 5, text: 'Premium feel and authentic weave. Delivery was careful and on time.' },
  { name: 'Priya K.', rating: 4, text: 'Beautiful drape and color. The temple border is exactly what I wanted.' },
  { name: 'Shalini V.', rating: 5, text: 'Excellent quality silk — truly luxury. Will order again for weddings.' },
]

function Stars({ value }) {
  const full = Math.max(0, Math.min(5, Number(value || 0)))
  return (
    <div className="flex gap-1" aria-label={`${full} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <span key={idx} className={idx < full ? 'text-[#C9A84C]' : 'text-[#d8c8b0]'}>★</span>
      ))}
    </div>
  )
}

export default function CustomerReviews() {
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 className="font-serif text-3xl text-[#1A0A0F]">Customer Reviews</h2>
          <p className="mt-1 text-sm text-[#3D2030]">A few words from our customers on craftsmanship and authenticity.</p>
        </div>
        <div className="hidden rounded-full border border-[#C9A84C] bg-[#F5EDD6] px-4 py-2 text-xs font-semibold text-[#6B1C2E] md:block">
          Premium • Handwoven • Trusted
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {REVIEWS.map((review) => (
          <article key={review.name} className="card-surface p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="font-serif text-lg text-[#1A0A0F]">{review.name}</p>
              <Stars value={review.rating} />
            </div>
            <p className="mt-2 text-sm text-[#3D2030]">{review.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

