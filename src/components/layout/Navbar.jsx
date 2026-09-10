import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Code2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { HACKATHON_CONFIG } from '../../config/hackathonConfig';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Challenge', path: '/challenge' },
    { name: 'Rules', path: '/rules' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'Teams', path: '/teams' },
    { name: 'Results', path: '/results' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-dark-950/85 backdrop-blur-xl border-b border-white/10 shadow-xl py-3' 
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-cyan via-brand-purple to-brand-pink p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-glow-cyan/50">
              <div className="w-full h-full bg-dark-900 rounded-[10px] flex items-center justify-center">
                <Code2 className="w-5 h-5 text-brand-cyan group-hover:text-white transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-brand-cyan transition-colors">
                  {HACKATHON_CONFIG.shortName}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-brand-purple/20 text-brand-purple border border-brand-purple/30">
                  {HACKATHON_CONFIG.year}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                {HACKATHON_CONFIG.theme}
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-dark-900/60 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-brand-cyan/20 to-brand-purple/20 text-brand-cyan border border-brand-cyan/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Action / Register CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/register"
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs tracking-wide text-dark-950 uppercase transition-all duration-300 bg-gradient-to-r from-brand-cyan via-teal-300 to-brand-cyan bg-size-200 hover:bg-right hover:shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Register Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/register"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-brand-cyan text-dark-950 hover:bg-cyan-300 transition-colors"
            >
              Register
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-dark-900 border border-white/10 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6 text-brand-cyan" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden mt-3 px-4 pt-2 pb-6 bg-dark-950/95 border-b border-white/10 backdrop-blur-2xl transition-all">
          <div className="flex flex-col gap-1.5 pt-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/25'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 opacity-50" />
              </NavLink>
            ))}
            
            <div className="pt-4 mt-2 border-t border-white/10">
              <Link
                to="/register"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-brand-cyan to-brand-purple text-dark-950 hover:brightness-110 shadow-lg shadow-brand-cyan/20"
              >
                <span>Complete Registration (₹50)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
