export default function ProductImageZoom({ image, alt }) {
  return <img src={image} alt={alt} className="h-[420px] w-full rounded-xl object-cover shadow-md" />
}
