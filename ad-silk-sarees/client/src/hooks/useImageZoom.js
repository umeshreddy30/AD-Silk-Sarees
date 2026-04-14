import { useState } from 'react'

export function useImageZoom() {
  const [zoomed, setZoomed] = useState(false)
  return { zoomed, setZoomed }
}
