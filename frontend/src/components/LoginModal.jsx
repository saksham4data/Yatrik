import React, { useState } from 'react';
import { useAuthModal } from '../context/AuthModalContext';

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal } = useAuthModal();
  
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [signUpStep, setSignUpStep] = useState(1); // 1: Details, 2: OTP, 3: Password
  
  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Signup State
  const [suName, setSuName] = useState('');
  const [suAge, setSuAge] = useState('');
  const [suSex, setSuSex] = useState('');
  const [suMobile, setSuMobile] = useState('');
  const [suEmail, setSuEmail] = useState('');
  const [suOtp, setSuOtp] = useState('');
  const [suPassword, setSuPassword] = useState('');
  const [suConfirmPassword, setSuConfirmPassword] = useState('');

  if (!isLoginModalOpen) return null;

  const handleToggleMode = () => {
    setIsSignUpMode(!isSignUpMode);
    setSignUpStep(1); // Reset steps when toggling
  };

  const renderLoginForm = () => (
    <>
      {/* Email Input */}
      <div style={{ display: 'flex', border: '1px solid #444', borderRadius: '8px', overflow: 'hidden', marginBottom: '15px' }}>
        <div style={{ padding: '15px', background: '#2a2a2a', borderRight: '1px solid #444', display: 'flex', alignItems: 'center' }}>
          <i className="fas fa-envelope" style={{ color: '#ccc', width: '16px', textAlign: 'center' }}></i>
        </div>
        <input 
          type="email" 
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ flex: 1, background: 'transparent', border: 'none', padding: '15px', color: 'white', fontSize: '1rem', outline: 'none' }}
        />
      </div>

      {/* Password Input */}
      <div style={{ display: 'flex', border: '1px solid #444', borderRadius: '8px', overflow: 'hidden', marginBottom: '20px' }}>
        <div style={{ padding: '15px', background: '#2a2a2a', borderRight: '1px solid #444', display: 'flex', alignItems: 'center' }}>
          <i className="fas fa-lock" style={{ color: '#ccc', width: '16px', textAlign: 'center' }}></i>
        </div>
        <input 
          type="password" 
          placeholder="Password (Max 6 chars)"
          maxLength="6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ flex: 1, background: 'transparent', border: 'none', padding: '15px', color: 'white', fontSize: '1rem', outline: 'none' }}
        />
      </div>

      {/* Recaptcha Placeholder */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '25px' }}>
        <div style={{ background: '#111', border: '1px solid #333', padding: '10px 15px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '180px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', border: '2px solid #555', borderRadius: '3px', background: '#222' }}></div>
            <span style={{ fontSize: '0.8rem', color: '#ccc' }}>I'm not a robot</span>
          </div>
          <i className="fas fa-sync-alt" style={{ color: '#888', fontSize: '0.9rem' }}></i>
        </div>
      </div>

      {/* Actions */}
      <button style={{
        width: '100%', backgroundColor: '#444', color: 'white', border: 'none', padding: '16px 0',
        borderRadius: '24px', fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer', marginBottom: '15px'
      }}>
        Continue
      </button>

      {/* Sign in with Google */}
      <div style={{ textAlign: 'center', marginBottom: '15px', position: 'relative' }}>
        <span style={{ background: '#222', padding: '0 10px', color: '#888', fontSize: '0.9rem', position: 'relative', zIndex: 1 }}>or</span>
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: '#444', zIndex: 0 }}></div>
      </div>

      <button style={{
        width: '100%', backgroundColor: '#4285F4', color: 'white', border: 'none', padding: '12px 0',
        borderRadius: '4px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', display: 'flex',
        alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px'
      }}>
        <i className="fab fa-google"></i> Sign in with Google
      </button>
    </>
  );

  const renderSignUpStep1 = () => (
    <>
      <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '5px' }}>Create your account</h3>
      <p style={{ color: '#aaa', marginBottom: '20px', fontSize: '0.9rem' }}>Step 1 of 3: Personal Details</p>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <input 
          type="text" placeholder="Full Name" value={suName} onChange={(e) => setSuName(e.target.value)}
          style={{ flex: 1, background: 'transparent', border: '1px solid #444', borderRadius: '8px', padding: '12px 15px', color: 'white', fontSize: '1rem', outline: 'none' }}
        />
        <input 
          type="number" placeholder="Age" value={suAge} onChange={(e) => setSuAge(e.target.value)}
          style={{ width: '70px', background: 'transparent', border: '1px solid #444', borderRadius: '8px', padding: '12px 10px', color: 'white', fontSize: '1rem', outline: 'none', textAlign: 'center' }}
        />
        <select 
          value={suSex} onChange={(e) => setSuSex(e.target.value)}
          style={{ width: '110px', background: '#222', border: '1px solid #444', borderRadius: '8px', padding: '12px 10px', color: suSex ? 'white' : '#aaa', fontSize: '1rem', outline: 'none' }}
        >
          <option value="" disabled>Sex</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      
      <input 
        type="email" placeholder="Email Address" value={suEmail} onChange={(e) => setSuEmail(e.target.value)}
        style={{ width: '100%', background: 'transparent', border: '1px solid #444', borderRadius: '8px', padding: '12px 15px', color: 'white', fontSize: '1rem', outline: 'none', marginBottom: '25px' }}
      />

      <button onClick={() => setSignUpStep(2)} style={{
        width: '100%', backgroundColor: 'var(--brand-blue)', color: 'white', border: 'none', padding: '14px 0',
        borderRadius: '24px', fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer', marginBottom: '10px'
      }}>
        Verify Details
      </button>
    </>
  );

  const renderSignUpStep2 = () => (
    <>
      <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '5px' }}>Verify your identity</h3>
      <p style={{ color: '#aaa', marginBottom: '20px', fontSize: '0.9rem' }}>Step 2 of 3: Enter the OTP sent to your email</p>
      
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <input 
          type="text" placeholder="Enter 6-digit OTP" maxLength="6" value={suOtp} onChange={(e) => setSuOtp(e.target.value)}
          style={{ width: '80%', background: 'transparent', border: '1px solid var(--brand-blue)', borderRadius: '8px', padding: '15px', color: 'white', fontSize: '1.2rem', outline: 'none', textAlign: 'center', letterSpacing: '4px' }}
        />
      </div>

      <button onClick={() => setSignUpStep(3)} style={{
        width: '100%', backgroundColor: 'var(--brand-blue)', color: 'white', border: 'none', padding: '16px 0',
        borderRadius: '24px', fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer', marginBottom: '20px'
      }}>
        Submit OTP
      </button>
      
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <span style={{ color: 'var(--brand-blue)', cursor: 'pointer', fontSize: '0.9rem' }} onClick={() => setSignUpStep(1)}>
          Edit Details
        </span>
      </div>
    </>
  );

  const renderSignUpStep3 = () => (
    <>
      <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '5px' }}>Secure your account</h3>
      <p style={{ color: '#aaa', marginBottom: '20px', fontSize: '0.9rem' }}>Step 3 of 3: Set your password (Max 6 chars)</p>
      
      <input 
        type="password" placeholder="Password" maxLength="6" value={suPassword} onChange={(e) => setSuPassword(e.target.value)}
        style={{ width: '100%', background: 'transparent', border: '1px solid #444', borderRadius: '8px', padding: '15px', color: 'white', fontSize: '1rem', outline: 'none', marginBottom: '15px' }}
      />
      
      <input 
        type="password" placeholder="Confirm Password" maxLength="6" value={suConfirmPassword} onChange={(e) => setSuConfirmPassword(e.target.value)}
        style={{ width: '100%', background: 'transparent', border: '1px solid #444', borderRadius: '8px', padding: '15px', color: 'white', fontSize: '1rem', outline: 'none', marginBottom: '25px' }}
      />

      <button style={{
        width: '100%', backgroundColor: '#28a745', color: 'white', border: 'none', padding: '16px 0',
        borderRadius: '24px', fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer', marginBottom: '20px'
      }}>
        Complete Registration
      </button>
    </>
  );

  return (
    <>
      {/* Backdrop */}
      <div 
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 1100,
          display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.2s'
        }}
      >
        {/* Modal Container */}
        <div style={{
          backgroundColor: '#222222', width: '100%', maxWidth: '500px',
          borderRadius: '12px', color: '#ffffff', boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          overflow: 'hidden', display: 'flex', flexDirection: 'column'
        }}>
          
          {/* Header */}
          <div style={{ padding: '20px', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.2rem', margin: 0, fontWeight: '700' }}>
              {isSignUpMode ? 'Sign up' : 'Login'}
            </h2>
            <button onClick={closeLoginModal} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: '30px', maxHeight: '75vh', overflowY: 'auto' }}>
            
            {/* Conditional Rendering based on Mode and Step */}
            {!isSignUpMode ? renderLoginForm() : (
              signUpStep === 1 ? renderSignUpStep1() :
              signUpStep === 2 ? renderSignUpStep2() :
              renderSignUpStep3()
            )}

            {/* Toggle Mode Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', marginTop: '10px' }}>
              {!isSignUpMode && (
                <span style={{ color: 'var(--brand-blue)', cursor: 'pointer' }}>Forgot password?</span>
              )}
              
              <span style={{ color: '#ccc', marginLeft: isSignUpMode ? 'auto' : 0 }}>
                {isSignUpMode ? 'Already have an account? ' : 'New here? '}
                <span 
                  onClick={handleToggleMode}
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
