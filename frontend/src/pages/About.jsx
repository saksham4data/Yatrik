import React, { useState } from 'react';

export default function About() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    { q: "Is live tracking completely free?", a: "Yes! Tracking any registered bus on Yatrik is completely free for all users." },
    { q: "Which bus operators do you support?", a: "We support major state government operators like UPSRTC, RSRTC, KSRTC, HRTC, and thousands of private operators across India." },
    { q: "How accurate is the tracking?", a: "Our tracking relies on direct hardware GPS integrations with the buses, offering high accuracy within a 10-20 meter radius and real-time updates every 10 seconds." },
    { q: "Do I need to create an account to track a bus?", a: "To track a specific vehicle or route, you simply need to verify your email. Account creation helps you save recent trackings and manage bookings." }
  ];

  return (
    <div style={{ paddingBottom: '100px' }}>
      
      {/* 1. Hero / What is Yatrik */}
      <div style={{ 
        background: 'linear-gradient(135deg, var(--brand-blue-dark) 0%, var(--brand-blue) 100%)',
        margin: '0 calc(-50vw + 50%)',
        padding: '100px 20px',
        color: 'white',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '20px' }}>What is Yatrik?</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8', opacity: '0.95' }}>
            Yatrik is India's most advanced and reliable live bus tracking platform. Born out of the frustration of waiting at bus stops with no information, we set out to build a platform that brings transparency, safety, and predictability to millions of daily commuters.
          </p>
        </div>
      </div>

      <div className="container">

        {/* 2. Why Choose Yatrik */}
        <div style={{ marginTop: '100px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', textAlign: 'center', marginBottom: '60px' }}>Why Choose Yatrik?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div style={{ background: 'var(--card-bg)', padding: '40px', borderRadius: '24px', boxShadow: 'var(--shadow-soft)', border: '1px solid rgba(0,0,0,0.05)', textAlign: 'center' }}>
              <i className="fas fa-satellite" style={{ fontSize: '3rem', color: 'var(--brand-blue)', marginBottom: '20px' }}></i>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '15px' }}>Hardware GPS Integration</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>We don't rely on driver phones. We connect directly to the GPS modules installed in the buses for flawless, continuous tracking.</p>
            </div>
            <div style={{ background: 'var(--card-bg)', padding: '40px', borderRadius: '24px', boxShadow: 'var(--shadow-soft)', border: '1px solid rgba(0,0,0,0.05)', textAlign: 'center' }}>
              <i className="fas fa-bell" style={{ fontSize: '3rem', color: 'var(--brand-blue)', marginBottom: '20px' }}></i>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '15px' }}>Smart Alerts</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Get notified instantly if your bus is delayed, taking a detour, or approaching your boarding point.</p>
            </div>
            <div style={{ background: 'var(--card-bg)', padding: '40px', borderRadius: '24px', boxShadow: 'var(--shadow-soft)', border: '1px solid rgba(0,0,0,0.05)', textAlign: 'center' }}>
              <i className="fas fa-shield-alt" style={{ fontSize: '3rem', color: 'var(--brand-blue)', marginBottom: '20px' }}></i>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '15px' }}>Unmatched Safety</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Share your live tracking link directly with your family so they know exactly where you are on your journey.</p>
            </div>
          </div>
        </div>

        {/* 3. How Are We Different */}
        <div style={{ marginTop: '120px', background: 'var(--card-bg)', borderRadius: '32px', padding: '60px 40px', boxShadow: 'var(--shadow-soft)', border: '1px solid rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', textAlign: 'center', marginBottom: '50px' }}>How Are We Different?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px', background: 'rgba(0,0,0,0.02)', borderRadius: '16px' }}>
              <i className="fas fa-check-circle" style={{ fontSize: '2rem', color: '#28a745' }}></i>
              <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '5px' }}>No Ad Clutter</h4>
                <p style={{ color: 'var(--text-secondary)' }}>Unlike other platforms, we focus entirely on a clean, premium user experience without disruptive advertisements.</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px', background: 'rgba(0,0,0,0.02)', borderRadius: '16px' }}>
              <i className="fas fa-check-circle" style={{ fontSize: '2rem', color: '#28a745' }}></i>
              <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '5px' }}>Government Official Partner</h4>
                <p style={{ color: 'var(--text-secondary)' }}>We are officially integrated with major State Road Transport Corporations to provide authentic, direct data.</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px', background: 'rgba(0,0,0,0.02)', borderRadius: '16px' }}>
              <i className="fas fa-check-circle" style={{ fontSize: '2rem', color: '#28a745' }}></i>
              <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '5px' }}>Dark Mode & Modern UI</h4>
                <p style={{ color: 'var(--text-secondary)' }}>A UI designed for modern devices, featuring native dark mode support to save battery during night travels.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. How To Track Your Bus */}
        <div style={{ marginTop: '120px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', textAlign: 'center', marginBottom: '60px' }}>How to Track Your Bus</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '40px' }}>
            
            <div style={{ width: '250px', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--brand-blue)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: '700', margin: '0 auto 20px auto', boxShadow: '0 10px 20px rgba(0, 86, 179, 0.3)' }}>1</div>
              <h4 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '10px' }}>Visit Website</h4>
              <p style={{ color: 'var(--text-secondary)' }}>Go to yatrik.com on any mobile or desktop browser.</p>
            </div>
            
            <div style={{ width: '250px', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--brand-blue)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: '700', margin: '0 auto 20px auto', boxShadow: '0 10px 20px rgba(0, 86, 179, 0.3)' }}>2</div>
              <h4 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '10px' }}>Secure Login</h4>
              <p style={{ color: 'var(--text-secondary)' }}>Sign in quickly with your Email or Google account.</p>
            </div>

            <div style={{ width: '250px', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--brand-blue)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: '700', margin: '0 auto 20px auto', boxShadow: '0 10px 20px rgba(0, 86, 179, 0.3)' }}>3</div>
              <h4 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '10px' }}>Search Bus</h4>
              <p style={{ color: 'var(--text-secondary)' }}>Enter your source/destination OR search directly by Vehicle Number.</p>
            </div>

            <div style={{ width: '250px', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--brand-blue)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: '700', margin: '0 auto 20px auto', boxShadow: '0 10px 20px rgba(0, 86, 179, 0.3)' }}>4</div>
              <h4 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '10px' }}>Track Live</h4>
              <p style={{ color: 'var(--text-secondary)' }}>Watch your bus move in real-time on our interactive map.</p>
            </div>

          </div>
        </div>

        {/* 5. Testimonials */}
        <div style={{ marginTop: '120px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', textAlign: 'center', marginBottom: '60px' }}>What Our Users Say</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            
            <div style={{ background: 'var(--card-bg)', padding: '30px', borderRadius: '24px', boxShadow: 'var(--shadow-soft)', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', gap: '5px', color: '#ffc107', marginBottom: '15px' }}>
                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
              </div>
              <p style={{ color: 'var(--text-primary)', fontStyle: 'italic', marginBottom: '20px', lineHeight: '1.6' }}>"The vehicle number search is a lifesaver! I travel weekly between Delhi and Jaipur via RSRTC and I can track my exact bus before leaving my house."</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#eee' }}></div>
                <div>
                  <h5 style={{ fontWeight: '700', fontSize: '1rem', margin: 0 }}>Rahul Sharma</h5>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Regular Commuter</span>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--card-bg)', padding: '30px', borderRadius: '24px', boxShadow: 'var(--shadow-soft)', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', gap: '5px', color: '#ffc107', marginBottom: '15px' }}>
                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
              </div>
              <p style={{ color: 'var(--text-primary)', fontStyle: 'italic', marginBottom: '20px', lineHeight: '1.6' }}>"I feel so much safer traveling at night because I can easily share the live tracking link from Yatrik with my parents."</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#eee' }}></div>
                <div>
                  <h5 style={{ fontWeight: '700', fontSize: '1rem', margin: 0 }}>Priya Patel</h5>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Student</span>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--card-bg)', padding: '30px', borderRadius: '24px', boxShadow: 'var(--shadow-soft)', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', gap: '5px', color: '#ffc107', marginBottom: '15px' }}>
                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
              </div>
              <p style={{ color: 'var(--text-primary)', fontStyle: 'italic', marginBottom: '20px', lineHeight: '1.6' }}>"Hands down the cleanest UI of any tracking app in India. No annoying ads, just straight to the point tracking."</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#eee' }}></div>
                <div>
                  <h5 style={{ fontWeight: '700', fontSize: '1rem', margin: 0 }}>Arjun Reddy</h5>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Software Engineer</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 6. FAQs */}
        <div style={{ marginTop: '120px', maxWidth: '800px', margin: '120px auto 0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', textAlign: 'center', marginBottom: '50px' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                style={{ 
                  background: 'var(--card-bg)', 
                  borderRadius: '16px', 
                  boxShadow: 'var(--shadow-soft)', 
                  border: '1px solid rgba(0,0,0,0.05)',
                  overflow: 'hidden'
                }}
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  style={{ 
                    width: '100%', 
                    padding: '25px', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    background: 'transparent', 
                    border: 'none', 
                    cursor: 'pointer',
                    outline: 'none',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)' }}>{faq.q}</span>
                  <i className={`fas fa-chevron-${activeFaq === index ? 'up' : 'down'}`} style={{ color: 'var(--brand-blue)' }}></i>
                </button>
                {activeFaq === index && (
                  <div style={{ padding: '0 25px 25px 25px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
