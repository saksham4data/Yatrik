import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { useAuthModal } from '../context/AuthModalContext';

export default function UserSettings() {
  const { user } = useAuthModal();
  const [profile, setProfile] = useState({ name: '', phone: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('passenger_profiles')
          .select('addr1, phone')
          .eq('user_id', user.id)
          .single();

        if (data) {
          // Re-using addr1 for name in this context, or falling back to empty
          setProfile({ name: data.addr1 || '', phone: data.phone || '' });
        }
        
        // Load Avatar from localStorage
        const savedAvatar = localStorage.getItem(`avatar_${user.email}`);
        if (savedAvatar) {
          setAvatarPreview(savedAvatar);
        }

      } catch (err) {
        console.error('Failed to fetch profile data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      // 1. Save Avatar to local storage
      if (avatarPreview) {
        localStorage.setItem(`avatar_${user.email}`, avatarPreview);
      }

      // 2. Save Details to Supabase
      const { error } = await supabase
        .from('passenger_profiles')
        .update({ addr1: profile.name, phone: profile.phone })
        .eq('user_id', user.id);

      if (error) {
        throw error;
      }

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      
      // Dispatch a custom event to notify Header/Sidebar to re-render avatar
      window.dispatchEvent(new Event('storage'));

    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update profile.' });
    } finally {
      setSaving(false);
    }
  };

  if (!user && !loading) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <i className="fas fa-user-lock" style={{ fontSize: '4rem', color: '#444', marginBottom: '20px' }}></i>
        <h2>Access Denied</h2>
        <p style={{ color: '#aaa' }}>Please log in to view and edit your profile details.</p>
      </div>
    );
  }

  if (loading) return <div style={{ padding: '40px 20px', textAlign: 'center' }}>Loading your profile...</div>;

  return (
    <div style={{ padding: '40px 20px', maxWidth: '600px', margin: '0 auto', color: '#fff' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '30px' }}>Profile Details</h2>
      
      <div style={{ background: '#1e1e1e', padding: '30px', borderRadius: '16px', border: '1px solid #333' }}>
        
        {/* Avatar Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' }}>
          <div 
            style={{ 
              width: '120px', height: '120px', borderRadius: '50%', background: '#333', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              overflow: 'hidden', border: '3px solid #444', marginBottom: '15px', position: 'relative' 
            }}
          >
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <i className="fas fa-user" style={{ fontSize: '3rem', color: '#666' }}></i>
            )}
          </div>
          
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handleAvatarChange} 
            style={{ display: 'none' }} 
          />
          <button 
            onClick={() => fileInputRef.current.click()}
            style={{ background: 'transparent', color: 'var(--brand-blue)', border: '1px solid var(--brand-blue)', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: '600' }}
          >
            Change Picture
          </button>
        </div>

        {/* Details Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div>
            <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '8px' }}>Email Address (Read-only)</label>
            <div style={{ display: 'flex', alignItems: 'center', background: '#2a2a2a', border: '1px solid #444', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ padding: '15px', color: '#888' }}><i className="fas fa-envelope"></i></div>
              <input type="text" value={user.email} readOnly style={{ flex: 1, background: 'transparent', border: 'none', padding: '15px 15px 15px 0', color: '#888', outline: 'none' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '8px' }}>Full Name</label>
            <div style={{ display: 'flex', alignItems: 'center', background: '#121212', border: '1px solid #444', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ padding: '15px', color: '#ccc' }}><i className="fas fa-user-edit"></i></div>
              <input 
                type="text" 
                placeholder="Enter your full name"
                value={profile.name} 
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                style={{ flex: 1, background: 'transparent', border: 'none', padding: '15px 15px 15px 0', color: '#fff', outline: 'none', fontSize: '1rem' }} 
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '8px' }}>Mobile Number</label>
            <div style={{ display: 'flex', alignItems: 'center', background: '#121212', border: '1px solid #444', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ padding: '15px', color: '#ccc' }}><i className="fas fa-phone"></i></div>
              <input 
                type="text" 
                placeholder="e.g. +91 98765 43210"
                value={profile.phone} 
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                style={{ flex: 1, background: 'transparent', border: 'none', padding: '15px 15px 15px 0', color: '#fff', outline: 'none', fontSize: '1rem' }} 
              />
            </div>
          </div>

          {message.text && (
            <div style={{ 
              padding: '12px', borderRadius: '8px', textAlign: 'center', fontWeight: '600',
              background: message.type === 'success' ? 'rgba(40, 167, 69, 0.1)' : 'rgba(220, 53, 69, 0.1)',
              color: message.type === 'success' ? '#28a745' : '#dc3545',
              border: `1px solid ${message.type === 'success' ? '#28a745' : '#dc3545'}`
            }}>
              {message.text}
            </div>
          )}

          <button 
            onClick={handleSave}
            disabled={saving}
            style={{ 
              marginTop: '10px', width: '100%', background: 'var(--brand-blue)', color: 'white', border: 'none', 
              padding: '16px 0', borderRadius: '24px', fontSize: '1.1rem', fontWeight: '700', cursor: saving ? 'not-allowed' : 'pointer',
              opacity: saving ? 0.7 : 1
            }}>
            {saving ? 'Saving...' : 'Save Profile Changes'}
          </button>

        </div>
      </div>
    </div>
  );
}
