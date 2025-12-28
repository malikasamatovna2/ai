import React, { useState } from 'react'
import RecommendationCard from '../components/RecommendationCard'
import api from '../api/client'

export default function Recommendation(){
  const [photo, setPhoto] = useState(null)
  const [eventType, setEventType] = useState('casual')
  const [hairLength, setHairLength] = useState('medium')
  const [maintenance, setMaintenance] = useState('medium')
  const [results, setResults] = useState([])
  const [notes, setNotes] = useState([])

  async function handleSubmit(e){
    e.preventDefault()
    // mock: send photo URL and preferences
    const res = await api.recommendStyle({ photo_url: photo || 'https://placehold.co/300', event_type: eventType, hair_length: hairLength, maintenance })
    setResults(res.styles || [])
    setNotes(res.audit_notes || [])
  }

  return (
    <div className="page recommendation">
      <h1>Get an AI Recommendation</h1>

      <form onSubmit={handleSubmit} className="rec-form">
        <div className="form-row">
          <label>Photo URL</label>
          <input value={photo || ''} onChange={e=>setPhoto(e.target.value)} placeholder="Paste image URL" />
        </div>
        <div className="form-row">
          <label>Event</label>
          <select value={eventType} onChange={e=>setEventType(e.target.value)}>
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
            <option value="wedding">Wedding</option>
            <option value="party">Party</option>
            <option value="interview">Interview</option>
          </select>
        </div>
        <div className="form-row">
          <label>Hair length</label>
          <select value={hairLength} onChange={e=>setHairLength(e.target.value)}>
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </div>
        <div className="form-row">
          <label>Maintenance</label>
          <select value={maintenance} onChange={e=>setMaintenance(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="form-actions">
          <button className="btn btn-primary btn-lg btn-block" type="submit">Get Recommendations</button>
          <button type="button" className="btn btn-ghost btn-lg" onClick={() => { setPhoto(''); setEventType('casual'); setHairLength('medium'); setMaintenance('medium'); setResults([]); setNotes([]); }}>Reset</button>
        </div>
      </form> 

      {notes.length>0 && (
        <div className="warning">{notes.join(' • ')}</div>
      )}

      <div className="rec-grid">
        {results.map((r,i) => (
          <RecommendationCard key={i} image={r.image||'https://placehold.co/300'} name={r.name} confidence={r.confidence||0.8} explain={r.explain||''} onSelect={()=>alert('Selected '+r.name)} />
        ))}
      </div>
    </div>
  )
}
