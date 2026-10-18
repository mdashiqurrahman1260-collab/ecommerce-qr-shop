import { getOrder, setQrForOrder } from '../../../../lib/data'

export default function handler(req, res){
  const { id } = req.query
  if (req.method === 'GET'){
    const order = getOrder(id)
    if (!order) return res.status(404).json({ error: 'order not found' })
    // If bank provides a QR URL later, they can update via webhook or admin.
    if (order.qr_code_url){
      return res.json({ qr_code_url: order.qr_code_url, expires_at: order.qr_expires_at || null })
    }
    // Placeholder: generate a data URL QR placeholder image or return a hosted placeholder
    const placeholder = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=ORDER:${order.id}`
    // Save generated QR url so clients see the same
    setQrForOrder(id, placeholder)
    return res.json({ qr_code_url: placeholder, expires_at: null })
  }
  res.status(405).end()
}
