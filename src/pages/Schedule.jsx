import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  MapPin, 
  Calendar, 
  Sparkles, 
  Coffee, 
  Rocket, 
  Flag, 
  Code, 
  CheckCircle, 
  Award,
  ArrowRight
} from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import { HACKATHON_CONFIG } from '../config/hackathonConfig';

export default function Schedule() {
  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* HEADER */}
      <SectionHeading
        badge="Event Day Timeline"
        title="Hackathon"
        highlight="Schedule"
        subtitle="Every hour counts. Follow the sprint milestones from morning registration to evening podium awards."
      />

      {/* QUICK LOGISTICS BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
        <div className="p-4 rounded-2xl glass-card flex items-center gap-3">
          <Calendar className="w-5 h-5 text-brand-cyan shrink-0" />
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Event Date</span>
            <p className="text-sm font-bold text-white">{HACKATHON_CONFIG.date}</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl glass-card flex items-center gap-3">
          <Clock className="w-5 h-5 text-brand-purple shrink-0" />
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Sprint Hours</span>
            <p className="text-sm font-bold text-white">{HACKATHON_CONFIG.time}</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl glass-card flex items-center gap-3">
          <MapPin className="w-5 h-5 text-brand-emerald shrink-0" />
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Venue</span>
            <p className="text-xs sm:text-sm font-bold text-white">{HACKATHON_CONFIG.venue}</p>
          </div>
        </div>
      </div>

      {/* TIMELINE LIST */}
      <div className="relative border-l-2 border-brand-cyan/20 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8 mb-20">
        {HACKATHON_CONFIG.schedule.map((slot, index) => {
          const isHighlight = slot.title.includes("Begins") || slot.title.includes("Results") || slot.title.includes("Closes");
          const isBreak = slot.title.includes("Lunch");

          return (
            <div key={index} className="relative group">
              {/* Milestone Indicator Node */}
              <div className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                isHighlight 
                  ? 'bg-brand-cyan border-white shadow-glow-cyan scale-125' 
                  : isBreak 
                    ? 'bg-amber-400 border-white' 
                    : 'bg-dark-900 border-brand-purple group-hover:border-brand-cyan group-hover:bg-brand-cyan'
              }`} />

              {/* Event Card */}
              <div className={`p-6 rounded-2xl transition-all duration-300 ${
                isHighlight 
                  ? 'glass-card border-brand-cyan/40 bg-dark-900/90 shadow-glow-cyan/20' 
                  : 'glass-card glass-card-hover'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide bg-white/5 text-brand-cyan border border-white/10 w-fit">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{slot.time}</span>
                  </div>
                  {isHighlight && (
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-brand-cyan/20 text-brand-cyan w-fit">
                      Key Milestone
                    </span>
                  )}
                  {isBreak && (
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 w-fit">
                      Refreshments
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mt-2">
                  {slot.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  {slot.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* BOTTOM CTA */}
      <div className="p-8 rounded-3xl glass-card text-center">
        <h4 className="text-xl font-bold text-white mb-2">
          Ready to Build Something Awesome in 7 Hours?
        </h4>
        <p className="text-xs sm:text-sm text-slate-400 mb-6 max-w-xl mx-auto">
          Registrations are on a first-come, first-served basis. Limited to 10–15 teams to ensure deep senior mentorship.
        </p>
        <Link
          to="/register"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-brand-cyan text-dark-950 hover:bg-cyan-300 transition-colors shadow-glow-cyan"
        >
          <span>Claim Your Spot (₹50)</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
