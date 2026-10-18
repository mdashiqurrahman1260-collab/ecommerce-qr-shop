import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Checkout() {
  const router = useRouter()
  const { orderId } = router.query
  const [qr, setQr] = useState(null)
  const [status, setStatus] = useState('pending')

  useEffect(() => {
    if (!orderId) return

    async function loadQr(){
      const res = await fetch(`/api/orders/${orderId}/qrcode`)
      if (res.ok) {
        const j = await res.json()
        setQr(j.qr_code_url)
      }
    }

    loadQr()

    let iv = setInterval(async ()=>{
      const s = await fetch(`/api/payments/status?order_id=${orderId}`)
      if (s.ok){
        const j = await s.json()
        setStatus(j.status)
        if (j.status === 'PAID') clearInterval(iv)
      }
    }, 5000)

    return ()=> clearInterval(iv)
  }, [orderId])

  return (
    <main style={{padding:40,fontFamily:'Arial'}}>
      <h2>Checkout: {orderId}</h2>
      <p>Status: <strong>{status}</strong></p>
      {qr ? (
        <div>
          <p>Scan this QR with your mobile banking app:</p>
          <img src={qr} alt="QR Code" style={{width:300,height:300}} />
        </div>
      ) : (
        <p>Loading QR…</p>
      )}
      {status === 'PAID' && <p style={{color:'green'}}>Payment received. Thank you!</p>}
    </main>
  )
}
