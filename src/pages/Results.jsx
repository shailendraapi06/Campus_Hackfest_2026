import React from 'react';
import { 
  Trophy, 
  Medal, 
  Crown, 
  Calendar,
  Users
} from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import { RESULTS_DATA } from '../data/results';

export default function Results() {
  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* HEADER */}
      <SectionHeading
        badge="Official Final Standings"
        title="Campus HackFest 2026"
        highlight="Results"
        subtitle="Celebrating student innovation, teamwork, and working technology prototypes at Government Polytechnic Kanpur."
      />

      {/* ANNOUNCEMENT STATUS BANNER */}
      <div className="flex items-center justify-center gap-3 mb-16 text-xs sm:text-sm text-slate-300">
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-emerald opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-emerald"></span>
        </span>
        <span>Government Polytechnic Kanpur (IT Department) — {RESULTS_DATA.announcementDate}</span>
      </div>

      {/* ========================================================================= */}
      {/* PODIUM SHOWCASE (1st, 2nd, 3rd) */}
      {/* ========================================================================= */}
      <div className="mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
          
          {/* 2ND PLACE (RUNNER-UP) */}
          <div className="order-2 lg:order-1 p-6 rounded-3xl glass-card border border-slate-400/30 relative flex flex-col justify-between h-full group hover:border-slate-300 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-slate-300/10 border border-slate-300/30 flex items-center justify-center text-slate-200 mb-4">
              <Medal className="w-7 h-7" />
            </div>
            
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300 block">
                {RESULTS_DATA.podium[1].rankTitle}
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-1">
                {RESULTS_DATA.podium[1].teamName}
              </h3>
              <p className="text-sm font-semibold text-brand-purple mt-0.5">
                Project: {RESULTS_DATA.podium[1].projectName}
              </p>

              <div className="mt-3 flex flex-wrap gap-1">
                {RESULTS_DATA.podium[1].members.map((m, idx) => (
                  <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                    {m}
                  </span>
                ))}
              </div>

              <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                {RESULTS_DATA.podium[1].highlight}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400">Final Score:</span>
              <span className="text-2xl font-black font-mono text-white">
                {RESULTS_DATA.podium[1].score}<span className="text-xs text-slate-400">/100</span>
              </span>
            </div>
          </div>

          {/* 1ST PLACE (CHAMPION / WINNER) */}
          <div className="order-1 lg:order-2 p-8 rounded-3xl glass-card border-2 border-amber-400/60 shadow-2xl shadow-amber-500/10 relative flex flex-col justify-between bg-gradient-to-b from-dark-900 via-dark-850 to-dark-900 group hover:border-amber-400 transition-all lg:-translate-y-4">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-dark-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 fill-dark-950" />
              <span>Overall Champion</span>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 mb-6 mt-2">
              <Trophy className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-300 block">
                {RESULTS_DATA.podium[0].rankTitle}
              </span>
              <h3 className="text-3xl font-black text-white mt-1">
                {RESULTS_DATA.podium[0].teamName}
              </h3>
              <p className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400 mt-1">
                Project: {RESULTS_DATA.podium[0].projectName}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {RESULTS_DATA.podium[0].members.map((m, idx) => (
                  <span key={idx} className="text-xs px-2.5 py-0.5 rounded-md bg-amber-400/10 text-amber-300 border border-amber-400/30 font-medium">
                    {m}
                  </span>
                ))}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed">
                {RESULTS_DATA.podium[0].highlight}
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-amber-400/20 flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-300 font-bold block">Champion Honor</span>
                <span className="text-[11px] text-slate-400">{RESULTS_DATA.podium[0].prize}</span>
              </div>
              <span className="text-3xl font-black font-mono text-amber-300">
                {RESULTS_DATA.podium[0].score}<span className="text-xs text-slate-400">/100</span>
              </span>
            </div>
          </div>

          {/* 3RD PLACE (2ND RUNNER-UP) */}
          <div className="order-3 p-6 rounded-3xl glass-card border border-amber-700/40 relative flex flex-col justify-between h-full group hover:border-amber-600 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-700/20 border border-amber-700/40 flex items-center justify-center text-amber-500 mb-4">
              <Medal className="w-7 h-7" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500 block">
                {RESULTS_DATA.podium[2].rankTitle}
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-1">
                {RESULTS_DATA.podium[2].teamName}
              </h3>
              <p className="text-sm font-semibold text-brand-purple mt-0.5">
                Project: {RESULTS_DATA.podium[2].projectName}
              </p>

              <div className="mt-3 flex flex-wrap gap-1">
                {RESULTS_DATA.podium[2].members.map((m, idx) => (
                  <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                    {m}
                  </span>
                ))}
              </div>

              <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                {RESULTS_DATA.podium[2].highlight}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400">Final Score:</span>
              <span className="text-2xl font-black font-mono text-white">
                {RESULTS_DATA.podium[2].score}<span className="text-xs text-slate-400">/100</span>
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* FULL LEADERBOARD TABLE (UPDATED FOR CLEAN PLACEHOLDER DATA) */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/10 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-white">Complete Final Scoreboard</h3>
            <p className="text-xs text-slate-400">Official evaluation rankings based on 100 evaluation marks</p>
          </div>
          <span className="text-xs font-mono text-brand-cyan px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 w-fit">
            {RESULTS_DATA.leaderboard.length} Competing Teams
          </span>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase text-[11px] font-bold">
                <th className="py-3.5 px-4">Rank</th>
                <th className="py-3.5 px-4">Team Name</th>
                <th className="py-3.5 px-4">Project Title</th>
                <th className="py-3.5 px-4 text-center">Score (/100)</th>
                <th className="py-3.5 px-4 text-right">Standing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {RESULTS_DATA.leaderboard.map((row) => (
                <tr key={row.rank} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-brand-cyan">
                    #{row.rank}
                  </td>
                  <td className="py-4 px-4 font-bold text-white">
                    {row.team}
                  </td>
                  <td className="py-4 px-4 text-slate-300 font-medium">
                    {row.project}
                  </td>
                  <td className="py-4 px-4 font-mono font-extrabold text-white text-center text-base">
                    {row.score}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      row.status.includes('Winner') 
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' 
                        : row.status.includes('Runner-Up')
                          ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30'
                          : 'bg-white/5 border border-white/10 text-slate-300'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
