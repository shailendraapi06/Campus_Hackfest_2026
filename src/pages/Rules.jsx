import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Users, 
  Code2, 
  UploadCloud, 
  AlertTriangle, 
  Scale, 
  Bot, 
  CheckCircle2, 
  XCircle,
  Award,
  ArrowRight
} from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import { HACKATHON_CONFIG } from '../config/hackathonConfig';

export default function Rules() {
  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* HEADER */}
      <SectionHeading
        badge="Official Handbook"
        title="Rules & Evaluation"
        highlight="Criteria"
        subtitle="Transparent guidelines to maintain fair play, creative exploration, and an inspiring learning atmosphere."
      />

      {/* 100-MARK JUDGING RUBRIC SECTION */}
      <div className="mb-20">
        <div className="p-8 sm:p-10 rounded-3xl glass-card border border-brand-cyan/30 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-brand-cyan/20 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-brand-cyan">Evaluation Framework</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Judging Criteria (Total: 100 Marks)</h3>
            </div>
          </div>

          <p className="text-sm text-slate-300 mb-8 max-w-3xl">
            Each team is evaluated by the 3rd-year judging panel according to the standardized rubric below. Real-world utility holds the highest single weighting.
          </p>

          <div className="space-y-5">
            {HACKATHON_CONFIG.judgingRubric.map((item, index) => (
              <div key={index} className="p-5 rounded-2xl bg-dark-950/80 border border-white/5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-bold text-brand-cyan">0{index + 1}.</span>
                    <h4 className="text-base font-bold text-white">{item.criterion}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black font-mono text-brand-cyan">{item.marks}</span>
                    <span className="text-xs text-slate-400 font-semibold">/ 100 Marks</span>
                  </div>
                </div>

                {/* Progress bar visual */}
                <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden my-2.5">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink rounded-full transition-all duration-500" 
                    style={{ width: `${item.marks}%` }}
                  />
                </div>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-1">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span>* The decision of the senior judging panel is final and binding for all participants.</span>
            <span className="font-mono font-bold text-white">Total: 100 / 100</span>
          </div>
        </div>
      </div>

      {/* CORE RULE CATEGORIES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        
        {/* 1. ELIGIBILITY */}
        <div className="p-7 rounded-3xl glass-card border border-white/10">
          <div className="flex items-center gap-3 mb-5">
            <ShieldCheck className="w-6 h-6 text-brand-cyan" />
            <h3 className="text-lg font-bold text-white">1. Eligibility Rules</h3>
          </div>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
              <span>Only currently enrolled <strong>1st-year and 2nd-year students of the Information Technology (IT) Department</strong> at Government Polytechnic Kanpur are eligible to compete.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
              <span>3rd-year IT students serve exclusively as organizers, mentors, and judges.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
              <span>One individual can register and participate in <strong>only one team</strong>. Multi-team membership is strictly prohibited.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
              <span>College ID cards must be presented at the check-in desk during morning registration.</span>
            </li>
          </ul>
        </div>

        {/* 2. TEAM CONSTRAINTS */}
        <div className="p-7 rounded-3xl glass-card border border-white/10">
          <div className="flex items-center gap-3 mb-5">
            <Users className="w-6 h-6 text-brand-purple" />
            <h3 className="text-lg font-bold text-white">2. Team Formation</h3>
          </div>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
              <span><strong>Team Size:</strong> Minimum 3 members; maximum 4 members.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
              <span>Each team must designate one <strong>Team Leader</strong> as the official point of contact.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
              <span><strong>IT Department Exclusive:</strong> All team members must be enrolled in the Information Technology Department.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
              <span>Solo registrants can opt into the organizer team-matching pool during registration.</span>
            </li>
          </ul>
        </div>

        {/* 3. DEVELOPMENT & AI POLICY */}
        <div className="p-7 rounded-3xl glass-card border border-white/10">
          <div className="flex items-center gap-3 mb-5">
            <Code2 className="w-6 h-6 text-brand-pink" />
            <h3 className="text-lg font-bold text-white">3. Development & AI Policy</h3>
          </div>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
              <span>The core codebase must be written <strong>during the hackathon sprint</strong> (10:30 AM – 03:30 PM).</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
              <span><strong>AI Tools Allowed:</strong> ChatGPT, Claude, Gemini, and GitHub Copilot are permitted for acceleration and debugging.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-brand-amber shrink-0 mt-0.5" />
              <span><strong>Crucial Requirement:</strong> Team members must be capable of fully explaining every line of code submitted during oral viva/Q&A.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
              <span>Standard open-source packages, libraries, design systems, and public APIs are fully allowed.</span>
            </li>
          </ul>
        </div>

        {/* 4. SUBMISSION REQUIREMENTS */}
        <div className="p-7 rounded-3xl glass-card border border-white/10">
          <div className="flex items-center gap-3 mb-5">
            <UploadCloud className="w-6 h-6 text-brand-emerald" />
            <h3 className="text-lg font-bold text-white">4. Submission Checklist</h3>
          </div>
          <p className="text-xs text-slate-400 mb-3">
            Every team must submit the following before 04:00 PM:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
              <span>Official Team Name & Project Title</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
              <span>Target Problem Statement & Solution Overview</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
              <span>List of Technologies & Frameworks utilized</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
              <span>Public GitHub Repository Link with README</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
              <span>Live Deployment / Demo URL (e.g. Netlify, Vercel), if applicable</span>
            </li>
          </ul>
        </div>

      </div>

      {/* DISQUALIFICATION CRITERIA */}
      <div className="p-8 rounded-3xl bg-rose-950/20 border border-rose-500/30 mb-16">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-rose-400" />
          <h3 className="text-xl font-bold text-white">Disqualification Criteria</h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 mb-4">
          Any of the following actions will result in immediate disqualification and forfeiture of awards:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300">
          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-black/30">
            <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>Direct plagiarism or copying another student's/team's project.</span>
          </div>
          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-black/30">
            <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>Submitting an existing complete project built prior to the event.</span>
          </div>
          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-black/30">
            <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>Falsification of participant identities, year of study, or fake payment screenshot.</span>
          </div>
          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-black/30">
            <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>Misconduct or harassment towards peers, organizers, or mentors.</span>
          </div>
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div className="text-center">
        <Link
          to="/register"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-brand-cyan text-dark-950 hover:bg-cyan-300 transition-colors shadow-glow-cyan"
        >
          <span>I Agree to The Rules — Register Now</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
