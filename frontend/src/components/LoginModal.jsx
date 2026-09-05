import React, { useState } from 'react';
import { useAuthModal } from '../context/AuthModalContext';

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal } = useAuthModal();
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [email, setEmail] = useState('');

  if (!isLoginModalOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeIn 0.2s'
        }}
      >
        {/* Modal Container */}
        <div style={{
          backgroundColor: '#222222', // Dark background like RedBus modal
          width: '100%',
          maxWidth: '500px',
          borderRadius: '12px',
          color: '#ffffff',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          
          {/* Header */}
          <div style={{ padding: '20px', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.2rem', margin: 0, fontWeight: '700' }}>
              {isSignUpMode ? 'Sign up to get started' : 'Login to get exciting offers'}
            </h2>
            <button onClick={closeLoginModal} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: '30px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '20px' }}>
              What's your email?
            </h3>
            
            {/* Input Group */}
            <div style={{ 
              display: 'flex', 
              border: '1px solid #444', 
              borderRadius: '8px', 
              overflow: 'hidden',
              marginBottom: '20px'
            }}>
              <div style={{ padding: '15px', background: '#2a2a2a', borderRight: '1px solid #444', display: 'flex', alignItems: 'center' }}>
                <i className="fas fa-envelope" style={{ color: '#ccc' }}></i>
              </div>
              <input 
                type="email" 
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  padding: '15px',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Recaptcha Placeholder (Simulated) */}
            <div style={{ background: '#111', border: '1px solid #333', padding: '15px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', width: '300px', margin: '0 auto 25px auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '25px', height: '25px', border: '2px solid #555', borderRadius: '3px', background: '#222' }}></div>
                <span style={{ fontSize: '0.9rem' }}>I'm not a robot</span>
              </div>
              <i className="fas fa-sync-alt" style={{ color: '#888' }}></i>
            </div>

            {/* Actions */}
            <button style={{
              width: '100%',
              backgroundColor: '#444', // RedBus uses a muted color until filled, but we'll make it static for now
              color: 'white',
              border: 'none',
              padding: '16px 0',
              borderRadius: '24px',
              fontSize: '1.1rem',
              fontWeight: '700',
              cursor: 'pointer',
              marginBottom: '15px'
            }}>
              Continue
            </button>

            {/* Sign in with Google */}
            <div style={{ textAlign: 'center', marginBottom: '15px', position: 'relative' }}>
              <span style={{ background: '#222', padding: '0 10px', color: '#888', fontSize: '0.9rem', position: 'relative', zIndex: 1 }}>or</span>
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: '#444', zIndex: 0 }}></div>
            </div>

            <button style={{
              width: '100%',
              backgroundColor: '#4285F4',
              color: 'white',
              border: 'none',
              padding: '12px 0',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '20px'
            }}>
              <i className="fab fa-google"></i> Sign in with Google
            </button>

            {/* Forgot Password / Toggle Mode */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
              {!isSignUpMode && (
                <span style={{ color: 'var(--brand-blue)', cursor: 'pointer' }}>Forgot password?</span>
              )}
              
              <span style={{ color: '#ccc', marginLeft: isSignUpMode ? 'auto' : 0 }}>
                {isSignUpMode ? 'Already have an account? ' : 'New here? '}
                <span 
                  onClick={() => setIsSignUpMode(!isSignUpMode)}
                  style={{ color: 'var(--brand-blue)', cursor: 'pointer', fontWeight: '600' }}
                >
                  {isSignUpMode ? 'Log in' : 'Sign up'}
                </span>
              </span>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
