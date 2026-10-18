// Simple in-memory data store for scaffold/demo purposes
import { v4 as uuidv4 } from 'uuid'

const orders = new Map()
const payments = new Map()

export function createOrder({ amount, currency='BDT' }){
  const id = uuidv4()
  const order = {
    id,
    amount,
    currency,
    status: 'pending',
    created_at: new Date().toISOString()
  }
  orders.set(id, order)
  return order
}

export function getOrder(id){
  return orders.get(id)
}

export function setQrForOrder(id, qr_url){
  const order = orders.get(id)
  if (!order) return null
  order.qr_code_url = qr_url
  orders.set(id, order)
  return order
}

export function updatePaymentStatus(orderId, payload){
  const order = orders.get(orderId)
  if (!order) return null
  const p = {
    id: uuidv4(),
    order_id: orderId,
    amount: payload.amount || order.amount,
    currency: payload.currency || order.currency,
    bank_transaction_id: payload.bank_transaction_id || null,
    status: payload.status,
    payload,
    updated_at: new Date().toISOString()
  }
  payments.set(orderId, p)
  if (payload.status === 'PAID'){
    order.status = 'paid'
    order.paid_at = payload.paid_at || new Date().toISOString()
    orders.set(orderId, order)
  }
  return p
}

export function getPaymentStatus(orderId){
  const p = payments.get(orderId)
  if (!p) return null
  return { status: p.status, bank_transaction_id: p.bank_transaction_id, paid_at: p.updated_at }
}
