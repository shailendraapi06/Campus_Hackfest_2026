import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  ExternalLink, 
  FolderGit2, 
  Crown, 
  ShieldCheck,
  CheckCircle
} from 'lucide-react';
import GithubIcon from '../components/common/GithubIcon';
import SectionHeading from '../components/common/SectionHeading';
import { TEAMS_DATA } from '../data/teams';

export default function Teams() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered teams list based on search query
  const filteredTeams = useMemo(() => {
    if (!searchQuery.trim()) return TEAMS_DATA;

    const q = searchQuery.toLowerCase();
    return TEAMS_DATA.filter((team) => {
      return (
        team.teamName.toLowerCase().includes(q) ||
        team.projectName.toLowerCase().includes(q) ||
        team.leader.toLowerCase().includes(q) ||
        team.teamId.toLowerCase().includes(q) ||
        team.members.some((m) => m.toLowerCase().includes(q))
      );
    });
  }, [searchQuery]);

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* HEADER */}
      <SectionHeading
        badge="Participant Roster"
        title="Meet The"
        highlight="Teams"
        subtitle="Explore the student teams competing in Campus HackFest 2026 at Government Polytechnic Kanpur."
      />

      {/* PRIVACY NOTICE BANNER */}
      <div className="max-w-3xl mx-auto mb-8 p-4 rounded-2xl bg-dark-900/80 border border-white/10 flex items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-brand-emerald shrink-0" />
          <span>Public Directory: Government Polytechnic Kanpur (Information Technology Department).</span>
        </div>
        <span className="font-mono text-white shrink-0">{TEAMS_DATA.length} Registered Teams</span>
      </div>

      {/* SEARCH BAR (NO FILTER PILLS) */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by team name, project title, member, or team ID..."
            className="w-full pl-12 pr-16 py-3.5 rounded-2xl bg-dark-900/90 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan transition-colors text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-white/5"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* TEAMS GRID */}
      {filteredTeams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((team) => (
            <div 
              key={team.teamId} 
              className="p-6 rounded-3xl glass-card glass-card-hover flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Card Header: Team ID & Status */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-black text-brand-cyan px-2.5 py-1 rounded bg-brand-cyan/10 border border-brand-cyan/25">
                    {team.teamId}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>{team.status || 'Registered'}</span>
                  </span>
                </div>

                {/* Team Name & Project */}
                <h3 className="text-xl font-extrabold text-white group-hover:text-brand-cyan transition-colors">
                  {team.teamName}
                </h3>
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-brand-purple font-semibold">
                  <FolderGit2 className="w-3.5 h-3.5" />
                  <span>Project: {team.projectName}</span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 mt-3 line-clamp-3 leading-relaxed">
                  {team.description}
                </p>

                {/* Leader & Members Roster */}
                <div className="mt-5 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold mb-2.5">
                    <Crown className="w-3.5 h-3.5 fill-amber-400" />
                    <span>Leader: {team.leader}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider block">
                      Team Members ({team.members.length}):
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {team.members.map((m, idx) => (
                        <span 
                          key={idx} 
                          className="px-2.5 py-1 rounded-lg bg-dark-950 border border-white/10 text-xs text-slate-300 font-medium"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer: Action Links */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                {team.github ? (
                  <a
                    href={team.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-dark-950 px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/25 transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5 text-brand-cyan" />
                    <span>Repository</span>
                  </a>
                ) : (
                  <span className="text-[11px] text-slate-500 italic">Code Repository (Kickoff)</span>
                )}

                {team.demo ? (
                  <a
                    href={team.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-cyan hover:underline"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-[11px] text-slate-500 italic">Demo Link</span>
                )}
              </div>

            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 p-8 rounded-3xl glass-card max-w-md mx-auto">
          <Users className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <h4 className="text-base font-bold text-white">No teams match your search</h4>
          <p className="text-xs text-slate-400 mt-1">
            Try searching by team name (e.g. "Team 1"), project (e.g. "Project XYZ"), or member.
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-4 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-brand-cyan hover:bg-white/10"
          >
            Clear Search
          </button>
        </div>
      )}

    </div>
  );
}
