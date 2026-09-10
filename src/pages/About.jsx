import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  GraduationCap, 
  HeartHandshake, 
  Code, 
  Target, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Terminal,
  HelpCircle,
  Award
} from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import { HACKATHON_CONFIG } from '../config/hackathonConfig';

export default function About() {
  const pillars = [
    {
      icon: HeartHandshake,
      title: "Senior-to-Junior Mentorship",
      desc: "Organized by 3rd-year students who have walked in your shoes. We don't just judge; we sit with you to troubleshoot bugs, configure Git, and guide architecture."
    },
    {
      icon: Target,
      title: "Solve Authentic Problems",
      desc: "We prioritize real-world utility over flashy slides. Whether you fix college bus scheduling or hostel mess waste, practical solutions always win."
    },
    {
      icon: ShieldCheck,
      title: "Accessible & Fair",
      desc: "Exclusively for 1st and 2nd years to ensure an equitable playing field. Transparent 100-mark judging criteria without arbitrary decisions."
    },
    {
      icon: Code,
      title: "Clean Code & Understanding",
      desc: "Use modern open-source stacks and AI assistants responsibly. What matters most is that you genuinely understand every component of your build."
    }
  ];

  const organizingTeamStructure = [
    {
      area: "Core Mentorship & Architecture",
      members: "3rd-Year Full-Stack & Systems Leads",
      responsibility: "Assisting teams with Git workflows, backend/frontend connectivity, API integrations, and live debugging."
    },
    {
      area: "Evaluation & Quality Review",
      members: "Senior Academic & Technical Panel",
      responsibility: "Conducting fair, unbiased evaluations based on the 100-point rubric, code sanity checks, and live demonstrations."
    },
    {
      area: "Platform, Logistics & Operations",
      members: "Student Organizing Committee",
      responsibility: "Managing desk check-ins, lab Wi-Fi allocations, payment verification via Google Sheets, and schedules."
    }
  ];

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* HEADER */}
      <SectionHeading
        badge="About The Event"
        title="By Students. For Students."
        highlight="Campus HackFest"
        subtitle="A collaborative tech sprint designed for IT Department students of Government Polytechnic Kanpur."
      />

      {/* ORIGIN STORY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
        <div className="lg:col-span-7 space-y-5 text-slate-300 leading-relaxed">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Bridging the Gap Between Classroom Theory and Real-World Building
          </h3>
          <p>
            Many first- and second-year students find massive inter-college hackathons intimidating. Faced with complex industry jargon, unfamiliar frameworks, and experienced teams, beginners frequently hesitate to step forward.
          </p>
          <p>
            <strong className="text-brand-cyan">Campus HackFest 2026</strong> was established by our 3rd-year IT seniors at Government Polytechnic Kanpur to eliminate that barrier. We have structured this one-day event (10:00 AM – 05:00 PM) to provide a friendly, high-energy environment where 1st and 2nd-year IT students can experience the thrill of building a complete software prototype from scratch.
          </p>
          <p className="text-slate-400 text-sm">
            With approximately 40–60 IT students grouped into 10–15 teams of 3–4 members, each squad receives dedicated attention and mentorship throughout every phase of the sprint.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-brand-purple/30 relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-purple/20 border border-brand-purple/30 flex items-center justify-center text-brand-purple">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Event Snapshot</h4>
                <p className="text-xs text-brand-purple font-medium">{HACKATHON_CONFIG.organizerNotice}</p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Target Audience</span>
                <span className="font-semibold text-white">1st & 2nd Year Students</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Team Size</span>
                <span className="font-semibold text-white">3–4 Members</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Total Scale</span>
                <span className="font-semibold text-white">40–60 Hackers (10–15 Teams)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Nominal Entry Fee</span>
                <span className="font-semibold text-brand-cyan font-mono">₹50 / participant</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Event Time</span>
                <span className="font-semibold text-white">10:00 AM – 05:00 PM</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">Primary Goal</span>
                <span className="font-semibold text-brand-purple">Build Working Prototype</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 CORE PILLARS */}
      <div className="mb-20">
        <h3 className="text-2xl font-bold text-white text-center mb-10">
          Our Guiding Philosophy
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl glass-card glass-card-hover flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ORGANIZING COMMITTEE BREAKDOWN */}
      <div className="mb-20">
        <div className="p-8 rounded-3xl glass-card border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-brand-cyan" />
            <h3 className="text-xl font-bold text-white">
              3rd-Year Organizing Committee Structure
            </h3>
          </div>
          <p className="text-sm text-slate-400 mb-8 max-w-3xl">
            A dedicated squad of 10–15 senior students manages the entire hackathon operations, technical support, and data pipeline using Google Sheets:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {organizingTeamStructure.map((col, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-dark-950/80 border border-white/5">
                <h4 className="text-sm font-bold text-brand-cyan mb-1">{col.area}</h4>
                <span className="text-xs font-mono text-brand-purple block mb-3">{col.members}</span>
                <p className="text-xs text-slate-400 leading-relaxed">{col.responsibility}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA FOOTER */}
      <div className="text-center pt-8 border-t border-white/5">
        <p className="text-sm text-slate-400 mb-4">
          Want to see the problem statement guidelines and domain inspiration?
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/challenge"
            className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-brand-cyan text-dark-950 hover:bg-cyan-300 transition-colors"
          >
            Explore The Challenge
          </Link>
          <Link
            to="/rules"
            className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white glass-pill hover:bg-white/10 transition-colors"
          >
            Review Hackathon Rules
          </Link>
        </div>
      </div>

    </div>
  );
}
