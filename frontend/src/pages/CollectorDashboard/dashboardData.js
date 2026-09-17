export const dashboardStats = [
  {
    id: "activeLots",
    label: "Active Lots",
    value: "12",
    change: "+3",
    changeLabel: "this week",
  },
  {
    id: "earnings",
    label: "This Month",
    value: "₹8,420",
    change: "+12%",
    changeLabel: "vs last month",
  },
  {
    id: "pending",
    label: "Pending",
    value: "3",
    change: "2",
    changeLabel: "need action",
  },
];

export const recentLots = [
  {
    id: 1,
    referenceId: "KC-L-20260917-0004",
    material: "PCB",
    subcategory: "Computer PCB",
    weight: "12.4 kg",
    value: "₹2,480",
    status: "AVAILABLE",
    date: "Today",
  },
  {
    id: 2,
    referenceId: "KC-L-20260916-0003",
    material: "CABLE",
    subcategory: "Copper Wire",
    weight: "18.2 kg",
    value: "₹3,100",
    status: "OFFER_RECEIVED",
    date: "Yesterday",
  },
  {
    id: 3,
    referenceId: "KC-L-20260915-0002",
    material: "BATTERY",
    subcategory: "Lead Acid Battery",
    weight: "24 kg",
    value: "₹4,200",
    status: "COMPLETED",
    date: "15 Sep",
  },
];

export const priceSnapshot = [
  {
    material: "PCB",
    unit: "kg",
    price: "₹420",
    trend: "+4.2%",
    direction: "up",
  },
  {
    material: "Copper Cable",
    unit: "kg",
    price: "₹580",
    trend: "+2.1%",
    direction: "up",
  },
  {
    material: "Battery",
    unit: "kg",
    price: "₹95",
    trend: "-1.4%",
    direction: "down",
  },
];

export const recyclers = [
  {
    id: 1,
    name: "GreenCycle Recycling",
    location: "Meerut",
    distance: "4.2 km",
    materials: ["PCB", "Cable"],
    verified: true,
  },
  {
    id: 2,
    name: "Eco Waste Solutions",
    location: "Ghaziabad",
    distance: "18 km",
    materials: ["Battery", "LCD"],
    verified: true,
  },
];

export const monthlyEarnings = [
  {
    month: "Apr",
    value: 4200,
  },
  {
    month: "May",
    value: 5600,
  },
  {
    month: "Jun",
    value: 4900,
  },
  {
    month: "Jul",
    value: 6800,
  },
  {
    month: "Aug",
    value: 7200,
  },
  {
    month: "Sep",
    value: 8420,
  },
];