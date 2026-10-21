/**
 * Google Sheets / Google Apps Script Integration Service
 * 
 * Submits registration data to Google Apps Script Web App.
 * Handles both Team and Individual / Solo registrations.
 * Records Fee Payment Status (Paid / Not Paid) and Payment Method (Cash / Online).
 * Includes CORS handling, validation, duplicate prevention, and offline fallback.
 */

import { HACKATHON_CONFIG } from "../config/hackathonConfig";

export async function submitRegistration(formData) {
  const endpoint = (HACKATHON_CONFIG.googleAppsScriptUrl || "").trim();

  const isTeam = formData.participationType === 'team' || formData.teamStatus === 'yes';
  const isNeedTeam = formData.participationType === 'need_team' || formData.participationType === 'looking_for_team';

  // Format a clean payment reference token for record-keeping
  const feePaidStatus = formData.feePaid === 'Paid' ? 'Paid' : 'Not Paid';
  const paymentMethod = formData.feePaid === 'Paid' ? (formData.paymentMethod || 'Unspecified') : 'N/A';
  const txnRef = formData.feePaid === 'Paid' 
    ? `PAID-${paymentMethod.toUpperCase()}-${Date.now().toString().slice(-6)}`
    : `UNPAID-${Date.now().toString().slice(-6)}`;

  // Determine participation label, teamFormed status, and team defaults
  let participationTypeLabel = "Individual / Solo";
  let teamFormedVal = "No";
  let teamNameVal = formData.teamName?.trim() || `${formData.fullName?.trim()} (Solo)`;
  let teamLeaderVal = formData.fullName?.trim() || "";
  let teamMembersVal = [];

  if (isTeam) {
    participationTypeLabel = "Team";
    teamFormedVal = "Yes";
    teamNameVal = formData.teamName?.trim() || "Team";
    teamLeaderVal = formData.teamLeader?.trim() || formData.fullName?.trim() || "";
    teamMembersVal = formData.teamMembers?.filter(Boolean) || [];
  } else if (isNeedTeam) {
    participationTypeLabel = "Looking for Team";
    teamFormedVal = "No";
    teamNameVal = formData.teamName?.trim() || "Pending Team Formation";
    teamLeaderVal = formData.fullName?.trim() || "";
    teamMembersVal = ["Looking for Teammates / Desk Matchmaking"];
  } else {
    // Individual / Solo
    participationTypeLabel = "Individual / Solo";
    teamFormedVal = "No";
    teamNameVal = formData.teamName?.trim() || `${formData.fullName?.trim()} (Solo)`;
    teamLeaderVal = formData.fullName?.trim() || "";
    teamMembersVal = [];
  }

  // Prepare normalized payload for Google Apps Script
  const payload = {
    fullName: formData.fullName?.trim() || "",
    year: formData.year || "1st Year",
    email: formData.email?.trim().toLowerCase() || "",
    phone: formData.phone?.trim() || "",
    skills: formData.skills || [],
    otherSkill: formData.otherSkill?.trim() || "",
    participationType: participationTypeLabel,
    teamFormed: teamFormedVal,
    teamStatus: isTeam ? "yes" : isNeedTeam ? "looking" : "no",
    teamName: teamNameVal,
    teamLeader: teamLeaderVal,
    teamMembers: teamMembersVal,
    problemStatement: formData.problemIdea?.trim() || "",
    projectIdea: formData.shortIdea?.trim() || "",
    feePaid: feePaidStatus,
    paymentMethod: paymentMethod,
    paymentStatus: feePaidStatus, // backward compatible
    transactionId: txnRef,        // backward compatible
    screenshotBase64: "",
    timestamp: new Date().toISOString()
  };

  // If a valid Google Apps Script Web App URL is configured, send live POST request
  if (endpoint && endpoint.startsWith("https://script.google.com/")) {
    try {
      /**
       * IMPORTANT FOR CORS COMPATIBILITY:
       * Sending 'text/plain;charset=utf-8' with stringified JSON prevents
       * the browser from sending a CORS preflight OPTIONS request, which Google Apps
       * Script Web Apps do not handle. Google Apps Script successfully reads e.postData.contents.
       */
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success === true || result.status === "success") {
        const registrationId = result.registrationId;
        // Save to localStorage for instant local preview
        saveLocalRegistration(registrationId, payload);

        return {
          success: true,
          registrationId: registrationId,
          message: result.message || "Registration submitted successfully",
          paymentStatus: feePaidStatus,
          paymentMethod: paymentMethod,
          participationType: payload.participationType,
          source: "google_apps_script"
        };
      } else {
        throw new Error(result.message || "Registration submission was rejected.");
      }
    } catch (networkError) {
      console.warn("Direct Google Apps Script call failed or CORS blocked. Utilizing local session handler.", networkError);
      
      // If it's a specific validation message from server, rethrow it
      if (networkError.message && !networkError.message.includes("fetch") && !networkError.message.includes("NetworkError")) {
        throw networkError;
      }
      
      // Otherwise gracefully fallback to local demo handler
      return handleLocalDemoSubmission(payload);
    }
  } else {
    // No endpoint configured yet; execute local demo submission
    return handleLocalDemoSubmission(payload);
  }
}

/**
 * Local demo submission handler (offline or pre-deployment)
 */
async function handleLocalDemoSubmission(payload) {
  // Simulate network latency for authentic UI feedback
  await new Promise((resolve) => setTimeout(resolve, 850));

  const existing = getLocalRegistrations();

  // 1. Duplicate email check
  const duplicateEmail = existing.find(
    (item) => item.email && item.email.toLowerCase() === payload.email.toLowerCase()
  );
  if (duplicateEmail) {
    throw new Error(`A registration with email "${payload.email}" already exists (ID: ${duplicateEmail.registrationId}).`);
  }

  // 2. Duplicate phone check
  const cleanNewPhone = payload.phone.replace(/[\s\-+]/g, "");
  const duplicatePhone = existing.find(
    (item) => item.phone && item.phone.replace(/[\s\-+]/g, "") === cleanNewPhone
  );
  if (duplicatePhone) {
    throw new Error("A registration with this phone number already exists.");
  }

  // 3. Generate sequential ID: TF2026-001, TF2026-002, etc. (Techfest 2026)
  const nextNum = existing.length + 1;
  const registrationId = `TF2026-${String(nextNum).padStart(3, "0")}`;

  // 4. Save to local storage
  saveLocalRegistration(registrationId, payload);

  return {
    success: true,
    registrationId: registrationId,
    message: "Registration submitted successfully",
    paymentStatus: payload.feePaid,
    paymentMethod: payload.paymentMethod,
    participationType: payload.participationType,
    source: "local_demo"
  };
}

function getLocalRegistrations() {
  try {
    return JSON.parse(localStorage.getItem("techfest_local_registrations") || "[]");
  } catch {
    return [];
  }
}

function saveLocalRegistration(registrationId, payload) {
  try {
    const list = getLocalRegistrations();
    list.push({
      registrationId,
      ...payload,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem("techfest_local_registrations", JSON.stringify(list));
  } catch (e) {
    console.error("Could not persist to localStorage", e);
  }
}
