import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { services, salons } from '../data/sampleData'

export default function Salon(){
  const { id } = useParams()
  const salon = salons.find(s => s.id === id) || salons[0]
  const salonServices = services.filter(s => s.salon_id === salon.id)
  const [filter, setFilter] = useState('All')

  const visibleServices = filter === 'All' ? salonServices : salonServices.filter(s => s.category === filter)

  return (
    <div className="page salon">
      <header className="salon-header">
        <h1>{salon.name}</h1>
        <p>{salon.location} • Rating {salon.rating}</p>
      </header>

      <section className="service-filters">
        <button className={`btn ${filter==='All' ? 'btn-primary' : 'btn-ghost'}`} onClick={()=>setFilter('All')}>All</button>
        {Array.from(new Set(salonServices.map(s=>s.category))).map(cat => (
          <button key={cat} className={`btn ${filter===cat ? 'btn-primary' : 'btn-ghost'}`} onClick={()=>setFilter(cat)}>{cat}</button>
        ))}
      </section>

      <section className="services">
        <h2>Services</h2>
        {visibleServices.map(s => (
          <div key={s.id} className="service-card">
            <div>
              <strong>{s.name}</strong>
              <div className="muted">{s.duration} min • <span className="tag">{s.category}</span></div>
            </div>
            <div className="service-actions">
              <div className="price">${s.price}</div>
              <div className="service-buttons">
                <Link to={`/booking/${s.id}`} className="btn btn-primary btn-lg">Book</Link>
                <Link to={`/salon/${salon.id}`} className="btn btn-ghost btn-lg">Details</Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
