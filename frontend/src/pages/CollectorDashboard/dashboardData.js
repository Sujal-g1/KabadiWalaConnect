const dashboardData = {
  earnings: {
    today: 850,
    total: 12450,
    pending: 1200,
  },

  activeLots: 3,

  prices: [
    {
      id: "pcb",
      material: "PCB",
      price: 145,
      trend: "rising",
    },
    {
      id: "cables",
      material: "Cables",
      price: 85,
      trend: "stable",
    },
    {
      id: "battery",
      material: "Battery",
      price: 72,
      trend: "falling",
    },
    {
      id: "lcd",
      material: "LCD",
      price: 110,
      trend: "rising",
    },
  ],

  recentLots: [
    {
      id: "LOT-1024",
      material: "PCB",
      weight: 12,
      status: "offerReceived",
      estimatedValue: 1740,
    },
    {
      id: "LOT-1023",
      material: "Cables",
      weight: 18,
      status: "pickupScheduled",
      estimatedValue: 1530,
    },
  ],

  recyclers: [
    {
      id: 1,
      name: "GreenCycle Recycling",
      distance: "2.4 km",
      rating: 4.8,
      verified: true,
      pickup: true,
    },
    {
      id: 2,
      name: "EcoTech Recyclers",
      distance: "4.1 km",
      rating: 4.6,
      verified: true,
      pickup: true,
    },
  ],
};

export default dashboardData;