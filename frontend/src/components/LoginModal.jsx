import React, { useState } from 'react';
import { useAuthModal } from '../context/AuthModalContext';
import { supabase } from '../supabaseClient';

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal } = useAuthModal();
  
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [signUpStep, setSignUpStep] = useState(1); // 1: Details, 2: OTP, 3: Password
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Password Visibility State
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Signup State
  const [suName, setSuName] = useState('');
  const [suAge, setSuAge] = useState('');
  const [suSex, setSuSex] = useState('');
  const [suEmail, setSuEmail] = useState('');
  
  // OTP State (Simulated)
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [suOtp, setSuOtp] = useState('');

  // Password State
  const [suPassword, setSuPassword] = useState('');
  const [suConfirmPassword, setSuConfirmPassword] = useState('');

  if (!isLoginModalOpen) return null;

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setSuName('');
    setSuAge('');
    setSuSex('');
    setSuEmail('');
    setSuOtp('');
    setSuPassword('');
    setSuConfirmPassword('');
    setSignUpStep(1);
    setErrorMsg('');
  };

  const handleClose = () => {
    resetForm();
    closeLoginModal();
  };

  const handleToggleMode = () => {
    setIsSignUpMode(!isSignUpMode);
    setSignUpStep(1);
    setErrorMsg('');
  };

  const handleLogin = async () => {
    setErrorMsg('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg("Invalid login credentials. Please try again.");
    } else {
      handleClose();
    }
    setLoading(false);
  };

  const handleSendOtp = () => {
    if (!suName || !suAge || !suSex || !suEmail) {
      setErrorMsg("Please fill all details");
      return;
    }
    setErrorMsg('');
    // Simulate OTP generation
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    // Display OTP as a popup message (as requested by user)
    alert(`Your Simulated OTP is: ${otp}\n\n(In production, this would be emailed to ${suEmail})`);
    setSignUpStep(2);
  };

  const handleVerifyOtp = () => {
    if (suOtp !== generatedOtp) {
      setErrorMsg("Invalid OTP. Please try again.");
      return;
    }
    setErrorMsg('');
    setSignUpStep(3);
  };

  const handleSignup = async () => {
    if (suPassword !== suConfirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }
    
    setErrorMsg('');
    setLoading(true);

    try {
      // 1. Create Supabase Auth User
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: suEmail,
        password: suPassword,
      });

      if (signUpError) throw signUpError;

      // 2. Insert into passenger_profiles
      if (data.user) {
        const { error: profileError } = await supabase.from('passenger_profiles').insert({
          user_id: data.user.id,
          email: suEmail,
          // Extract name parts if needed, or assume full name mapping 
          // (Backend schema has email, address, phone. We'll skip missing ones for now)
        });
        
        if (profileError) {
          console.error("Profile creation error:", profileError);
          // Don't block login if profile fails slightly, but log it
        }
      }

      alert("Signup successful! You are now logged in.");
      handleClose();
    } catch (err) {
      setErrorMsg(err.message || "An error occurred during signup.");
    } finally {
      setLoading(false);
    }
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
          type={showLoginPassword ? "text" : "password"} 
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ flex: 1, background: 'transparent', border: 'none', padding: '15px', color: 'white', fontSize: '1rem', outline: 'none' }}
        />
        <div 
          onClick={() => setShowLoginPassword(!showLoginPassword)}
          style={{ padding: '15px', background: 'transparent', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        >
          <i className={`fas ${showLoginPassword ? 'fa-eye-slash' : 'fa-eye'}`} style={{ color: '#888' }}></i>
        </div>
      </div>

      {errorMsg && <div style={{ color: '#ff4d4f', marginBottom: '15px', fontSize: '0.9rem', textAlign: 'center' }}>{errorMsg}</div>}

      {/* Actions */}
      <button 
        onClick={handleLogin}
        disabled={loading}
        style={{
          width: '100%', backgroundColor: '#444', color: 'white', border: 'none', padding: '16px 0',
          borderRadius: '24px', fontSize: '1.1rem', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer', marginBottom: '15px',
          opacity: loading ? 0.7 : 1
        }}>
        {loading ? 'Logging in...' : 'Continue'}
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

      {errorMsg && <div style={{ color: '#ff4d4f', marginBottom: '15px', fontSize: '0.9rem', textAlign: 'center' }}>{errorMsg}</div>}

      <button onClick={handleSendOtp} style={{
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
      <p style={{ color: '#aaa', marginBottom: '20px', fontSize: '0.9rem' }}>Step 2 of 3: Enter the simulated OTP shown in the popup</p>
      
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <input 
          type="text" placeholder="Enter 6-digit OTP" maxLength="6" value={suOtp} onChange={(e) => setSuOtp(e.target.value)}
          style={{ width: '80%', background: 'transparent', border: '1px solid var(--brand-blue)', borderRadius: '8px', padding: '15px', color: 'white', fontSize: '1.2rem', outline: 'none', textAlign: 'center', letterSpacing: '4px' }}
        />
      </div>

      {errorMsg && <div style={{ color: '#ff4d4f', marginBottom: '15px', fontSize: '0.9rem', textAlign: 'center' }}>{errorMsg}</div>}

      <button onClick={handleVerifyOtp} style={{
        width: '100%', backgroundColor: 'var(--brand-blue)', color: 'white', border: 'none', padding: '16px 0',
        borderRadius: '24px', fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer', marginBottom: '20px'
      }}>
        Submit OTP
      </button>
      
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <span style={{ color: 'var(--brand-blue)', cursor: 'pointer', fontSize: '0.9rem' }} onClick={() => { setSignUpStep(1); setErrorMsg(''); }}>
          Edit Details
        </span>
      </div>
    </>
  );

  const renderSignUpStep3 = () => (
    <>
      <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '5px' }}>Secure your account</h3>
      <p style={{ color: '#aaa', marginBottom: '20px', fontSize: '0.9rem' }}>Step 3 of 3: Set your password (Min 6 chars)</p>
      
      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #444', borderRadius: '8px', marginBottom: '15px', overflow: 'hidden' }}>
        <input 
          type={showSignupPassword ? "text" : "password"} placeholder="Password" value={suPassword} onChange={(e) => setSuPassword(e.target.value)}
          style={{ flex: 1, background: 'transparent', border: 'none', padding: '15px', color: 'white', fontSize: '1rem', outline: 'none' }}
        />
        <div onClick={() => setShowSignupPassword(!showSignupPassword)} style={{ padding: '15px', cursor: 'pointer' }}>
          <i className={`fas ${showSignupPassword ? 'fa-eye-slash' : 'fa-eye'}`} style={{ color: '#888' }}></i>
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #444', borderRadius: '8px', marginBottom: '25px', overflow: 'hidden' }}>
        <input 
          type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={suConfirmPassword} onChange={(e) => setSuConfirmPassword(e.target.value)}
          style={{ flex: 1, background: 'transparent', border: 'none', padding: '15px', color: 'white', fontSize: '1rem', outline: 'none' }}
        />
        <div onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ padding: '15px', cursor: 'pointer' }}>
          <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`} style={{ color: '#888' }}></i>
        </div>
      </div>

      {errorMsg && <div style={{ color: '#ff4d4f', marginBottom: '15px', fontSize: '0.9rem', textAlign: 'center' }}>{errorMsg}</div>}

      <button 
        onClick={handleSignup} 
        disabled={loading}
        style={{
          width: '100%', backgroundColor: '#28a745', color: 'white', border: 'none', padding: '16px 0',
          borderRadius: '24px', fontSize: '1.1rem', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer', marginBottom: '20px',
          opacity: loading ? 0.7 : 1
        }}>
        {loading ? 'Creating Account...' : 'Complete Registration'}
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
            <button onClick={handleClose} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>
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
