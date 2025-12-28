import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => res.json({ ok: true }))

app.post('/recommend/style', (req, res) => {
  const { event_type, hair_length } = req.body
  const styles = [] as any[]
  if(event_type === 'formal' || event_type === 'wedding') styles.push({ name: 'Modern Pompadour', confidence: 0.9 })
  if(hair_length === 'short') styles.push({ name: 'Textured Crop', confidence: 0.75 })
  if(styles.length === 0) styles.push({ name: 'Classic Groom', confidence: 0.7 })
  res.json({ styles, audit_notes: [] })
})

app.post('/bookings', (req, res) => {
  const { user_id, salon_id, service_id, start_at, end_at, price_total } = req.body
  if(!user_id || !salon_id || !service_id || !start_at) return res.status(400).json({ message: 'Missing required fields' })

  const start = new Date(start_at)
  if(Number.isNaN(start.getTime())) return res.status(400).json({ message: 'Invalid start_at' })

  // compute end_at if not provided
  let end = new Date(end_at || '')
  if(Number.isNaN(end.getTime())){
    // fallback: add 30 minutes
    end = new Date(start.getTime() + 30*60000)
  }

  const booking = { id: 'bkg_'+Math.random().toString(36).slice(2,8), user_id, salon_id, service_id, start_at: start.toISOString(), end_at: end.toISOString(), price_total: price_total || null, status: 'pending' }

  // TODO: check for overlapping bookings for same stylist/service

  res.status(201).json(booking)
})

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Backend listening on ${port}`))
