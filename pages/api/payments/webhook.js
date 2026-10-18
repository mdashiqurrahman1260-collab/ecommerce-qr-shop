import { updatePaymentStatus } from '../../../lib/data'
import crypto from 'crypto'

export const config = {
  api: {
    bodyParser: true,
  }
}

export default function handler(req, res){
  if (req.method !== 'POST') return res.status(405).end()
  const signature = (req.headers['x-signature'] || '').toString()
  const secret = process.env.WEBHOOK_SECRET || ''
  const bodyRaw = JSON.stringify(req.body)

  if (secret){
    const h = crypto.createHmac('sha256', secret).update(bodyRaw).digest('hex')
    if (!signature || signature !== h){
      return res.status(401).json({ error: 'invalid signature' })
    }
  }

  const payload = req.body
  const orderId = payload.order_id
  const status = payload.status
  // only allow PAID/FAILED
  if (orderId && status){
    updatePaymentStatus(orderId, payload)
    return res.json({ received: true })
  }
  res.status(400).json({ error: 'invalid payload' })
}
