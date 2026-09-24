export const DEMO_RECYCLERS = [
  // ============================================================
  // DELHI
  // ============================================================

  {
    id: "demo-delhi-01",
    name: "GreenLoop E-Waste",
    location: {
      address: "Okhla Industrial Area, New Delhi",
      city: "Delhi",
      state: "Delhi",
      pincode: "110020",
      coordinates: {
        lat: 28.5355,
        lng: 77.2732,
      },
    },
    acceptedMaterials: [
      "mobile",
      "laptop",
      "computer",
      "pcb",
      "cables",
      "printer",
      "monitor",
    ],
    pickup: {
      available: true,
      doorstep: true,
    },
    paymentMethods: ["upi", "bank"],
    minimumPickupWeight: 20,
    verified: true,
    verificationStatus: "verified",
    serviceRadiusKm: 40,
    isDummy: true,
    source: "demo",
  },

  {
    id: "demo-delhi-02",
    name: "EcoCircuit Recovery",
    location: {
      address: "Mayapuri Industrial Area, New Delhi",
      city: "Delhi",
      state: "Delhi",
      pincode: "110064",
      coordinates: {
        lat: 28.6288,
        lng: 77.1282,
      },
    },
    acceptedMaterials: [
      "computer",
      "pcb",
      "cables",
      "monitor",
      "printer",
      "battery",
    ],
    pickup: {
      available: true,
      doorstep: false,
    },
    paymentMethods: ["upi", "cash"],
    minimumPickupWeight: 30,
    verified: true,
    verificationStatus: "verified",
    serviceRadiusKm: 30,
    isDummy: true,
    source: "demo",
  },

  {
    id: "demo-delhi-03",
    name: "Urban E-Cycle",
    location: {
      address: "Wazirpur Industrial Area, Delhi",
      city: "Delhi",
      state: "Delhi",
      pincode: "110052",
      coordinates: {
        lat: 28.6949,
        lng: 77.1655,
      },
    },
    acceptedMaterials: [
      "mobile",
      "laptop",
      "cables",
      "printer",
      "monitor",
    ],
    pickup: {
      available: false,
      doorstep: false,
    },
    paymentMethods: ["cash", "upi"],
    minimumPickupWeight: 10,
    verified: false,
    verificationStatus: "pending",
    serviceRadiusKm: 15,
    isDummy: true,
    source: "demo",
  },

  // ============================================================
  // GHAZIABAD
  // ============================================================

  {
    id: "demo-ghaziabad-01",
    name: "ReNew Electronics",
    location: {
      address: "Sahibabad Industrial Area, Ghaziabad",
      city: "Ghaziabad",
      state: "Uttar Pradesh",
      pincode: "201010",
      coordinates: {
        lat: 28.6857,
        lng: 77.3507,
      },
    },
    acceptedMaterials: [
      "mobile",
      "laptop",
      "computer",
      "pcb",
      "cables",
      "printer",
      "battery",
    ],
    pickup: {
      available: true,
      doorstep: true,
    },
    paymentMethods: ["upi", "bank", "cash"],
    minimumPickupWeight: 15,
    verified: true,
    verificationStatus: "verified",
    serviceRadiusKm: 35,
    isDummy: true,
    source: "demo",
  },

  {
    id: "demo-ghaziabad-02",
    name: "CircuitCycle Hub",
    location: {
      address: "Bulandshahr Road Industrial Area, Ghaziabad",
      city: "Ghaziabad",
      state: "Uttar Pradesh",
      pincode: "201001",
      coordinates: {
        lat: 28.6536,
        lng: 77.4381,
      },
    },
    acceptedMaterials: [
      "pcb",
      "cables",
      "computer",
      "monitor",
      "battery",
    ],
    pickup: {
      available: true,
      doorstep: false,
    },
    paymentMethods: ["upi", "bank"],
    minimumPickupWeight: 25,
    verified: true,
    verificationStatus: "verified",
    serviceRadiusKm: 25,
    isDummy: true,
    source: "demo",
  },

  {
    id: "demo-ghaziabad-03",
    name: "Smart Scrap Recovery",
    location: {
      address: "Mohan Nagar, Ghaziabad",
      city: "Ghaziabad",
      state: "Uttar Pradesh",
      pincode: "201007",
      coordinates: {
        lat: 28.6718,
        lng: 77.3877,
      },
    },
    acceptedMaterials: [
      "mobile",
      "laptop",
      "cables",
      "printer",
    ],
    pickup: {
      available: false,
      doorstep: false,
    },
    paymentMethods: ["cash"],
    minimumPickupWeight: 10,
    verified: false,
    verificationStatus: "pending",
    serviceRadiusKm: 10,
    isDummy: true,
    source: "demo",
  },

  // ============================================================
  // NOIDA
  // ============================================================

  {
    id: "demo-noida-01",
    name: "GreenTech Circular",
    location: {
      address: "Sector 63, Noida",
      city: "Noida",
      state: "Uttar Pradesh",
      pincode: "201301",
      coordinates: {
        lat: 28.6267,
        lng: 77.3813,
      },
    },
    acceptedMaterials: [
      "laptop",
      "computer",
      "pcb",
      "mobile",
      "monitor",
      "printer",
    ],
    pickup: {
      available: true,
      doorstep: true,
    },
    paymentMethods: ["upi", "bank"],
    minimumPickupWeight: 20,
    verified: true,
    verificationStatus: "verified",
    serviceRadiusKm: 30,
    isDummy: true,
    source: "demo",
  },

  {
    id: "demo-noida-02",
    name: "EcoHarvest Recycler",
    location: {
      address: "Sector 10, Noida",
      city: "Noida",
      state: "Uttar Pradesh",
      pincode: "201301",
      coordinates: {
        lat: 28.5816,
        lng: 77.3161,
      },
    },
    acceptedMaterials: [
      "mobile",
      "battery",
      "cables",
      "pcb",
      "printer",
    ],
    pickup: {
      available: true,
      doorstep: false,
    },
    paymentMethods: ["upi", "cash"],
    minimumPickupWeight: 15,
    verified: true,
    verificationStatus: "verified",
    serviceRadiusKm: 20,
    isDummy: true,
    source: "demo",
  },

  // ============================================================
  // MEERUT
  // ============================================================

  {
    id: "demo-meerut-01",
    name: "Meerut Eco Recovery",
    location: {
      address: "Partapur Industrial Area, Meerut",
      city: "Meerut",
      state: "Uttar Pradesh",
      pincode: "250103",
      coordinates: {
        lat: 28.9845,
        lng: 77.7064,
      },
    },
    acceptedMaterials: [
      "mobile",
      "laptop",
      "computer",
      "pcb",
      "cables",
      "battery",
      "printer",
    ],
    pickup: {
      available: true,
      doorstep: true,
    },
    paymentMethods: ["upi", "bank"],
    minimumPickupWeight: 20,
    verified: true,
    verificationStatus: "verified",
    serviceRadiusKm: 50,
    isDummy: true,
    source: "demo",
  },

  {
    id: "demo-meerut-02",
    name: "Green Scrap Solutions",
    location: {
      address: "Delhi Road, Meerut",
      city: "Meerut",
      state: "Uttar Pradesh",
      pincode: "250002",
      coordinates: {
        lat: 28.9984,
        lng: 77.7277,
      },
    },
    acceptedMaterials: [
      "computer",
      "monitor",
      "printer",
      "cables",
      "pcb",
    ],
    pickup: {
      available: true,
      doorstep: false,
    },
    paymentMethods: ["cash", "upi"],
    minimumPickupWeight: 25,
    verified: true,
    verificationStatus: "verified",
    serviceRadiusKm: 35,
    isDummy: true,
    source: "demo",
  },

  {
    id: "demo-meerut-03",
    name: "ElectroCycle Meerut",
    location: {
      address: "Shastri Nagar, Meerut",
      city: "Meerut",
      state: "Uttar Pradesh",
      pincode: "250004",
      coordinates: {
        lat: 28.9632,
        lng: 77.7051,
      },
    },
    acceptedMaterials: [
      "mobile",
      "laptop",
      "battery",
      "cables",
    ],
    pickup: {
      available: false,
      doorstep: false,
    },
    paymentMethods: ["cash"],
    minimumPickupWeight: 10,
    verified: false,
    verificationStatus: "pending",
    serviceRadiusKm: 15,
    isDummy: true,
    source: "demo",
  },

  // ============================================================
  // HARIDWAR
  // ============================================================

  {
    id: "demo-haridwar-01",
    name: "Ganga Green Recycling",
    location: {
      address: "SIDCUL Industrial Area, Haridwar",
      city: "Haridwar",
      state: "Uttarakhand",
      pincode: "249403",
      coordinates: {
        lat: 29.9457,
        lng: 78.1642,
      },
    },
    acceptedMaterials: [
      "laptop",
      "computer",
      "pcb",
      "cables",
      "monitor",
      "printer",
    ],
    pickup: {
      available: true,
      doorstep: true,
    },
    paymentMethods: ["upi", "bank"],
    minimumPickupWeight: 20,
    verified: true,
    verificationStatus: "verified",
    serviceRadiusKm: 40,
    isDummy: true,
    source: "demo",
  },

  {
    id: "demo-haridwar-02",
    name: "EcoFlow Haridwar",
    location: {
      address: "Bahadrabad, Haridwar",
      city: "Haridwar",
      state: "Uttarakhand",
      pincode: "249402",
      coordinates: {
        lat: 29.9117,
        lng: 78.1228,
      },
    },
    acceptedMaterials: [
      "mobile",
      "battery",
      "cables",
      "pcb",
    ],
    pickup: {
      available: true,
      doorstep: false,
    },
    paymentMethods: ["cash", "upi"],
    minimumPickupWeight: 15,
    verified: true,
    verificationStatus: "verified",
    serviceRadiusKm: 25,
    isDummy: true,
    source: "demo",
  },

  {
    id: "demo-haridwar-03",
    name: "Circular Earth E-Waste",
    location: {
      address: "Ranipur More, Haridwar",
      city: "Haridwar",
      state: "Uttarakhand",
      pincode: "249401",
      coordinates: {
        lat: 29.9328,
        lng: 78.1457,
      },
    },
    acceptedMaterials: [
      "mobile",
      "laptop",
      "computer",
      "cables",
      "printer",
    ],
    pickup: {
      available: false,
      doorstep: false,
    },
    paymentMethods: ["upi"],
    minimumPickupWeight: 10,
    verified: false,
    verificationStatus: "pending",
    serviceRadiusKm: 15,
    isDummy: true,
    source: "demo",
  },

  // ============================================================
  // DEHRADUN
  // ============================================================

  {
    id: "demo-dehradun-01",
    name: "Doon E-Cycle",
    location: {
      address: "Selaqui Industrial Area, Dehradun",
      city: "Dehradun",
      state: "Uttarakhand",
      pincode: "248197",
      coordinates: {
        lat: 30.3165,
        lng: 78.0322,
      },
    },
    acceptedMaterials: [
      "mobile",
      "laptop",
      "computer",
      "pcb",
      "cables",
      "battery",
    ],
    pickup: {
      available: true,
      doorstep: true,
    },
    paymentMethods: ["upi", "bank"],
    minimumPickupWeight: 20,
    verified: true,
    verificationStatus: "verified",
    serviceRadiusKm: 45,
    isDummy: true,
    source: "demo",
  },

  {
    id: "demo-dehradun-02",
    name: "Himalayan Green Recycler",
    location: {
      address: "Patel Nagar, Dehradun",
      city: "Dehradun",
      state: "Uttarakhand",
      pincode: "248001",
      coordinates: {
        lat: 30.3203,
        lng: 78.0106,
      },
    },
    acceptedMaterials: [
      "laptop",
      "monitor",
      "printer",
      "cables",
      "pcb",
    ],
    pickup: {
      available: true,
      doorstep: false,
    },
    paymentMethods: ["cash", "upi"],
    minimumPickupWeight: 15,
    verified: true,
    verificationStatus: "verified",
    serviceRadiusKm: 25,
    isDummy: true,
    source: "demo",
  },

  {
    id: "demo-dehradun-03",
    name: "Doon Circular Materials",
    location: {
      address: "Raipur Road, Dehradun",
      city: "Dehradun",
      state: "Uttarakhand",
      pincode: "248008",
      coordinates: {
        lat: 30.343,
        lng: 78.089,
      },
    },
    acceptedMaterials: [
      "mobile",
      "battery",
      "cables",
      "pcb",
    ],
    pickup: {
      available: false,
      doorstep: false,
    },
    paymentMethods: ["cash"],
    minimumPickupWeight: 10,
    verified: false,
    verificationStatus: "pending",
    serviceRadiusKm: 15,
    isDummy: true,
    source: "demo",
  },

  // ============================================================
  // ROORKEE
  // ============================================================

  {
    id: "demo-roorkee-01",
    name: "Roorkee Resource Recovery",
    location: {
      address: "Industrial Estate, Roorkee",
      city: "Roorkee",
      state: "Uttarakhand",
      pincode: "247667",
      coordinates: {
        lat: 29.8543,
        lng: 77.888,
      },
    },
    acceptedMaterials: [
      "computer",
      "pcb",
      "cables",
      "battery",
      "printer",
    ],
    pickup: {
      available: true,
      doorstep: true,
    },
    paymentMethods: ["upi", "bank"],
    minimumPickupWeight: 25,
    verified: true,
    verificationStatus: "verified",
    serviceRadiusKm: 35,
    isDummy: true,
    source: "demo",
  },

  // ============================================================
  // MUZAFFARNAGAR
  // ============================================================

  {
    id: "demo-muzaffarnagar-01",
    name: "Western UP E-Cycle",
    location: {
      address: "Industrial Estate, Muzaffarnagar",
      city: "Muzaffarnagar",
      state: "Uttar Pradesh",
      pincode: "251001",
      coordinates: {
        lat: 29.4727,
        lng: 77.7085,
      },
    },
    acceptedMaterials: [
      "mobile",
      "laptop",
      "computer",
      "cables",
      "pcb",
    ],
    pickup: {
      available: true,
      doorstep: false,
    },
    paymentMethods: ["upi", "cash"],
    minimumPickupWeight: 15,
    verified: true,
    verificationStatus: "verified",
    serviceRadiusKm: 40,
    isDummy: true,
    source: "demo",
  },

  {
  id: "demo-noida-03",
  name: "Noida E-Waste Recovery",
  location: {
    address: "Sector 58, Noida",
    city: "Noida",
    state: "Uttar Pradesh",
    pincode: "201301",
    coordinates: {
      lat: 28.616,
      lng: 77.362,
    },
  },
  acceptedMaterials: [
    "mobile",
    "laptop",
    "computer",
    "pcb",
    "cables",
    "printer",
  ],
  pickup: {
    available: true,
    doorstep: true,
  },
  paymentMethods: [
    "upi",
    "bank",
  ],
  minimumPickupWeight: 15,
  verified: true,
  verificationStatus: "verified",
  serviceRadiusKm: 35,
  isDummy: true,
  source: "demo",
},

{
  id: "demo-gzb-04",
  name: "Sahibabad Circular Hub",
  location: {
    address: "Site IV Industrial Area, Ghaziabad",
    city: "Ghaziabad",
    state: "Uttar Pradesh",
    pincode: "201010",
    coordinates: {
      lat: 28.6845,
      lng: 77.3431,
    },
  },
  acceptedMaterials: [
    "computer",
    "monitor",
    "pcb",
    "battery",
    "cables",
  ],
  pickup: {
    available: true,
    doorstep: true,
  },
  paymentMethods: [
    "cash",
    "upi",
  ],
  minimumPickupWeight: 30,
  verified: true,
  verificationStatus: "verified",
  serviceRadiusKm: 45,
  isDummy: true,
  source: "demo",
},

{
  id: "demo-meerut-04",
  name: "Western Circuit Recycling",
  location: {
    address: "Shatabdi Nagar, Meerut",
    city: "Meerut",
    state: "Uttar Pradesh",
    pincode: "250103",
    coordinates: {
      lat: 28.9618,
      lng: 77.6632,
    },
  },
  acceptedMaterials: [
    "pcb",
    "battery",
    "cables",
    "mobile",
    "computer",
  ],
  pickup: {
    available: true,
    doorstep: false,
  },
  paymentMethods: [
    "upi",
    "cash",
  ],
  minimumPickupWeight: 20,
  verified: true,
  verificationStatus: "verified",
  serviceRadiusKm: 30,
  isDummy: true,
  source: "demo",
},

{
  id: "demo-meerut-05",
  name: "Meerut Electronic Recovery",
  location: {
    address: "Ganga Nagar, Meerut",
    city: "Meerut",
    state: "Uttar Pradesh",
    pincode: "250001",
    coordinates: {
      lat: 29.0033,
      lng: 77.771,
    },
  },
  acceptedMaterials: [
    "mobile",
    "laptop",
    "printer",
    "monitor",
    "cables",
  ],
  pickup: {
    available: false,
    doorstep: false,
  },
  paymentMethods: [
    "cash",
  ],
  minimumPickupWeight: 10,
  verified: false,
  verificationStatus: "pending",
  serviceRadiusKm: 15,
  isDummy: true,
  source: "demo",
},

{
  id: "demo-hapur-01",
  name: "Hapur Green Materials",
  location: {
    address: "Industrial Area, Hapur",
    city: "Hapur",
    state: "Uttar Pradesh",
    pincode: "245101",
    coordinates: {
      lat: 28.7306,
      lng: 77.7759,
    },
  },
  acceptedMaterials: [
    "mobile",
    "computer",
    "pcb",
    "cables",
    "battery",
  ],
  pickup: {
    available: true,
    doorstep: true,
  },
  paymentMethods: [
    "upi",
    "cash",
  ],
  minimumPickupWeight: 20,
  verified: true,
  verificationStatus: "verified",
  serviceRadiusKm: 40,
  isDummy: true,
  source: "demo",
},

{
  id: "demo-roorkee-02",
  name: "Roorkee Eco Metals",
  location: {
    address: "Civil Lines, Roorkee",
    city: "Roorkee",
    state: "Uttarakhand",
    pincode: "247667",
    coordinates: {
      lat: 29.866,
      lng: 77.879,
    },
  },
  acceptedMaterials: [
    "laptop",
    "computer",
    "pcb",
    "monitor",
    "printer",
  ],
  pickup: {
    available: true,
    doorstep: false,
  },
  paymentMethods: [
    "upi",
    "bank",
  ],
  minimumPickupWeight: 25,
  verified: true,
  verificationStatus: "verified",
  serviceRadiusKm: 35,
  isDummy: true,
  source: "demo",
},

{
  id: "demo-saharanpur-01",
  name: "Saharanpur E-Recovery",
  location: {
    address: "Delhi Road Industrial Area, Saharanpur",
    city: "Saharanpur",
    state: "Uttar Pradesh",
    pincode: "247001",
    coordinates: {
      lat: 29.968,
      lng: 77.556,
    },
  },
  acceptedMaterials: [
    "mobile",
    "laptop",
    "computer",
    "pcb",
    "cables",
    "battery",
  ],
  pickup: {
    available: true,
    doorstep: true,
  },
  paymentMethods: [
    "upi",
    "bank",
  ],
  minimumPickupWeight: 20,
  verified: true,
  verificationStatus: "verified",
  serviceRadiusKm: 50,
  isDummy: true,
  source: "demo",
},

{
  id: "demo-haridwar-04",
  name: "Haridwar Circular Recovery",
  location: {
    address: "Roshnabad, Haridwar",
    city: "Haridwar",
    state: "Uttarakhand",
    pincode: "249403",
    coordinates: {
      lat: 29.923,
      lng: 78.127,
    },
  },
  acceptedMaterials: [
    "mobile",
    "computer",
    "pcb",
    "cables",
    "battery",
    "printer",
  ],
  pickup: {
    available: true,
    doorstep: true,
  },
  paymentMethods: [
    "upi",
    "cash",
  ],
  minimumPickupWeight: 15,
  verified: true,
  verificationStatus: "verified",
  serviceRadiusKm: 40,
  isDummy: true,
  source: "demo",
},

{
  id: "demo-dehradun-04",
  name: "Doon Sustainable Recycling",
  location: {
    address: "Majra, Dehradun",
    city: "Dehradun",
    state: "Uttarakhand",
    pincode: "248001",
    coordinates: {
      lat: 30.282,
      lng: 77.996,
    },
  },
  acceptedMaterials: [
    "laptop",
    "mobile",
    "cables",
    "pcb",
    "battery",
  ],
  pickup: {
    available: true,
    doorstep: true,
  },
  paymentMethods: [
    "upi",
    "bank",
  ],
  minimumPickupWeight: 10,
  verified: true,
  verificationStatus: "verified",
  serviceRadiusKm: 30,
  isDummy: true,
  source: "demo",
},

{
  id: "demo-dehradun-05",
  name: "Green Valley E-Waste",
  location: {
    address: "Clement Town, Dehradun",
    city: "Dehradun",
    state: "Uttarakhand",
    pincode: "248002",
    coordinates: {
      lat: 30.265,
      lng: 77.925,
    },
  },
  acceptedMaterials: [
    "computer",
    "monitor",
    "printer",
    "pcb",
    "cables",
  ],
  pickup: {
    available: false,
    doorstep: false,
  },
  paymentMethods: [
    "cash",
    "upi",
  ],
  minimumPickupWeight: 15,
  verified: false,
  verificationStatus: "pending",
  serviceRadiusKm: 20,
  isDummy: true,
  source: "demo",
},

{
  id: "demo-mzn-02",
  name: "Muzaffarnagar Eco Works",
  location: {
    address: "Meerut Road, Muzaffarnagar",
    city: "Muzaffarnagar",
    state: "Uttar Pradesh",
    pincode: "251001",
    coordinates: {
      lat: 29.485,
      lng: 77.699,
    },
  },
  acceptedMaterials: [
    "mobile",
    "laptop",
    "pcb",
    "battery",
    "cables",
  ],
  pickup: {
    available: true,
    doorstep: true,
  },
  paymentMethods: [
    "upi",
    "cash",
  ],
  minimumPickupWeight: 20,
  verified: true,
  verificationStatus: "verified",
  serviceRadiusKm: 40,
  isDummy: true,
  source: "demo",
},
];

export default DEMO_RECYCLERS;