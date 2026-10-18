export default function Home() {
  return (
    <main style={{padding:40,fontFamily:'Arial'}}>
      <h1>Welcome to Ecommerce QR Shop (MVP)</h1>
      <p>This is a scaffold. Use the API to create orders and show QR checkout.</p>
      <p>To create a sample order, POST to <code>/api/orders</code> with JSON {"amount":1000, "currency":"BDT"}.</p>
    </main>
  )
}
