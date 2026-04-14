export function openWhatsAppPrefill({ phone, message }) {
  if (!phone) return
  const cleanPhone = String(phone).replace(/[^\d]/g, '')
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
  // Open in a new tab so login redirect still works smoothly.
  window.open(url, '_blank', 'noopener,noreferrer')
}

