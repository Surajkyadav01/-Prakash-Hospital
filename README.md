# 🏥 Prakash Hospital & Multi-Speciality Care, Suriyawan (Bhadohi)

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-blue.svg)](#license)
[![NABH](https://img.shields.io/badge/Accreditation-NABH%20%26%20NABL-059669.svg)](https://nabh.co/)
[![Emergency](https://img.shields.io/badge/24x7-Emergency%20Care-DC2626.svg)](#hospital-contact--emergency-helplines)

> **Official web application for Prakash Hospital & Multi-Speciality Care** — A premier tertiary healthcare institution in Suriyawan, Bhadohi (Uttar Pradesh), delivering ethical clinical excellence, advanced surgical procedures, and 24x7 emergency medical attention.

---

## 📌 Table of Contents

- [About Prakash Hospital](#-about-prakash-hospital)
- [Key Features](#-key-features)
- [Hospital Leadership & Administration](#-hospital-leadership--administration)
- [Hospital Contact & Emergency Helplines](#-hospital-contact--emergency-helplines)
- [Technology Stack](#-technology-stack)
- [Directory Structure](#-directory-structure)
- [Getting Started](#-getting-started)
- [Deployment Guide](#-deployment-guide)
  - [Deploy on Vercel](#1-deploy-on-vercel-recommended)
  - [Deploy on Netlify](#2-deploy-on-netlify)
  - [Deploy on GitHub Pages](#3-deploy-on-github-pages)
  - [Custom Domain & DNS Setup](#4-custom-domain--dns-setup)
- [Performance & SEO Optimization](#-performance--seo-optimization)
- [License](#-license)

---

## 🏥 About Prakash Hospital

Established in 2020, **Prakash Hospital** stands as a beacon of clinical honesty, modern infrastructure, and compassionate bedside care in **Suriyawan, Bhadohi (Eastern Uttar Pradesh)**. 

The hospital houses a high-tech modular operation theatre, fully equipped intensive care unit (ICU/NICU), 24x7 emergency and trauma care, in-house computerized pathology laboratory, digital X-ray, ultrasound, and a round-the-clock pharmacy.

- **Founder & Hospital Owner**: Dr. O.P. Yadav (M.S. General Surgery)
- **Hospital Manager & Operations**: Kamlesh Yadav
- **Location**: Suriyawan, Bhadohi District, Uttar Pradesh, India - 221404
- **Accreditation**: NABH & NABL Quality Protocol Compliant
- **Healthcare Mission**: Affordable, accessible, and high-quality tertiary healthcare with patient dignity and transparent treatment.

---

## ✨ Key Features

### 1. 📅 Instant OPD Appointment Booking
- Real-time doctor slot selection with date & department filters.
- Patient details capture (Name, Phone, Age, Gender, Symptoms).
- Automated digital OPD Token & Printable Booking Slip with unique QR reference.
- Direct SMS / WhatsApp confirmation format.

### 2. 👨‍⚕️ Comprehensive Doctor Directory
- Profiles of senior surgeons, physicians, gynecologists, pediatricians, orthopedics, and dentists.
- Verified qualifications (e.g. Dr. O.P. Yadav - M.S. General Surgery).
- Consultation hours, department schedules, and transparent OPD fee listings.

### 3. 🚨 24x7 Emergency & Trauma Response
- One-tap emergency calling to direct helpline: `+91 83838 26205`.
- Ambulance dispatch coordination with real-time ETA estimates.
- Immediate critical care guidelines for cardiac events, road accidents, maternal emergencies, and pediatric crises.

### 4. 🏢 Real Hospital Infrastructure & Facility Tour
- High-resolution photographs of the actual Prakash Hospital building, reception, modular OT, ICU beds, general wards, and private deluxe suites.
- Interactive category filter (OT, ICU, Wards, Diagnostics, Emergency).

### 5. 💳 Cashless Health Insurance & Ayushman Bharat (PM-JAY)
- Comprehensive guide for cashless hospitalization.
- Pre-authorization and claim submission assistance.
- Document checklist and tie-ups with leading TPAs and government schemes.

### 6. 🔐 Patient Portal & History
- Secure OTP/Mobile-based login for patients.
- View upcoming and past appointments.
- Download verified OPD appointment receipts and prescriptions.

---

## 👥 Hospital Leadership & Administration

| Role | Name | Qualification / Designation | Contact |
|---|---|---|---|
| **Hospital Owner & Chief Surgeon** | **Dr. O.P. Yadav** | M.S. (General Surgery) | Via Hospital Reception |
| **Hospital Manager & Help Desk** | **Kamlesh Yadav** | Operations & Patient Help Desk | 📞 **+91 83838 26205**<br>✉️ `kamlesh8383826205@gmail.com` |

> *For any administrative queries, admission support, or patient help desk, please contact Manager Kamlesh Yadav directly.*

---

## 📞 Hospital Contact & Emergency Helplines

- **Emergency Helpline (24x7)**: `+91 83838 26205`
- **OPD Appointment Desk**: `+91 83838 26205`
- **WhatsApp Support**: `+91 83838 26205`
- **Email**: `kamlesh8383826205@gmail.com`
- **Hospital Address**: Prakash Hospital, Main Market / Station Road, Suriyawan, Bhadohi, Uttar Pradesh - 221404
- **Working Hours**:
  - **Emergency & Trauma Unit**: 24 Hours / 365 Days
  - **OPD Timings**: 09:00 AM – 08:00 PM (Monday to Sunday)
  - **In-House Pharmacy & Lab**: 24 Hours Open

---

## 💻 Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type-checking)
- **Build Tool**: [Vite 8](https://vitejs.dev/) (Lightning-fast HMR and optimized production bundle)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Iconography**: [Lucide React](https://lucide.dev/)
- **Typography**: Plus Jakarta Sans & Noto Sans Devanagari (Clean English & Hindi legibility)
- **Assets**: Locally stored, WebP-compressed images and vector icons for near-instant loading and 100 Lighthouse performance.

---

## 📁 Directory Structure

```text
prakash-hospital-app/
├── public/
│   ├── assets/
│   │   ├── doctors/
│   │   │   └── dr-op-yadav.jpg            # Original photo of Dr. O.P. Yadav
│   │   ├── team/
│   │   │   └── kamlesh-yadav-manager.jpg  # Original photo of Manager Kamlesh Yadav
│   │   ├── prakash-hospital-logo.webp     # High-speed WebP hospital logo
│   │   ├── prakash-hospital-logo.png      # High-resolution PNG logo
│   │   └── prakash-hospital-real.jpg      # Original 3-storey hospital building photo
│   ├── favicon.ico                        # 32x32 browser tab icon
│   ├── favicon.webp                       # WebP crisp favicon
│   └── favicon-192.png                    # Android/PWA high-res touch icon
├── src/
│   ├── components/
│   │   ├── Navbar.tsx                     # Top emergency bar & navigation header
│   │   ├── HeroSection.tsx                # Hero section with direct OPD appointment form
│   │   ├── AboutSection.tsx               # About summary & leadership cards
│   │   ├── AboutUsPage.tsx                # Detailed hospital background, mission & team
│   │   ├── DoctorDirectory.tsx            # Specialist directory with schedule and booking
│   │   ├── BookingPage.tsx                # Multi-step OPD booking & receipt generator
│   │   ├── ServicesSection.tsx            # Departments & clinical offerings
│   │   ├── FacilitiesTour.tsx             # Hospital building & OT/ICU gallery
│   │   ├── EmergencySection.tsx           # 24x7 trauma protocols & ambulance dispatch
│   │   ├── InsuranceSection.tsx           # TPA & Ayushman Bharat information
│   │   ├── PatientLoginPage.tsx           # Patient portal login & appointment history
│   │   ├── ContactSection.tsx             # Suriyawan map, helpline & query form
│   │   └── Footer.tsx                     # Emergency numbers, links, and copyright
│   ├── data/
│   │   ├── doctorsData.ts                 # Doctor credentials, fees & OPD schedules
│   │   └── hospitalData.ts                # Services, departments & facility gallery
│   ├── App.tsx                            # Root application component & routing
│   ├── main.tsx                           # React DOM mount
│   └── index.css                          # Global Tailwind v4 design tokens
├── index.html                             # SEO meta tags, OpenGraph, and favicon links
├── package.json                           # Dependencies and build scripts
├── tsconfig.json                          # TypeScript compiler configuration
├── vite.config.ts                         # Vite build configuration
└── README.md                              # Hospital documentation (this file)
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/prakash-hospital.git
   cd prakash-hospital
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

4. **Build for production:**
   ```bash
   npm run build
   ```
   This generates an optimized static bundle in the `dist/` directory.

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## 🌐 Deployment Guide

### 1. Deploy on Vercel (Recommended)
Vercel provides free SSL, edge caching, and global CDN distribution.

1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your `prakash-hospital` repository.
4. Keep the default settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**. Your site will be live within 60 seconds with a free `.vercel.app` domain and automatic SSL!

### 2. Deploy on Netlify
1. Log in to [netlify.com](https://www.netlify.com/).
2. Select **"Import from Git"** and choose your repository.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add a `_redirects` file in `public/` if needed for SPA fallback:
   ```text
   /*    /index.html   200
   ```
6. Click **Deploy Site**.

### 3. Deploy on GitHub Pages
1. In `vite.config.ts`, set `base`:
   ```typescript
   export default defineConfig({
     base: '/<repository-name>/', // or '/' if using custom domain
     plugins: [react()],
   })
   ```
2. Build and publish using `gh-pages`:
   ```bash
   npm install -D gh-pages
   # Add script to package.json: "deploy": "npm run build && gh-pages -d dist"
   npm run deploy
   ```

### 4. Custom Domain & DNS Setup
To link your official hospital domain (e.g. `prakashhospital.in` or `prakashhospitalsuriyawan.com`):

1. Purchase your domain from GoDaddy, Hostinger, Namecheap, or Google Domains.
2. In your Vercel or Netlify dashboard, go to **Settings > Domains > Add Domain**.
3. Add the following DNS records in your domain registrar's DNS manager:
   - **Type A**: `@` points to `76.76.21.21` (for Vercel)
   - **Type CNAME**: `www` points to `cname.vercel-dns.com`
4. SSL certification is automatically provisioned within 10-15 minutes.

---

## ⚡ Performance & SEO Optimization

- **Zero-Delay Asset Delivery**: Hospital logo, building photo, and doctors' images are served locally from `/public/assets/` in lightweight formats (WebP/JPEG).
- **Google Search Console & SEO Ready**:
  - Semantic HTML5 structure (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`).
  - Pre-configured OpenGraph (`og:title`, `og:image`, `og:description`) for WhatsApp, Facebook, and Twitter link previews.
  - Multi-resolution favicons (`favicon.ico`, `favicon.webp`, `favicon-192.png`) for seamless display on Google Search results and browser tabs.

---

## 📄 License & Attribution

Copyright © 2020–2026 **Prakash Hospital & Multi-Speciality Care**. All rights reserved.  
Unauthorized duplication of medical logos, hospital branding, or doctor imagery is strictly prohibited without prior written consent from the hospital management.
