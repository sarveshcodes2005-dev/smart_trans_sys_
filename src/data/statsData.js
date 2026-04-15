// Project statistics and metrics from SARV documentation
export const impactStats = [
  { label: "Punctuality Improvement", value: 75, suffix: "%", icon: "clock" },
  { label: "Congestion Reduction", value: 35, suffix: "%", icon: "traffic-cone" },
  { label: "Parent Visibility", value: 100, suffix: "%", icon: "eye" },
  { label: "Driver Adoption", value: 85, suffix: "%", icon: "users" },
  { label: "Annual Value Creation", value: 5, suffix: " Cr", icon: "indian-rupee" },
  { label: "Initial Investment", value: 8, suffix: " L", icon: "piggy-bank" }
];

export const features = [
  {
    title: "AI Route Optimization",
    description: "MILP-based algorithm minimizes travel time while maximizing safety, reducing congestion near school zones by 35%.",
    icon: "route",
    color: "#00D4AA"
  },
  {
    title: "Smartphone GPS Tracking",
    description: "Zero hardware dependency — uses driver smartphones for real-time GPS tracking via WhatsApp integration.",
    icon: "smartphone",
    color: "#6366F1"
  },
  {
    title: "Parent ETA Notifications",
    description: "Instant WhatsApp alerts with live bus ETA, ensuring 100% visibility for parents at all times.",
    icon: "bell",
    color: "#F59E0B"
  },
  {
    title: "Safety Compliance",
    description: "Real-time driver behavior monitoring, speed alerts, and comprehensive safety logging.",
    icon: "shield-check",
    color: "#22C55E"
  },
  {
    title: "School Dashboard",
    description: "Comprehensive fleet management dashboard for school admins with analytics and reporting.",
    icon: "layout-dashboard",
    color: "#EF4444"
  },
  {
    title: "Eco-Friendly Transit",
    description: "Optimized routes reduce fuel consumption and CO₂ emissions, promoting sustainable transport.",
    icon: "leaf",
    color: "#10B981"
  }
];

export const howItWorks = [
  {
    step: 1,
    title: "Driver Starts Route",
    description: "Driver taps 'Start' on WhatsApp bot — GPS tracking activates automatically from their smartphone."
  },
  {
    step: 2,
    title: "AI Optimizes Path",
    description: "Our algorithm analyzes traffic patterns and optimizes the route in real-time for minimum travel time."
  },
  {
    step: 3,
    title: "Parents Get Alerts",
    description: "Parents receive live ETA notifications on WhatsApp — no app download required."
  },
  {
    step: 4,
    title: "Schools Monitor Fleet",
    description: "School admins track all buses on a single dashboard with safety compliance and analytics."
  }
];

export const techStack = [
  { name: "React", category: "Frontend", description: "Web Dashboard for school management" },
  { name: "Node.js", category: "Backend", description: "API and real-time data processing" },
  { name: "PostgreSQL", category: "Database", description: "Mission-critical data storage" },
  { name: "Google Maps API", category: "Maps", description: "Route optimization and geolocation" },
  { name: "WhatsApp Business API", category: "Communication", description: "Parent alerts and driver interaction" },
  { name: "AWS Cloud", category: "Infrastructure", description: "EC2 + RDS for reliable hosting" }
];

export const literatureSurvey = [
  {
    id: 1,
    title: "Logistics in Lean Systems: Transport Impact",
    author: "V. Kujanpää (Aalto University, 2024)",
    finding: "JIT scheduling reduces wait times by 40% and improves transit performance by 35%."
  },
  {
    id: 2,
    title: "Urban Transport Governing Guidelines",
    author: "M. Jannä et al. (2019)",
    finding: "Coordinated logistics reduce small vehicle trips 70% and improve traffic flow 45%."
  },
  {
    id: 3,
    title: "Smart Mobility for Urban Sustainability",
    author: "P. Haag et al. (Frontiers, 2023)",
    finding: "Smartphone GPS solves 65% of urban transit constraints. Perfect for Tier-2 cities."
  },
  {
    id: 4,
    title: "Digital Supply Chain Optimization - Indian Cities",
    author: "Deloitte Global (2025)",
    finding: "AI scheduling delivers 32% efficiency within 6 months. WhatsApp reaches 95% of drivers."
  },
  {
    id: 5,
    title: "Mira-Bhayandar Urban Mobility Baseline",
    author: "MBMC & IIT Bombay (2025)",
    finding: "Uncoordinated transport contributes to 27% of peak congestion. ₹15-20 Cr annual economic loss."
  }
];

export const subjectRoles = [
  {
    subject: "Sampling Theory & Optimization",
    contribution: "Statistical foundation for pilot program selection and MILP route optimization",
    impact: "75% on-time arrivals"
  },
  {
    subject: "Software Engineering",
    contribution: "12-week Agile execution plan for 3-module MVP delivery",
    impact: "99% system uptime"
  },
  {
    subject: "Operating Systems",
    contribution: "Real-time WhatsApp webhook processing and concurrency control",
    impact: "85% driver response rate"
  },
  {
    subject: "Full Stack Development",
    contribution: "React dashboard + WhatsApp bot dual-interface ecosystem",
    impact: "Dashboard + bot live"
  },
  {
    subject: "Computational Thinking",
    contribution: "Algorithmic decomposition of routing: Stops → Time Windows → Traffic",
    impact: "75% on-time algorithm"
  },
  {
    subject: "Design Thinking",
    contribution: "User interviews confirming WhatsApp preference over standalone apps",
    impact: "80% approval rating"
  },
  {
    subject: "Business Development",
    contribution: "₹1L MRR subscription model (₹500/month per bus)",
    impact: "Break-even in 6 months"
  },
  {
    subject: "SysOps Lab",
    contribution: "AWS EC2 + PostgreSQL RDS deployment with automated backups",
    impact: "Production-ready infra"
  }
];

export const weeklyTimeline = [
  { week: "Week 1-2", milestone: "Infrastructure Setup", detail: "AWS deployment, database schema, WhatsApp bot scaffold" },
  { week: "Week 3-4", milestone: "Core MVP", detail: "GPS tracking, route algorithm, school dashboard v1" },
  { week: "Week 5-6", milestone: "Integration", detail: "WhatsApp notifications, parent ETA, driver compliance" },
  { week: "Week 7-8", milestone: "Pilot Launch", detail: "15-school pilot in Mira Bhayandar, driver onboarding" },
  { week: "Week 9-10", milestone: "Optimization", detail: "AI route tuning, congestion heatmaps, analytics" },
  { week: "Week 11-12", milestone: "Scale & Monitor", detail: "Full deployment, 99% uptime target, revenue tracking" }
];
