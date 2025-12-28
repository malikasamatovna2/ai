import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { salons, services, categories } from '../data/sampleData'

export default function Landing(){
  const [cat, setCat] = useState('All')
  const featured = cat === 'All' ? services.slice(0,4) : services.filter(s => s.category === cat)

  return (
    <div className="page landing">
      <section className="hero">
        <h1>Find your look. Book your stylist.</h1>
        <p>AI recommendations, dynamic pricing, local salons.</p>
        <Link className="btn btn-primary btn-lg" to="/recommend">Get Recommendation</Link>
      </section>

      <section className="categories">
        <h3>Categories</h3>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          <button className={`btn ${cat==='All' ? 'btn-primary' : 'btn-ghost'}`} onClick={()=>setCat('All')}>All</button>
          {categories.map(c => (
            <button key={c} className={`btn ${cat===c ? 'btn-primary' : 'btn-ghost'}`} onClick={()=>setCat(c)}>{c}</button>
          ))}
        </div>
      </section>

      <section className="salons">
        <h2>Featured services</h2>
        <div className="cards">
          {featured.map(s => (
            <div className="card" key={s.id}>
              <h3>{s.name}</h3>
              <p>{s.duration} min • ${s.price} • {s.category}</p>
              <Link to={`/booking/${s.id}`} className="btn btn-primary">Book</Link>
            </div>
          ))}
        </div>

        <h2 style={{marginTop:24}}>Popular salons</h2>
        <div className="cards">
          {salons.map(sl => (
            <div key={sl.id} className="card">
              <h3>{sl.name}</h3>
              <p>{sl.location}</p>
              <Link to={`/salon/${sl.id}`} className="btn btn-ghost">View</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
