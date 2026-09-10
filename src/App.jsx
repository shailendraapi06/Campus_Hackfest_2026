import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Challenge from './pages/Challenge';
import Rules from './pages/Rules';
import Schedule from './pages/Schedule';
import Register from './pages/Register';
import Teams from './pages/Teams';
import Results from './pages/Results';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-dark-950 text-slate-100 mesh-grid">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/challenge" element={<Challenge />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/register" element={<Register />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/results" element={<Results />} />
            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
