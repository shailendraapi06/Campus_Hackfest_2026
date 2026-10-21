import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Users, 
  Code2, 
  UploadCloud, 
  AlertTriangle, 
  Scale, 
  CheckCircle2, 
  XCircle,
  ArrowRight,
  UserCheck,
  Calendar,
  Wallet,
  Sparkles
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
        highlight="Guidelines"
        subtitle="Clear, transparent rules governing Techfest Hackathon and Rays of Raunak Cultural Fest 2026."
      />

      {/* KEY EVENT DATES & PARTICIPATION SUMMARY BANNER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="p-6 rounded-3xl glass-card border border-cyan-400/30">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
            <Calendar className="w-4 h-4" />
            <span>Day 01 — Hackathon</span>
          </div>
          <h4 className="text-xl font-bold text-white font-display">Techfest 2026</h4>
          <p className="text-sm font-semibold text-cyan-300 mt-1">27 October 2026</p>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Full-day intensive hackathon sprint from 10:00 AM to 05:00 PM in the IT Department Labs.
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-card border border-amber-400/30">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Day 02 — Cultural Fest</span>
          </div>
          <h4 className="text-xl font-bold text-white font-display">Rays of Raunak</h4>
          <p className="text-sm font-semibold text-amber-300 mt-1">28 October 2026 (11 AM – 5 PM)</p>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Tagline: <em>"Let Every Talent Shine"</em>. Student performances followed by Techfest results & prize distribution.
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-card border border-emerald-400/30">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-2">
            <Wallet className="w-4 h-4" />
            <span>Compulsory Entry Fee</span>
          </div>
          <h4 className="text-xl font-bold text-white font-display">₹200 Per Participant</h4>
          <p className="text-sm font-semibold text-emerald-300 mt-1">Compulsory for All Competitors</p>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Fee is per participant (not per team). Collected and recorded separately by the organizing desk.
          </p>
        </div>
      </div>

      {/* CORE RULE CATEGORIES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        
        {/* 1. ELIGIBILITY */}
        <div className="p-7 rounded-3xl glass-card border border-white/10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-cyan-400 tracking-wider">Category 01</span>
              <h3 className="text-lg font-bold text-white font-display">Participant Eligibility</h3>
            </div>
          </div>
          <ul className="space-y-3.5 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>First-Year Students:</strong> Currently enrolled 1st-year students of Government Polytechnic Kanpur may participate.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Second-Year Students:</strong> Currently enrolled 2nd-year students of Government Polytechnic Kanpur may participate.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span><strong>Third-Year Seniors:</strong> 3rd-year students act exclusively as organizers, seniors, or technical mentors who guide teams. They are not ordinary eligible participants and are never counted toward a participating team's size.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>College ID Mandatory:</strong> All participants must present their valid College ID card at desk check-in.</span>
            </li>
          </ul>
        </div>

        {/* 2. TEAM & INDIVIDUAL PARTICIPATION */}
        <div className="p-7 rounded-3xl glass-card border border-white/10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-purple-400 tracking-wider">Category 02</span>
              <h3 className="text-lg font-bold text-white font-display">Individual & Team Participation</h3>
            </div>
          </div>
          <ul className="space-y-3.5 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-2.5">
              <UserCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span><strong>Individual / Solo Participation:</strong> A student is completely allowed to register and compete as an individual participant without entering fake teammates.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Users className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <span><strong>Team Size Limits:</strong> For participants entering as a team, the minimum team size is <strong>3 eligible student participants</strong> and the maximum team size is <strong>5 eligible student participants</strong>.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Mentors Not Counted:</strong> Any 3rd-year student organizer or senior mentor assisting a team does NOT count as a participating team member.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Single Membership:</strong> A participant can only belong to one project team. Cross-competing is strictly prohibited.</span>
            </li>
          </ul>
        </div>

        {/* 3. CODE, TOOLS & AI POLICY */}
        <div className="p-7 rounded-3xl glass-card border border-white/10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-pink-500/15 text-pink-400 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-pink-400 tracking-wider">Category 03</span>
              <h3 className="text-lg font-bold text-white font-display">Development & AI Assistant Policy</h3>
            </div>
          </div>
          <ul className="space-y-3.5 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>The core code and project implementation must be built during the official Techfest Hackathon sprint on 27 October 2026.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>AI Tools Permitted:</strong> AI development tools (ChatGPT, Claude, Gemini, GitHub Copilot) are allowed to accelerate learning and assist debugging.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Viva & Comprehension:</strong> Participants must be able to thoroughly explain their code, logic, and architecture during the judges' live Q&A round.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Open-source packages, third-party libraries, CSS frameworks, and public APIs are fully encouraged.</span>
            </li>
          </ul>
        </div>

        {/* 4. SUBMISSION CHECKLIST */}
        <div className="p-7 rounded-3xl glass-card border border-white/10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-emerald-400 tracking-wider">Category 04</span>
              <h3 className="text-lg font-bold text-white font-display">Sprint Submission Deliverables</h3>
            </div>
          </div>
          <p className="text-xs text-slate-400 mb-3">
            Every team or solo developer must submit the following before 04:00 PM on 27 October:
          </p>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Project Title & Targeted Problem Area</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Concise summary of the solution and target audience</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Public GitHub repository link with setup instructions</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Live functional demo link (Netlify, Vercel, or local terminal demo)</span>
            </li>
          </ul>
        </div>

      </div>

      {/* 100-MARK JUDGING RUBRIC SECTION */}
      <div className="mb-20">
        <div className="p-8 sm:p-10 rounded-3xl glass-card border border-cyan-400/30 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-cyan-400/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-mono font-bold tracking-widest text-cyan-400">Evaluation Standards</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">Judging Criteria (Total: 100 Marks)</h3>
            </div>
          </div>

          <p className="text-sm text-slate-300 mb-8 max-w-3xl leading-relaxed">
            Evaluations are conducted objectively by senior judges. Authentic real-world utility carries the single highest score weighting.
          </p>

          <div className="space-y-5">
            {HACKATHON_CONFIG.judgingRubric.map((item, index) => (
              <div key={index} className="p-5 rounded-2xl bg-[#070a12] border border-white/5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-bold text-cyan-400">0{index + 1}.</span>
                    <h4 className="text-base font-bold text-white">{item.criterion}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black font-mono text-cyan-400">{item.marks}</span>
                    <span className="text-xs text-slate-400 font-semibold">/ 100 Marks</span>
                  </div>
                </div>

                {/* Progress bar visual */}
                <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden my-2.5">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-400 rounded-full transition-all duration-500" 
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
            <span>* Winners will be officially declared on the Rays of Raunak Cultural Stage on 28 October 2026.</span>
            <span className="font-mono font-bold text-white">Total: 100 Marks</span>
          </div>
        </div>
      </div>

      {/* DISQUALIFICATION CRITERIA */}
      <div className="p-8 rounded-3xl bg-rose-950/20 border border-rose-500/30 mb-16">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-rose-400" />
          <h3 className="text-xl font-bold text-white font-display">Code of Conduct & Disqualifications</h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
          Fair play and respectful peer collaboration are paramount. The following infractions result in immediate disqualification:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300">
          <div className="flex items-start gap-2 p-3 rounded-xl bg-black/40">
            <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>Direct plagiarism or copying code without attribution or understanding.</span>
          </div>
          <div className="flex items-start gap-2 p-3 rounded-xl bg-black/40">
            <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>Submitting projects built prior to the hackathon kickoff.</span>
          </div>
          <div className="flex items-start gap-2 p-3 rounded-xl bg-black/40">
            <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>Misrepresentation of participant year of study or identity.</span>
          </div>
          <div className="flex items-start gap-2 p-3 rounded-xl bg-black/40">
            <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>Disruptive conduct towards peers, faculty, or student organizers.</span>
          </div>
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div className="text-center">
        <Link
          to="/register"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-amber-300 text-dark-950 hover:brightness-110 transition-all shadow-glow-cyan"
        >
          <span>I Understand The Rules — Register Now</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
