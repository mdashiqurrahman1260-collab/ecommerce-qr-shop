import { getPaymentStatus } from '../../../lib/data'

export default function handler(req, res){
  const { order_id } = req.query
  if (!order_id) return res.status(400).json({ error: 'order_id required' })
  const s = getPaymentStatus(order_id)
  if (!s) return res.json({ status: 'pending' })
  res.json(s)
}
