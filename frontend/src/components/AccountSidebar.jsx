import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthModal } from '../context/AuthModalContext';

export default function AccountSidebar() {
  const { isSidebarOpen, closeSidebar, openLoginModal, user, logout } = useAuthModal();
  const navigate = useNavigate();

  if (!isSidebarOpen) return null;

  const navigateTo = (path) => {
    closeSidebar();
    navigate(path);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div 
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000,
          animation: 'fadeIn 0.3s'
        }}
        onClick={closeSidebar}
      ></div>

      <div 
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0,
          width: '320px', backgroundColor: '#1a1a1a', zIndex: 1001,
          boxShadow: '-5px 0 15px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column',
          animation: 'slideInRight 0.3s forwards'
        }}
      >
        <div style={{ padding: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={closeSidebar} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        {user ? (
          <>
            <div style={{ padding: '0 20px 20px', borderBottom: '1px solid #333', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', backgroundColor: '#444', borderRadius: '50%', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', overflow: 'hidden' }}>
                {localStorage.getItem(`avatar_${user.email}`) ? (
                  <img src={localStorage.getItem(`avatar_${user.email}`)} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <i className="fas fa-user"></i>
                )}
              </div>
              <h2 style={{ margin: '0 0 5px 0', fontSize: '1.2rem' }}>{user.email.split('@')[0]}</h2>
              <p style={{ margin: 0, color: '#aaa', fontSize: '0.9rem' }}>{user.email}</p>
            </div>

            <div style={{ flex: 1, padding: '20px 0', overflowY: 'auto' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ padding: '15px 20px', cursor: 'pointer', transition: 'background 0.2s' }} onClick={() => navigateTo('/account_trackings')} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#333'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <i className="fas fa-route" style={{ width: '25px', color: 'var(--brand-blue)' }}></i> My Trackings
                </li>
                <li style={{ padding: '15px 20px', cursor: 'pointer', transition: 'background 0.2s' }} onClick={() => navigateTo('/settings')} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#333'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <i className="fas fa-user-edit" style={{ width: '25px', color: '#aaa' }}></i> Profile Details
                </li>
              </ul>
            </div>

            <div style={{ padding: '20px', borderTop: '1px solid #333' }}>
              <button 
                onClick={handleLogout}
                style={{ width: '100%', padding: '12px', background: '#333', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </div>
          </>
        ) : (
          <div style={{ padding: '40px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <div style={{ width: '80px', height: '80px', backgroundColor: '#333', borderRadius: '50%', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', color: '#555' }}>
              <i className="fas fa-user-lock"></i>
            </div>
            <h3 style={{ marginBottom: '10px' }}>Not Logged In</h3>
            <p style={{ color: '#aaa', marginBottom: '30px', fontSize: '0.9rem' }}>Log in to save your favorite routes and access your tracking history.</p>
            <button 
              onClick={openLoginModal}
              style={{ padding: '12px 30px', background: 'var(--brand-blue)', color: '#fff', border: 'none', borderRadius: '24px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)' }}>
              Login / Sign Up
            </button>
          </div>
        )}
      </div>
    </>
  );
}
