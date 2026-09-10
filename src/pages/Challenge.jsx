import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Lightbulb, 
  Wrench, 
  CheckCircle, 
  Presentation, 
  TrendingUp, 
  ArrowRight,
  GraduationCap,
  BookOpen,
  HeartPulse,
  Leaf,
  ShieldAlert,
  Bus,
  Coins,
  Sprout,
  Users,
  Sparkles,
  Info
} from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import { HACKATHON_CONFIG } from '../config/hackathonConfig';

// Map icon string names to Lucide icons
const iconMap = {
  GraduationCap: GraduationCap,
  BookOpen: BookOpen,
  HeartPulse: HeartPulse,
  Leaf: Leaf,
  ShieldAlert: ShieldAlert,
  Bus: Bus,
  Coins: Coins,
  Sprout: Sprout,
  Users: Users,
  Sparkles: Sparkles
};

export default function Challenge() {
  const steps = [
    {
      num: "01",
      title: "Identify",
      subtitle: "Genuine Real Problem",
      icon: Target,
      desc: "Spot an authentic friction point in your daily routine, campus environment, local neighborhood, or society. Avoid abstract or artificial problems."
    },
    {
      num: "02",
      title: "Understand",
      subtitle: "Root Cause & Stakeholders",
      icon: Lightbulb,
      desc: "Analyse why existing systems fail to resolve this issue. Who is affected? What constraints exist (connectivity, cost, accessibility)?"
    },
    {
      num: "03",
      title: "Design & Build",
      subtitle: "Tech-Based Prototype",
      icon: Wrench,
      desc: "Select practical web, mobile, or hardware tools. Engineer a lightweight, working functional prototype during the 7-hour sprint."
    },
    {
      num: "04",
      title: "Test",
      subtitle: "Validate User Flow",
      icon: CheckCircle,
      desc: "Verify that the core end-to-end user journey works cleanly without blocking bugs. Handle realistic inputs."
    },
    {
      num: "05",
      title: "Demonstrate",
      subtitle: "Live Working Demo",
      icon: Presentation,
      desc: "Showcase the application running live in front of the 3rd-year judging panel. Walk through the core functionality with confidence."
    },
    {
      num: "06",
      title: "Impact",
      subtitle: "Tangible Real-World Value",
      icon: TrendingUp,
      desc: "Demonstrate how adoption of this prototype will save time, reduce costs, enhance accessibility, or improve student life."
    }
  ];

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* HEADER */}
      <SectionHeading
        badge="The Challenge"
        title="Theme: Solve a"
        highlight="Real Problem"
        subtitle="We challenge 1st & 2nd year innovators to move beyond toy clones. Identify genuine everyday pain points and engineer practical technology prototypes."
      />

      {/* CORE PHILOSOPHY CALLOUT */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-cyan/10 via-brand-purple/10 to-transparent border border-brand-cyan/30 mb-20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              "Don't build for an imaginary unicorn startup. Build for the people around you."
            </h3>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              At Campus HackFest, an app that solves 100 students' daily hostel mess token disputes or helps classmates navigate college lectures scores higher than an incomplete, buzzword-heavy clone.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              to="/register"
              className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-brand-cyan text-dark-950 hover:bg-cyan-300 transition-colors shadow-glow-cyan"
            >
              Enter HackFest (₹50)
            </Link>
          </div>
        </div>
      </div>

      {/* THE 6-STEP PROCESS PIPELINE */}
      <div className="mb-24">
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-cyan block mb-2">
            Systematic Methodology
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            The 6-Step Challenge Pipeline
          </h3>
          <p className="text-sm text-slate-400 mt-2">
            How every successful team progresses throughout the sprint:
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
                    <span className="text-xs font-mono font-black px-2.5 py-1 rounded bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30">
                      STEP {step.num}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-brand-cyan transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-white">{step.title}</h4>
                  <p className="text-xs font-semibold text-brand-purple mb-2">{step.subtitle}</p>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 10 EXPLORATION DOMAINS */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-purple block mb-2">
            Inspiration Tracks
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            10 Example Problem Domains
          </h3>
          <p className="text-sm text-slate-400 mt-2 max-w-2xl mx-auto">
            These tracks are illustrative starting points to inspire your team. You are free to tackle any domain as long as it solves a real problem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HACKATHON_CONFIG.domains.map((domain, index) => {
            const IconComponent = iconMap[domain.icon] || Sparkles;
            return (
              <div 
                key={domain.id} 
                className="p-6 rounded-2xl glass-card glass-card-hover flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-cyan/20 to-brand-purple/20 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400">Track {String(index + 1).padStart(2, '0')}</span>
                      <h4 className="text-base font-bold text-white">{domain.title}</h4>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {domain.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-brand-cyan">
                  <span>Open for all 1st & 2nd years</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FREEDOM NOTICE */}
      <div className="p-6 rounded-2xl bg-dark-900/60 border border-white/10 flex items-start gap-4 mb-16">
        <Info className="w-6 h-6 text-brand-cyan shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-slate-300">
          <strong className="text-white">Note on Problem Selection:</strong> You do NOT have to choose from the list above. Any authentic, well-reasoned problem—whether technical, ecological, social, or institutional—is completely welcome. What matters is that your team can justify why it matters and demonstrate a functioning solution.
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-white/5">
        <Link
          to="/rules"
          className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-brand-cyan glass-pill hover:bg-white/10 transition-colors"
        >
          Check Rules & Judging Rubric
        </Link>
        <Link
          to="/schedule"
          className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white glass-pill hover:bg-white/10 transition-colors"
        >
          View Day Schedule
        </Link>
      </div>

    </div>
  );
}
