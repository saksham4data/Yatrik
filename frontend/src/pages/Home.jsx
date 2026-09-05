import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthModal } from '../context/AuthModalContext'
import heroBanner from '../assets/hero_banner.jpg'

export default function Home() {
  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { openLoginModal } = useAuthModal()

  const handleSwap = () => {
    const temp = source
    setSource(destination)
    setDestination(temp)
    setError('')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    
    // Validation
    if (!source.trim() || !destination.trim()) {
      setError('Please fill in both Leaving from and Going to destinations.')
      return
    }

    if (!date) {
      setError('Please select a valid date of journey.')
      return
    }

    // Check if date is in the past
    const selectedDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0) // reset time to start of today
    
    if (selectedDate < today) {
      setError('The selected date cannot be in the past.')
      return
    }

    setError('')
    // Since user isn't logged in, pop open the login modal
    openLoginModal()
  }

  const handleBusClick = () => {
    openLoginModal()
  }

  return (
    <div>
      {/* Full-width Hero Banner */}
      <div style={{ 
        width: '100vw', 
        marginLeft: 'calc(-50vw + 50%)', 
        backgroundImage: `url(${heroBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '450px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'flex-start',
        paddingTop: '60px',
        color: 'white', 
        position: 'relative' 
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 100%)',
          zIndex: 1
        }}></div>
        <h1 className="hero-title">
          India's Safest &amp; Most Reliable Bus Tracking Platform
        </h1>
        <p className="hero-subtitle">
          Track your buses in real-time, anytime, anywhere.
        </p>
      </div>

      {/* Floating Horizontal Search Widget */}
      <div className="search-widget-container" style={{ 
        background: 'var(--card-bg)', 
        borderRadius: '32px', 
        padding: '10px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-soft)',
        marginTop: '-50px',
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '1000px',
        margin: '-50px auto 40px auto',
        border: '1px solid rgba(0,0,0,0.05)'
      }}>
        
        <div className="search-widget-inner" style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
          {/* From */}
          <div className="search-widget-input-group" style={{ display: 'flex', alignItems: 'center', flex: 1, padding: '15px 25px', borderRight: '1px solid #eee' }}>
            <i className="fas fa-bus" style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginRight: '15px' }}></i>
            <input 
              type="text" 
              placeholder="From" 
              value={source}
              onChange={(e) => { setSource(e.target.value); setError(''); }}
              style={{ background: 'transparent', border: 'none', width: '100%', fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>

          {/* Icon Separator */}
          <div 
            onClick={handleSwap}
            className="search-widget-divider" 
            style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 -20px', zIndex: 2, border: '1px solid #eee', cursor: 'pointer', transition: 'transform 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <i className="fas fa-exchange-alt" style={{ color: 'var(--brand-blue)' }}></i>
          </div>

          {/* To */}
          <div className="search-widget-input-group" style={{ display: 'flex', alignItems: 'center', flex: 1, padding: '15px 25px', borderRight: '1px solid #eee' }}>
            <i className="fas fa-bus" style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginRight: '15px' }}></i>
            <input 
              type="text" 
              placeholder="To" 
              value={destination}
              onChange={(e) => { setDestination(e.target.value); setError(''); }}
              style={{ background: 'transparent', border: 'none', width: '100%', fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>

          {/* Date */}
          <div className="search-widget-input-group" style={{ display: 'flex', alignItems: 'center', flex: 1, padding: '15px 25px' }}>
            <i className="fas fa-calendar-alt" style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginRight: '15px' }}></i>
            <input 
              type="date" 
              value={date}
              onChange={(e) => { setDate(e.target.value); setError(''); }}
              style={{ background: 'transparent', border: 'none', width: '100%', fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>
        </div>

        {/* Search Button */}
        <button 
          className="search-btn"
          onClick={handleSearch}
          style={{ 
            background: 'var(--brand-blue)', 
            color: 'white', 
            padding: '0 40px', 
            height: '60px',
            borderRadius: '24px', 
            fontSize: '1.2rem', 
            fontWeight: '700', 
            border: 'none',
            marginLeft: '10px'
          }}>
          Search
        </button>
      </div>
      
      {/* Error Message Display */}
      {error && (
        <div style={{ color: '#d93025', textAlign: 'center', marginTop: '-30px', marginBottom: '20px', fontWeight: '600', fontSize: '1.1rem', background: '#fce8e6', padding: '10px', borderRadius: '8px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', border: '1px solid #fad2cf' }}>
          <i className="fas fa-exclamation-circle" style={{ marginRight: '8px' }}></i>
          {error}
        </div>
      )}

      {/* Popular Routes Section */}
      <div style={{ marginTop: '100px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '40px' }}>Popular Routes</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          
          <div style={{ background: 'var(--card-bg)', borderRadius: '16px', padding: '25px', boxShadow: 'var(--shadow-soft)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer' }}>
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Delhi <i className="fas fa-arrow-right" style={{ fontSize: '0.9rem', margin: '0 8px', color: 'var(--text-secondary)' }}></i> Jaipur</div>
              <div style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Departs 07:15 PM</div>
            </div>
            <i className="fas fa-chevron-right" style={{ color: 'var(--brand-blue)' }}></i>
          </div>

          <div style={{ background: 'var(--card-bg)', borderRadius: '16px', padding: '25px', boxShadow: 'var(--shadow-soft)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer' }}>
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Mumbai <i className="fas fa-arrow-right" style={{ fontSize: '0.9rem', margin: '0 8px', color: 'var(--text-secondary)' }}></i> Pune</div>
              <div style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Departs 12:40 AM</div>
            </div>
            <i className="fas fa-chevron-right" style={{ color: 'var(--brand-blue)' }}></i>
          </div>

          <div style={{ background: 'var(--card-bg)', borderRadius: '16px', padding: '25px', boxShadow: 'var(--shadow-soft)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer' }}>
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Bangalore <i className="fas fa-arrow-right" style={{ fontSize: '0.9rem', margin: '0 8px', color: 'var(--text-secondary)' }}></i> Chennai</div>
              <div style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Departs 09:30 PM</div>
            </div>
            <i className="fas fa-chevron-right" style={{ color: 'var(--brand-blue)' }}></i>
          </div>

        </div>
      </div>

      {/* Why Choose Yatrik Section */}
      <div style={{ marginTop: '120px', marginBottom: '60px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '50px', textAlign: 'center' }}>Why Choose Yatrik?</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          
          <div style={{ background: 'var(--card-bg)', borderRadius: '24px', padding: '40px 30px', textAlign: 'center', boxShadow: 'var(--shadow-soft)', border: '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(0, 86, 179, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
              <i className="fas fa-map-marked-alt" style={{ fontSize: '2rem', color: 'var(--brand-blue)' }}></i>
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '15px' }}>Live Bus Tracking</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Never miss your bus again. Track your vehicle in real-time with pinpoint GPS accuracy directly from your device.
            </p>
          </div>

          <div style={{ background: 'var(--card-bg)', borderRadius: '24px', padding: '40px 30px', textAlign: 'center', boxShadow: 'var(--shadow-soft)', border: '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(0, 86, 179, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
              <i className="fas fa-shield-alt" style={{ fontSize: '2rem', color: 'var(--brand-blue)' }}></i>
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '15px' }}>Safety First</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Share your live location with family and friends. We ensure all registered operators meet strict safety standards.
            </p>
          </div>

          <div style={{ background: 'var(--card-bg)', borderRadius: '24px', padding: '40px 30px', textAlign: 'center', boxShadow: 'var(--shadow-soft)', border: '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(0, 86, 179, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
              <i className="fas fa-bolt" style={{ fontSize: '2rem', color: 'var(--brand-blue)' }}></i>
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '15px' }}>Instant Updates</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Get instant push notifications regarding delays, route changes, or estimated arrival times straight to your phone.
            </p>
          </div>

        </div>
      </div>

      {/* Recent Trackings Section */}
      <div style={{ marginTop: '120px', marginBottom: '120px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700' }}>Recent Trackings</h2>
          <span style={{ color: 'var(--brand-blue)', fontWeight: '600', cursor: 'pointer' }} onClick={() => openLoginModal()}>View All History</span>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          
          <div onClick={handleBusClick} style={{ background: 'var(--card-bg)', borderRadius: '16px', padding: '20px', boxShadow: 'var(--shadow-soft)', border: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer', display: 'flex', gap: '15px' }}>
            <div style={{ background: '#e6f0fa', color: 'var(--brand-blue)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
              <i className="fas fa-bus-alt"></i>
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '4px' }}>RSRTC Express</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '4px' }}>Jaipur ➔ Delhi</div>
              <div style={{ color: '#28a745', fontSize: '0.85rem', fontWeight: '600' }}><i className="fas fa-circle" style={{ fontSize: '0.6rem', marginRight: '4px' }}></i> On Time</div>
            </div>
          </div>

          <div onClick={handleBusClick} style={{ background: 'var(--card-bg)', borderRadius: '16px', padding: '20px', boxShadow: 'var(--shadow-soft)', border: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer', display: 'flex', gap: '15px' }}>
            <div style={{ background: '#e6f0fa', color: 'var(--brand-blue)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
              <i className="fas fa-bus-alt"></i>
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '4px' }}>VRL Travels</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '4px' }}>Mumbai ➔ Pune</div>
              <div style={{ color: '#ffc107', fontSize: '0.85rem', fontWeight: '600' }}><i className="fas fa-circle" style={{ fontSize: '0.6rem', marginRight: '4px' }}></i> Delayed by 15m</div>
            </div>
          </div>

          <div onClick={handleBusClick} style={{ background: 'var(--card-bg)', borderRadius: '16px', padding: '20px', boxShadow: 'var(--shadow-soft)', border: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer', display: 'flex', gap: '15px' }}>
            <div style={{ background: '#e6f0fa', color: 'var(--brand-blue)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
              <i className="fas fa-bus-alt"></i>
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '4px' }}>IntrCity SmartBus</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '4px' }}>Bangalore ➔ Chennai</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '600' }}><i className="fas fa-check-circle" style={{ marginRight: '4px' }}></i> Journey Completed</div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
