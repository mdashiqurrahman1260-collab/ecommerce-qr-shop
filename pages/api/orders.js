import { createOrder } from '../../../lib/data'

export default function handler(req, res){
  if (req.method !== 'POST') return res.status(405).end()
  const { amount, currency='BDT' } = req.body
  if (!amount) return res.status(400).json({ error: 'amount required' })
  const order = createOrder({ amount, currency })
  res.status(201).json({ orderId: order.id, checkoutUrl: `/checkout/${order.id}` })
}
