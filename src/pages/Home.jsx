import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Users, 
  Clock, 
  Award, 
  ShieldAlert, 
  GraduationCap, 
  HeartHandshake, 
  CheckCircle2, 
  Code2, 
  Layers, 
  Zap, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { HACKATHON_CONFIG } from '../config/hackathonConfig';
import SectionHeading from '../components/common/SectionHeading';

export default function Home() {
  return (
    <div className="pt-24 pb-20 overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 max-w-7xl mx-auto">
        {/* Glow ambient backdrops */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-cyan/20 via-brand-purple/20 to-brand-pink/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Eligibility & Info pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs sm:text-sm font-semibold text-brand-cyan mb-6 shadow-glow-cyan/20 animate-float">
            <Sparkles className="w-4 h-4 text-brand-cyan animate-spin" />
            <span>Exclusively for 1st & 2nd Year IT Department Students</span>
            <span className="w-1 h-1 rounded-full bg-brand-cyan"></span>
            <span className="text-slate-300">Govt Polytechnic Kanpur</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6">
            CAMPUS HACKFEST{' '}
            <span className="text-gradient block sm:inline">2026</span>
          </h1>

          {/* Theme Banner */}
          <div className="my-6 inline-block">
            <div className="px-6 py-3 rounded-2xl bg-dark-900/90 border border-brand-cyan/30 shadow-glow-cyan/40">
              <span className="text-xs uppercase font-bold tracking-widest text-slate-400 block">
                Official Hackathon Theme
              </span>
              <p className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-white mt-1">
                "{HACKATHON_CONFIG.theme}"
              </p>
            </div>
          </div>

          {/* Supporting Text */}
          <p className="text-lg sm:text-2xl font-medium text-slate-300 max-w-2xl mx-auto mb-4 leading-relaxed">
            "{HACKATHON_CONFIG.tagline}"
          </p>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            {HACKATHON_CONFIG.description}
          </p>

          {/* Primary & Secondary CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm tracking-wider uppercase text-dark-950 bg-gradient-to-r from-brand-cyan via-teal-300 to-brand-cyan hover:shadow-glow-cyan hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              <span>Register Now (₹50)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/challenge"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white glass-pill hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <span>Explore Challenge</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

          {/* Quick Highlight Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            <div className="p-3.5 rounded-xl glass-card border-white/5">
              <span className="text-[11px] text-slate-400 block font-medium">Eligibility</span>
              <p className="text-sm font-bold text-white mt-0.5">1st & 2nd Years</p>
            </div>
            <div className="p-3.5 rounded-xl glass-card border-white/5">
              <span className="text-[11px] text-slate-400 block font-medium">Team Size</span>
              <p className="text-sm font-bold text-white mt-0.5">{HACKATHON_CONFIG.teamSizeText}</p>
            </div>
            <div className="p-3.5 rounded-xl glass-card border-white/5">
              <span className="text-[11px] text-slate-400 block font-medium">Entry Fee</span>
              <p className="text-sm font-bold text-brand-cyan mt-0.5">{HACKATHON_CONFIG.entryFeeText}</p>
            </div>
            <div className="p-3.5 rounded-xl glass-card border-white/5">
              <span className="text-[11px] text-slate-400 block font-medium">Sprint Time</span>
              <p className="text-sm font-bold text-brand-purple mt-0.5">{HACKATHON_CONFIG.time}</p>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK STATS SECTION (Configurable from hackathonConfig.js) */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {HACKATHON_CONFIG.stats.map((item, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-2xl glass-card glass-card-hover relative overflow-hidden group"
            >
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-brand-cyan/5 rounded-full blur-xl group-hover:bg-brand-cyan/15 transition-all" />
              <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {item.value}
              </p>
              <h3 className="text-sm font-bold text-brand-cyan mt-2">
                {item.label}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT HACKFEST SUMMARY */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase bg-brand-purple/10 text-brand-purple border border-brand-purple/20 mb-4">
              <GraduationCap className="w-3.5 h-3.5" />
              About Campus HackFest 2026
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Designed by Seniors. Built for IT Freshers & Sophomores.
            </h2>
            <p className="mt-4 text-slate-300 leading-relaxed text-base">
              Campus HackFest was born out of a simple observation: hackathons should be approachable, educational, and fun. Rather than competing against seasoned professionals, this event is crafted specifically for 1st and 2nd-year IT Department students at Government Polytechnic Kanpur.
            </p>
            <p className="mt-3 text-slate-400 leading-relaxed text-sm">
              Our 10–15 third-year organizing committee members act as hands-on mentors throughout the day. Need debugging advice? Help with Git commits? Guidance on structuring an API? We are on the lab floor with you all day.
            </p>

            <div className="mt-8 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-emerald shrink-0 mt-0.5" />
                <span className="text-sm text-slate-300">
                  <strong className="text-white">Beginner-Friendly:</strong> Zero intimidating corporate jargon. Bring your curiosity and willingness to learn.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-emerald shrink-0 mt-0.5" />
                <span className="text-sm text-slate-300">
                  <strong className="text-white">Working Prototypes:</strong> Focus on real, tangible utility over flashy slide decks.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-emerald shrink-0 mt-0.5" />
                <span className="text-sm text-slate-300">
                  <strong className="text-white">Fair & Transparent:</strong> Clean 100-mark judging criteria with 30 marks dedicated to genuine real-world impact.
                </span>
              </div>
            </div>

            <div className="mt-8">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-cyan hover:underline"
              >
                <span>Read more about organizers & mentorship</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Visual Highlight Card */}
          <div className="relative">
            <div className="p-8 rounded-3xl glass-card border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-purple/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs font-mono text-slate-400">hackfest_manifesto.md</span>
              </div>

              <div className="mt-6 space-y-4 font-mono text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-dark-950/80 border border-white/5">
                  <span className="text-brand-cyan font-bold"># Rule 01:</span>
                  <p className="text-slate-300 mt-1 font-sans">
                    Solve a problem that matters to you, your college, or your community.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-dark-950/80 border border-white/5">
                  <span className="text-brand-purple font-bold"># Rule 02:</span>
                  <p className="text-slate-300 mt-1 font-sans">
                    Build fresh. No existing complete college submissions can be repackaged.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-dark-950/80 border border-white/5">
                  <span className="text-brand-emerald font-bold"># Rule 03:</span>
                  <p className="text-slate-300 mt-1 font-sans">
                    AI tools (ChatGPT, Gemini, Copilot) are allowed, but you must explain every line of code!
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Ready to take the challenge?</span>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 text-xs font-bold hover:bg-brand-cyan/30 transition-colors"
                >
                  Join HackFest
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE 6-STEP JOURNEY */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto border-t border-white/5">
        <SectionHeading
          badge="The Journey"
          title="From Problem to Working"
          highlight="Prototype"
          subtitle="A structured 6-stage lifecycle guiding your hackathon sprint from first brainstorm to the final demo."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {HACKATHON_CONFIG.challengeProcess.map((item, index) => (
            <div 
              key={index} 
              className="p-5 rounded-2xl glass-card glass-card-hover flex flex-col justify-between group"
            >
              <div>
                <span className="text-2xl font-black text-slate-500 group-hover:text-brand-cyan transition-colors font-mono">
                  {item.step}
                </span>
                <h3 className="text-base font-bold text-white mt-3 group-hover:text-brand-cyan transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1 text-[11px] text-brand-cyan font-semibold">
                <span>Phase {index + 1}</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DOMAIN TEASER */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
        <SectionHeading
          badge="Problem Areas"
          title="10 Diverse Problem"
          highlight="Tracks"
          subtitle="Explore authentic friction points across society and campus life. You have complete freedom to define your exact scope."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {HACKATHON_CONFIG.domains.slice(0, 5).map((domain) => (
            <div key={domain.id} className="p-5 rounded-2xl glass-card glass-card-hover flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan mb-3">
                  <Zap className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{domain.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{domain.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/challenge"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider glass-pill text-brand-cyan hover:bg-white/10 transition-colors"
          >
            <span>View All 10 Domains & Challenge Guide</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* REGISTRATION CTA BANNER */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border border-brand-cyan/30 shadow-glow-cyan/20 relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-64 h-64 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-cyan/20 text-brand-cyan mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Registrations Now Open
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Ready to Solve a Real Problem?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mt-2">
                Team up with 3–4 friends (or register solo and we will match you with teammates). Nominal fee: ₹50 per participant.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link
                to="/register"
                className="px-8 py-4 rounded-xl font-bold text-sm tracking-wider uppercase text-dark-950 bg-brand-cyan hover:bg-cyan-300 shadow-glow-cyan transition-all"
              >
                Register Your Team
              </Link>
              <Link
                to="/rules"
                className="px-6 py-4 rounded-xl font-bold text-sm text-slate-300 glass-pill hover:bg-white/10 transition-all"
              >
                Review Rules
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
