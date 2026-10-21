import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => {
    return localStorage.getItem('techfest_reduced_motion') === 'true' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route navigation
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setIsOpen(false);
  }

  // Handle Reduced Motion toggle
  const toggleReducedMotion = () => {
    const nextVal = !reducedMotion;
    setReducedMotion(nextVal);
    localStorage.setItem('techfest_reduced_motion', String(nextVal));
    if (nextVal) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  };

  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }, [reducedMotion]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About & Events', path: '/about' },
    { name: 'Challenges', path: '/challenge' },
    { name: 'Rules', path: '/rules' },
    { name: 'Schedule', path: '/schedule' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#05070c]/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl py-3' 
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Dual Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-xl">
            {/* Visual Icon with Tech + Raunak Energy */}
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-amber-400 to-rose-500 p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-glow-cyan/40">
              <div className="w-full h-full bg-[#07090e] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <span className="font-mono text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-300">
                  T×R
                </span>
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-amber-500/20 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-black text-base sm:text-lg tracking-tight text-white group-hover:text-cyan-300 transition-colors uppercase font-display">
                  Techfest <span className="text-amber-400 font-medium">×</span> Rays of Raunak
                </span>
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-1.5 py-0.5 rounded bg-white/10 text-cyan-300 border border-white/15">
                  2026
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium tracking-wide">
                <span className="text-cyan-400 font-semibold">27 Oct</span> (Hackathon) • <span className="text-amber-400 font-semibold">28 Oct</span> (Cultural Fest)
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0c101a]/80 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-xl shadow-inner">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 via-purple-500/15 to-amber-500/20 text-white border border-cyan-400/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Right Utilities (Reduced Motion + Register CTA) */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleReducedMotion}
              title={reducedMotion ? "Enable full animations" : "Reduce motion for a quieter experience"}
              className={`p-2 rounded-full border text-xs transition-colors flex items-center gap-1.5 px-3 ${
                reducedMotion 
                  ? 'bg-amber-400/10 border-amber-400/40 text-amber-300' 
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="text-[10px] font-mono uppercase tracking-wider">
                {reducedMotion ? "Quiet Mode" : "Motion"}
              </span>
            </button>

            <Link
              to="/register"
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs tracking-wider text-dark-950 uppercase transition-all duration-300 bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 hover:shadow-glow-cyan hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>Register Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Actions Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/register"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-cyan-400 to-amber-300 text-dark-950 hover:brightness-110 transition-colors"
            >
              <span>Register</span>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden mt-3 px-4 pt-3 pb-6 bg-[#05070c]/98 border-b border-white/10 backdrop-blur-2xl transition-all animate-fadeIn">
          <div className="flex flex-col gap-1.5 pt-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/25'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 opacity-50" />
              </NavLink>
            ))}

            <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
              <div className="flex items-center justify-between px-2 text-xs text-slate-400">
                <span>Display Comfort:</span>
                <button
                  type="button"
                  onClick={toggleReducedMotion}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-cyan-300"
                >
                  {reducedMotion ? "Quiet Motion (Active)" : "Standard Motion"}
                </button>
              </div>

              <Link
                to="/register"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 text-dark-950 hover:brightness-110 shadow-lg shadow-cyan-950/40 uppercase tracking-wider"
              >
                <span>Complete Registration (₹200)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
