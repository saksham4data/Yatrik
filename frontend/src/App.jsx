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
import MyTrackings from './pages/MyTrackings'
import UserSettings from './pages/UserSettings'
import './App.css' 

function App() {
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
            <Route path="/my_trackings" element={<MyTrackings />} />
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
