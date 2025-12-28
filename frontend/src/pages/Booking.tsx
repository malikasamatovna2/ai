import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { services } from '../data/sampleData'

export default function Booking(){
  const { serviceId } = useParams()
  const selectedService = services.find(s => s.id === serviceId) || null

  // default date: today, default time: next full hour
  const today = new Date()
  const pad = (n:number)=> String(n).padStart(2,'0')
  const defaultDate = today.toISOString().slice(0,10)
  const defaultTime = pad((today.getHours()+1)%24) + ':00'

  const [date, setDate] = useState(defaultDate)
  const [time, setTime] = useState(defaultTime)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleConfirm(){
    setError(null)
    if(!selectedService) return setError('Please select a service first')
    if(!date || !time) return setError('Please select both date and time')

    const startAt = `${date}T${time}:00Z`
    // validate startAt
    const startDate = new Date(startAt)
    if(Number.isNaN(startDate.getTime())) return setError('Invalid date/time selected')

    // compute end_at by adding service duration
    const endDate = new Date(startDate.getTime() + (selectedService.duration || 30) * 60000)
    const payload = { user_id: 'user_demo', salon_id: selectedService.salon_id, service_id: selectedService.id, start_at: startAt, end_at: endDate.toISOString(), price_total: selectedService.price }

    try{
      // POST to backend if available
      const res = await fetch('http://localhost:4000/bookings', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) })
      if(!res.ok){
        const err = await res.json().catch(()=>({message:'Unknown error'}))
        return setError(err.message || 'Failed to create booking')
      }
      const body = await res.json()
      setResult(body)
    }catch(e:any){
      // fallback to local mock if backend not available
      const booking = { id: 'bkg_'+Math.random().toString(36).slice(2,8), ...payload, status: 'pending' }
      setResult(booking)
    }
  }

  if(!selectedService){
    return (
      <div className="page booking">
        <h1>Select a service to book</h1>
        <p>Please choose a service from the list below:</p>
        <div className="rec-grid">
          {services.map(s => (
            <div key={s.id} className="card">
              <h4>{s.name}</h4>
              <div className="muted">{s.duration} min • ${s.price} • {s.category}</div>
              <Link to={`/booking/${s.id}`} className="btn btn-primary btn-lg" style={{marginTop:12}}>Book {s.name}</Link>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="page booking">
      <h1>Booking — {selectedService.name}</h1>
      <div className="muted">Duration: {selectedService.duration} min • Price: ${selectedService.price}</div>

      {error && <div className="warning">{error}</div>}

      <div className="form-row">
        <label>Date</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Time</label>
        <input type="time" value={time} onChange={e => setTime(e.target.value)} />
      </div>

      <div className="form-actions">
        <button className="btn btn-primary btn-lg btn-block" onClick={handleConfirm}>Confirm Booking</button>
        <Link to={`/salon/${selectedService.salon_id}`} className="btn btn-ghost btn-lg">Back to Salon</Link>
      </div>

      {result && (
        <div className="notice">
          <strong>Booking created:</strong>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
