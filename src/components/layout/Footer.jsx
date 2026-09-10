import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, ShieldCheck, Heart, Terminal, Sparkles } from 'lucide-react';
import { HACKATHON_CONFIG } from '../../config/hackathonConfig';

export default function Footer() {
  return (
    <footer className="relative bg-dark-950 border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-32 bg-brand-cyan/5 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-0 right-1/4 w-96 h-32 bg-brand-purple/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          
          {/* Col 1: Brand & Theme */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-cyan via-brand-purple to-brand-pink p-[1.5px]">
                <div className="w-full h-full bg-dark-900 rounded-[10px] flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-brand-cyan" />
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                {HACKATHON_CONFIG.name}
              </span>
            </Link>
            <p className="text-xs text-brand-cyan uppercase font-bold tracking-wider mb-2">
              Theme: {HACKATHON_CONFIG.theme}
            </p>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              {HACKATHON_CONFIG.tagline} A premier student-driven sprint solving authentic real-world campus & societal challenges.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-brand-emerald" />
              <span>Organized by 3rd-Year Mentors</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-brand-cyan" />
              <span>Platform</span>
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-brand-cyan transition-colors">Home & Overview</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-cyan transition-colors">About & Mentorship</Link>
              </li>
              <li>
                <Link to="/challenge" className="hover:text-brand-cyan transition-colors">The Challenge & Domains</Link>
              </li>
              <li>
                <Link to="/rules" className="hover:text-brand-cyan transition-colors">Rules & Judging Rubric</Link>
              </li>
              <li>
                <Link to="/schedule" className="hover:text-brand-cyan transition-colors">Event Schedule (10 AM - 5 PM)</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Public Portals */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-purple" />
              <span>Portals</span>
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/register" className="hover:text-brand-cyan transition-colors font-medium text-brand-cyan/90">
                  Online Registration (₹50)
                </Link>
              </li>
              <li>
                <Link to="/teams" className="hover:text-brand-cyan transition-colors">
                  Meet the Teams
                </Link>
              </li>
              <li>
                <Link to="/results" className="hover:text-brand-cyan transition-colors">
                  Results & Scoreboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Organizers & Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Get in Touch
            </h4>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Have questions regarding registration, teams, or the event? Chat with our organizing team directly on WhatsApp:
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/917348754892?text=Hello%20Campus%20HackFest%20Organizers%2C%20I%20have%20a%20query."
                target="_blank"
                rel="noopener noreferrer"
                title="Chat with Organizers on WhatsApp"
                aria-label="Chat on WhatsApp"
                className="w-12 h-12 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] flex items-center justify-center text-white transition-all duration-300 shadow-lg shadow-emerald-950/40 hover:scale-110 active:scale-95"
              >
                <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {HACKATHON_CONFIG.year} {HACKATHON_CONFIG.name}. Built with React, Vite & Tailwind. Deployable on Netlify.
          </p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted by 3rd-Year Organizers for 1st & 2nd-Year Hackers</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
}
