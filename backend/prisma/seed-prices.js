import "dotenv/config";
import prisma from "../src/config/prisma.js";

const locations = [
  "Meerut",
  "Ghaziabad",
  "Dadri",
  "Noida",
  "Greater Noida",
  "Delhi",
  "Hapur",
  "Bulandshahr",
  "Modinagar",
  "Muzaffarnagar",
  "Saharanpur",
  "Baghpat",
  "Shamli",
  "Aligarh",
  "Moradabad",
  "Bareilly",
  "Agra",
  "Mathura",
  "Roorkee",
  "Haridwar",
];

const materials = [
  {
    material: "CRT",
    subcategories: [
      "CRT Monitor",
      "CRT TV",
      "CRT Tube",
    ],
    basePrice: 42,
  },

  {
    material: "LCD",
    subcategories: [
      "LCD Panel",
      "LED Panel",
      "Display Assembly",
    ],
    basePrice: 105,
  },

  {
    material: "PCB",
    subcategories: [
      "Mixed PCB",
      "Computer PCB",
      "Mobile PCB",
      "TV PCB",
    ],
    basePrice: 145,
  },

  {
    material: "Cables",
    subcategories: [
      "Copper Cable",
      "Aluminium Cable",
      "Mixed Cable",
    ],
    basePrice: 115,
  },

  {
    material: "Battery",
    subcategories: [
      "Lead Acid Battery",
      "Lithium Battery",
      "UPS Battery",
    ],
    basePrice: 82,
  },

  {
    material: "Motor",
    subcategories: [
      "Copper Motor",
      "Aluminium Motor",
      "Mixed Motor",
    ],
    basePrice: 92,
  },

  {
    material: "Mixed Plastic",
    subcategories: [
      "E-Waste Plastic",
      "ABS Plastic",
      "Mixed Hard Plastic",
    ],
    basePrice: 38,
  },

  {
    material: "Copper",
    subcategories: [
      "Bare Copper",
      "Copper Scrap",
      "Insulated Copper",
    ],
    basePrice: 620,
  },

  {
    material: "Aluminium",
    subcategories: [
      "Aluminium Scrap",
      "Aluminium Sheet",
      "Aluminium Mixed",
    ],
    basePrice: 185,
  },

  {
    material: "Iron",
    subcategories: [
      "Iron Scrap",
      "Steel Scrap",
      "Mixed Ferrous",
    ],
    basePrice: 32,
  },
];

const locationMultiplier = {
  Meerut: 1.0,
  Ghaziabad: 1.04,
  Dadri: 0.98,
  Noida: 1.08,
  "Greater Noida": 1.05,
  Delhi: 1.12,
  Hapur: 0.97,
  Bulandshahr: 0.95,
  Modinagar: 0.96,
  Muzaffarnagar: 0.94,
  Saharanpur: 0.93,
  Baghpat: 0.95,
  Shamli: 0.92,
  Aligarh: 0.96,
  Moradabad: 0.98,
  Bareilly: 0.97,
  Agra: 1.01,
  Mathura: 0.98,
  Roorkee: 1.02,
  Haridwar: 1.03,
};

const subcategoryMultiplier = {
  "CRT Monitor": 1.0,
  "CRT TV": 0.92,
  "CRT Tube": 1.08,

  "LCD Panel": 1.0,
  "LED Panel": 1.08,
  "Display Assembly": 1.12,

  "Mixed PCB": 1.0,
  "Computer PCB": 1.15,
  "Mobile PCB": 1.45,
  "TV PCB": 1.08,

  "Copper Cable": 1.15,
  "Aluminium Cable": 0.72,
  "Mixed Cable": 0.9,

  "Lead Acid Battery": 1.0,
  "Lithium Battery": 1.25,
  "UPS Battery": 1.08,

  "Copper Motor": 1.12,
  "Aluminium Motor": 0.82,
  "Mixed Motor": 0.95,

  "E-Waste Plastic": 1.0,
  "ABS Plastic": 1.12,
  "Mixed Hard Plastic": 0.92,

  "Bare Copper": 1.15,
  "Copper Scrap": 1.0,
  "Insulated Copper": 0.82,

  "Aluminium Scrap": 1.0,
  "Aluminium Sheet": 1.08,
  "Aluminium Mixed": 0.88,

  "Iron Scrap": 1.0,
  "Steel Scrap": 1.12,
  "Mixed Ferrous": 0.9,
};

const round = (value, decimals = 2) => {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
};

const randomBetween = (min, max) => {
  return Math.random() * (max - min) + min;
};

const generatePrice = ({
  basePrice,
  material,
  subcategory,
  location,
  dayIndex,
}) => {
  const locationFactor =
    locationMultiplier[location] || 1;

  const subcategoryFactor =
    subcategoryMultiplier[subcategory] || 1;

  /*
   * Small daily market movement.
   * This creates a realistic-looking trend instead
   * of completely random prices.
   */
  const seasonalMovement =
    Math.sin(dayIndex / 8) * 0.035;

  const dailyNoise =
    randomBetween(-0.025, 0.025);

  const trend =
    1 +
    seasonalMovement +
    dailyNoise;

  const materialFactor =
    material === "Copper"
      ? 1.03
      : material === "PCB"
        ? 1.02
        : 1;

  return (
    basePrice *
    locationFactor *
    subcategoryFactor *
    materialFactor *
    trend
  );
};

const seed = async () => {
  console.log("🌱 Starting price history seed...");

  /*
   * DEVELOPMENT ONLY
   *
   * Clear existing price data so the new dataset
   * doesn't mix with the old 217-record dataset.
   */
  await prisma.priceHistory.deleteMany();

  const records = [];

  const today = new Date();

  const TOTAL_DAYS = 91;

  for (const location of locations) {
    for (const materialData of materials) {
      for (const subcategory of materialData.subcategories) {
        for (
          let dayIndex = TOTAL_DAYS - 1;
          dayIndex >= 0;
          dayIndex--
        ) {
          const recordedAt = new Date(today);

          recordedAt.setHours(
            12,
            0,
            0,
            0
          );

          recordedAt.setDate(
            today.getDate() - dayIndex
          );

          const price = generatePrice({
            basePrice:
              materialData.basePrice,

            material:
              materialData.material,

            subcategory,

            location,

            dayIndex,
          });

          const minPrice =
            price *
            randomBetween(0.88, 0.94);

          const maxPrice =
            price *
            randomBetween(1.06, 1.14);

          records.push({
            material:
              materialData.material,

            subcategory,

            location,

            price: round(price),

            minPrice: round(minPrice),

            maxPrice: round(maxPrice),

            unit: "kg",

            source: "Kabadiwala Connect Market Dataset",

            recordedAt,
          });
        }
      }
    }
  }

  console.log(
    `📦 Preparing ${records.length} price records...`
  );

  /*
   * Insert in batches so MongoDB isn't hit with
   * one unnecessarily huge operation.
   */
  const BATCH_SIZE = 1000;

  for (
    let i = 0;
    i < records.length;
    i += BATCH_SIZE
  ) {
    const batch = records.slice(
      i,
      i + BATCH_SIZE
    );

    await prisma.priceHistory.createMany({
      data: batch,
    });

    console.log(
      `Inserted ${
        Math.min(
          i + BATCH_SIZE,
          records.length
        )
      } / ${records.length}`
    );
  }

  console.log("");
  console.log(
    "✅ Price history seeding completed"
  );

  console.log(
    `📊 Total records: ${records.length}`
  );

  console.log(
    `📍 Locations: ${locations.length}`
  );

  console.log(
    `📦 Material categories: ${materials.length}`
  );

  console.log(
    `📋 Subcategories: ${
      materials.reduce(
        (total, item) =>
          total +
          item.subcategories.length,
        0
      )
    }`
  );

  console.log(
    `📅 Days: ${TOTAL_DAYS}`
  );
};

seed()
  .catch((error) => {
    console.error(
      "❌ Seed failed:",
      error
    );

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });