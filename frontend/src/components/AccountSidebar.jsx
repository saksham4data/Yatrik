import React from 'react';
import { useAuthModal } from '../context/AuthModalContext';

export default function AccountSidebar() {
  const { isSidebarOpen, closeSidebar, openLoginModal } = useAuthModal();

  if (!isSidebarOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1040
        }}
        onClick={closeSidebar}
      ></div>

      {/* Sidebar Panel */}
      <div style={{
        position: 'fixed',
        top: 0, right: 0, bottom: 0,
        width: '380px',
        maxWidth: '100vw',
        backgroundColor: '#1a1a1a', /* Dark RedBus-like theme */
        color: '#ffffff',
        zIndex: 1050,
        boxShadow: '-4px 0 15px rgba(0,0,0,0.3)',
        animation: 'slideInRight 0.3s forwards',
        display: 'flex',
        flexDirection: 'column'
      }}>
        
        {/* Header */}
        <div style={{ padding: '20px', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.2rem', margin: 0, fontWeight: '700' }}>Account</h2>
          <button onClick={closeSidebar} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div style={{ overflowY: 'auto', flex: 1 }}>
          {/* Login Action Area */}
          <div style={{ padding: '30px 20px', borderBottom: '1px solid #333' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '25px', lineHeight: '1.4' }}>
              Log in to manage your bookings
            </h3>
            
            <button 
              onClick={() => { openLoginModal(); }}
              style={{
                width: '100%',
                backgroundColor: 'var(--brand-blue)', // Using brand blue instead of RedBus pink
                color: 'white',
                border: 'none',
                padding: '15px 0',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: '700',
                cursor: 'pointer',
                marginBottom: '15px',
                transition: 'opacity 0.2s'
              }}
              onMouseOver={(e) => e.target.style.opacity = '0.9'}
              onMouseOut={(e) => e.target.style.opacity = '1'}
            >
              Log in
            </button>
            
            <p style={{ textAlign: 'center', margin: 0, fontSize: '0.95rem' }}>
              <span style={{ color: '#aaa' }}>Don't have an account? </span>
              <span 
                style={{ color: '#fff', fontWeight: '600', textDecoration: 'underline', cursor: 'pointer' }}
                onClick={() => { openLoginModal(); }} // TBD: handle sign up mode directly in modal if needed
              >
                Sign up
              </span>
            </p>
          </div>

          {/* My Details Section */}
          <div style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '15px', color: '#fff' }}>My details</h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #333', cursor: 'pointer' }} onClick={openLoginModal}>
                <div>
                  <i className="fas fa-map-marked-alt" style={{ width: '30px', color: '#ccc' }}></i>
                  <span style={{ fontSize: '1.05rem' }}>Trackings</span>
                </div>
                <i className="fas fa-chevron-right" style={{ color: '#777', fontSize: '0.9rem' }}></i>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #333', cursor: 'pointer' }} onClick={openLoginModal}>
                <div>
                  <i className="far fa-user" style={{ width: '30px', color: '#ccc' }}></i>
                  <span style={{ fontSize: '1.05rem' }}>Personal information</span>
                </div>
                <i className="fas fa-chevron-right" style={{ color: '#777', fontSize: '0.9rem' }}></i>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
