import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Users,
  Award,
  Calendar,
  Code2, 
  Music, 
  Mic, 
  CheckCircle2, 
  Zap, 
  ChevronRight,
  ShieldCheck,
  UserCheck,
  Theater
} from 'lucide-react';
import { HACKATHON_CONFIG } from '../config/hackathonConfig';
import SectionHeading from '../components/common/SectionHeading';

export default function Home() {
  const [activeHeroTab, setActiveHeroTab] = useState('both'); // 'both' | 'techfest' | 'raunak'

  return (
    <div className="pt-24 pb-20 overflow-hidden">
      
      {/* ========================================================================= */}
      {/* 1. CINEMATIC HERO SECTION: TECHFEST × RAYS OF RAUNAK 2026 */}
      {/* ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-12 pb-20 sm:pt-20 sm:pb-28 max-w-7xl mx-auto">
        {/* Atmospheric dual-light background gradients */}
        <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[550px] h-[400px] bg-cyan-500/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-10 right-1/4 translate-x-1/2 w-[550px] h-[400px] bg-amber-500/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-purple-500/10 blur-[160px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          
          {/* Top Editorial Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-semibold text-slate-300 mb-8 border border-white/10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-cyan-300">2 Connected Events</span>
            <span className="text-slate-600">•</span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-amber-300">2 Consecutive Days</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 font-sans">{HACKATHON_CONFIG.college}</span>
          </div>

          {/* DUAL HEADLINE: BOTH TECHFEST AND RAYS OF RAUNAK CLEARLY VISIBLE */}
          <div className="space-y-4 mb-8">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white font-display uppercase leading-[1.08]">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
                TECHFEST
              </span>
              <span className="text-2xl sm:text-4xl lg:text-5xl font-light text-slate-400 my-1 block font-sans">
                ×
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-rose-300">
                RAYS OF RAUNAK
              </span>
            </h1>

            {/* Official Tagline for Rays of Raunak (Visually Smaller Font Size than Main Event Title) */}
            <div className="pt-2">
              <p className="text-base sm:text-xl font-medium tracking-wide text-amber-200/90 italic font-serif">
                “{HACKATHON_CONFIG.raysOfRaunak.tagline}”
              </p>
              <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1 uppercase tracking-widest">
                Official Cultural Fest Tagline
              </p>
            </div>
          </div>

          {/* DUAL EVENT SPOTLIGHT COMPOSITION (HERO CARDS) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto my-10 text-left">
            
            {/* Techfest Spotlight Card */}
            <div 
              onMouseEnter={() => setActiveHeroTab('techfest')}
              className={`p-6 sm:p-7 rounded-3xl transition-all duration-300 relative group overflow-hidden ${
                activeHeroTab === 'techfest' || activeHeroTab === 'both'
                  ? 'glass-card border-cyan-400/50 shadow-glow-cyan/30 scale-[1.01]'
                  : 'glass-card opacity-80'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-400/15 text-cyan-300 border border-cyan-400/30">
                  <Code2 className="w-3 h-3" />
                  Day 01 • College Hackathon
                </span>
                <span className="text-xs font-mono font-bold text-cyan-400">
                  27 Oct 2026
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                TECHFEST
              </h2>
              <p className="text-xs text-cyan-300 font-medium mt-0.5">
                Build. Innovate. Solve Real Problems.
              </p>
              <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                A 7+ hour collaborative hackathon where 1st & 2nd-year developers solve authentic campus & societal problems with 3rd-year mentor guidance.
              </p>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>10:00 AM – 05:00 PM</span>
                <span className="text-cyan-400 font-semibold flex items-center gap-1">
                  IT Labs <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>

            {/* Rays of Raunak Spotlight Card */}
            <div 
              onMouseEnter={() => setActiveHeroTab('raunak')}
              className={`p-6 sm:p-7 rounded-3xl transition-all duration-300 relative group overflow-hidden ${
                activeHeroTab === 'raunak' || activeHeroTab === 'both'
                  ? 'glass-card border-amber-400/50 shadow-glow-amber/30 scale-[1.01]'
                  : 'glass-card opacity-80'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-400/15 text-amber-300 border border-amber-400/30">
                  <Sparkles className="w-3 h-3" />
                  Day 02 • Cultural Fest
                </span>
                <span className="text-xs font-mono font-bold text-amber-400">
                  28 Oct 2026
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                RAYS OF RAUNAK
              </h2>
              <p className="text-xs text-amber-300 font-medium mt-0.5 italic">
                “Let Every Talent Shine”
              </p>
              <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                A high-energy cultural fest celebrating singing, dance, mimicry, and stage talent, concluding with the Techfest hackathon results & grand prize distribution.
              </p>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>11:00 AM – 05:00 PM</span>
                <span className="text-amber-400 font-semibold flex items-center gap-1">
                  Auditorium <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>

          </div>

          {/* HERO ACTIONS: REGISTRATION CTA & EXPLORE */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 mb-12">
            <Link
              to="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-2xl font-black text-sm uppercase tracking-wider text-dark-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 hover:shadow-glow-cyan hover:scale-[1.03] active:scale-[0.98] transition-all shadow-xl"
            >
              <span>Register for Techfest (₹200)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/schedule"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm text-white glass-pill hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <span>View 2-Day Schedule</span>
              <Calendar className="w-4 h-4 text-amber-400" />
            </Link>
          </div>

          {/* Quick Highlight Badges Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-2xl glass-card border-white/5">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Eligibility</span>
              <p className="text-sm font-bold text-white mt-0.5">1st & 2nd Year Students</p>
            </div>
            <div className="p-4 rounded-2xl glass-card border-white/5">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Participation</span>
              <p className="text-sm font-bold text-white mt-0.5">Solo or 3–5 Member Teams</p>
            </div>
            <div className="p-4 rounded-2xl glass-card border-white/5">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Compulsory Fee</span>
              <p className="text-sm font-bold text-cyan-300 mt-0.5">₹200 per participant</p>
            </div>
            <div className="p-4 rounded-2xl glass-card border-white/5">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Cultural Hours</span>
              <p className="text-sm font-bold text-amber-300 mt-0.5">11:00 AM – 05:00 PM</p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION A: THE TWO CONNECTED EVENTS (TECHFEST & RAYS OF RAUNAK) */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
        <SectionHeading
          badge="Dual Identity"
          title="Two Consecutive Days of"
          highlight="Excellence"
          subtitle="A harmonious combination of technology, problem-solving, cultural flair, and college memories."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Event A: Techfest Card */}
          <div className="p-8 sm:p-10 rounded-3xl glass-card border border-cyan-400/30 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-400/15 text-cyan-300 flex items-center justify-center">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-cyan-400 font-bold block">Day 01 • 27 October 2026</span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">TECHFEST</h3>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/30">
                  Hackathon
                </span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <p className="leading-relaxed">
                  Techfest brings students together to identify genuine friction points, conceptualize creative tech solutions, and write clean, working software prototypes.
                </p>

                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span><strong>Hands-on Coding:</strong> Build apps, web platforms, and software solutions.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span><strong>Senior Mentors:</strong> 3rd-year leaders guide your architecture and debugging.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span><strong>Live Pitching:</strong> Demonstrate your live prototype in front of judges.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400 font-mono">10:00 AM – 05:00 PM • IT Labs</span>
              <Link
                to="/register"
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-cyan-400 text-dark-950 hover:bg-cyan-300 transition-colors shadow-glow-cyan text-center"
              >
                Register for Techfest
              </Link>
            </div>
          </div>

          {/* Event B: Rays of Raunak Card */}
          <div className="p-8 sm:p-10 rounded-3xl glass-card border border-amber-400/30 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400/15 text-amber-300 flex items-center justify-center">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-amber-400 font-bold block">Day 02 • 28 October 2026</span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">RAYS OF RAUNAK</h3>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30">
                  Cultural Fest
                </span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <p className="leading-relaxed">
                  The official cultural festival with the tagline <em className="text-amber-200 font-semibold font-serif">“Let Every Talent Shine”</em>. An afternoon of music, dance, theatrical mimicry, and celebration.
                </p>

                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span><strong>Singing & Music:</strong> Vocal performances, instrumental rhythms, and acoustic acts.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span><strong>Dance & Mimicry:</strong> Group choreography, theatrical sketches, and mimicry.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span><strong>Techfest Awards:</strong> Grand podium announcement of hackathon winners at 4:15 PM!</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400 font-mono">11:00 AM – 05:00 PM • Auditorium</span>
              <Link
                to="/schedule"
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-amber-400 text-dark-950 hover:bg-amber-300 transition-colors shadow-glow-amber text-center"
              >
                Explore Day 2 Schedule
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION B: WHAT TO EXPECT */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto border-t border-white/5">
        <SectionHeading
          badge="Student Experience"
          title="What to"
          highlight="Expect"
          subtitle="A carefully designed two-day journey celebrating technological ingenuity and artistic talent."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl glass-card glass-card-hover">
            <div className="w-10 h-10 rounded-xl bg-cyan-400/15 text-cyan-300 flex items-center justify-center mb-4">
              <Code2 className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-2 font-display">Building Real Projects</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Transition from textbook theory to building functioning web and mobile prototypes that solve authentic everyday problems.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card glass-card-hover">
            <div className="w-10 h-10 rounded-xl bg-purple-400/15 text-purple-300 flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-2 font-display">Collaborative Teamwork</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Team up with your batchmates (3 to 5 members) or enter solo to tackle challenges side by side with senior mentors.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card glass-card-amber-hover">
            <div className="w-10 h-10 rounded-xl bg-amber-400/15 text-amber-300 flex items-center justify-center mb-4">
              <Theater className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-2 font-display">Cultural Stage Spotlight</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sing, dance, perform mimicry, and showcase non-technical talents in front of an enthusiastic college audience on Day 2.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card glass-card-amber-hover">
            <div className="w-10 h-10 rounded-xl bg-rose-400/15 text-rose-300 flex items-center justify-center mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-2 font-display">Podium Celebration</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Celebrate standout hackathon teams and artistic performers during the grand joint award ceremony on 28 October.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION C: PARTICIPATION RULES AT A GLANCE */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-dark-900 via-[#0a0d17] to-dark-900 border border-cyan-400/30 relative">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-8 border-b border-white/10 mb-8">
            <div>
              <span className="text-xs uppercase font-mono font-bold tracking-widest text-cyan-400 block mb-1">
                Transparency First
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                Participation Rules at a Glance
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Key guidelines every participant should know before registering:
              </p>
            </div>

            <Link
              to="/rules"
              className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-cyan-300 border border-cyan-400/40 glass-pill hover:bg-cyan-400/10 transition-colors shrink-0"
            >
              Read Complete Rules Handbook →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-slate-300">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-2 text-white font-bold text-sm mb-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Eligibility</span>
              </div>
              <p className="leading-relaxed">
                Open to <strong>1st-year and 2nd-year</strong> students. 3rd-year seniors serve as organizers and technical mentors.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-2 text-white font-bold text-sm mb-2">
                <UserCheck className="w-4 h-4 text-cyan-400" />
                <span>Solo or Teams</span>
              </div>
              <p className="leading-relaxed">
                Individual / Solo participation is allowed. Teams must have <strong>3 to 5 student members</strong> (mentors not counted).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-2 text-white font-bold text-sm mb-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Compulsory Fee</span>
              </div>
              <p className="leading-relaxed">
                Compulsory entry fee of <strong>₹200 per participant</strong> (not per team), collected and managed by student organizers.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-2 text-white font-bold text-sm mb-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Event Dates</span>
              </div>
              <p className="leading-relaxed">
                <strong>27 Oct:</strong> Techfest Hackathon.<br />
                <strong>28 Oct:</strong> Rays of Raunak (11 AM – 5 PM).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION D: CULTURAL PERFORMANCES (EXACT REQUIRED NOTICE) */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-amber-500/15 via-[#0f0b18] to-rose-500/15 border-2 border-amber-400/40 shadow-2xl relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Rays of Raunak Cultural Callout
            </span>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-display mb-3">
              Let Every Talent Shine
            </h3>

            {/* Performance Categories Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 my-6">
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-white flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5 text-amber-400" /> Singing
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-white flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-rose-400" /> Dancing
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-white flex items-center gap-1.5">
                <Theater className="w-3.5 h-3.5 text-purple-400" /> Mimicry & Drama
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Other Student Talents
              </span>
            </div>

            {/* EXACT MANDATORY INVITATION MESSAGE */}
            <div className="p-6 rounded-2xl bg-black/40 border border-amber-400/30 text-amber-100 text-sm sm:text-base leading-relaxed my-6 font-medium">
              “We’re expecting maximum participation from our first-year and second-year students! Whether your talent is singing, dancing, mimicry, or something completely different, we want to see you shine. Interested in performing? Please contact your seniors/organizers in advance so your performance can be coordinated.”
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={HACKATHON_CONFIG.links.whatsappSupport}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-400 to-rose-400 text-dark-950 hover:brightness-110 transition-all shadow-md"
              >
                <span>Contact Seniors / Organizers to Perform</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                to="/schedule"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white glass-pill hover:bg-white/10 transition-colors"
              >
                View 28 Oct Schedule
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION E: FINAL CALL TO ACTION */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-dark-950 via-[#070b14] to-dark-950 border border-cyan-400/30 shadow-glow-cyan/20 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-cyan-400/20 text-cyan-300">
              <Zap className="w-3.5 h-3.5" />
              Registrations Open Now
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Ready to Build, Compete & Shine?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Step forward for Techfest Hackathon on 27 October, and celebrate together at Rays of Raunak Cultural Fest on 28 October 2026.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 text-dark-950 hover:brightness-110 shadow-glow-cyan transition-all"
              >
                Complete Registration (₹200)
              </Link>
              <Link
                to="/challenge"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-300 glass-pill hover:bg-white/10 transition-colors"
              >
                Explore Challenge Themes
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
