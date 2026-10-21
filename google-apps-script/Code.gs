/**
 * ==============================================================================
 * TECHFEST × RAYS OF RAUNAK 2026 — REGISTRATION PIPELINE (GOOGLE APPS SCRIPT)
 * Government Polytechnic Kanpur (Information Technology Department)
 * ==============================================================================
 * 
 * SETUP INSTRUCTIONS (सेटअप करने का सबसे आसान तरीका):
 * 
 * 1. GOOGLE SHEET:
 *    - Apni Google Sheet khole: Extensions > Apps Script par click kare.
 *    - Is pure Code.gs code ko editor me paste karke Save kare (Ctrl + S).
 *    - Toolbar se 'setupSheet' function select karke 'Run' dabaye.
 *    - Aapki sheet me 'Registrations' tab 15 clean columns ke sath ban jayega!
 * 
 * 2. DEPLOY WEB APP (Website Se Connect Karne Ke Liye):
 *    - Apps Script me upar blue 'Deploy' button > 'New deployment' par click kare.
 *    - Gear icon (Select type) > 'Web app' choose kare.
 *    - Description: 'Techfest 2026 API'
 *    - Execute as: 'Me'
 *    - Who has access: 'Anyone' (IMPORTANT: Isko 'Anyone' hi select kare!)
 *    - 'Deploy' par click kare aur Web App URL copy kare.
 *    - Is URL ko website ke '.env' file me VITE_GOOGLE_APPS_SCRIPT_URL me paste kare.
 * ==============================================================================
 */

// ==============================================================================
// 1. CONFIGURATION
// ==============================================================================

const REGISTRATIONS_SHEET_NAME = "Registrations";
const SPREADSHEET_ID = ""; // Leave empty if script is bound to the spreadsheet
const REGISTRATION_ID_PREFIX = "TF2026-";

// ==============================================================================
// 2. ONE-TIME SETUP FUNCTION (Run setupSheet from toolbar)
// ==============================================================================

function setupSheet() {
  const ss = getSpreadsheet();
  let sheet = ss.getSheetByName(REGISTRATIONS_SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(REGISTRATIONS_SHEET_NAME);
  }

  // Exact 15 Clean Columns (Payment has ONLY 2 columns: Status & Mode)
  const headers = [
    "Registration ID",     // Col 1
    "Timestamp",           // Col 2
    "Full Name",           // Col 3
    "Year",                // Col 4
    "Email",               // Col 5
    "Phone",               // Col 6
    "Skills",              // Col 7
    "Participation Mode",  // Col 8 (Solo / Team)
    "Team Name",           // Col 9
    "Team Leader",         // Col 10
    "Team Members",        // Col 11
    "Problem Statement",   // Col 12
    "Project Idea",        // Col 13
    "Payment Status",      // Col 14 (Paid / Not Paid)
    "Payment Mode"         // Col 15 (Cash / Online / N/A)
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Header styling: Dark sleek navy with cyan text
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight("bold")
    .setBackground("#070b14")
    .setFontColor("#38bdf8")
    .setHorizontalAlignment("center");
  
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
  
  Logger.log("✅ 'Registrations' sheet initialized with 15 clean columns!");
}

// ==============================================================================
// 3. HTTP GET HANDLER (Health Check)
// ==============================================================================

function doGet(e) {
  return createJsonResponse({
    success: true,
    message: "Techfest × Rays of Raunak 2026 Registration Web App is online.",
    timestamp: new Date().toISOString()
  });
}

// ==============================================================================
// 4. HTTP POST HANDLER (Registration Submission)
// ==============================================================================

function doPost(e) {
  const lock = LockService.getScriptLock();
  
  // Lock for up to 15 seconds to prevent race conditions
  const hasLock = lock.tryLock(15000);
  if (!hasLock) {
    return createJsonResponse({
      success: false,
      message: "Server is currently busy processing another registration. Please retry in a moment."
    });
  }

  try {
    // 1. Parse payload
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({
        success: false,
        message: "No registration payload received."
      });
    }

    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      return createJsonResponse({
        success: false,
        message: "Malformed JSON payload: " + parseError.toString()
      });
    }

    // 2. Validate mandatory fields
    const fullName = String(data.fullName || "").trim();
    const year = String(data.year || "").trim();
    const email = String(data.email || "").trim().toLowerCase();
    const phone = String(data.phone || "").trim();

    if (!fullName || !year || !email || !phone) {
      return createJsonResponse({
        success: false,
        message: "Missing required fields: Full Name, Year, Email, and Phone are mandatory."
      });
    }

    // Payment fields: ONLY Status and Mode
    const paymentStatus = String(data.feePaid || data.paymentStatus || "Not Paid").trim();
    const paymentMode = paymentStatus === "Paid" 
      ? String(data.paymentMethod || "Online/Cash").trim() 
      : "N/A";

    // 3. Access or initialize the Registrations sheet
    const ss = getSpreadsheet();
    let sheet = ss.getSheetByName(REGISTRATIONS_SHEET_NAME);
    if (!sheet) {
      setupSheet();
      sheet = ss.getSheetByName(REGISTRATIONS_SHEET_NAME);
    }

    // 4. Duplicate Check (Email and Phone)
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const existingData = sheet.getRange(2, 1, lastRow - 1, 6).getValues();
      const cleanPhone = phone.replace(/[\s\-+]/g, "");

      for (let i = 0; i < existingData.length; i++) {
        const rowEmail = String(existingData[i][4] || "").trim().toLowerCase();
        const rowPhone = String(existingData[i][5] || "").replace(/['\s\-+]/g, "");

        if (rowEmail === email || (cleanPhone && rowPhone === cleanPhone)) {
          return createJsonResponse({
            success: false,
            message: "A registration with this email or phone number already exists."
          });
        }
      }
    }

    // 5. Generate Safe Sequential Registration ID: TF2026-001, TF2026-002...
    const nextSequenceNumber = getNextSequenceNumber(sheet);
    const registrationId = REGISTRATION_ID_PREFIX + padZero(nextSequenceNumber, 3);

    // 6. Format Fields for Row
    const timestamp = Utilities.formatDate(new Date(), "GMT+5:30", "yyyy-MM-dd HH:mm:ss");
    
    // Technical Skills
    let skillsString = Array.isArray(data.skills) ? data.skills.join(", ") : String(data.skills || "");
    if (data.otherSkill && String(data.otherSkill).trim() !== "") {
      skillsString += (skillsString ? ", " : "") + String(data.otherSkill).trim();
    }

    // Participation & Team Details
    const isTeam = data.participationType === "Team" || data.participationType === "team" || data.teamStatus === "yes";
    const participationMode = isTeam ? "Team (3–5 Members)" : "Individual / Solo";
    const teamName = isTeam ? String(data.teamName || "").trim() : "N/A (Solo)";
    const teamLeader = isTeam ? String(data.teamLeader || fullName).trim() : fullName;
    let teamMembers = "";
    if (isTeam && Array.isArray(data.teamMembers)) {
      teamMembers = data.teamMembers.filter(Boolean).join(", ");
    }

    const problemStatement = String(data.problemStatement || data.problemIdea || "").trim();
    const projectIdea = String(data.projectIdea || data.shortIdea || "").trim();

    // 7. Append Row (Exactly 15 Columns)
    const newRow = [
      registrationId,       // Col 1: Registration ID
      timestamp,            // Col 2: Timestamp
      fullName,             // Col 3: Full Name
      year,                 // Col 4: Year
      email,                // Col 5: Email
      "'" + phone,          // Col 6: Phone
      skillsString,         // Col 7: Skills
      participationMode,    // Col 8: Participation Mode
      teamName,             // Col 9: Team Name
      teamLeader,           // Col 10: Team Leader
      teamMembers,          // Col 11: Team Members
      problemStatement,     // Col 12: Problem Statement
      projectIdea,          // Col 13: Project Idea
      paymentStatus,        // Col 14: Payment Status (Paid / Not Paid)
      paymentMode           // Col 15: Payment Mode (Cash / Online / N/A)
    ];

    sheet.appendRow(newRow);

    // 8. Return Standardized Success JSON
    return createJsonResponse({
      success: true,
      registrationId: registrationId,
      message: "Registration submitted successfully",
      paymentStatus: paymentStatus,
      paymentMode: paymentMode
    });

  } catch (error) {
    Logger.log("Error in doPost: " + error.toString());
    return createJsonResponse({
      success: false,
      message: "Registration failed: " + error.toString()
    });
  } finally {
    lock.releaseLock();
  }
}

// ==============================================================================
// 5. HELPER FUNCTIONS
// ==============================================================================

function getSpreadsheet() {
  if (SPREADSHEET_ID && SPREADSHEET_ID.trim() !== "") {
    return SpreadsheetApp.openById(SPREADSHEET_ID.trim());
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

function getNextSequenceNumber(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    return 1;
  }
  
  const lastIdValue = String(sheet.getRange(lastRow, 1).getValue() || "").trim();
  const match = lastIdValue.match(/\d+$/);
  if (match) {
    return parseInt(match[0], 10) + 1;
  }
  return lastRow;
}

function padZero(num, size) {
  let s = String(num);
  while (s.length < size) {
    s = "0" + s;
  }
  return s;
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
