import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Landing from './pages/Landing'
import Salon from './pages/Salon'
import Booking from './pages/Booking'
import Recommendation from './pages/Recommendation'

export default function App(){
  return (
    <div className="app-root">
      <header className="site-header">
        <Link to="/" className="logo">StylistMatch</Link>
        <nav>
          <Link to="/recommend">Recommend</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/salon/:id" element={<Salon/>} />
          <Route path="/booking" element={<Booking/>} />
          <Route path="/booking/:serviceId" element={<Booking/>} />
          <Route path="/recommend" element={<Recommendation/>} />
        </Routes>
      </main>

      <footer className="site-footer">© StylistMatch</footer>
    </div>
  )
}
