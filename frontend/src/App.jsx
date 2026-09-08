import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthModalProvider } from './context/AuthModalContext'
import Header from './components/Header'
import Footer from './components/Footer'
import AccountSidebar from './components/AccountSidebar'
import LoginModal from './components/LoginModal'
import Home from './pages/Home'
import BusResults from './pages/BusResults'
import About from './pages/About'
import Contact from './pages/Contact'
import TrackMyBus from './pages/TrackMyBus'
import AccountTrackings from './pages/AccountTrackings'
import UserSettings from './pages/UserSettings'
import './App.css' 

function App() {
  useEffect(() => {
    // Real auth is now handled by AuthModalContext and Supabase
  }, []);

  return (
    <AuthModalProvider>
      <Router>
        <Header />
        <main className="container" style={{ minHeight: 'calc(100vh - 72px - 220px)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<BusResults />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/my_trackings" element={<TrackMyBus />} />
            <Route path="/account_trackings" element={<AccountTrackings />} />
            <Route path="/settings" element={<UserSettings />} />
          </Routes>
        </main>
        <Footer />
        {/* Global Overlays */}
        <AccountSidebar />
        <LoginModal />
      </Router>
    </AuthModalProvider>
  )
}

export default App
