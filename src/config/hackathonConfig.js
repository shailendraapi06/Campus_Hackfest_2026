/**
 * Centralized Configuration for TECHFEST × RAYS OF RAUNAK 2026
 * Two connected college events on consecutive days:
 * 1. TECHFEST (College Hackathon) — 27 October 2026
 * 2. RAYS OF RAUNAK (Cultural Fest) — 28 October 2026 | "Let Every Talent Shine"
 */

export const HACKATHON_CONFIG = {
  // Master Festival Identity
  name: "TECHFEST × RAYS OF RAUNAK 2026",
  shortName: "Techfest × Rays of Raunak",
  year: "2026",
  college: "Government Polytechnic Kanpur",
  department: "Information Technology Department",
  jointTagline: "Code By Day, Shine On Stage.",
  
  // Event A: TECHFEST (Hackathon)
  techfest: {
    name: "Techfest",
    fullName: "Techfest 2026",
    type: "College Hackathon",
    date: "27 October 2026",
    rawDate: "2026-10-27",
    day: "Day 01",
    tagline: "Build. Innovate. Solve Real Problems.",
    theme: "SOLVE A REAL PROBLEM",
    description: "A high-intensity college hackathon where 1st and 2nd-year innovators identify authentic real-world challenges, engineer working software prototypes, and pitch live to senior judges.",
    time: "09:30 AM – 05:30 PM",
    durationText: "Full-Day Sprint (7+ Hours)",
    venue: "Government Polytechnic Kanpur — IT Department Labs",
    accentColor: "cyan"
  },

  // Event B: RAYS OF RAUNAK (Cultural Fest)
  raysOfRaunak: {
    name: "Rays of Raunak",
    fullName: "Rays of Raunak 2026",
    type: "College Cultural Fest",
    date: "28 October 2026",
    rawDate: "2026-10-28",
    day: "Day 02",
    tagline: "Let Every Talent Shine",
    description: "A vibrant festival of student creativity, music, dance, theatrical mimicry, and celebration, concluding with the Techfest Hackathon results and grand prize distribution.",
    time: "11:00 AM – 05:00 PM",
    reportingTime: "11:00 AM",
    endTime: "05:00 PM",
    venue: "College Main Auditorium & Cultural Stage",
    accentColor: "amber",
    calloutMessage: "We’re expecting maximum participation from our first-year and second-year students! Whether your talent is singing, dancing, mimicry, or something completely different, we want to see you shine. Interested in performing? Please contact your seniors/organizers in advance so your performance can be coordinated."
  },

  // Organizers & Eligibility
  organizerNotice: "Organized by 3rd-year seniors for 1st and 2nd-year students",
  targetAudience: "1st & 2nd Year Students (Information Technology Department, Government Polytechnic Kanpur)",
  eligibilityNotes: "Open to 1st-year and 2nd-year students. 3rd-year seniors act as organizers and mentors.",
  
  // Participation Rules
  participationModes: {
    individual: "Solo / Individual Participant",
    team: "Team Participation (3–5 Members)"
  },
  teamSizeMin: 3,
  teamSizeMax: 5,
  teamSizeText: "Solo or 3–5 Members",

  // Fee Details
  entryFee: 200,
  currency: "₹",
  entryFeeText: "₹200 per participant",
  feeCompulsoryNote: "The participation fee of ₹200 per participant is compulsory. Fee collection is managed and recorded separately by the organizing desk.",

  // Quick Stats
  stats: [
    { label: "Consecutive Days", value: "2 Events", detail: "Techfest (27 Oct) + Rays of Raunak (28 Oct)" },
    { label: "Expected Hackers", value: "60+", detail: "1st & 2nd Year Innovators" },
    { label: "Compulsory Fee", value: "₹200", detail: "Per participant" },
    { label: "Cultural Stage", value: "11 AM – 5 PM", detail: "Singing, Dance, Mimicry & Awards" }
  ],

  // Google Apps Script Integration Endpoint
  googleAppsScriptUrl: (import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbwljKC6kWou7vU8Zm9x0Fx3FD4vGOX2M-autFgJ04JwNXnLC38mN6EDXcUB0-xVEImtJQ/exec").trim(),

  // External & Contact Links
  links: {
    contactEmail: "hackfest.it@gpkanpur.edu",
    whatsappSupport: "https://wa.me/917348754892?text=Hello%20Techfest%20%26%20Rays%20of%20Raunak%20Organizers%2C%20I%20have%20a%20query."
  },

  // Suggested Themes for Hackathon Challenges (Themes, NOT mandatory projects)
  challengeThemes: [
    {
      id: "smart-campus",
      title: "Smart Campus",
      icon: "GraduationCap",
      color: "from-cyan-500 to-blue-500",
      description: "Improve everyday college life through useful digital solutions.",
      exampleIdea: "Example idea for Smart Campus: A simple platform for reporting and finding lost items on campus."
    },
    {
      id: "student-productivity",
      title: "Student Productivity",
      icon: "BookOpen",
      color: "from-blue-500 to-indigo-500",
      description: "Help students manage learning, collaboration, tasks, and academic information.",
      exampleIdea: "Example idea: Collaborative assignment tracker with timetable sync for polytechnic lab batches."
    },
    {
      id: "campus-safety",
      title: "Campus Safety and Accessibility",
      icon: "ShieldAlert",
      color: "from-rose-500 to-orange-500",
      description: "Explore ways to make college facilities and everyday activities safer and more accessible.",
      exampleIdea: "Example idea: Quick campus emergency geo-beacon and wheelchair accessible route maps."
    },
    {
      id: "sustainability",
      title: "Sustainability and Green Campus",
      icon: "Leaf",
      color: "from-emerald-500 to-teal-400",
      description: "Address waste management, resource usage, energy awareness, and environmentally responsible practices.",
      exampleIdea: "Example idea: Smart lab electricity monitor or hostel mess surplus food distribution notifier."
    },
    {
      id: "digital-learning",
      title: "Digital Learning and Skill Sharing",
      icon: "Sparkles",
      color: "from-purple-500 to-pink-500",
      description: "Help students discover learning resources, share knowledge, and practise new skills.",
      exampleIdea: "Example idea: Peer-to-peer code snippet repository and semester question bank solver."
    },
    {
      id: "community-problem-solving",
      title: "Community Problem Solving",
      icon: "Users",
      color: "from-amber-500 to-orange-500",
      description: "Build practical digital solutions for problems faced by people in everyday life.",
      exampleIdea: "Example idea: Local civic issue reporter for neighborhood water supply or road maintenance."
    },
    {
      id: "open-innovation",
      title: "Open Innovation",
      icon: "Zap",
      color: "from-cyan-400 to-violet-500",
      description: "Explore any meaningful problem that does not fit the other categories.",
      exampleIdea: "Example idea: An innovative tool combining web, mobile, or hardware integration of your choice."
    }
  ],

  challengeDisclaimer: "These themes are only suggestions to help you get started. You are absolutely free to choose a different problem or develop your own innovative idea. Your project does not have to be limited to the themes listed here.",

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

  // Schedule Timeline: Day 1 (Techfest Hackathon — 27 October 2026)
  day1Schedule: [
    { time: "09:30 AM – 10:00 AM", title: "Registration & Desk Check-in", desc: "Desk reporting, verification of student IDs, lab seat allotment, and Wi-Fi credential provisioning." },
    { time: "10:00 AM – 10:15 AM", title: "Opening Ceremony", desc: "Welcome address by 3rd-year organizers and faculty coordinators." },
    { time: "10:15 AM – 10:30 AM", title: "Rules & Hackathon Briefing", desc: "Walkthrough of challenge guidelines, judging rubric, submission checklist, and introduction to mentors." },
    { time: "10:30 AM", title: "Hackathon Begins! 🚀", desc: "Hacking sprint officially kicks off. Code repositories initialized." },
    { time: "10:30 AM – 01:00 PM", title: "Sprint Phase 1: Architecture & Core Build", desc: "Teams wireframe, scaffold applications, setup repositories, and build primary workflows with mentor guidance." },
    { time: "01:00 PM – 01:30 PM", title: "Lunch & Networking Break 🍕", desc: "Re-energize, take a break, and discuss ideas with senior mentors." },
    { time: "01:30 PM – 03:30 PM", title: "Sprint Phase 2: Feature Polish & Integration", desc: "Mentors conduct checkpoint rounds. Final feature integration and UI polishing." },
    { time: "03:30 PM – 04:00 PM", title: "Testing & Code Submission", desc: "Final testing, pushing commits to GitHub, and submission of repository links." },
    { time: "04:00 PM Sharp", title: "Submission Closes 🛑", desc: "Late submissions locked out. Evaluation queues initialized." },
    { time: "04:00 PM – 05:30 PM", title: "Presentations & Live Judging", desc: "Each team presents a live demo + Q&A in front of the judging panel. (Winners to be crowned on Day 2 stage!)" }
  ],

  // Schedule Timeline: Day 2 (Rays of Raunak Cultural Fest — 28 October 2026, 11 AM - 5 PM)
  day2Schedule: [
    { time: "11:00 AM", title: "Student Arrival & Settling In", desc: "Auditorium doors open. Students and faculty gather and take their seats for the cultural celebration.", tentative: true },
    { time: "11:15 AM", title: "Welcome & Opening Address", desc: "Official welcome address, lighting of the ceremonial lamp, and opening remarks celebrating student talent.", tentative: true },
    { time: "11:30 AM onwards", title: "Cultural Performances: Part 1", desc: "First round of vibrant student performances including solo singing, group music, and creative stage acts.", tentative: true },
    { time: "01:00 PM", title: "Performance Transition & Refreshment Break", desc: "Short transition interval and refreshments for performers, faculty, and attendees.", tentative: true },
    { time: "01:15 PM onwards", title: "Cultural Performances: Part 2", desc: "High-energy dance showcases, dramatic mimicry, theatrical skits, and special student talent demonstrations.", tentative: true },
    { time: "04:15 PM onwards", title: "Techfest Results Announcement & Prize Distribution 🏆", desc: "Grand podium ceremony! Declaration of Techfest Hackathon winners, runner-ups, standout innovations, and certificate distribution on stage.", tentative: true, highlight: true },
    { time: "Before 05:00 PM", title: "Closing Ceremony & Festival Conclusion", desc: "Vote of thanks by student organizers, commemorative group photos, and conclusion of the two-day festival.", tentative: true }
  ]
};
