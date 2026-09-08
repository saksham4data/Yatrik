import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuthModal } from '../context/AuthModalContext'

export default function Header() {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { openSidebar, user } = useAuthModal()
  
  // Theme logic
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDarkMode(true)
      document.body.classList.add('dark-theme')
    }
  }, [])

  const toggleTheme = () => {
    if (isDarkMode) {
      document.body.classList.remove('dark-theme')
      localStorage.setItem('theme', 'light')
      setIsDarkMode(false)
    } else {
      document.body.classList.add('dark-theme')
      localStorage.setItem('theme', 'dark')
      setIsDarkMode(true)
    }
  }
  
  const isActive = (path) => location.pathname === path

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMenu = () => setIsMobileMenuOpen(false)

  return (
    <header className="navbar">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Left: Brand + Desktop Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          
          <Link to="/" className="navbar-brand" style={{ marginRight: '50px' }} onClick={closeMenu}>
            <i className="fas fa-bus" style={{ color: 'white' }}></i>
            <span>Yatrik</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="navbar-nav desktop-only">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              <i className="fas fa-home" style={{ marginRight: '8px' }}></i> Home
            </Link>
            <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
              <i className="fas fa-info-circle" style={{ marginRight: '8px' }}></i> About
            </Link>
            <Link to="/my_trackings" className={`nav-link ${isActive('/my_trackings') ? 'active' : ''}`}>
              <i className="fas fa-map-marked-alt" style={{ marginRight: '8px' }}></i> Track My Bus
            </Link>
          </nav>

        </div>

        {/* Right: Desktop Actions */}
        <div className="navbar-right desktop-only">
          <button onClick={toggleTheme} className="nav-action" style={{ background: 'transparent', border: 'none', outline: 'none' }}>
            <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i> {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <Link to="/contact" className="nav-action">
            <i className="fas fa-question-circle"></i> Help
          </Link>
          
          {user ? (
            <button onClick={openSidebar} className="nav-action" style={{ background: 'transparent', border: 'none', outline: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#444', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', overflow: 'hidden' }}>
                {localStorage.getItem(`avatar_${user.email}`) ? (
                  <img src={localStorage.getItem(`avatar_${user.email}`)} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <i className="fas fa-user"></i>
                )}
              </div>
              <span style={{ fontWeight: '600' }}>{user.email.split('@')[0]}</span>
            </button>
          ) : (
            <button onClick={openSidebar} className="nav-action" style={{ background: 'transparent', border: 'none', outline: 'none', cursor: 'pointer' }}>
              <i className="fas fa-user-circle"></i> Account
            </button>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button className="mobile-toggle" onClick={toggleMenu}>
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>

      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-nav-link" onClick={closeMenu}><i className="fas fa-home"></i> Home</Link>
          <Link to="/about" className="mobile-nav-link" onClick={closeMenu}><i className="fas fa-info-circle"></i> About</Link>
          <Link to="/my_trackings" className="mobile-nav-link" onClick={closeMenu}><i className="fas fa-map-marked-alt"></i> Track My Bus</Link>
          <Link to="/contact" className="mobile-nav-link" onClick={closeMenu}><i className="fas fa-question-circle"></i> Help</Link>
          <button onClick={() => { openSidebar(); closeMenu(); }} className="mobile-nav-link" style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}>
            <i className="fas fa-user-circle"></i> Account
          </button>
          <button onClick={() => { toggleTheme(); closeMenu(); }} className="mobile-nav-link" style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}>
            <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i> {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      )}
    </header>
  )
}
