import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  HeartHandshake, 
  Target, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Calendar
} from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';

export default function About() {
  const pillars = [
    {
      icon: HeartHandshake,
      title: "Senior-to-Junior Mentorship",
      color: "cyan",
      desc: "Organized by 3rd-year seniors who have walked in your shoes. We sit alongside you on the lab floor to troubleshoot code, guide architecture, and build confidence."
    },
    {
      icon: Target,
      title: "Authentic Problem Solving",
      color: "purple",
      desc: "Techfest prioritizes practical utility over complicated jargon. An intuitive solution addressing real campus or everyday friction is the true winner."
    },
    {
      icon: Sparkles,
      title: "Cultural Celebration",
      color: "amber",
      desc: "Rays of Raunak brings the entire college together on Day 2 for music, dance, theatrical mimicry, and stage performances under the banner 'Let Every Talent Shine'."
    },
    {
      icon: ShieldCheck,
      title: "Transparent & Inclusive",
      color: "emerald",
      desc: "Designed exclusively for 1st and 2nd-year students with a standardized 100-mark judging rubric and open encouragement for all student talents."
    }
  ];

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* HEADER */}
      <SectionHeading
        badge="About The Festival"
        title="Two Days. Two Connected"
        highlight="Celebrations"
        subtitle="Bridging technology and creative expression at Government Polytechnic Kanpur."
      />

      {/* ORIGIN & DUAL EVENT PHILOSOPHY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
        <div className="lg:col-span-7 space-y-5 text-slate-300 leading-relaxed text-sm sm:text-base">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            A Unified Stage for Builders & Performers
          </h3>
          <p>
            College festivals often separate technology from culture. At Government Polytechnic Kanpur, we believe innovation and artistic expression go hand in hand.
          </p>
          <p>
            <strong className="text-cyan-400 font-semibold">Techfest × Rays of Raunak 2026</strong> brings together two back-to-back days of high-octane engineering and celebratory entertainment:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="p-4 rounded-2xl bg-[#070a14] border border-cyan-400/30">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold mb-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>27 October 2026</span>
              </div>
              <h4 className="text-base font-bold text-white font-display">Techfest (Hackathon)</h4>
              <p className="text-xs text-slate-400 mt-1">
                A 7+ hour hackathon sprint where 1st and 2nd-year developers build functional solutions for real challenges.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#070a14] border border-amber-400/30">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold mb-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>28 October 2026</span>
              </div>
              <h4 className="text-base font-bold text-white font-display">Rays of Raunak (Cultural Fest)</h4>
              <p className="text-xs text-slate-400 mt-1">
                11:00 AM to 5:00 PM in the auditorium. Singing, dance, mimicry, followed by Techfest results & prize distribution.
              </p>
            </div>
          </div>

          <p className="text-slate-400 text-xs sm:text-sm">
            Third-year seniors from the Information Technology Department act as your hands-on organizers and mentors throughout both days, ensuring an encouraging and memorable experience.
          </p>
        </div>

        {/* Snapshot Card */}
        <div className="lg:col-span-5">
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-cyan-400/30 relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400/20 via-amber-400/20 to-purple-400/20 border border-white/10 flex items-center justify-center text-cyan-300">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white font-display">Festival Quick Facts</h4>
                <p className="text-xs text-cyan-300 font-mono">Government Polytechnic Kanpur</p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Target Audience</span>
                <span className="font-semibold text-white">1st & 2nd Year Students</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Hackathon Mode</span>
                <span className="font-semibold text-white">Solo or Teams of 3–5</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Compulsory Fee</span>
                <span className="font-semibold text-cyan-300 font-mono">₹200 per participant</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Day 1 (Techfest)</span>
                <span className="font-semibold text-white">27 Oct 2026 (09:30 AM)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Day 2 (Rays of Raunak)</span>
                <span className="font-semibold text-amber-300">28 Oct 2026 (11 AM – 5 PM)</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">Cultural Tagline</span>
                <span className="font-semibold text-amber-300 italic">“Let Every Talent Shine”</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 CORE PILLARS */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-cyan-400 block mb-2">
            Our Foundation
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Four Core Pillars
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl glass-card glass-card-hover flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2 font-display">{pillar.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CALL TO ACTION */}
      <div className="text-center pt-8 border-t border-white/5">
        <Link
          to="/register"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-amber-300 text-dark-950 hover:brightness-110 transition-all shadow-glow-cyan"
        >
          <span>Register for Techfest 2026 (₹200)</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
