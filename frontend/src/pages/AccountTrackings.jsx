import React, { useState, useEffect } from 'react';
import { useAuthModal } from '../context/AuthModalContext';
import { useNavigate } from 'react-router-dom';

export default function AccountTrackings() {
  const { user, openLoginModal } = useAuthModal();
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`recent_searches_${user.email}`);
      if (saved) {
        try {
          setRecentSearches(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse history", e);
        }
      } else {
        setRecentSearches([]);
      }
    } else {
      setRecentSearches([]);
    }
  }, [user]);

  const SavedCard = ({ data }) => (
    <div 
      onClick={() => {
        // Simple navigation logic back to search
        navigate('/my_trackings');
      }}
      style={{
      background: 'var(--card-bg)',
      border: '1px solid rgba(0,0,0,0.05)',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: 'var(--shadow-soft)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      cursor: 'pointer',
      transition: 'transform 0.2s'
    }}
    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
    onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(0, 86, 179, 0.1)', color: 'var(--brand-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
          <i className={data.type === 'route' ? "fas fa-map-marker-alt" : "fas fa-bus"}></i>
        </div>
        <div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '3px' }}>
            {data.type === 'route' ? `${data.from} ➔ ${data.to}` : data.busNumber}
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            {data.type === 'route' ? 'Route Search' : 'Vehicle Tracking'}
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span style={{ fontSize: '0.8rem', background: '#eee', padding: '4px 8px', borderRadius: '4px', color: '#555', fontWeight: '600' }}>Recent</span>
        <button style={{ background: 'transparent', border: 'none', color: 'var(--brand-blue)', cursor: 'pointer', fontSize: '1.2rem' }}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );

  return (
    <div className="container" style={{ padding: '40px 20px', minHeight: '80vh', position: 'relative' }}>
      
      <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px' }}>My Trackings</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '40px' }}>
        View and manage your recent searches and saved routes.
      </p>

      {!user ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', background: 'var(--card-bg)', borderRadius: '24px', boxShadow: 'var(--shadow-soft)' }}>
          <i className="fas fa-map-marked-alt" style={{ fontSize: '5rem', color: '#ccc', marginBottom: '25px' }}></i>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '15px' }}>Login to view your history</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '400px', margin: '0 auto 30px auto' }}>
            Access your active trips, view past journey history, and easily track your saved favorite routes.
          </p>
          <button 
            onClick={openLoginModal} 
            style={{
              background: 'var(--brand-blue)',
              color: 'white',
              border: 'none',
              padding: '14px 40px',
              borderRadius: '24px',
              fontSize: '1.1rem',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0, 86, 179, 0.3)'
            }}
          >
            Log In Now
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
          <section>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fas fa-history" style={{ color: 'var(--brand-blue)' }}></i> Recent History
            </h3>
            
            {recentSearches.length === 0 ? (
               <div style={{ padding: '40px', textAlign: 'center', background: 'var(--card-bg)', borderRadius: '16px', color: '#888' }}>
                 No recent searches found. Go to the Track My Bus page to start tracking!
               </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
                {recentSearches.map(t => <SavedCard key={t.id} data={t} />)}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
