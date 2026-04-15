// Simulated bus data with routes across Mira Bhayandar
export const buses = [
  {
    id: "MB-01",
    number: "MH-04-AB-1234",
    driver: "Ramesh Kumar",
    phone: "+91 98765 43210",
    school: "St. Xavier's High School",
    schoolId: 1,
    students: 32,
    capacity: 40,
    status: "on-route",
    speed: 28,
    fuelLevel: 72,
    route: [
      { lat: 19.2720, lng: 72.8580, name: "Sheetal Nagar" },
      { lat: 19.2755, lng: 72.8610, name: "Mira Road Station" },
      { lat: 19.2780, lng: 72.8650, name: "Shanti Park" },
      { lat: 19.2813, lng: 72.8683, name: "St. Xavier's School" }
    ],
    currentStop: 1,
    eta: 12,
    onTime: true
  },
  {
    id: "MB-02",
    number: "MH-04-CD-5678",
    driver: "Suresh Patel",
    phone: "+91 98765 43211",
    school: "Ryan International School",
    schoolId: 2,
    students: 28,
    capacity: 40,
    status: "on-route",
    speed: 22,
    fuelLevel: 58,
    route: [
      { lat: 19.2950, lng: 72.8400, name: "Navghar" },
      { lat: 19.2980, lng: 72.8440, name: "Bhayandar Station" },
      { lat: 19.3000, lng: 72.8460, name: "Maxus Mall" },
      { lat: 19.3013, lng: 72.8483, name: "Ryan International" }
    ],
    currentStop: 2,
    eta: 8,
    onTime: true
  },
  {
    id: "MB-03",
    number: "MH-04-EF-9012",
    driver: "Vikram Singh",
    phone: "+91 98765 43212",
    school: "DAV Public School",
    schoolId: 3,
    students: 35,
    capacity: 40,
    status: "delayed",
    speed: 12,
    fuelLevel: 45,
    route: [
      { lat: 19.2820, lng: 72.8450, name: "Kashimira" },
      { lat: 19.2850, lng: 72.8500, name: "Beverly Park" },
      { lat: 19.2870, lng: 72.8530, name: "Galaxy Cinema" },
      { lat: 19.2890, lng: 72.8550, name: "DAV School" }
    ],
    currentStop: 1,
    eta: 22,
    onTime: false
  },
  {
    id: "MB-04",
    number: "MH-04-GH-3456",
    driver: "Ajay Sharma",
    phone: "+91 98765 43213",
    school: "Smt. Sulochanadevi Singhania School",
    schoolId: 4,
    students: 38,
    capacity: 45,
    status: "on-route",
    speed: 30,
    fuelLevel: 85,
    route: [
      { lat: 19.2980, lng: 72.8550, name: "Bhayandar East" },
      { lat: 19.3010, lng: 72.8570, name: "Gayatri Nagar" },
      { lat: 19.3030, lng: 72.8590, name: "Uttan Road" },
      { lat: 19.3050, lng: 72.8610, name: "Singhania School" }
    ],
    currentStop: 2,
    eta: 6,
    onTime: true
  },
  {
    id: "MB-05",
    number: "MH-04-IJ-7890",
    driver: "Manoj Tiwari",
    phone: "+91 98765 43214",
    school: "Holy Cross Convent School",
    schoolId: 5,
    students: 25,
    capacity: 35,
    status: "idle",
    speed: 0,
    fuelLevel: 90,
    route: [
      { lat: 19.2680, lng: 72.8650, name: "Pleasant Park" },
      { lat: 19.2710, lng: 72.8680, name: "Silver Park" },
      { lat: 19.2730, lng: 72.8700, name: "Royal Complex" },
      { lat: 19.2750, lng: 72.8720, name: "Holy Cross School" }
    ],
    currentStop: 0,
    eta: 0,
    onTime: true
  },
  {
    id: "MB-06",
    number: "MH-04-KL-2345",
    driver: "Deepak Joshi",
    phone: "+91 98765 43215",
    school: "St. Xavier's High School",
    schoolId: 1,
    students: 30,
    capacity: 40,
    status: "on-route",
    speed: 25,
    fuelLevel: 63,
    route: [
      { lat: 19.2850, lng: 72.8750, name: "Penkarpada" },
      { lat: 19.2830, lng: 72.8720, name: "Mira Gaon" },
      { lat: 19.2820, lng: 72.8700, name: "SBI Colony" },
      { lat: 19.2813, lng: 72.8683, name: "St. Xavier's School" }
    ],
    currentStop: 1,
    eta: 15,
    onTime: true
  },
  {
    id: "MB-07",
    number: "MH-04-MN-6789",
    driver: "Ravi Verma",
    phone: "+91 98765 43216",
    school: "Ryan International School",
    schoolId: 2,
    students: 22,
    capacity: 35,
    status: "on-route",
    speed: 18,
    fuelLevel: 50,
    route: [
      { lat: 19.3080, lng: 72.8520, name: "Indralok" },
      { lat: 19.3060, lng: 72.8500, name: "Sector 7" },
      { lat: 19.3040, lng: 72.8490, name: "Bhayandar Flyover" },
      { lat: 19.3013, lng: 72.8483, name: "Ryan International" }
    ],
    currentStop: 2,
    eta: 5,
    onTime: true
  },
  {
    id: "MB-08",
    number: "MH-04-OP-0123",
    driver: "Santosh Gupta",
    phone: "+91 98765 43217",
    school: "DAV Public School",
    schoolId: 3,
    students: 27,
    capacity: 35,
    status: "alert",
    speed: 0,
    fuelLevel: 32,
    route: [
      { lat: 19.2920, lng: 72.8600, name: "Golden Nest" },
      { lat: 19.2900, lng: 72.8580, name: "Eco Park" },
      { lat: 19.2895, lng: 72.8560, name: "Green Valley" },
      { lat: 19.2890, lng: 72.8550, name: "DAV School" }
    ],
    currentStop: 0,
    eta: 0,
    onTime: false
  }
];

export const getStatusColor = (status) => {
  switch (status) {
    case 'on-route': return '#22C55E';
    case 'delayed': return '#F59E0B';
    case 'idle': return '#6B7280';
    case 'alert': return '#EF4444';
    default: return '#6B7280';
  }
};

export const getStatusLabel = (status) => {
  switch (status) {
    case 'on-route': return 'On Route';
    case 'delayed': return 'Delayed';
    case 'idle': return 'Idle';
    case 'alert': return 'Alert';
    default: return 'Unknown';
  }
};
