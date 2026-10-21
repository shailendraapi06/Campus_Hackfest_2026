import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Terminal, Sparkles, Calendar, Clock, MapPin } from 'lucide-react';
import { HACKATHON_CONFIG } from '../../config/hackathonConfig';

export default function Footer() {
  return (
    <footer className="relative bg-[#04060a] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-32 bg-cyan-500/5 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-0 right-1/4 w-96 h-32 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          
          {/* Col 1: Master Brand & Dates */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 via-amber-400 to-rose-400 p-[1.5px]">
                <div className="w-full h-full bg-[#07090e] rounded-[10px] flex items-center justify-center font-mono text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-300">
                  T×R
                </div>
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white uppercase font-display">
                Techfest <span className="text-amber-400 font-normal">×</span> Raunak
              </span>
            </Link>
            <p className="text-xs text-amber-300 font-medium tracking-wide mb-2 italic">
              "{HACKATHON_CONFIG.raysOfRaunak.tagline}"
            </p>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Two connected college events on consecutive days: Techfest Hackathon on 27 October 2026, and Rays of Raunak Cultural Fest on 28 October 2026 at {HACKATHON_CONFIG.college}.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Organized by 3rd-Year Seniors</span>
            </div>
          </div>

          {/* Col 2: Navigation Links (Clean, No Teams / Results) */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2 font-mono">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Explore</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors">Home & Festival Overview</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition-colors">About & Dual Events</Link>
              </li>
              <li>
                <Link to="/challenge" className="hover:text-cyan-400 transition-colors">Hackathon Themes & Problem Areas</Link>
              </li>
              <li>
                <Link to="/rules" className="hover:text-cyan-400 transition-colors">Eligibility & Participation Rules</Link>
              </li>
              <li>
                <Link to="/schedule" className="hover:text-cyan-400 transition-colors">Complete 2-Day Schedule</Link>
              </li>
              <li>
                <Link to="/register" className="text-cyan-400 hover:underline font-semibold">Online Registration (₹200/student)</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Event Logistics */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2 font-mono">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Two Event Days</span>
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>27 October 2026</span>
                </div>
                <p className="text-white font-medium">Techfest Hackathon</p>
                <p className="text-[11px] text-slate-400">Full-day code sprint & live demos</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>28 October 2026</span>
                </div>
                <p className="text-white font-medium">Rays of Raunak Cultural Fest</p>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>11:00 AM – 05:00 PM (Performances & Awards)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Venue */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 font-mono">
              Venue & Coordination
            </h4>
            <div className="space-y-3 text-xs text-slate-400 mb-4">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{HACKATHON_CONFIG.college}, IT Department Labs & Main Auditorium</span>
              </div>
              <p className="leading-relaxed">
                Want to perform at Rays of Raunak or have questions about Techfest registration? Reach out to your seniors or chat with us on WhatsApp:
              </p>
            </div>
            
            <a
              href={HACKATHON_CONFIG.links.whatsappSupport}
              target="_blank"
              rel="noopener noreferrer"
              title="Chat with Organizers on WhatsApp"
              aria-label="Chat on WhatsApp"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 hover:bg-[#25D366]/30 text-white transition-all text-xs font-semibold"
            >
              <svg className="w-4 h-4 fill-[#25D366]" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>Organizers Desk (WhatsApp)</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {HACKATHON_CONFIG.year} {HACKATHON_CONFIG.name}. {HACKATHON_CONFIG.college}.
          </p>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Crafted by 3rd-Year Seniors for 1st & 2nd-Year Students</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
}
