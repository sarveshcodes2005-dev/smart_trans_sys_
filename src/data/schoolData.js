// Simulated school data for Mira Bhayandar region
export const schools = [
  {
    id: 1,
    name: "St. Xavier's High School",
    area: "Mira Road East",
    lat: 19.2813,
    lng: 72.8683,
    students: 420,
    buses: 6,
    color: "#00D4AA"
  },
  {
    id: 2,
    name: "Ryan International School",
    area: "Bhayandar West",
    lat: 19.3013,
    lng: 72.8483,
    students: 350,
    buses: 5,
    color: "#6366F1"
  },
  {
    id: 3,
    name: "DAV Public School",
    area: "Mira Road West",
    lat: 19.2890,
    lng: 72.8550,
    students: 280,
    buses: 4,
    color: "#F59E0B"
  },
  {
    id: 4,
    name: "Smt. Sulochanadevi Singhania School",
    area: "Bhayandar East",
    lat: 19.3050,
    lng: 72.8610,
    students: 510,
    buses: 7,
    color: "#EF4444"
  },
  {
    id: 5,
    name: "Holy Cross Convent School",
    area: "Mira Road",
    lat: 19.2750,
    lng: 72.8720,
    students: 300,
    buses: 4,
    color: "#22C55E"
  }
];

export const schoolZones = [
  { lat: 19.2813, lng: 72.8683, radius: 200, congestion: "high" },
  { lat: 19.3013, lng: 72.8483, radius: 180, congestion: "medium" },
  { lat: 19.2890, lng: 72.8550, radius: 150, congestion: "high" },
  { lat: 19.3050, lng: 72.8610, radius: 220, congestion: "low" },
  { lat: 19.2750, lng: 72.8720, radius: 170, congestion: "medium" }
];
