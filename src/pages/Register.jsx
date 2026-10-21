import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  User,
  Code,
  Users,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  Copy,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  UserPlus,
  Calendar,
  Wallet,
  Check,
  Info
} from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import { submitRegistration } from '../services/googleSheets';

const AVAILABLE_SKILLS = [
  'HTML/CSS',
  'JavaScript',
  'React',
  'Python',
  'Java',
  'C/C++',
  'PHP',
  'Django',
  'AI/ML',
  'UI/UX Design',
  'Android Development',
  'Flutter',
  'Node.js / Express',
  'Git / GitHub'
];

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    year: '1st Year',
    email: '',
    phone: '',
    skills: [],
    otherSkill: '',
    participationType: 'individual', // 'individual' or 'team'
    teamName: '',
    teamLeader: '',
    teamMembers: ['', '', '', ''], // supports up to 4 additional members (total 5)
    problemIdea: '',
    shortIdea: '',
    // Section E: Fee Payment Status
    feePaid: '', // 'Paid' or 'Not Paid'
    paymentMethod: '' // 'Cash' or 'Online'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [copiedId, setCopiedId] = useState(false);

  // Field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // If user switches feePaid to 'Not Paid', reset paymentMethod
      if (name === 'feePaid' && value === 'Not Paid') {
        updated.paymentMethod = '';
      }
      return updated;
    });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Skill toggle handler
  const toggleSkill = (skill) => {
    setFormData((prev) => {
      const exists = prev.skills.includes(skill);
      return {
        ...prev,
        skills: exists
          ? prev.skills.filter((s) => s !== skill)
          : [...prev.skills, skill]
      };
    });
    if (errors.skills) {
      setErrors((prev) => ({ ...prev, skills: null }));
    }
  };

  // Team member name handler
  const handleMemberChange = (index, value) => {
    setFormData((prev) => {
      const updated = [...prev.teamMembers];
      updated[index] = value;
      return { ...prev, teamMembers: updated };
    });
    if (errors.teamMembers) {
      setErrors((prev) => ({ ...prev, teamMembers: null }));
    }
  };

  // Copy Assigned Registration ID
  const copyRegId = () => {
    if (submissionResult?.registrationId) {
      navigator.clipboard.writeText(submissionResult.registrationId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  // Quick demo auto-filler for testing
  const fillDemoData = (type = 'individual') => {
    const randomId = Math.floor(100 + Math.random() * 900);
    const randomPhone = '98' + Math.floor(10000000 + Math.random() * 90000000);

    if (type === 'team') {
      setFormData({
        fullName: 'Aarav Sharma',
        year: '2nd Year',
        email: `aarav.team${randomId}@gpkanpur.edu`,
        phone: randomPhone,
        skills: ['React', 'JavaScript', 'Python', 'UI/UX Design'],
        otherSkill: 'Tailwind, Git',
        participationType: 'team',
        teamName: `Neural Vanguard ${randomId}`,
        teamLeader: 'Aarav Sharma',
        teamMembers: ['Rohan Gupta', 'Priya Verma', 'Ananya Singh', ''],
        problemIdea: 'Hostel mess inventory optimizer and real-time meal token tracker',
        shortIdea: 'A web app calculating student headcounts to minimize food wastage',
        feePaid: 'Paid',
        paymentMethod: 'Online'
      });
    } else if (type === 'need_team') {
      setFormData({
        fullName: 'Vikram Joshi',
        year: '1st Year',
        email: `vikram.needteam${randomId}@gpkanpur.edu`,
        phone: randomPhone,
        skills: ['Python', 'AI/ML', 'JavaScript'],
        otherSkill: 'Flask, Git',
        participationType: 'need_team',
        teamName: '',
        teamLeader: '',
        teamMembers: ['', '', '', ''],
        problemIdea: 'Automated campus attendance and student skill matchmaking system',
        shortIdea: 'A web app connecting students with complementary skillsets for hackathons',
        feePaid: 'Paid',
        paymentMethod: 'Online'
      });
    } else {
      setFormData({
        fullName: 'Ishita Patel',
        year: '1st Year',
        email: `ishita.solo${randomId}@gpkanpur.edu`,
        phone: randomPhone,
        skills: ['HTML/CSS', 'JavaScript', 'Python'],
        otherSkill: 'Figma',
        participationType: 'individual',
        teamName: `Solo Vanguard ${randomId}`,
        teamLeader: '',
        teamMembers: ['', '', '', ''],
        problemIdea: 'Smart lost and found desk platform for campus labs and library',
        shortIdea: 'A lightweight portal with image matching for recovering lost items',
        feePaid: 'Paid',
        paymentMethod: 'Cash'
      });
    }
    setErrors({});
  };

  // Validate form before submit
  const validate = () => {
    const newErrors = {};
    let firstInvalidId = null;

    // Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
      if (!firstInvalidId) firstInvalidId = 'input-fullName';
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
      if (!firstInvalidId) firstInvalidId = 'input-email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
      if (!firstInvalidId) firstInvalidId = 'input-email';
    }

    // Phone
    const cleanPhone = formData.phone.replace(/[\s\-+()]/g, '').replace(/^91/, '').replace(/^0/, '');
    if (!cleanPhone) {
      newErrors.phone = 'Mobile / WhatsApp number is required.';
      if (!firstInvalidId) firstInvalidId = 'input-phone';
    } else if (cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
      if (!firstInvalidId) firstInvalidId = 'input-phone';
    }

    // Skills
    if (formData.skills.length === 0 && !formData.otherSkill.trim()) {
      newErrors.skills = 'Select at least one skill or specify in the text field.';
      if (!firstInvalidId) firstInvalidId = 'section-skills';
    }

    // Team validation (Only when participationType === 'team')
    if (formData.participationType === 'team') {
      if (!formData.teamName.trim()) {
        newErrors.teamName = 'Team name is required for team participation.';
        if (!firstInvalidId) firstInvalidId = 'input-teamName';
      }
      if (!formData.teamLeader.trim()) {
        newErrors.teamLeader = 'Designated team leader name is required.';
        if (!firstInvalidId) firstInvalidId = 'input-teamLeader';
      }

      // Valid members check: leader + teammates
      // Minimum team size is 3 eligible student participants; Maximum is 5 eligible student participants.
      const validTeammates = formData.teamMembers.filter((m) => m && m.trim().length > 0);
      const totalTeamSize = 1 + validTeammates.length; // Leader + teammates

      if (totalTeamSize < 3) {
        newErrors.teamMembers = `Teams must have at least 3 eligible student members (Leader + at least 2 teammates). Current: ${totalTeamSize} member(s).`;
        if (!firstInvalidId) firstInvalidId = 'input-teamMembers';
      } else if (totalTeamSize > 5) {
        newErrors.teamMembers = `Teams cannot exceed 5 eligible student members. Current: ${totalTeamSize} members.`;
        if (!firstInvalidId) firstInvalidId = 'input-teamMembers';
      }
    } else if (formData.participationType === 'individual') {
      if (!formData.teamName.trim()) {
        newErrors.teamName = 'Team name is required. (Enter your solo team name or project handle)';
        if (!firstInvalidId) firstInvalidId = 'input-soloTeamName';
      }
    }

    // Section E: Fee Payment Status validation
    if (!formData.feePaid) {
      newErrors.feePaid = 'Please indicate whether you have paid the participation fee.';
      if (!firstInvalidId) firstInvalidId = 'section-fee-status';
    } else if (formData.feePaid === 'Paid') {
      if (!formData.paymentMethod) {
        newErrors.paymentMethod = 'Please specify your payment method (Cash or Online).';
        if (!firstInvalidId) firstInvalidId = 'section-payment-method';
      }
    }

    setErrors(newErrors);

    if (firstInvalidId) {
      const el = document.getElementById(firstInvalidId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (el.focus) el.focus();
      }
    }

    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setErrors({});

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitRegistration(formData);
      setSubmissionResult(result);

      // Fire celebratory confetti!
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });

      window.scrollTo({ top: 50, behavior: 'smooth' });
    } catch (err) {
      console.error('Submission failed:', err);
      setErrors((prev) => ({
        ...prev,
        form: err.message || 'Submission failed. Please check your details and try again.'
      }));
      const errBanner = document.getElementById('form-error-banner');
      if (errBanner) {
        errBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* HEADER */}
      <SectionHeading
        badge="Official Registration"
        title="Techfest 2026"
        highlight="Registration"
        subtitle="Open for 1st & 2nd Year Students • Government Polytechnic Kanpur • Compulsory Fee: ₹200 per participant"
      />

      {/* SUCCESS CONFIRMATION SCREEN */}
      {submissionResult ? (
        <div className="p-8 sm:p-12 rounded-3xl glass-card border border-emerald-500/40 shadow-glow-emerald/30 text-center animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-6">
            <CheckCircle className="w-8 h-8" />
          </div>

          <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">
            Registration Confirmed
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-2 font-display">
            Welcome to Techfest × Rays of Raunak 2026!
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
            Your registration has been successfully recorded. Save your official Registration ID below for desk reporting on event day.
          </p>

          {/* REGISTRATION ID TICKET */}
          <div className="p-6 rounded-2xl bg-[#070a12] border border-cyan-400/30 max-w-sm mx-auto mb-6 shadow-inner">
            <span className="text-[11px] text-slate-400 font-semibold block uppercase tracking-wider">
              Your Official Registration ID
            </span>
            <div className="flex items-center justify-center gap-3 mt-2">
              <span className="text-2xl sm:text-3xl font-black font-mono text-cyan-300 tracking-wider">
                {submissionResult.registrationId}
              </span>
              <button
                type="button"
                onClick={copyRegId}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                title="Copy Registration ID"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            {copiedId && (
              <span className="text-[11px] text-emerald-400 font-medium block mt-1">
                Copied to clipboard!
              </span>
            )}

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-between text-xs text-slate-300 text-left">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Mode</span>
                <span className="font-semibold text-white">{submissionResult.participationType}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block uppercase">Fee Status</span>
                <span className={`font-semibold ${submissionResult.paymentStatus === 'Paid' ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {submissionResult.paymentStatus === 'Paid' ? `Paid (${submissionResult.paymentMethod || 'Confirmed'})` : 'Collection Pending'}
                </span>
              </div>
            </div>
          </div>

          {/* Next Steps Checklist */}
          <div className="text-left max-w-md mx-auto space-y-3 mb-8 text-xs sm:text-sm text-slate-300">
            <h4 className="font-bold text-white text-center sm:text-left">What Happens Next:</h4>
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <Calendar className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>Day 1 — 27 October 2026:</strong> Report to the IT Department labs for Techfest Hackathon check-in with your College ID card.
              </span>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Day 2 — 28 October 2026:</strong> Join Rays of Raunak Cultural Fest at 11:00 AM in the auditorium. Hackathon results & awards will be presented on stage!
              </span>
            </div>
            {submissionResult.participationType === 'Looking for Team' && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
                <Users className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Team Matchmaking at Desk:</strong> On 27 Oct morning (10:00 AM), inform the registration desk that you are in "Need a Team" mode. Mentors will connect you with fellow innovators!
                </span>
              </div>
            )}
            {submissionResult.paymentStatus !== 'Paid' && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
                <Wallet className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Please complete the compulsory ₹200 participant fee with your student organizers/seniors before the event morning.
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/schedule"
              className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-amber-300 text-dark-950 hover:brightness-110 transition-all shadow-md"
            >
              View Full 2-Day Schedule
            </Link>
            <Link
              to="/challenge"
              className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white glass-pill hover:bg-white/10 transition-colors"
            >
              Explore Challenge Themes
            </Link>
          </div>
        </div>
      ) : (
        /* REGISTRATION FORM */
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Form-level error banner */}
          {errors.form && (
            <div
              id="form-error-banner"
              className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-start gap-3 text-rose-300 text-sm"
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{errors.form}</span>
            </div>
          )}

          {/* Quick Info Callout */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                Participate as <strong>Solo</strong>, with a <strong>Team of 3–5</strong>, or in <strong>Need a Team</strong> matchmaking mode. Fee: <strong>₹200 per participant</strong>.
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => fillDemoData('individual')}
                className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 underline"
              >
                Auto Solo
              </button>
              <span className="text-slate-600">•</span>
              <button
                type="button"
                onClick={() => fillDemoData('team')}
                className="text-[11px] font-mono text-purple-400 hover:text-purple-300 underline"
              >
                Auto Team
              </button>
              <span className="text-slate-600">•</span>
              <button
                type="button"
                onClick={() => fillDemoData('need_team')}
                className="text-[11px] font-mono text-amber-400 hover:text-amber-300 underline"
              >
                Auto No Team Yet
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION A: PERSONAL INFORMATION */}
          {/* ========================================================================= */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/10">
            <div className="flex items-center gap-3 pb-6 border-b border-white/5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  Section A — Personal Information
                </h3>
                <p className="text-xs text-slate-400">Essential contact details for registration and event check-in.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label htmlFor="input-fullName" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  id="input-fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className={`w-full px-4 py-3 rounded-xl bg-[#070a12] border text-white placeholder-slate-500 focus:outline-none transition-colors text-sm ${
                    errors.fullName ? 'border-rose-500' : 'border-white/10 focus:border-cyan-400'
                  }`}
                />
                {errors.fullName && <p className="text-xs text-rose-400 mt-1">{errors.fullName}</p>}
              </div>

              {/* Year of Study */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Year of Study <span className="text-rose-400">*</span>
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#070a12] border border-white/10 text-white focus:outline-none focus:border-cyan-400 transition-colors text-sm"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  1st, 2nd, and 3rd-year students can register for participation or team coordination.
                </p>
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="input-email" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  id="input-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@gpkanpur.edu or personal email"
                  className={`w-full px-4 py-3 rounded-xl bg-[#070a12] border text-white placeholder-slate-500 focus:outline-none transition-colors text-sm ${
                    errors.email ? 'border-rose-500' : 'border-white/10 focus:border-cyan-400'
                  }`}
                />
                {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="input-phone" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Phone / WhatsApp Number <span className="text-rose-400">*</span>
                </label>
                <input
                  type="tel"
                  id="input-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className={`w-full px-4 py-3 rounded-xl bg-[#070a12] border text-white placeholder-slate-500 focus:outline-none transition-colors text-sm font-mono ${
                    errors.phone ? 'border-rose-500' : 'border-white/10 focus:border-cyan-400'
                  }`}
                />
                {errors.phone && <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION B: TECHNICAL SKILLS */}
          {/* ========================================================================= */}
          <div id="section-skills" className="p-6 sm:p-8 rounded-3xl glass-card border border-white/10">
            <div className="flex items-center gap-3 pb-6 border-b border-white/5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  Section B — Technical Skills & Interests
                </h3>
                <p className="text-xs text-slate-400">Helps mentors understand team tech stacks and guide builds.</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                Select Your Skills (Multiple Selections Allowed) <span className="text-rose-400">*</span>
              </label>

              <div className="flex flex-wrap gap-2.5 mb-4">
                {AVAILABLE_SKILLS.map((skill) => {
                  const isSelected = formData.skills.includes(skill);
                  return (
                    <button
                      type="button"
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-dark-950 shadow-glow-cyan font-bold scale-105'
                          : 'bg-[#070a12] border border-white/10 text-slate-300 hover:text-white hover:border-white/20'
                      }`}
                    >
                      {skill} {isSelected && '✓'}
                    </button>
                  );
                })}
              </div>
              {errors.skills && <p className="text-xs text-rose-400 mb-3">{errors.skills}</p>}

              {/* Other Skills Input */}
              <div className="mt-4">
                <label className="block text-xs text-slate-400 mb-1.5">
                  Other tools, frameworks, or hardware proficiencies (Optional):
                </label>
                <input
                  type="text"
                  name="otherSkill"
                  value={formData.otherSkill}
                  onChange={handleChange}
                  placeholder="e.g. Arduino, Rust, Next.js, Figma, Kotlin, Go"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070a12] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 text-sm"
                />
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION C: PARTICIPATION MODE (SOLO OR TEAM 3–5) */}
          {/* ========================================================================= */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/10">
            <div className="flex items-center gap-3 pb-6 border-b border-white/5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-pink-500/15 text-pink-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  Section C — Participation Mode
                </h3>
                <p className="text-xs text-slate-400">
                  Register as an individual participant or with a team of 3 to 5 student members.
                </p>
              </div>
            </div>

            {/* Participation Type Selector */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                Select Participation Type <span className="text-rose-400">*</span>
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Option 1: Individual / Solo */}
                <label
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                    formData.participationType === 'individual'
                      ? 'bg-cyan-500/10 border-cyan-400/60 shadow-glow-cyan/20 text-white'
                      : 'bg-[#070a12]/60 border-white/10 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <input
                    type="radio"
                    name="participationType"
                    value="individual"
                    checked={formData.participationType === 'individual'}
                    onChange={handleChange}
                    className="accent-cyan-400 mt-1"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm font-bold text-white">Solo / Individual</span>
                    </div>
                    <span className="text-xs text-slate-400 mt-1 block leading-relaxed">
                      Compete as an individual developer. Build your own project with senior mentor guidance.
                    </span>
                  </div>
                </label>

                {/* Option 2: Team (3 to 5 Members) */}
                <label
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                    formData.participationType === 'team'
                      ? 'bg-purple-500/10 border-purple-400/60 shadow-glow-purple/20 text-white'
                      : 'bg-[#070a12]/60 border-white/10 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <input
                    type="radio"
                    name="participationType"
                    value="team"
                    checked={formData.participationType === 'team'}
                    onChange={handleChange}
                    className="accent-purple-400 mt-1"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-400" />
                      <span className="text-sm font-bold text-white">Ready Team (3–5)</span>
                    </div>
                    <span className="text-xs text-slate-400 mt-1 block leading-relaxed">
                      Already have a team? Register with your formed squad of 3 to 5 eligible student participants.
                    </span>
                  </div>
                </label>

                {/* Option 3: Need a Team / Team Not Formed Yet */}
                <label
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                    formData.participationType === 'need_team'
                      ? 'bg-amber-500/10 border-amber-400/60 shadow-glow-amber/20 text-white'
                      : 'bg-[#070a12]/60 border-white/10 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <input
                    type="radio"
                    name="participationType"
                    value="need_team"
                    checked={formData.participationType === 'need_team'}
                    onChange={handleChange}
                    className="accent-amber-400 mt-1"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4 text-amber-400" />
                      <span className="text-sm font-bold text-white">Need a Team (No Team Yet)</span>
                    </div>
                    <span className="text-xs text-slate-400 mt-1 block leading-relaxed">
                      Team not formed yet? Register your profile; mentors & organizers will match you into a team on Day 1!
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* If Individual: Friendly Note + Solo Team Name Input */}
            {formData.participationType === 'individual' && (
              <div className="space-y-4 pt-2 animate-fadeIn">
                <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 text-xs text-slate-300 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm mb-1">
                      Solo / Individual Registration:
                    </strong>
                    You are competing independently. Even as a solo participant, please specify your Team Name / Project Handle below for desk reporting, certificates, and the leaderboard!
                  </div>
                </div>

                <div>
                  <label htmlFor="input-soloTeamName" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Team Name / Project Handle <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="input-soloTeamName"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleChange}
                    placeholder="e.g. SoloInnovator, ByteWarrior, or your chosen team name"
                    className={`w-full px-4 py-3 rounded-xl bg-[#070a12] border text-white placeholder-slate-500 focus:outline-none transition-colors text-sm ${
                      errors.teamName ? 'border-rose-500' : 'border-white/10 focus:border-cyan-400'
                    }`}
                  />
                  {errors.teamName && <p className="text-xs text-rose-400 mt-1">{errors.teamName}</p>}
                  <p className="text-[11px] text-slate-400 mt-1">
                    This name will appear on your desk identity badge and project submission evaluation sheet.
                  </p>
                </div>
              </div>
            )}

            {/* If Need a Team: Friendly Matchmaking Callout + Optional Preferred Team Name */}
            {formData.participationType === 'need_team' && (
              <div className="space-y-4 pt-2 animate-fadeIn">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-xs text-slate-300 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm mb-1">
                      Team Matchmaking Mode Activated (टीम अभी नहीं बनी है):
                    </strong>
                    Don't worry if you don't have a team yet! You can complete your registration right now. During desk check-in on 27 October (10:00 AM), student coordinators and senior mentors will connect you with other individual participants to form a balanced 3 to 5 member team.
                  </div>
                </div>

                <div>
                  <label htmlFor="input-proposedTeamName" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Preferred Team Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="input-proposedTeamName"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleChange}
                    placeholder="e.g. CodeForge (leave blank if undecided)"
                    className="w-full px-4 py-3 rounded-xl bg-[#070a12] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors text-sm"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    If you have a preferred team name in mind, enter it; otherwise mentors will help your squad finalize one on Day 1.
                  </p>
                </div>
              </div>
            )}

            {/* If Team: Team Details and Member Inputs */}
            {formData.participationType === 'team' && (
              <div className="space-y-4 pt-4 border-t border-white/5 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="input-teamName" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Team Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="input-teamName"
                      name="teamName"
                      value={formData.teamName}
                      onChange={handleChange}
                      placeholder="e.g. ByteBrigade, TechTitans"
                      className={`w-full px-4 py-3 rounded-xl bg-[#070a12] border text-white placeholder-slate-500 focus:outline-none transition-colors text-sm ${
                        errors.teamName ? 'border-rose-500' : 'border-white/10 focus:border-cyan-400'
                      }`}
                    />
                    {errors.teamName && <p className="text-xs text-rose-400 mt-1">{errors.teamName}</p>}
                  </div>

                  <div>
                    <label htmlFor="input-teamLeader" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Designated Team Leader <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="input-teamLeader"
                      name="teamLeader"
                      value={formData.teamLeader}
                      onChange={handleChange}
                      placeholder="Full name of leader (Member 1)"
                      className={`w-full px-4 py-3 rounded-xl bg-[#070a12] border text-white placeholder-slate-500 focus:outline-none transition-colors text-sm ${
                        errors.teamLeader ? 'border-rose-500' : 'border-white/10 focus:border-cyan-400'
                      }`}
                    />
                    {errors.teamLeader && <p className="text-xs text-rose-400 mt-1">{errors.teamLeader}</p>}
                  </div>
                </div>

                <div id="input-teamMembers">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Teammate Names (Min 2 required for a 3-member team; up to 4 for a 5-member team) <span className="text-rose-400">*</span>
                    </label>
                    <span className="text-[11px] text-cyan-400 font-mono">
                      Total: {1 + formData.teamMembers.filter((m) => m && m.trim()).length} / 5 members
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        placeholder="Member 2 Full Name *"
                        value={formData.teamMembers[0]}
                        onChange={(e) => handleMemberChange(0, e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#070a12] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Member 3 Full Name *"
                        value={formData.teamMembers[1]}
                        onChange={(e) => handleMemberChange(1, e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#070a12] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Member 4 Full Name (Optional)"
                        value={formData.teamMembers[2]}
                        onChange={(e) => handleMemberChange(2, e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#070a12] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Member 5 Full Name (Optional)"
                        value={formData.teamMembers[3]}
                        onChange={(e) => handleMemberChange(3, e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#070a12] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  {errors.teamMembers && <p className="text-xs text-rose-400 mt-2">{errors.teamMembers}</p>}

                  <p className="text-[11px] text-slate-400 mt-2">
                    * Minimum team size is 3 eligible students, maximum is 5 eligible students. Third-year organizers assisting the team do not count toward this limit.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* SECTION D: PROJECT IDEA (OPTIONAL) */}
          {/* ========================================================================= */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/10">
            <div className="flex items-center gap-3 pb-6 border-b border-white/5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  Section D — Preliminary Project Idea (Optional)
                </h3>
                <p className="text-xs text-slate-400">
                  You can explore any theme or define your own problem. Early ideas help mentors prepare.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Problem Area or Theme Idea (Optional)
                </label>
                <input
                  type="text"
                  name="problemIdea"
                  value={formData.problemIdea}
                  onChange={handleChange}
                  placeholder="e.g. Smart Campus lost-and-found portal, hostel electricity monitor"
                  className="w-full px-4 py-3 rounded-xl bg-[#070a12] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Brief Solution Concept (Optional)
                </label>
                <textarea
                  name="shortIdea"
                  rows={2}
                  value={formData.shortIdea}
                  onChange={handleChange}
                  placeholder="e.g. A web app that connects campus students with peer tutors and lab batch study materials"
                  className="w-full px-4 py-3 rounded-xl bg-[#070a12] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-sm resize-none"
                />
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION E: FEE PAYMENT STATUS (MODIFIED ACCORDING TO REQ #9) */}
          {/* ========================================================================= */}
          <div
            id="section-fee-status"
            className="p-6 sm:p-8 rounded-3xl glass-card border border-cyan-400/30 shadow-glow-cyan/20 relative"
          >
            <div className="flex items-center gap-3 pb-6 border-b border-white/5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-cyan-400/15 text-cyan-400 flex items-center justify-center">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  Section E — Fee Payment Status
                </h3>
                <p className="text-xs text-slate-400">
                  Participation fee: <strong className="text-cyan-300">₹200 per participant</strong> (Compulsory). Actual fee collection is managed separately by organizers.
                </p>
              </div>
            </div>

            {/* Fee Policy Information Notice */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-slate-300 mb-6 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                The participation fee of <strong>₹200 per participant</strong> is compulsory for all competitors. Fee collection is managed and recorded directly by the organizing committee. This form only records your current payment status.
              </div>
            </div>

            <div className="space-y-6">
              {/* Question 1: Have you paid the participation fee of ₹200? */}
              <div>
                <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">
                  Question 1: Have you paid the participation fee of ₹200? <span className="text-rose-400">*</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Option: Paid */}
                  <label
                    className={`flex items-center gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.feePaid === 'Paid'
                        ? 'bg-emerald-500/15 border-emerald-400/60 shadow-glow-emerald/30 text-white'
                        : 'bg-[#070a12]/70 border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="feePaid"
                      value="Paid"
                      checked={formData.feePaid === 'Paid'}
                      onChange={handleChange}
                      className="accent-emerald-400 w-4 h-4"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-bold text-white">Paid</span>
                      </div>
                      <span className="text-xs text-slate-400">I have completed the ₹200 fee</span>
                    </div>
                  </label>

                  {/* Option: Not Paid */}
                  <label
                    className={`flex items-center gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.feePaid === 'Not Paid'
                        ? 'bg-amber-500/15 border-amber-400/60 shadow-glow-amber/30 text-white'
                        : 'bg-[#070a12]/70 border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="feePaid"
                      value="Not Paid"
                      checked={formData.feePaid === 'Not Paid'}
                      onChange={handleChange}
                      className="accent-amber-400 w-4 h-4"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        <span className="text-sm font-bold text-white">Not Paid</span>
                      </div>
                      <span className="text-xs text-slate-400">Will pay to organizers before the event</span>
                    </div>
                  </label>
                </div>
                {errors.feePaid && <p className="text-xs text-rose-400 mt-2">{errors.feePaid}</p>}
              </div>

              {/* Question 2: Payment Method (Revealed only when Paid is selected) */}
              {formData.feePaid === 'Paid' ? (
                <div id="section-payment-method" className="pt-4 border-t border-white/10 animate-fadeIn">
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">
                    Question 2: Payment Method <span className="text-rose-400">*</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Method: Cash */}
                    <label
                      className={`flex items-center gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                        formData.paymentMethod === 'Cash'
                          ? 'bg-cyan-500/15 border-cyan-400/60 text-white'
                          : 'bg-[#070a12]/70 border-white/10 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Cash"
                        checked={formData.paymentMethod === 'Cash'}
                        onChange={handleChange}
                        className="accent-cyan-400 w-4 h-4"
                      />
                      <div>
                        <span className="text-sm font-bold text-white block">Cash</span>
                        <span className="text-xs text-slate-400">Paid in cash to organizers/seniors</span>
                      </div>
                    </label>

                    {/* Method: Online */}
                    <label
                      className={`flex items-center gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                        formData.paymentMethod === 'Online'
                          ? 'bg-cyan-500/15 border-cyan-400/60 text-white'
                          : 'bg-[#070a12]/70 border-white/10 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Online"
                        checked={formData.paymentMethod === 'Online'}
                        onChange={handleChange}
                        className="accent-cyan-400 w-4 h-4"
                      />
                      <div>
                        <span className="text-sm font-bold text-white block">Online</span>
                        <span className="text-xs text-slate-400">Paid via UPI / digital transfer</span>
                      </div>
                    </label>
                  </div>
                  {errors.paymentMethod && (
                    <p className="text-xs text-rose-400 mt-2">{errors.paymentMethod}</p>
                  )}
                </div>
              ) : formData.feePaid === 'Not Paid' ? (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                  Note: You may still submit your registration. Please ensure your fee is settled with the 3rd-year organizing committee prior to morning check-in on 27 October 2026.
                </div>
              ) : null}
            </div>
          </div>

          {/* ERROR SUMMARY BANNER ABOVE SUBMIT BUTTON */}
          {Object.keys(errors).some((k) => errors[k]) && (
            <div
              id="form-error-banner"
              className="p-5 rounded-2xl bg-rose-500/15 border-2 border-rose-500/40 text-left max-w-xl mx-auto shadow-lg shadow-rose-950/30 animate-fadeIn"
            >
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>Please address the following details before submitting:</span>
              </div>
              <ul className="space-y-1 text-xs text-rose-200 list-disc list-inside">
                {errors.form && <li className="font-bold text-rose-300">{errors.form}</li>}
                {errors.fullName && <li>{errors.fullName}</li>}
                {errors.email && <li>{errors.email}</li>}
                {errors.phone && <li>{errors.phone}</li>}
                {errors.skills && <li>{errors.skills}</li>}
                {errors.teamName && <li>{errors.teamName}</li>}
                {errors.teamLeader && <li>{errors.teamLeader}</li>}
                {errors.teamMembers && <li>{errors.teamMembers}</li>}
                {errors.feePaid && <li>{errors.feePaid}</li>}
                {errors.paymentMethod && <li>{errors.paymentMethod}</li>}
              </ul>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <div className="pt-2 text-center space-y-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-wider transition-all shadow-xl ${
                isSubmitting
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 text-dark-950 hover:shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  <span>Submitting Registration...</span>
                </>
              ) : (
                <>
                  <span>Submit Registration & Get ID</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="text-xs text-slate-400">
              By submitting, you confirm that you are an enrolled student at Government Polytechnic Kanpur.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
