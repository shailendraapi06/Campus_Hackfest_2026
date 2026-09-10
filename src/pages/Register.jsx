import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Code,
  Users,
  Lightbulb,
  CreditCard,
  Upload,
  CheckCircle,
  AlertCircle,
  Copy,
  ExternalLink,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  FileCheck
} from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import { HACKATHON_CONFIG } from '../config/hackathonConfig';
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
  'UI/UX',
  'Android',
  'Flutter'
];

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    year: '1st Year',
    email: '',
    phone: '',
    skills: [],
    otherSkill: '',
    teamStatus: 'yes', // 'yes' or 'no'
    teamName: '',
    teamLeader: '',
    teamMembers: ['', '', ''],
    problemIdea: '',
    shortIdea: '',
    transactionId: '',
    screenshotPreview: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  // Field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
  };

  // Team member change handler
  const handleMemberChange = (index, value) => {
    setFormData((prev) => {
      const updated = [...prev.teamMembers];
      updated[index] = value;
      return { ...prev, teamMembers: updated };
    });
  };

  // Payment screenshot upload
  const handleScreenshotUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, screenshot: 'File size must be under 5MB.' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, screenshotPreview: reader.result }));
        setErrors((prev) => ({ ...prev, screenshot: null }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Copy UPI ID
  const copyUpiId = () => {
    navigator.clipboard.writeText(HACKATHON_CONFIG.upi.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  // Copy Assigned Registration ID
  const copyRegId = () => {
    if (submissionResult?.registrationId) {
      navigator.clipboard.writeText(submissionResult.registrationId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  // Quick demo auto-filler for organizers/testers
  const fillDemoData = () => {
    const randomId = Math.floor(100 + Math.random() * 900);
    const sampleSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240">
      <rect width="400" height="240" fill="#0f172a" rx="16"/>
      <rect x="12" y="12" width="376" height="216" fill="#1e293b" rx="12" stroke="#38bdf8" stroke-width="2"/>
      <text x="200" y="45" font-family="sans-serif" font-size="14" font-weight="bold" fill="#38bdf8" text-anchor="middle">UPI PAYMENT RECEIPT</text>
      <text x="200" y="85" font-family="sans-serif" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">₹50.00</text>
      <text x="200" y="115" font-family="sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">Paid to: Campus HackFest 2026</text>
      <text x="200" y="145" font-family="sans-serif" font-size="12" fill="#a855f7" text-anchor="middle">hackfest2026@oksbi</text>
      <text x="200" y="180" font-family="monospace" font-size="12" font-weight="bold" fill="#10b981" text-anchor="middle">UTR: UPI${Date.now().toString().slice(-8)}</text>
      <text x="200" y="210" font-family="sans-serif" font-size="10" fill="#64748b" text-anchor="middle">Status: Successful (Test Verified)</text>
    </svg>`;
    const sampleDataUrl = 'data:image/svg+xml;base64,' + btoa(sampleSvg);

    const randomPhone = '98' + Math.floor(10000000 + Math.random() * 90000000);

    setFormData({
      fullName: 'Rahul Sharma',
      year: '2nd Year',
      email: `rahul.test${randomId}@college.edu`,
      phone: randomPhone,
      skills: ['React', 'JavaScript', 'UI/UX'],
      otherSkill: 'Git, Tailwind',
      teamStatus: 'yes',
      teamName: `Team ${randomId}`,
      teamLeader: 'Rahul Sharma',
      teamMembers: ['Aman Verma', 'Priya Patel'],
      problemIdea: 'Automated campus laboratory seat availability detection',
      shortIdea: 'Lightweight computer vision counter logging empty desks',
      transactionId: `RCPT-${Date.now().toString().slice(-6)}`,
      screenshotPreview: sampleDataUrl,
      screenshotBase64: sampleDataUrl,
      screenshotMimeType: 'image/svg+xml',
      screenshotFileName: 'test_payment_receipt.svg'
    });
    setErrors({});
  };

  // Helper to attach a sample test receipt
  const attachSampleReceipt = () => {
    const sampleSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240">
      <rect width="400" height="240" fill="#0f172a" rx="16"/>
      <rect x="12" y="12" width="376" height="216" fill="#1e293b" rx="12" stroke="#38bdf8" stroke-width="2"/>
      <text x="200" y="45" font-family="sans-serif" font-size="14" font-weight="bold" fill="#38bdf8" text-anchor="middle">UPI PAYMENT RECEIPT</text>
      <text x="200" y="85" font-family="sans-serif" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">₹50.00</text>
      <text x="200" y="115" font-family="sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">Paid to: Campus HackFest 2026</text>
      <text x="200" y="145" font-family="sans-serif" font-size="12" fill="#a855f7" text-anchor="middle">hackfest2026@oksbi</text>
      <text x="200" y="180" font-family="monospace" font-size="12" font-weight="bold" fill="#10b981" text-anchor="middle">UTR: UPI${Date.now().toString().slice(-8)}</text>
      <text x="200" y="210" font-family="sans-serif" font-size="10" fill="#64748b" text-anchor="middle">Status: Successful (Test Verified)</text>
    </svg>`;
    const sampleDataUrl = 'data:image/svg+xml;base64,' + btoa(sampleSvg);

    setFormData((prev) => ({
      ...prev,
      screenshotPreview: sampleDataUrl,
      screenshotBase64: sampleDataUrl,
      screenshotMimeType: 'image/svg+xml',
      screenshotFileName: 'test_payment_receipt.svg',
      transactionId: prev.transactionId || `UPI${Date.now().toString().slice(-8)}`
    }));
    setErrors((prev) => ({ ...prev, screenshot: null, transactionId: null }));
  };

  // Validate form before submit
  const validate = () => {
    const newErrors = {};
    let firstInvalidId = null;

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
      if (!firstInvalidId) firstInvalidId = 'input-fullName';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
      if (!firstInvalidId) firstInvalidId = 'input-email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.';
      if (!firstInvalidId) firstInvalidId = 'input-email';
    }

    const cleanPhone = formData.phone.replace(/[\s\-\+\(\)]/g, '').replace(/^91/, '').replace(/^0/, '');
    if (!cleanPhone) {
      newErrors.phone = 'Phone number is required.';
      if (!firstInvalidId) firstInvalidId = 'input-phone';
    } else if (cleanPhone.length < 10) {
      newErrors.phone = 'Enter a valid 10-digit mobile number.';
      if (!firstInvalidId) firstInvalidId = 'input-phone';
    }

    if (formData.skills.length === 0 && !formData.otherSkill.trim()) {
      newErrors.skills = 'Select at least one skill or specify under Other.';
      if (!firstInvalidId) firstInvalidId = 'section-skills';
    }

    if (formData.teamStatus === 'yes') {
      if (!formData.teamName.trim()) {
        newErrors.teamName = 'Team name is required.';
        if (!firstInvalidId) firstInvalidId = 'input-teamName';
      }
    }

    if (!formData.screenshotPreview && !formData.screenshotBase64) {
      newErrors.screenshot = 'Please attach your payment screenshot (or click "Attach Sample Test Receipt").';
      if (!firstInvalidId) firstInvalidId = 'section-screenshot';
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
    
    // Clear previous submission errors
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
      console.error("Submission failed:", err);
      setErrors((prev) => ({ 
        ...prev, 
        form: err.message || 'Submission failed. Please check your details and try again.' 
      }));
      // Scroll to error banner
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
        title="Campus HackFest"
        highlight="Registration"
        subtitle="1st & 2nd Year IT Students • Government Polytechnic Kanpur • Entry Fee: ₹50"
      />

      {/* SUCCESS CONFIRMATION MODAL / SCREEN */}
      {submissionResult ? (
        <div className="p-8 sm:p-12 rounded-3xl glass-card border border-brand-emerald/40 shadow-glow-emerald/30 text-center animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-brand-emerald/20 border border-brand-emerald/30 flex items-center justify-center text-brand-emerald mx-auto mb-6">
            <CheckCircle className="w-8 h-8" />
          </div>

          <span className="text-xs uppercase font-bold tracking-widest text-brand-emerald">
            Registration Successful!
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-2">
            Welcome to Campus HackFest 2026
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-6">
            Your registration details and payment screenshot have been submitted successfully to the IT Department organizers.
          </p>

          {/* REGISTRATION ID TICKET */}
          <div className="p-6 rounded-2xl bg-dark-950/80 border border-brand-cyan/30 max-w-sm mx-auto mb-8 shadow-inner">
            <span className="text-xs text-slate-400 font-semibold block uppercase">
              Your Official Registration ID
            </span>
            <div className="flex items-center justify-center gap-3 mt-2">
              <span className="text-2xl sm:text-3xl font-black font-mono text-brand-cyan tracking-wider">
                {submissionResult.registrationId}
              </span>
              <button
                onClick={copyRegId}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                title="Copy Registration ID"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            {copiedId && (
              <span className="text-[11px] text-brand-emerald font-medium block mt-1">
                Copied to clipboard!
              </span>
            )}
            <p className="text-[11px] text-slate-400 mt-2">
              Save this ID for check-in desk reporting at Government Polytechnic Kanpur.
            </p>
          </div>

          {/* Next Steps Checklist */}
          <div className="text-left max-w-md mx-auto space-y-3 mb-8 text-xs sm:text-sm text-slate-300">
            <h4 className="font-bold text-white text-center sm:text-left">Next Steps:</h4>
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-dark-900/60 border border-white/5">
              <Sparkles className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
              <span>Organizers will verify your payment screenshot before event check-in.</span>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-dark-900/60 border border-white/5">
              <CheckCircle className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
              <span>Bring your College ID card and this Registration ID to the IT lab check-in desk on event day.</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/teams"
              className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-brand-cyan text-dark-950 hover:bg-cyan-300 transition-colors"
            >
              View Registered Teams
            </Link>
            <Link
              to="/schedule"
              className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white glass-pill hover:bg-white/10 transition-colors"
            >
              Check Event Schedule
            </Link>
          </div>
        </div>
      ) : (
        /* REGISTRATION FORM */
        <form onSubmit={handleSubmit} className="space-y-10">

          {/* Form-level error banner */}
          {errors.form && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-300 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{errors.form}</span>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION A: PERSONAL INFORMATION */}
          {/* ========================================================================= */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/10">
            <div className="flex items-center gap-3 pb-6 border-b border-white/5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-cyan/15 text-brand-cyan flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Section A — Personal Information</h3>
                <p className="text-xs text-slate-400">Only essential contact details for event coordination.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  id="input-fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className={`w-full px-4 py-3 rounded-xl bg-dark-950 border text-white placeholder-slate-500 focus:outline-none transition-colors text-sm ${
                    errors.fullName ? 'border-rose-500' : 'border-white/10 focus:border-brand-cyan'
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
                  className="w-full px-4 py-3 rounded-xl bg-dark-950 border border-white/10 text-white focus:outline-none focus:border-brand-cyan transition-colors text-sm"
                >
                  <option value="1st Year">1st Year (Freshman)</option>
                  <option value="2nd Year">2nd Year (Sophomore)</option>
                </select>
                <p className="text-[11px] text-slate-400 mt-1">3rd-year students serve as organizers/mentors.</p>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  id="input-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@college.edu or personal email"
                  className={`w-full px-4 py-3 rounded-xl bg-dark-950 border text-white placeholder-slate-500 focus:outline-none transition-colors text-sm ${
                    errors.email ? 'border-rose-500' : 'border-white/10 focus:border-brand-cyan'
                  }`}
                />
                {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Phone / WhatsApp Number <span className="text-rose-400">*</span>
                </label>
                <input
                  type="tel"
                  id="input-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className={`w-full px-4 py-3 rounded-xl bg-dark-950 border text-white placeholder-slate-500 focus:outline-none transition-colors text-sm font-mono ${
                    errors.phone ? 'border-rose-500' : 'border-white/10 focus:border-brand-cyan'
                  }`}
                />
                {errors.phone && <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION B: TECHNICAL SKILLS */}
          {/* ========================================================================= */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/10">
            <div className="flex items-center gap-3 pb-6 border-b border-white/5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-purple/15 text-brand-purple flex items-center justify-center">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Section B — Technical Skills</h3>
                <p className="text-xs text-slate-400">Used for organizer planning and teammate matchmaking.</p>
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
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${isSelected
                          ? 'bg-brand-cyan text-dark-950 shadow-glow-cyan font-bold scale-105'
                          : 'bg-dark-950 border border-white/10 text-slate-300 hover:text-white hover:border-white/20'
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
                  Other tools, libraries, or hardware skills (Optional):
                </label>
                <input
                  type="text"
                  name="otherSkill"
                  value={formData.otherSkill}
                  onChange={handleChange}
                  placeholder="e.g. Arduino, Rust, Figma, Node.js, Spring Boot"
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-purple text-sm"
                />
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION C: TEAM INFORMATION */}
          {/* ========================================================================= */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/10">
            <div className="flex items-center gap-3 pb-6 border-b border-white/5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-pink/15 text-brand-pink flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Section C — Team Formation</h3>
                <p className="text-xs text-slate-400">Join with an existing squad or let organizers match you.</p>
              </div>
            </div>

            {/* Team Status Radio Toggle */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                Do you already have a team? <span className="text-rose-400">*</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label
                  className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${formData.teamStatus === 'yes'
                      ? 'bg-brand-cyan/10 border-brand-cyan/50 text-white'
                      : 'bg-dark-950/60 border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                >
                  <input
                    type="radio"
                    name="teamStatus"
                    value="yes"
                    checked={formData.teamStatus === 'yes'}
                    onChange={handleChange}
                    className="accent-brand-cyan"
                  />
                  <div>
                    <span className="text-sm font-bold block text-white">Yes, I have a team</span>
                    <span className="text-xs text-slate-400">Team of 3 to 4 members ready</span>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${formData.teamStatus === 'no'
                      ? 'bg-brand-purple/10 border-brand-purple/50 text-white'
                      : 'bg-dark-950/60 border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                >
                  <input
                    type="radio"
                    name="teamStatus"
                    value="no"
                    checked={formData.teamStatus === 'no'}
                    onChange={handleChange}
                    className="accent-brand-purple"
                  />
                  <div>
                    <span className="text-sm font-bold block text-white">No, I need teammates</span>
                    <span className="text-xs text-slate-400">Organizers will pair you up based on skills</span>
                  </div>
                </label>
              </div>
            </div>

            {/* If YES: Show Team Name, Leader, and Members */}
            {formData.teamStatus === 'yes' ? (
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Team Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="input-teamName"
                      name="teamName"
                      value={formData.teamName}
                      onChange={handleChange}
                      placeholder="e.g. ByteBrigade"
                      className={`w-full px-4 py-3 rounded-xl bg-dark-950 border text-white placeholder-slate-500 focus:outline-none transition-colors text-sm ${
                        errors.teamName ? 'border-rose-500' : 'border-white/10 focus:border-brand-cyan'
                      }`}
                    />
                    {errors.teamName && <p className="text-xs text-rose-400 mt-1">{errors.teamName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Designated Team Leader <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="input-teamLeader"
                      name="teamLeader"
                      value={formData.teamLeader}
                      onChange={handleChange}
                      placeholder="Full name of leader"
                      className={`w-full px-4 py-3 rounded-xl bg-dark-950 border text-white placeholder-slate-500 focus:outline-none transition-colors text-sm ${
                        errors.teamLeader ? 'border-rose-500' : 'border-white/10 focus:border-brand-cyan'
                      }`}
                    />
                    {errors.teamLeader && <p className="text-xs text-rose-400 mt-1">{errors.teamLeader}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Teammate Names (Optional at registration time, can be updated at check-in desk)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Member 2 Name"
                      value={formData.teamMembers[0]}
                      onChange={(e) => handleMemberChange(0, e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs placeholder-slate-500"
                    />
                    <input
                      type="text"
                      placeholder="Member 3 Name"
                      value={formData.teamMembers[1]}
                      onChange={(e) => handleMemberChange(1, e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs placeholder-slate-500"
                    />
                    <input
                      type="text"
                      placeholder="Member 4 (Optional)"
                      value={formData.teamMembers[2]}
                      onChange={(e) => handleMemberChange(2, e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs placeholder-slate-500"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-brand-purple/10 border border-brand-purple/20 text-xs text-slate-300 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Solo Hacker Mode:</strong> No worries! Our 3rd-year organizers will pool solo participants into balanced 3–4 person squads matching frontend, backend, and design proficiencies before morning opening remarks.
                </div>
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* SECTION D: INITIAL PROJECT IDEA (OPTIONAL) */}
          {/* ========================================================================= */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/10">
            <div className="flex items-center gap-3 pb-6 border-b border-white/5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-amber/15 text-brand-amber flex items-center justify-center">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Section D — Initial Problem Idea (Optional)</h3>
                <p className="text-xs text-slate-400">You do not need a complete submission now. Early ideas help mentor preparation.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Problem You Want to Solve (Optional)
                </label>
                <input
                  type="text"
                  name="problemIdea"
                  value={formData.problemIdea}
                  onChange={handleChange}
                  placeholder="e.g. Long queues at college photocopier or mess food wastage"
                  className="w-full px-4 py-3 rounded-xl bg-dark-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-amber text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Short Solution Concept (Optional)
                </label>
                <textarea
                  name="shortIdea"
                  rows={2}
                  value={formData.shortIdea}
                  onChange={handleChange}
                  placeholder="e.g. A lightweight mobile web token dispenser that alerts students when their prints are ready"
                  className="w-full px-4 py-3 rounded-xl bg-dark-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-amber text-sm resize-none"
                />
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION E: PAYMENT & VERIFICATION */}
          {/* ========================================================================= */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-brand-cyan/30 shadow-glow-cyan/20">
            <div className="flex items-center gap-3 pb-6 border-b border-white/5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-cyan/15 text-brand-cyan flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Section E — Entry Fee & Payment Verification</h3>
                <p className="text-xs text-slate-400">Nominal entry fee: ₹50 per participant.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-6">

              {/* QR Code Column */}
              <div className="md:col-span-5 flex flex-col items-center text-center p-4 rounded-2xl bg-dark-950/80 border border-white/10">
                <img
                  src={HACKATHON_CONFIG.upi.qrImage}
                  alt="Official HackFest UPI QR"
                  className="w-48 h-48 rounded-xl border border-white/10 shadow-lg object-contain bg-white p-1"
                />
                <span className="text-xs font-bold text-white mt-3">Scan with GPay, PhonePe, Paytm, BHIM</span>

                {/* UPI Copy Chip */}
                <div className="mt-2 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                  <span>{HACKATHON_CONFIG.upi.upiId}</span>
                  <button
                    type="button"
                    onClick={copyUpiId}
                    className="text-brand-cyan hover:text-white"
                    title="Copy UPI ID"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                {copiedUpi && (
                  <span className="text-[10px] text-brand-emerald font-semibold mt-1">
                    UPI ID Copied!
                  </span>
                )}
                <span className="text-[11px] text-brand-cyan font-bold mt-2">
                  Amount: ₹{HACKATHON_CONFIG.entryFee}
                </span>
              </div>

              {/* Payment Proof Inputs */}
              <div className="md:col-span-7 space-y-4">
                <div className="p-4 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/25 text-xs text-slate-300">
                  <span className="font-bold text-white block text-sm mb-1">
                    Direct Screenshot Verification
                  </span>
                  <span>
                    No need to manually type any UTR or Transaction ID. Simply upload your UPI payment screenshot below; organizers will verify your payment directly from the receipt image.
                  </span>
                </div>

                <div id="section-screenshot">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Upload Payment Screenshot <span className="text-rose-400">*</span>
                  </label>

                  <div className="relative">
                    <input
                      type="file"
                      id="payment-screenshot"
                      accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                      onChange={handleScreenshotUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="payment-screenshot"
                      className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl cursor-pointer bg-dark-950/60 transition-colors ${
                        errors.screenshot ? 'border-rose-500 hover:border-rose-400' : 'border-white/20 hover:border-brand-cyan'
                      }`}
                    >
                      {formData.screenshotPreview ? (
                        <div className="flex flex-col items-center gap-2">
                          <img
                            src={formData.screenshotPreview}
                            alt="Screenshot preview"
                            className="h-28 max-w-full rounded-lg object-contain border border-white/10"
                          />
                          <span className="text-xs font-semibold text-brand-emerald">
                            Screenshot Attached (Click to change)
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-slate-400">
                          <Upload className="w-8 h-8 text-brand-cyan" />
                          <span className="text-xs font-medium">Click to select screenshot (JPG, PNG, WEBP)</span>
                          <span className="text-[10px] text-slate-400">Allowed: JPG, JPEG, PNG, WEBP (Max 5MB)</span>
                        </div>
                      )}
                    </label>
                  </div>
                  {errors.screenshot && (
                    <p className="text-xs text-rose-400 mt-1">{errors.screenshot}</p>
                  )}

                  {/* Quick test receipt helper button */}
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-400">Testing on mobile or laptop?</span>
                    <button
                      type="button"
                      onClick={attachSampleReceipt}
                      className="px-3 py-1.5 rounded-lg bg-brand-cyan/15 hover:bg-brand-cyan/25 border border-brand-cyan/30 text-brand-cyan text-xs font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Attach Sample Test Receipt</span>
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 text-[11px] text-slate-400 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-brand-emerald shrink-0" />
                  <span>Your screenshot is saved to Google Drive and kept private to event organizers.</span>
                </div>
              </div>

            </div>

          </div>

          {/* ERROR SUMMARY BANNER ABOVE SUBMIT BUTTON */}
          {Object.keys(errors).some(k => errors[k]) && (
            <div id="form-error-banner" className="p-5 rounded-2xl bg-rose-500/15 border-2 border-rose-500/40 text-left max-w-xl mx-auto shadow-lg shadow-rose-950/30 animate-fadeIn">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>Please complete the required details below before submitting:</span>
              </div>
              <ul className="space-y-1 text-xs text-rose-200 list-disc list-inside">
                {errors.form && <li className="font-bold text-rose-300">{errors.form}</li>}
                {errors.fullName && <li>{errors.fullName}</li>}
                {errors.email && <li>{errors.email}</li>}
                {errors.phone && <li>{errors.phone}</li>}
                {errors.skills && <li>{errors.skills}</li>}
                {errors.teamName && <li>{errors.teamName}</li>}
                {errors.teamLeader && <li>{errors.teamLeader}</li>}
                {errors.screenshot && <li>{errors.screenshot}</li>}
              </ul>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <div className="pt-2 text-center space-y-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-wider transition-all shadow-xl ${isSubmitting
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-brand-cyan via-teal-300 to-brand-cyan text-dark-950 hover:shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98]'
                }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                  <span>Submitting to Google Sheets & Drive...</span>
                </>
              ) : (
                <>
                  <span>Submit Registration & Get ID</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Helper for instant testing */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={fillDemoData}
                className="text-xs font-semibold text-slate-400 hover:text-brand-cyan transition-colors underline underline-offset-4"
              >
                🧪 Click here to auto-fill sample test data
              </button>
            </div>

            <p className="text-xs text-slate-400">
              By submitting, you confirm that you are an enrolled 1st or 2nd year student.
            </p>
          </div>

        </form>
      )}

    </div>
  );
}
