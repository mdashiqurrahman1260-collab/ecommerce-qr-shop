# Ecommerce QR Shop (MVP)

This repository is a scaffolded Next.js MVP for an e-commerce app with a QR payment option and webhook endpoints so a bank system can integrate later.

Key features in this scaffold:
- Create Order API
- QR code endpoint (placeholder)
- Webhook endpoint for bank callbacks with HMAC verification placeholder
- Checkout page that shows a QR image and polls payment status
- Simple in-memory data store (replace with real DB for production)

Environment

Create a `.env.local` with the following values (do NOT commit secrets):

WEBHOOK_SECRET=your_shared_secret_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000

Run locally

1. npm install
2. npm run dev
3. Open http://localhost:3000

Webhook integration guide

- Webhook URL: POST ${NEXT_PUBLIC_BASE_URL:-http://localhost:3000}/api/payments/webhook
- Headers: `x-signature` = HMAC-SHA256 of the raw JSON body using `WEBHOOK_SECRET`
- Body example:
  {
    "order_id": "ORD-20261018-0001",
    "amount": 1200.00,
    "currency": "BDT",
    "bank_transaction_id": "BNK-TRX-98765",
    "status": "PAID",
    "paid_at": "2026-10-18T12:34:56Z"
  }

Notes

- This is a starter scaffold. Replace the in-memory store (`lib/data.js`) with a real database (Postgres/MongoDB) before production.
- Do not put secrets in chat. Use environment variables or GitHub Secrets.
