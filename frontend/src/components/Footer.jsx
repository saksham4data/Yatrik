import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-column">
          <h4>Yatrik</h4>
          <p style={{ maxWidth: '300px', lineHeight: '1.6' }}>
            India's Safest & Most Reliable Bus Tracking and Ticketing Platform. Travel with confidence.
          </p>
        </div>
        
        <div className="footer-column">
          <h4>About Yatrik</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="#">Offers</Link></li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h4>Useful Links</h4>
          <ul>
            <li><Link to="#">Terms & Conditions</Link></li>
            <li><Link to="#">Privacy Policy</Link></li>
            <li><Link to="#">FAQ</Link></li>
          </ul>
        </div>
      </div>
      <div className="container" style={{ marginTop: '40px', borderTop: '1px solid #333', paddingTop: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
        &copy; {new Date().getFullYear()} Yatrik India. All rights reserved.
      </div>
    </footer>
  )
}
