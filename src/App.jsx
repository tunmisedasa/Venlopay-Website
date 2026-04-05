import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import GlobalAccounts from './pages/GlobalAccounts/GlobalAccounts'
import Card from './pages/Card/Card'
import Send from './pages/Send/Send'
import Business from './pages/Business/Business'
import Referral from './pages/Referral/Referral'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/global-accounts" element={<GlobalAccounts />} />
            <Route path="/card" element={<Card />} />
            <Route path="/send" element={<Send />} />
            <Route path="/business" element={<Business />} />
            <Route path="/ref/:referralId" element={<Referral />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
