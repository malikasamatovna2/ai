import React, { useState } from 'react'
import { useLocation, useParams, Link } from 'react-router-dom'
import api from '../api/client'
import { services } from '../data/sampleData'

export default function Booking(){
  const { state } = useLocation()
  const { serviceId } = useParams()
  const selectedService = services.find(s => s.id === serviceId) || state?.service || null

  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [result, setResult] = useState(null)

  async function handleConfirm(){
    if(!selectedService) return alert('Please select a service first')
    const startAt = `${date}T${time}:00Z`
    const payload = { user_id: 'user_demo', salon_id: selectedService.salon_id, service_id: selectedService.id, start_at: startAt }
    const res = await api.createBooking(payload)
    setResult(res)
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
