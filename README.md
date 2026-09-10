# College HackFest 2026 — Official Digital Platform

> **"SOLVE A REAL PROBLEM."**  
> A production-ready, frontend-first college hackathon management platform built for 1st & 2nd-year innovators, organized and mentored by 3rd-year seniors.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com)

---

## 🌟 Key Features

* **Zero-Backend / Serverless Architecture**: Operates directly from the client. No Node/Express, Django, or SQL database servers required.
* **Google Sheets + Google Apps Script Web App**: Seamless participant registration data capture with instant Registration ID generation (`HF-2026-XXXX`).
* **Offline / Demo Resilience**: Built-in fallback demo engine with `localStorage` persistence, allowing full registration and certificate preview testing without immediate Google deployment.
* **Privacy By Design**: Public directories (`/teams`, `/results`) only display public information (names, projects, repos). Sensitive participant data (emails, phone numbers, UPI UTR numbers, payment screenshots) remain strictly isolated in Google Sheets.
* **Public Portals**:
  * **Home**: Hero section, configurable quick stats, 6-step challenge pipeline teaser, and CTAs.
  * **About**: Senior-to-junior mentorship model, 3rd-year organizer framework, and event goals.
  * **Challenge**: The "Solve a Real Problem" framework and 10 real-world exploration tracks.
  * **Rules & Judging**: Eligibility, AI usage policy, code explanation requirements, and 100-mark judging rubric.
  * **Schedule**: Complete 09:30 AM – 05:00 PM sprint timeline.
  * **Registration**: Validated multi-section form with skills tags, team matchmaking toggle, UPI QR payment screen, screenshot upload, and confetti celebration.
  * **Meet The Teams**: Public searchable directory with domain filters, roster badges, and GitHub links.
  * **Results & Scoreboard**: 🥇 Winner, 🥈 Runner-up, 🥉 2nd Runner-up podium, 4 special category honors, and full ranked scoreboard.
  * **Certificate Verification**: Instant registration ID lookup (`HF001` or generated IDs) with printable and verifiable certificate card.

---

## 🛠️ Technology Stack

* **Core Framework**: React 18 + Vite
* **Styling**: Tailwind CSS (custom dark futuristic palette, glassmorphism, glowing borders)
* **Routing**: React Router DOM (v6)
* **Iconography**: Lucide React
* **Effects**: Canvas Confetti
* **Data Layer**: Google Sheets via Google Apps Script Web App
* **Hosting**: Netlify

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
* Node.js v18 or later
* npm v9 or later

### 2. Installation
```bash
# Clone or navigate to the project directory
cd hackathon_website

# Install dependencies
npm install
```

### 3. Running Locally
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 4. Building for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

---

## 📊 Google Sheets & Google Apps Script Setup

To receive registrations directly into your own Google Sheet:

1. **Create a Google Sheet**:
   * Open [Google Sheets](https://sheets.new) and name it: `College HackFest 2026 Registrations`.
2. **Open Apps Script**:
   * In the top menu, go to **Extensions** > **Apps Script**.
3. **Copy the Script**:
   * Delete any existing code in the editor.
   * Copy and paste the entire contents of [`google-apps-script/Code.gs`](google-apps-script/Code.gs).
4. **Initialize Sheets**:
   * In the function dropdown at the top, select `setupSheets`.
   * Click **Run** and grant the required permissions when prompted.
   * This automatically generates the 4 formatted sheets: **Participants**, **Teams**, **Results**, and **Certificates**.
5. **Deploy as Web App**:
   * Click the blue **Deploy** button (top right) > **New deployment**.
   * Click the gear icon next to "Select type" and choose **Web app**.
   * Fill in the details:
     * **Description**: `HackFest 2026 Registration Endpoint`
     * **Execute as**: `Me (your email)`
     * **Who has access**: `Anyone` *(Crucial: Allows students to submit the registration form)*
   * Click **Deploy** and copy the **Web app URL** (e.g. `https://script.google.com/macros/s/AKfycb.../exec`).
6. **Connect with Frontend**:
   * Create a `.env` file in the project root:
     ```env
     VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycb.../exec
     ```
   * Or directly update `googleAppsScriptUrl` in [`src/config/hackathonConfig.js`](src/config/hackathonConfig.js).

---

## 🌐 Netlify Deployment

The project is preconfigured for Netlify with SPA redirects (`public/_redirects` and `netlify.toml`).

### Method A: Connect GitHub to Netlify (Recommended)
1. Push your repository to GitHub.
2. Go to [Netlify](https://app.netlify.com) and click **"Add new site"** > **"Import an existing project"**.
3. Select your GitHub repository.
4. Verify the build settings:
   * **Build command**: `npm run build`
   * **Publish directory**: `dist`
5. Under **Environment variables**, add:
   * Key: `VITE_GOOGLE_APPS_SCRIPT_URL`
   * Value: `Your Google Apps Script Web App URL`
6. Click **Deploy Site**.

### Method B: Manual Drag & Drop
1. Run `npm run build` locally.
2. Drag the generated `dist/` folder into the Netlify dashboard under **Deploys**.

---

## 📁 Content Management Guide

Organizers can easily update the event through simple, centralized JavaScript files:

| File Path | Description |
| :--- | :--- |
| [`src/config/hackathonConfig.js`](src/config/hackathonConfig.js) | Event dates, UPI ID, entry fee, schedule items, rubric, contact links |
| [`src/data/teams.js`](src/data/teams.js) | Public team roster, project titles, GitHub repositories, and demo URLs |
| [`src/data/results.js`](src/data/results.js) | Podium winners (1st, 2nd, 3rd), special category honors, and full leaderboard |
| [`src/data/certificates.js`](src/data/certificates.js) | Verifiable certificate database mapping Registration IDs to credentials |

---

## 🔒 Security & Privacy Practices

* **No Sensitive Data Leaks**: Google service credentials and private sheet edit links are never hardcoded in client source code.
* **Isolated Public Views**: Registration entries undergo organizer verification before being manually or semi-automatically added to `teams.js` and `results.js`.
* **Zero Admin Backdoors**: No insecure client-side admin login passwords or hidden endpoints.

---

## 📜 License
Developed for College HackFest 2026. Open-source under the MIT License.
