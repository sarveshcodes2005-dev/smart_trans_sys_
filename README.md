# SARV — Smart School Transportation System 🚌

![Platform Preview](https://img.shields.io/badge/Platform-React%20%7C%20Vite-blue)
![Theme](https://img.shields.io/badge/UI-Modern%20Dark-0A0F1C)
![Status](https://img.shields.io/badge/Status-Prototype-success)

**SARV** is an AI-driven, software-only school transportation platform designed specifically for the Mira Bhayandar region. It eliminates the need for expensive GPS hardware by utilizing driver smartphone telematics and WhatsApp integrations to deliver real-time parent ETA alerts, route optimization, and enhanced student safety.

*(Created as an Idea Lab Project 2026-27 | SLRTCE — Department of Information Technology)*

## 🚀 Key Features

- **Live Fleet Tracking**: Real-time Leaflet map integration displaying active routes, bus speed, and passenger counts.
- **AI Route Optimizer**: MILP-based algorithm simulation that compresses travel time by 33% and reduces fuel consumption and CO₂ emissions.
- **Parent Portal & ETA Tracking**: WhatsApp-style notification interface showing live ETA countdowns and safety compliance checks.
- **School Dashboard**: Live analytics including active buses, on-time percentage, student capacity, and immediate alert popups.
- **Zero Hardware Dependency**: Complete software ecosystem utilizing smartphones instead of traditional dedicated GPS units.

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 (Vite)
- **Routing**: React Router v6
- **Styling**: Vanilla CSS (Custom Glassmorphism Design System)
- **Maps Integrations**: Leaflet & React-Leaflet
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📦 Quick Start

To run this prototype locally on your machine:

1. **Clone the repository**
   ```bash
   git clone https://github.com/sarveshcodes2005-dev/smart_trans_sys_.git
   cd smart_trans_sys_
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the local development server**
   ```bash
   npm run dev
   ```

4. **View the platform**
   Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```text
smart_trans_sys_/
├── public/                 # Static assets and project PDF documents
├── src/
│   ├── components/         # Reusable UI elements (Navbar, StatCards, etc.)
│   ├── data/               # Simulated geospatial and platform data
│   ├── pages/              # Main application views (Dashboard, Tracking, etc.)
│   ├── App.jsx             # Route configuration
│   └── index.css           # Global design system & theme variables
└── README.md
```

## 👨‍💻 Developer Information

**Sarvesh Hadkar**
- **Course**: SE Information Technology (Division A-II)
- **Roll Number**: 42
- **Institution**: SLRTCE, Mumbai

---
*“Smarter Routes. Safer Students. Greener Cities.”*
