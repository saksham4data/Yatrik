import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

export default function BusResults() {
  const [searchParams] = useSearchParams()
  const [buses, setBuses] = useState([])
  const [loading, setLoading] = useState(true)

  const source = searchParams.get('source')
  const destination = searchParams.get('destination')

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get(`/api/buses/search/?source=${source}&destination=${destination}`)
        setBuses(response.data.results || response.data)
      } catch (error) {
        console.error('Error fetching buses:', error)
      } finally {
        setLoading(false)
      }
    }

    if (source && destination) {
      fetchBuses()
    } else {
      setLoading(false)
    }
  }, [source, destination])

  return (
    <div style={{ padding: '0 1.5rem', marginTop: '1rem' }}>
      <h1 className="text-h1">Tracking Details</h1>
      <p className="text-subtitle" style={{ marginBottom: '1.5rem' }}>
        Live logistics flow from <strong>{source}</strong> to <strong>{destination}</strong>
      </p>
      
      {loading ? (
        <p className="text-subtitle" style={{ textAlign: 'center', marginTop: '2rem' }}>Loading shipments...</p>
      ) : buses.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {buses.map((bus) => (
            <div key={bus.id} className="glass-card" style={{ position: 'relative' }}>
              
              {/* Top Row: ID and Status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                  <div className="text-subtitle">Bus ID</div>
                  <div style={{ fontWeight: '700', fontSize: '1.25rem' }}>#{bus.bus_number || 'TRK-001'}</div>
                </div>
                <div style={{ background: '#f4f6f8', color: 'var(--text-primary)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.875rem', fontWeight: '500' }}>
                  Available
                </div>
              </div>

              {/* Timeline Flow */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
                {/* Timeline Line */}
                <div style={{ position: 'absolute', left: '11px', top: '24px', bottom: '24px', width: '2px', background: '#e0e0e0', zIndex: 0 }}></div>
                
                {/* Current Location */}
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', zIndex: 1 }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px' }}>
                    <i className="fas fa-check"></i>
                  </div>
                  <div>
                    <div className="text-subtitle">Origin</div>
                    <div style={{ fontWeight: '600' }}>{bus.route_start}</div>
                  </div>
                </div>

                {/* Destination */}
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', zIndex: 1 }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #e0e0e0', background: 'white' }}></div>
                  <div>
                    <div className="text-subtitle">Destination</div>
                    <div style={{ fontWeight: '600' }}>{bus.route_end}</div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #f0f0f0' }}>
                <button className="icon-btn primary" style={{ width: '100%', borderRadius: '12px', padding: '12px', height: 'auto', fontWeight: '600' }}>
                  Book Now
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <i className="fas fa-box-open" style={{ fontSize: '3rem', color: '#ccc', marginBottom: '1rem' }}></i>
          <h3 className="text-h1">No shipments found</h3>
          <p className="text-subtitle">We couldn't find any buses on this route.</p>
        </div>
      )}
    </div>
  )
}
