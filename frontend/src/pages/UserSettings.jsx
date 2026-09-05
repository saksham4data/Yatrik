import { useEffect, useState } from 'react'
import axios from 'axios'

export default function UserSettings() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          setError('You must be logged in to view settings.')
          setLoading(false)
          return
        }
        
        const response = await axios.get('/api/profile/', {
          headers: { Authorization: `Token ${token}` }
        })
        setProfile(response.data)
      } catch (err) {
        setError('Failed to fetch profile data.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchProfile()
  }, [])

  if (loading) return <div style={{ padding: '2rem' }}>Loading settings...</div>
  if (error) return <div style={{ padding: '2rem', color: 'red' }}>{error}</div>

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>User Settings</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Username:</label>
          <input type="text" value={profile.username || ''} readOnly style={{ padding: '10px', width: '100%', background: '#eee' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Email:</label>
          <input type="email" value={profile.email || ''} readOnly style={{ padding: '10px', width: '100%', background: '#eee' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Phone:</label>
          <input type="text" defaultValue={profile.phone || ''} style={{ padding: '10px', width: '100%' }} />
        </div>
        <button style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', marginTop: '10px' }}>Save Changes</button>
      </div>
    </div>
  )
}
