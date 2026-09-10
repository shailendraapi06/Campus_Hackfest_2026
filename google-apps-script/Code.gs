/**
 * ==============================================================================
 * CAMPUS HACKFEST 2026 — REGISTRATION & DRIVE PIPELINE (GOOGLE APPS SCRIPT)
 * Government Polytechnic Kanpur (Information Technology Department)
 * ==============================================================================
 * 
 * STEP-BY-STEP SETUP INSTRUCTIONS (सेटअप करने का आसान तरीका):
 * 
 * 1. GOOGLE SHEET:
 *    - Apni Google Sheet khole: Extensions > Apps Script par click kare.
 *    - Is pure Code.gs code ko Apps Script editor me paste karke Save kare.
 *    - Toolbar se 'setupSheet' function select karke 'Run' dabaye (Ek baar permissions allow kare).
 *    - Aapki sheet me 'Registrations' tab 16 headers ke sath create ho jayega!
 * 
 * 2. GOOGLE DRIVE FOLDER FOR SCREENSHOTS (Payment Screenshot Kaise Save Hoga?):
 *    - Google Drive khole (drive.google.com).
 *    - New Folder banaye (e.g. 'Campus HackFest Screenshots').
 *    - Us folder ko open kare aur URL me se folder ID copy kare:
 *      https://drive.google.com/drive/folders/1abcXYZ9876543210 -> '1abcXYZ9876543210'
 *    - Niche line 38 pe PAYMENT_SCREENSHOT_FOLDER_ID me paste kare.
 *    - (NOTE: Agar aap folder ID nahi bhi dalenge, to bhi ye script aapke Drive me
 *      'Campus HackFest 2026 - Payment Screenshots' naam ka folder auto-create kar degi!)
 * 
 * 3. DEPLOY WEB APP (Website Se Connect Karne Ke Liye):
 *    - Apps Script me upar blue 'Deploy' button > 'New deployment' par click kare.
 *    - Gear icon (Select type) > 'Web app' choose kare.
 *    - Description: 'Campus HackFest 2026 API'
 *    - Execute as: 'Me (your-email@gmail.com)'
 *    - Who has access: 'Anyone' (IMPORTANT: Isko 'Anyone' hi select kare!)
 *    - 'Deploy' par click kare aur Web App URL copy kare (e.g. https://script.google.com/macros/s/.../exec).
 *    - Is URL ko website ke '.env' file me VITE_GOOGLE_APPS_SCRIPT_URL me paste kare!
 * ==============================================================================
 */

// ==============================================================================
// 1. CONFIGURATION SECTION
// ==============================================================================

// Google Drive Folder ID where payment screenshots will be saved
// Paste your actual folder ID below (or leave as is to auto-create folder in Drive root):
const PAYMENT_SCREENSHOT_FOLDER_ID = "YOUR_GOOGLE_DRIVE_FOLDER_ID_HERE";

// Sheet tab name for storing registrations
const REGISTRATIONS_SHEET_NAME = "Registrations";

// Optional: Explicit Spreadsheet ID if running as a standalone script
// Leave empty ("") if this script is opened via Extensions > Apps Script in your sheet
const SPREADSHEET_ID = "";

// Registration ID Prefix
const REGISTRATION_ID_PREFIX = "CH2026-";

// Initial Payment Status
const INITIAL_PAYMENT_STATUS = "Pending";

// ==============================================================================
// 2. ONE-TIME SETUP FUNCTION (Run setupSheet() from Apps Script toolbar)
// ==============================================================================

/**
 * Automatically creates and formats the "Registrations" sheet with exact columns.
 */
function setupSheet() {
  const ss = getSpreadsheet();
  let sheet = ss.getSheetByName(REGISTRATIONS_SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(REGISTRATIONS_SHEET_NAME);
  }

  const headers = [
    "Registration ID",
    "Timestamp",
    "Full Name",
    "Year",
    "Email",
    "Phone",
    "Skills",
    "Team Status",
    "Team Name",
    "Team Leader",
    "Team Members",
    "Problem Statement",
    "Project Idea",
    "Transaction ID",
    "Payment Status",
    "Screenshot URL"
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Header styling
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight("bold")
    .setBackground("#0f172a")
    .setFontColor("#38bdf8")
    .setHorizontalAlignment("center");
  
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
  
  Logger.log("✅ 'Registrations' sheet initialized with 16 required columns!");
}

// ==============================================================================
// 3. HTTP GET HANDLER (Health Ping & Deployment Verification)
// ==============================================================================

function doGet(e) {
  return createJsonResponse({
    success: true,
    message: "College HackFest 2026 Registration Web App is online and operational.",
    timestamp: new Date().toISOString()
  });
}

// ==============================================================================
// 4. HTTP POST HANDLER (Registration Submission)
// ==============================================================================

function doPost(e) {
  const lock = LockService.getScriptLock();
  
  // Lock for up to 15 seconds to prevent race conditions & duplicate IDs
  const hasLock = lock.tryLock(15000);
  if (!hasLock) {
    return createJsonResponse({
      success: false,
      message: "Server is currently busy processing another registration. Please retry in a moment."
    });
  }

  try {
    // 1. Verify and parse payload
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
    const transactionId = String(data.transactionId || "Verified in Screenshot").trim();

    if (!fullName || !year || !email || !phone) {
      return createJsonResponse({
        success: false,
        message: "Missing required fields: Full Name, Year, Email, and Phone are mandatory."
      });
    }

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
      // Column 5: Email, Column 6: Phone, Column 14: Transaction ID
      const existingData = sheet.getRange(2, 1, lastRow - 1, 16).getValues();
      const cleanPhone = phone.replace(/[\s\-\+]/g, "");

      for (let i = 0; i < existingData.length; i++) {
        const rowEmail = String(existingData[i][4] || "").trim().toLowerCase();
        const rowPhone = String(existingData[i][5] || "").replace(/['\s\-\+]/g, "");

        if (rowEmail === email || (cleanPhone && rowPhone === cleanPhone)) {
          return createJsonResponse({
            success: false,
            message: "A registration with this email or phone number already exists."
          });
        }
      }
    }

    // 5. Generate Safe Sequential Registration ID: CH2026-001, CH2026-002, etc.
    const nextSequenceNumber = getNextSequenceNumber(sheet);
    const registrationId = REGISTRATION_ID_PREFIX + padZero(nextSequenceNumber, 3);

    // 6. Handle Screenshot Upload to Google Drive
    let screenshotUrl = "No screenshot provided";
    if (data.screenshotBase64) {
      try {
        screenshotUrl = saveScreenshotToDrive(data, registrationId, fullName);
      } catch (driveError) {
        Logger.log("Drive upload error: " + driveError.toString());
        screenshotUrl = "Upload failed: " + driveError.message;
      }
    }

    // 7. Format Fields for Google Sheets Row
    const timestamp = Utilities.formatDate(new Date(), "GMT+5:30", "yyyy-MM-dd HH:mm:ss");
    
    // Technical Skills
    let skillsString = Array.isArray(data.skills) ? data.skills.join(", ") : String(data.skills || "");
    if (data.otherSkill && String(data.otherSkill).trim() !== "") {
      skillsString += (skillsString ? ", " : "") + String(data.otherSkill).trim();
    }

    // Team Information
    const teamStatus = data.teamStatus === "yes" ? "Has Team" : "Needs Teammates";
    const teamName = data.teamStatus === "yes" ? String(data.teamName || "").trim() : "";
    const teamLeader = data.teamStatus === "yes" ? String(data.teamLeader || "").trim() : "";
    let teamMembers = "";
    if (data.teamStatus === "yes" && Array.isArray(data.teamMembers)) {
      teamMembers = data.teamMembers.filter(Boolean).join(", ");
    }

    const problemStatement = String(data.problemStatement || data.problemIdea || "").trim();
    const projectIdea = String(data.projectIdea || data.shortIdea || "").trim();

    // 8. Append the 16 Columns to Google Sheet
    const newRow = [
      registrationId,                         // 1. Registration ID
      timestamp,                              // 2. Timestamp
      fullName,                               // 3. Full Name
      year,                                   // 4. Year
      email,                                  // 5. Email
      "'" + phone,                            // 6. Phone (apostrophe prevents leading zero loss)
      skillsString,                           // 7. Skills
      teamStatus,                             // 8. Team Status
      teamName,                               // 9. Team Name
      teamLeader,                             // 10. Team Leader
      teamMembers,                            // 11. Team Members
      problemStatement,                       // 12. Problem Statement
      projectIdea,                            // 13. Project Idea
      transactionId,                          // 14. Transaction ID
      INITIAL_PAYMENT_STATUS,                 // 15. Payment Status ("Pending")
      screenshotUrl                           // 16. Screenshot URL
    ];

    sheet.appendRow(newRow);

    // 9. Return Standardized Success JSON
    return createJsonResponse({
      success: true,
      registrationId: registrationId,
      message: "Registration submitted successfully",
      paymentStatus: INITIAL_PAYMENT_STATUS
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
// 5. HELPER: SAVE SCREENSHOT TO GOOGLE DRIVE
// ==============================================================================

function saveScreenshotToDrive(data, registrationId, fullName) {
  let targetFolder;

  // Attempt to open user-configured folder ID
  if (PAYMENT_SCREENSHOT_FOLDER_ID && PAYMENT_SCREENSHOT_FOLDER_ID !== "YOUR_GOOGLE_DRIVE_FOLDER_ID_HERE") {
    try {
      targetFolder = DriveApp.getFolderById(PAYMENT_SCREENSHOT_FOLDER_ID.trim());
    } catch (e) {
      Logger.log("Could not find folder by ID, falling back to default root folder: " + e.toString());
    }
  }

  // Fallback: Create or use folder named "Campus HackFest 2026 - Payment Screenshots" in root Drive
  if (!targetFolder) {
    const folderName = "Campus HackFest 2026 - Payment Screenshots";
    const existingFolders = DriveApp.getFoldersByName(folderName);
    if (existingFolders.hasNext()) {
      targetFolder = existingFolders.next();
    } else {
      targetFolder = DriveApp.createFolder(folderName);
    }
  }

  // Determine file extension and MIME type
  let mimeType = data.screenshotMimeType || "image/png";
  let extension = "png";
  if (mimeType.includes("jpeg") || mimeType.includes("jpg")) {
    extension = "jpg";
    mimeType = "image/jpeg";
  } else if (mimeType.includes("webp")) {
    extension = "webp";
    mimeType = "image/webp";
  }

  // Format safe filename: e.g. CH2026-001_RahulSharma_payment.jpg
  const sanitizedName = fullName.replace(/[^a-zA-Z0-9]/g, "");
  const fileName = registrationId + "_" + sanitizedName + "_payment." + extension;

  // Clean base64 string (remove data:image/...;base64, prefix if present)
  let base64String = data.screenshotBase64;
  if (base64String.indexOf(",") > -1) {
    base64String = base64String.split(",")[1];
  }

  const decodedBytes = Utilities.base64Decode(base64String);
  const blob = Utilities.newBlob(decodedBytes, mimeType, fileName);

  // Create file in Drive folder
  const file = targetFolder.createFile(blob);

  // Set permission to anyone with link can view (so organizers can preview from sheet)
  try {
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (permError) {
    Logger.log("Could not set public view permission: " + permError.toString());
  }

  return file.getUrl();
}

// ==============================================================================
// 6. HELPER: SEQUENTIAL ID GENERATION (CH2026-001, CH2026-002, ...)
// ==============================================================================

function getNextSequenceNumber(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    return 1;
  }

  // Scan existing IDs in column 1 to find the maximum existing sequence number
  const idValues = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  let maxSeq = 0;

  for (let i = 0; i < idValues.length; i++) {
    const id = String(idValues[i][0] || "").trim();
    if (id.startsWith(REGISTRATION_ID_PREFIX)) {
      const numPart = parseInt(id.substring(REGISTRATION_ID_PREFIX.length), 10);
      if (!isNaN(numPart) && numPart > maxSeq) {
        maxSeq = numPart;
      }
    }
  }

  return maxSeq > 0 ? maxSeq + 1 : (lastRow - 1);
}

function padZero(num, size) {
  let s = String(num);
  while (s.length < size) s = "0" + s;
  return s;
}

// ==============================================================================
// 7. HELPER: SPREADSHEET RESOLVER & CORS JSON OUTPUT
// ==============================================================================

function getSpreadsheet() {
  if (SPREADSHEET_ID && SPREADSHEET_ID.trim() !== "") {
    return SpreadsheetApp.openById(SPREADSHEET_ID.trim());
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

function createJsonResponse(data) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
