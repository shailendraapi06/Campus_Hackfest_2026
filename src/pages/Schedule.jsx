import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  MapPin, 
  Calendar, 
  Sparkles, 
  Code, 
  Award,
  ArrowRight,
  Music
} from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import { HACKATHON_CONFIG } from '../config/hackathonConfig';

export default function Schedule() {
  const [activeDay, setActiveDay] = useState(1);

  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* HEADER */}
      <SectionHeading
        badge="Two-Day Master Timeline"
        title="Event Day"
        highlight="Schedule"
        subtitle="Experience two consecutive days of tech innovation and cultural celebration at Government Polytechnic Kanpur."
      />

      {/* DUAL-DAY TAB SWITCHER */}
      <div className="flex items-center justify-center gap-3 mb-12">
        <button
          type="button"
          onClick={() => setActiveDay(1)}
          className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all ${
            activeDay === 1
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-glow-cyan'
              : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white hover:bg-white/10'
          }`}
        >
          <Code className="w-4 h-4 text-cyan-400" />
          <span>Day 01: Techfest (27 Oct)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveDay(2)}
          className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all ${
            activeDay === 2
              ? 'bg-amber-500/20 text-amber-300 border border-amber-400/50 shadow-glow-amber'
              : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white hover:bg-white/10'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Day 02: Rays of Raunak (28 Oct)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* DAY 1 CONTENT: TECHFEST HACKATHON (27 OCTOBER 2026) */}
      {/* ========================================================================= */}
      {activeDay === 1 && (
        <div className="animate-fadeIn space-y-12">
          
          {/* Day 1 Quick Logistics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl glass-card flex items-center gap-3 border-cyan-500/20">
              <Calendar className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block font-mono">Date</span>
                <p className="text-sm font-bold text-white">{HACKATHON_CONFIG.techfest.date}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-card flex items-center gap-3 border-cyan-500/20">
              <Clock className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block font-mono">Sprint Hours</span>
                <p className="text-sm font-bold text-white">{HACKATHON_CONFIG.techfest.time}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-card flex items-center gap-3 border-cyan-500/20">
              <MapPin className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block font-mono">Sprint Venue</span>
                <p className="text-xs sm:text-sm font-bold text-white">{HACKATHON_CONFIG.techfest.venue}</p>
              </div>
            </div>
          </div>

          {/* Timeline List: Day 1 */}
          <div className="relative border-l-2 border-cyan-400/20 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8">
            {HACKATHON_CONFIG.day1Schedule.map((slot, index) => {
              const isHighlight = slot.title.includes("Begins") || slot.title.includes("Judging") || slot.title.includes("Closes");
              const isBreak = slot.title.includes("Lunch");

              return (
                <div key={index} className="relative group">
                  {/* Milestone Indicator Node */}
                  <div className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                    isHighlight 
                      ? 'bg-cyan-400 border-white shadow-glow-cyan scale-125' 
                      : isBreak 
                        ? 'bg-amber-400 border-white' 
                        : 'bg-[#070a12] border-cyan-500/50 group-hover:border-cyan-400 group-hover:bg-cyan-400'
                  }`} />

                  {/* Event Card */}
                  <div className={`p-6 rounded-2xl transition-all duration-300 ${
                    isHighlight 
                      ? 'glass-card border-cyan-400/40 bg-[#070d18]/90 shadow-glow-cyan/20' 
                      : 'glass-card glass-card-hover'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide bg-white/5 text-cyan-300 border border-white/10 w-fit">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{slot.time}</span>
                      </div>
                      {isHighlight && (
                        <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-2 py-0.5 rounded bg-cyan-400/20 text-cyan-300 w-fit">
                          Key Milestone
                        </span>
                      )}
                      {isBreak && (
                        <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 w-fit">
                          Break & Fuel
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-white mt-2 font-display">
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

          {/* Results Announcement Notice */}
          <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-start gap-3.5 text-xs sm:text-sm text-amber-200">
            <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block text-sm mb-1 font-display">
                Hackathon Results & Prize Distribution:
              </strong>
              Techfest Hackathon evaluations conclude on Day 1 evening. The final podium winners, runner-ups, and prizes will be officially announced live on the <strong>Rays of Raunak Cultural Stage</strong> on Day 2 (28 October 2026 at 4:15 PM).
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* DAY 2 CONTENT: RAYS OF RAUNAK CULTURAL FEST (28 OCTOBER 2026) */}
      {/* ========================================================================= */}
      {activeDay === 2 && (
        <div className="animate-fadeIn space-y-12">
          
          {/* HIGHLY VISIBLE INFORMATION BLOCK (MANDATORY REQUIREMENT) */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-purple-500/15 border-2 border-amber-400/40 shadow-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10 mb-6">
              <div>
                <span className="text-xs uppercase font-mono font-bold tracking-widest text-amber-400 block mb-1">
                  Official Cultural Fest Card
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                  Event: {HACKATHON_CONFIG.raysOfRaunak.name}
                </h3>
                <p className="text-base sm:text-lg text-amber-300 font-semibold italic mt-1 font-serif">
                  Tagline: “{HACKATHON_CONFIG.raysOfRaunak.tagline}”
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Reporting Time</span>
                  <span className="text-base font-bold text-amber-300 font-mono">11:00 AM</span>
                </div>
                <div className="px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Conclusion</span>
                  <span className="text-base font-bold text-rose-300 font-mono">05:00 PM</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>Date:</strong> 28 October 2026</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>Hours:</strong> 11:00 AM to 5:00 PM</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>Venue:</strong> Main Auditorium Stage</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 mt-4 leading-relaxed">
              <strong>Arrival Notice:</strong> All students and faculty should arrive at the college auditorium by <strong>11:00 AM</strong>. The cultural celebration runs through the afternoon, concluding at <strong>5:00 PM</strong> with the Techfest hackathon results and awards.
            </p>
          </div>

          {/* Cultural Fest Schedule Timeline (With Tentative Slot Labels) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold text-white font-display flex items-center gap-2">
                <Music className="w-5 h-5 text-amber-400" />
                <span>Cultural Fest Timeline (Tentative & Editable)</span>
              </h4>
              <span className="text-[11px] font-mono text-amber-400/90 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                Intermediate slots tentative
              </span>
            </div>

            <div className="relative border-l-2 border-amber-400/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8">
              {HACKATHON_CONFIG.day2Schedule.map((slot, index) => {
                const isAwardHighlight = slot.title.includes("Techfest Results");

                return (
                  <div key={index} className="relative group">
                    {/* Node */}
                    <div className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                      isAwardHighlight
                        ? 'bg-amber-400 border-white shadow-glow-amber scale-125'
                        : 'bg-[#070a12] border-amber-400/50 group-hover:border-amber-400 group-hover:bg-amber-400'
                    }`} />

                    {/* Slot Card */}
                    <div className={`p-6 rounded-2xl transition-all duration-300 ${
                      isAwardHighlight
                        ? 'glass-card border-2 border-amber-400/60 bg-gradient-to-r from-amber-500/15 via-[#0d0912] to-amber-500/10 shadow-glow-amber'
                        : 'glass-card glass-card-hover'
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide bg-white/5 text-amber-300 border border-white/10 w-fit">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          <span>{slot.time}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {slot.tentative && (
                            <span className="text-[10px] uppercase font-mono font-semibold px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                              Tentative Slot
                            </span>
                          )}
                          {isAwardHighlight && (
                            <span className="text-[10px] uppercase font-mono font-black px-2.5 py-0.5 rounded bg-amber-400 text-dark-950 shadow-sm">
                              Grand Podium
                            </span>
                          )}
                        </div>
                      </div>

                      <h3 className={`text-lg font-bold mt-2 font-display ${isAwardHighlight ? 'text-amber-300 sm:text-xl' : 'text-white'}`}>
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
          </div>

          {/* Student Callout for Cultural Performances */}
          <div className="p-8 rounded-3xl glass-card border border-amber-400/30 text-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2 font-display">
              Want to Perform at Rays of Raunak?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed mb-6">
              {HACKATHON_CONFIG.raysOfRaunak.calloutMessage}
            </p>
            <a
              href={HACKATHON_CONFIG.links.whatsappSupport}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-400 to-rose-400 text-dark-950 hover:brightness-110 transition-all shadow-md"
            >
              <span>Contact Seniors / Organizers to Perform</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      )}

      {/* BOTTOM CTA */}
      <div className="p-8 rounded-3xl glass-card text-center mt-16">
        <h4 className="text-xl font-bold text-white mb-2 font-display">
          Be Part of Techfest × Rays of Raunak 2026
        </h4>
        <p className="text-xs sm:text-sm text-slate-400 mb-6 max-w-xl mx-auto">
          Two days of continuous excitement, teamwork, innovation, and campus memories.
        </p>
        <Link
          to="/register"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 text-dark-950 hover:brightness-110 transition-all shadow-glow-cyan"
        >
          <span>Register for Techfest (₹200)</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
