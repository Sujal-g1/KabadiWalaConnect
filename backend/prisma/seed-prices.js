import prisma from "../src/config/prisma.js";

const materials = [
  {
    material: "PCB",
    subcategory: "Mixed PCB",
    price: 145,
    minPrice: 130,
    maxPrice: 160,
  },
  {
    material: "Cables",
    subcategory: "Copper Cable",
    price: 85,
    minPrice: 75,
    maxPrice: 95,
  },
  {
    material: "Battery",
    subcategory: "Lead Acid Battery",
    price: 72,
    minPrice: 65,
    maxPrice: 80,
  },
  {
    material: "LCD",
    subcategory: "LCD Panel",
    price: 110,
    minPrice: 95,
    maxPrice: 125,
  },
  {
    material: "CRT",
    subcategory: "CRT Monitor",
    price: 35,
    minPrice: 25,
    maxPrice: 45,
  },
  {
    material: "Motor",
    subcategory: "Copper Motor",
    price: 120,
    minPrice: 105,
    maxPrice: 135,
  },
  {
    material: "Mixed Plastic",
    subcategory: "E-Waste Plastic",
    price: 28,
    minPrice: 20,
    maxPrice: 35,
  },
];


const prices = [];

for (const material of materials) {
  for (let daysAgo = 30; daysAgo >= 0; daysAgo--) {
    const variation =
      (Math.random() - 0.5) * 0.12;

    const price = Number(
      (
        material.price *
        (1 + variation)
      ).toFixed(2)
    );

    prices.push({
      material: material.material,
      subcategory:
        material.subcategory,

      location: "Meerut",

      price,

      minPrice: material.minPrice,
      maxPrice: material.maxPrice,

      unit: "kg",

      source: "development_seed",

      recordedAt: new Date(
        Date.now() -
          daysAgo *
            24 *
            60 *
            60 *
            1000
      ),
    });
  }
}

await prisma.priceHistory.deleteMany();

await prisma.priceHistory.createMany({
  data: prices,
});

console.log(
  `Inserted ${prices.length} price records`
);