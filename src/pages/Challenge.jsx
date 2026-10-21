import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Lightbulb, 
  Wrench, 
  CheckCircle, 
  Presentation, 
  TrendingUp, 
  GraduationCap,
  BookOpen,
  ShieldAlert,
  Leaf,
  Sparkles,
  Users,
  Zap,
  HelpCircle
} from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import { HACKATHON_CONFIG } from '../config/hackathonConfig';

const iconMap = {
  GraduationCap: GraduationCap,
  BookOpen: BookOpen,
  ShieldAlert: ShieldAlert,
  Leaf: Leaf,
  Sparkles: Sparkles,
  Users: Users,
  Zap: Zap
};

export default function Challenge() {
  const steps = [
    {
      num: "01",
      title: "Identify",
      subtitle: "Authentic Problem Area",
      icon: Target,
      desc: "Observe friction in campus routines, student life, local communities, or the environment. Choose a problem that genuinely exists."
    },
    {
      num: "02",
      title: "Analyze",
      subtitle: "Root Cause & Needs",
      icon: Lightbulb,
      desc: "Understand who is affected and why current tools fall short. Keep constraints like accessibility, speed, and simplicity in focus."
    },
    {
      num: "03",
      title: "Build",
      subtitle: "Functional Tech Prototype",
      icon: Wrench,
      desc: "Select appropriate frameworks, libraries, or APIs. Build a working software prototype during the sprint on 27 October."
    },
    {
      num: "04",
      title: "Test",
      subtitle: "Validate User Journey",
      icon: CheckCircle,
      desc: "Test primary workflows, edge cases, and ensure clean responsiveness across mobile and desktop screens."
    },
    {
      num: "05",
      title: "Pitch",
      subtitle: "Live Demonstration",
      icon: Presentation,
      desc: "Demo the live prototype to 3rd-year judges and mentors. Clearly articulate your technical decisions and workflow."
    },
    {
      num: "06",
      title: "Impact",
      subtitle: "Real-World Feasibility",
      icon: TrendingUp,
      desc: "Demonstrate how adoption of your solution creates tangible value, efficiency, or positive societal benefit."
    }
  ];

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* HEADER */}
      <SectionHeading
        badge="Techfest 2026 Themes"
        title="Suggested Problem"
        highlight="Themes"
        subtitle="Explore inspiration areas for your hackathon project. Themes are open-ended guides designed to spark your creativity, not strict mandates."
      />

      {/* CORE PHILOSOPHY CALLOUT */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-amber-500/10 to-transparent border border-cyan-400/30 mb-20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 block mb-1">
              Hackathon Guiding Principle
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white font-display">
              "Focus on real problems facing real people. Utility and user value always triumph over complexity."
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              At Techfest 2026, a clean application that saves students 30 minutes in lab queueing or prevents hostel food wastage scores higher than an incomplete buzzword clone.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              to="/register"
              className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-amber-300 text-dark-950 hover:brightness-110 transition-all shadow-glow-cyan"
            >
              Register for Techfest
            </Link>
          </div>
        </div>
      </div>

      {/* 7 SUGGESTED THEMES & PROBLEM AREAS (NOT MANDATORY PROJECTS) */}
      <div className="mb-24">
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-cyan-400 block mb-2">
            Inspiration Tracks
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            7 Suggested Challenge Themes
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl mx-auto">
            These problem domains are provided to inspire your brainstorm. You are encouraged to propose any project that sparks your passion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HACKATHON_CONFIG.challengeThemes.map((theme, index) => {
            const IconComponent = iconMap[theme.icon] || Sparkles;
            return (
              <div 
                key={theme.id} 
                className="p-6 rounded-2xl glass-card glass-card-hover flex flex-col justify-between group relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:text-amber-300 group-hover:scale-110 transition-all">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Theme 0{index + 1}</span>
                      <h4 className="text-base font-bold text-white font-display">{theme.title}</h4>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {theme.description}
                  </p>
                </div>

                {/* Example Idea Box (Clearly labelled illustrative example) */}
                <div className="mt-2 p-3 rounded-xl bg-[#070a12]/80 border border-white/5">
                  <span className="text-[10px] uppercase font-mono font-semibold text-amber-400 block mb-1">
                    Illustrative Example Only:
                  </span>
                  <p className="text-[11px] text-slate-400 italic">
                    "{theme.exampleIdea}"
                  </p>
                  <span className="text-[9px] text-slate-500 block mt-1">
                    (Note: This is only an example to help you understand the theme scope. You are not required to build this specific project.)
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* REQUIRED DISCLAIMER AT END OF CHALLENGES PAGE */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-cyan-950/30 via-slate-900/60 to-amber-950/30 border-2 border-cyan-400/40 shadow-xl mb-20 text-center max-w-4xl mx-auto animate-fadeIn">
        <div className="w-12 h-12 rounded-2xl bg-cyan-400/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 mx-auto mb-4">
          <HelpCircle className="w-6 h-6" />
        </div>
        <h4 className="text-lg sm:text-xl font-bold text-white mb-3 font-display">
          Freedom of Innovation Disclaimer
        </h4>
        <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl mx-auto font-medium">
          “{HACKATHON_CONFIG.challengeDisclaimer}”
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-cyan-300 font-mono">
          <span>Your Idea. Your Vision. Zero Restrictions.</span>
        </div>
      </div>

      {/* THE 6-STEP PROCESS PIPELINE */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-cyan-400 block mb-2">
            Structured Workflow
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            The 6-Step Challenge Pipeline
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            How successful participants transition from initial brainstorming to final live pitch:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx} 
                className="p-6 rounded-2xl glass-card glass-card-hover relative flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-black px-2.5 py-1 rounded bg-cyan-400/15 text-cyan-400 border border-cyan-400/30">
                      PHASE {step.num}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-cyan-400 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-base font-bold text-white font-display">{step.title}</h4>
                  <p className="text-xs font-semibold text-amber-400 mb-2">{step.subtitle}</p>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-white/5">
        <Link
          to="/rules"
          className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-cyan-400 glass-pill hover:bg-white/10 transition-colors"
        >
          Check Rules & Judging Rubric
        </Link>
        <Link
          to="/schedule"
          className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white glass-pill hover:bg-white/10 transition-colors"
        >
          View 2-Day Schedule
        </Link>
      </div>

    </div>
  );
}
