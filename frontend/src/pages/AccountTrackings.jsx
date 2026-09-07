import React, { useState } from 'react';

export default function AccountTrackings() {
  const [isSimulatedLoggedIn, setIsSimulatedLoggedIn] = useState(false);

  // Mock Data
  const currentTrackings = [
    { id: 1, route: "Delhi ➔ Jaipur", vehicleNo: "RJ-14-PD-1234", operator: "RSRTC Volo", status: "On Time", lastUpdate: "2 mins ago", date: "Today" }
  ];

  const pastTrackings = [
    { id: 2, route: "Mumbai ➔ Pune", vehicleNo: "MH-12-AB-9876", operator: "MSRTC Shivneri", status: "Completed", lastUpdate: "3 days ago", date: "03 Sep 2026" },
    { id: 3, route: "Lucknow ➔ Kanpur", vehicleNo: "UP-32-XY-5555", operator: "UPSRTC Janrath", status: "Completed", lastUpdate: "1 week ago", date: "30 Aug 2026" }
  ];

  const savedTrackings = [
    { id: 4, type: "Route", name: "Daily Commute", detail: "Noida ➔ Gurgaon", tag: "Work" },
    { id: 5, type: "Vehicle", name: "Favorite Bus", detail: "HR-55-CD-1111", tag: "Volvo A/C" }
  ];

  // Helper component for tracking cards
  const TrackingCard = ({ data, isPast }) => (
    <div style={{
      background: 'var(--card-bg)',
      border: '1px solid rgba(0,0,0,0.05)',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: 'var(--shadow-soft)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative side accent */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: isPast ? '#888' : '#28a745' }}></div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
        <div>
          <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '5px' }}>{data.route}</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            <i className="fas fa-bus" style={{ marginRight: '5px' }}></i> {data.operator} | {data.vehicleNo}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ 
            display: 'inline-block', 
            padding: '4px 10px', 
            borderRadius: '20px', 
            fontSize: '0.8rem', 
            fontWeight: '600', 
            background: isPast ? 'rgba(0,0,0,0.05)' : 'rgba(40, 167, 69, 0.1)', 
            color: isPast ? 'var(--text-secondary)' : '#28a745' 
          }}>
            {data.status}
          </span>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: '5px 0 0 0' }}>{data.date}</p>
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '15px', marginTop: '15px' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <i className="far fa-clock" style={{ marginRight: '5px' }}></i> Last updated {data.lastUpdate}
        </span>
        <button style={{
          background: isPast ? 'transparent' : 'var(--brand-blue)',
          border: isPast ? '1px solid var(--brand-blue)' : 'none',
          color: isPast ? 'var(--brand-blue)' : 'white',
          padding: '8px 20px',
          borderRadius: '8px',
          fontWeight: '600',
          cursor: 'pointer',
          fontSize: '0.9rem'
        }}>
          {isPast ? 'Track Again' : 'View Live'}
        </button>
      </div>
    </div>
  );

  const SavedCard = ({ data }) => (
    <div style={{
      background: 'var(--card-bg)',
      border: '1px solid rgba(0,0,0,0.05)',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: 'var(--shadow-soft)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(0, 86, 179, 0.1)', color: 'var(--brand-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
          <i className={data.type === 'Route' ? "fas fa-map-marker-alt" : "fas fa-bus"}></i>
        </div>
        <div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '3px' }}>{data.name}</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>{data.detail}</p>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span style={{ fontSize: '0.8rem', background: '#eee', padding: '4px 8px', borderRadius: '4px', color: '#555', fontWeight: '600' }}>{data.tag}</span>
        <button style={{ background: 'transparent', border: 'none', color: 'var(--brand-blue)', cursor: 'pointer', fontSize: '1.2rem' }}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );

  return (
    <div className="container" style={{ padding: '40px 20px', minHeight: '80vh', position: 'relative' }}>
      
      {/* 🔴 TEMPORARY DEBUG TOGGLE 🔴 */}
      <button 
        onClick={() => setIsSimulatedLoggedIn(!isSimulatedLoggedIn)}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: '#ffc107',
          color: '#000',
          border: 'none',
          padding: '8px 15px',
          borderRadius: '4px',
          fontWeight: 'bold',
          cursor: 'pointer',
          zIndex: 100,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
      >
        <i className="fas fa-bug"></i> Toggle UI State (Currently: {isSimulatedLoggedIn ? 'Logged In' : 'Logged Out'})
      </button>

      <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px' }}>Track My Bus</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '40px' }}>
        View and manage your active, past, and saved trackings.
      </p>

      {!isSimulatedLoggedIn ? (
        // ----------------------------------------
        // LOGGED OUT STATE
        // ----------------------------------------
        <div style={{ textAlign: 'center', padding: '80px 20px', background: 'var(--card-bg)', borderRadius: '24px', boxShadow: 'var(--shadow-soft)' }}>
          <i className="fas fa-map-marked-alt" style={{ fontSize: '5rem', color: '#ccc', marginBottom: '25px' }}></i>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '15px' }}>Login to track buses</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '400px', margin: '0 auto 30px auto' }}>
            Access your active trips, view past journey history, and easily track your saved favorite routes.
          </p>
          <button 
            onClick={() => setIsSimulatedLoggedIn(true)} 
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

        // ----------------------------------------
        // LOGGED IN STATE
        // ----------------------------------------
        <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
          
          {/* Current Trackings Section */}
          <section>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fas fa-satellite-dish" style={{ color: '#28a745' }}></i> Current Tracking
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
              {currentTrackings.map(t => <TrackingCard key={t.id} data={t} isPast={false} />)}
            </div>
          </section>

          {/* Past Trackings Section */}
          <section>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fas fa-history" style={{ color: 'var(--text-secondary)' }}></i> Past Trackings
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
              {pastTrackings.map(t => <TrackingCard key={t.id} data={t} isPast={true} />)}
            </div>
          </section>

          {/* Saved Trackings Section */}
          <section>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fas fa-bookmark" style={{ color: 'var(--brand-blue)' }}></i> Saved Routes & Buses
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
              {savedTrackings.map(t => <SavedCard key={t.id} data={t} />)}
            </div>
          </section>

        </div>
      )}

    </div>
  );
}
