/**
 * Centralized Configuration for Campus HackFest 2026
 * Easily customize event details, dates, Google Sheets endpoints, and pricing.
 */

export const HACKATHON_CONFIG = {
  name: "CAMPUS HACKFEST 2026",
  shortName: "Campus HackFest",
  year: "2026",
  college: "Government Polytechnic Kanpur",
  department: "Information Technology Department",
  tagline: "Build. Innovate. Create Impact.",
  theme: "SOLVE A REAL PROBLEM",
  description: "A high-intensity, one-day hackathon where 1st and 2nd-year IT Department innovators of Government Polytechnic Kanpur identify authentic real-world challenges and develop working technology prototypes.",
  
  // Organizers & Audience
  organizerNotice: "Organized by 3rd-year seniors for 1st and 2nd-year IT Department innovators",
  targetAudience: "1st & 2nd Year Students (Information Technology Department, Government Polytechnic Kanpur)",
  teamSizeText: "3–4 Members",
  teamSizeMin: 3,
  teamSizeMax: 4,

  // Event Logistics
  date: "October 17, 2026", // Configurable placeholder date
  showCountdown: false, // Set to true once final institutional date is finalized
  time: "10:00 AM – 05:00 PM",
  durationText: "One Working Day (7 Hours Sprint)",
  venue: "Government Polytechnic Kanpur — IT Department Labs",

  // Entry & Registration
  entryFee: 50,
  currency: "₹",
  entryFeeText: "₹50 per participant",
  
  // Quick Stats (Configurable)
  stats: [
    { label: "Target Participants", value: "40–60", detail: "IT Department Students" },
    { label: "Competing Teams", value: "10–15", detail: "Collaborative squads" },
    { label: "Nominal Entry Fee", value: "₹50", detail: "Per participant" },
    { label: "Intensive Sprint", value: "10 AM – 5 PM", detail: "7 hours of building" }
  ],

  // Payment Details
  upi: {
    upiId: "hackfest2026@oksbi",
    payeeName: "Campus HackFest Organizing Committee",
    amount: 50,
    qrImage: "/upi-qr.svg",
    instructions: "Scan the QR code with any UPI app (GPay, PhonePe, Paytm) to pay the ₹50 entry fee. Upload your payment screenshot below."
  },

  // Google Apps Script Integration Endpoint
  googleAppsScriptUrl: (import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbwljKC6kWou7vU8Zm9x0Fx3FD4vGOX2M-autFgJ04JwNXnLC38mN6EDXcUB0-xVEImtJQ/exec").trim(),


  // External & Contact Links
  links: {
    githubOrg: "https://github.com/CampusHackFest",
    contactEmail: "hackfest.it@gpkanpur.edu",
    discordInvite: "https://discord.gg/campushackfest", // optional community link
    whatsappGroup: "https://chat.whatsapp.com/campushackfest", // optional participant group
  },

  // Problem Exploration Domains
  domains: [
    {
      id: "campus",
      title: "College & Campus Life",
      icon: "GraduationCap",
      color: "from-blue-500 to-cyan-400",
      description: "Hostel management, lab attendance, canteen queue reduction, peer tutoring, lost & found, resource booking."
    },
    {
      id: "education",
      title: "Education & Learning",
      icon: "BookOpen",
      color: "from-indigo-500 to-purple-500",
      description: "Interactive learning tools, accessible study aids for disabled students, quiz engines, smart study planners."
    },
    {
      id: "healthcare",
      title: "Healthcare & Well-being",
      icon: "HeartPulse",
      color: "from-rose-500 to-pink-500",
      description: "Mental wellness tracking for students, emergency SOS alert systems, medical prescription reminders."
    },
    {
      id: "environment",
      title: "Environment & Green Tech",
      icon: "Leaf",
      color: "from-emerald-500 to-teal-400",
      description: "Campus e-waste management, smart energy monitoring, food waste trackers, tree plantation tracking."
    },
    {
      id: "safety",
      title: "Safety & Security",
      icon: "ShieldAlert",
      color: "from-red-500 to-orange-400",
      description: "Night campus safety companion, emergency geo-broadcasts, cyber safety guides, identity protection."
    },
    {
      id: "transportation",
      title: "Transportation & Commute",
      icon: "Bus",
      color: "from-amber-500 to-yellow-400",
      description: "College bus live trackers, carpooling networks for local day-scholars, public transit schedulers."
    },
    {
      id: "finance",
      title: "Student Finance & Budgeting",
      icon: "Coins",
      color: "from-violet-500 to-indigo-400",
      description: "Micro-expense splitting among roommates, pocket-money analytics, student discount aggregators."
    },
    {
      id: "agriculture",
      title: "AgriTech & Local Farming",
      icon: "Sprout",
      color: "from-green-500 to-lime-400",
      description: "Crop disease identification, local soil moisture alert dashboards, direct farmer-to-consumer catalogs."
    },
    {
      id: "social-impact",
      title: "Social Impact & Civic Tech",
      icon: "Users",
      color: "from-fuchsia-500 to-pink-400",
      description: "Local blood donor finder, community volunteer boards, civic issue reporting for municipal wards."
    },
    {
      id: "open-innovation",
      title: "Open Innovation",
      icon: "Sparkles",
      color: "from-cyan-500 to-blue-600",
      description: "Any novel, well-validated problem where thoughtful software or hardware integration provides direct value."
    }
  ],

  // 6-Step Challenge Process
  challengeProcess: [
    { step: "01", title: "Problem", desc: "Identify a real, friction-filled problem around you." },
    { step: "02", title: "Idea", desc: "Brainstorm a realistic, practical technology solution." },
    { step: "03", title: "Build", desc: "Write clean code and assemble the working prototype." },
    { step: "04", title: "Test", desc: "Validate basic user flows and handle edge cases." },
    { step: "05", title: "Demo", desc: "Showcase the working project live to 3rd-year judges." },
    { step: "06", title: "Impact", desc: "Demonstrate tangible feasibility and genuine utility." }
  ],

  // 100-Mark Judging Rubric
  judgingRubric: [
    {
      criterion: "Real Problem & Impact",
      marks: 30,
      description: "How genuine, clearly articulated, and urgent is the chosen problem? Does the solution have a measurable positive effect on target users?"
    },
    {
      criterion: "Technical Implementation",
      marks: 25,
      description: "Code quality, architecture, reasonable logic, utilization of relevant APIs/libraries, and team understanding of their codebase."
    },
    {
      criterion: "Innovation & Creativity",
      marks: 20,
      description: "Uniqueness of the approach, thoughtful user experience, or creative combination of technologies."
    },
    {
      criterion: "Working Prototype",
      marks: 15,
      description: "A functioning live demonstration without severe game-breaking bugs; demonstrates the primary user workflow."
    },
    {
      criterion: "Presentation & Q&A",
      marks: 10,
      description: "Clarity of the 5-minute pitch, effective live demonstration, and confident answers to judges' questions."
    }
  ],

  // Schedule Timeline
  schedule: [
    { time: "09:30 AM – 10:00 AM", title: "Registration & Check-in", desc: "Desk reporting, verification of participant IDs, team desk allotment, and Wi-Fi access setup." },
    { time: "10:00 AM – 10:15 AM", title: "Opening Ceremony", desc: "Welcome address by 3rd-year organizers and faculty coordinators." },
    { time: "10:15 AM – 10:30 AM", title: "Rules & Challenge Briefing", desc: "Walkthrough of problem guidelines, judging rubric, submission checklist, and mentor introduction." },
    { time: "10:30 AM", title: "Hackathon Begins! 🚀", desc: "Hacking officially kicks off. Repositories initialized." },
    { time: "10:30 AM – 01:00 PM", title: "Sprint Phase 1: Architecture & Core Build", desc: "Teams wireframe, scaffold applications, setup repositories, and build primary workflows." },
    { time: "01:00 PM – 01:30 PM", title: "Lunch & Networking Break 🍕", desc: "Re-energize, grab lunch, and discuss ideas with senior mentors." },
    { time: "01:30 PM – 03:30 PM", title: "Sprint Phase 2: Feature Polish & Integration", desc: "Mentors conduct checkpoint rounds. Final feature integration and UI polishing." },
    { time: "03:30 PM – 04:00 PM", title: "Testing & Code Submission", desc: "Final testing, pushing commits to GitHub, and submission of repository/demo links." },
    { time: "04:00 PM Sharp", title: "Submission Closes 🛑", desc: "Late submissions locked out. Evaluation queues initialized." },
    { time: "04:00 PM – 05:00 PM", title: "Presentations & Live Judging", desc: "Each team presents a 4-minute demo + 2-minute Q&A in front of the judging panel." },
    { time: "05:00 PM – 05:30 PM", title: "Results & Award Ceremony 🏆", desc: "Announcement of Winner, Runner-ups, and final rankings." }
  ]
};
