const MARKET_TIMEZONE = "Asia/Kolkata";

const MATERIALS = [
  {
    material: "CRT",
    subcategories: ["CRT Monitor", "CRT TV", "CRT Tube"],
    basePrice: 42,
  },
  {
    material: "LCD",
    subcategories: ["LCD Panel", "LED Panel", "Display Assembly"],
    basePrice: 105,
  },
  {
    material: "PCB",
    subcategories: ["Mixed PCB", "Computer PCB", "Mobile PCB", "TV PCB"],
    basePrice: 145,
  },
  {
    material: "Cables",
    subcategories: ["Copper Cable", "Aluminium Cable", "Mixed Cable"],
    basePrice: 115,
  },
  {
    material: "Battery",
    subcategories: ["Lead Acid Battery", "Lithium Battery", "UPS Battery"],
    basePrice: 82,
  },
  {
    material: "Motor",
    subcategories: ["Copper Motor", "Aluminium Motor", "Mixed Motor"],
    basePrice: 92,
  },
  {
    material: "Mixed Plastic",
    subcategories: ["E-Waste Plastic", "ABS Plastic", "Mixed Hard Plastic"],
    basePrice: 38,
  },
  {
    material: "Copper",
    subcategories: ["Bare Copper", "Copper Scrap", "Insulated Copper"],
    basePrice: 620,
  },
  {
    material: "Aluminium",
    subcategories: ["Aluminium Scrap", "Aluminium Sheet", "Aluminium Mixed"],
    basePrice: 185,
  },
  {
    material: "Iron",
    subcategories: ["Iron Scrap", "Steel Scrap", "Mixed Ferrous"],
    basePrice: 32,
  },
];

const LOCATION_MULTIPLIER = {
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

const SUBCATEGORY_MULTIPLIER = {
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

const MATERIAL_VOLATILITY = {
  CRT: 0.018,
  LCD: 0.022,
  PCB: 0.040,
  Cables: 0.032,
  Battery: 0.026,
  Motor: 0.024,
  "Mixed Plastic": 0.018,
  Copper: 0.045,
  Aluminium: 0.027,
  Iron: 0.021,
};

const normalize = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

const round = (value, decimals = 2) => {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
};

const clamp = (value, min, max) =>
  Math.min(Math.max(value, min), max);

const hashString = (value) => {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
};

const seededUnit = (seed) =>
  hashString(seed) / 4294967295;

const getDateKey = (date = new Date()) => {
  const parts = new Intl.DateTimeFormat("en-IN", {
    timeZone: MARKET_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  return `${year}-${month}-${day}`;
};

const addDays = (dateKey, amount) => {
  const date = new Date(`${dateKey}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + amount);
  return date.toISOString().slice(0, 10);
};

const getRecordedAt = (dateKey) =>
  new Date(`${dateKey}T12:00:00+05:30`).toISOString();

const resolveMaterial = (material) => {
  const target = normalize(material);

  return MATERIALS.find(
    (item) => normalize(item.material) === target
  );
};

const resolveSubcategory = ({
  materialData,
  subcategory,
}) => {
  if (!materialData) {
    return null;
  }

  if (!subcategory) {
    return materialData.subcategories[0] || null;
  }

  const target = normalize(subcategory);

  return (
    materialData.subcategories.find(
      (item) => normalize(item) === target
    ) || null
  );
};

const getLocationFactor = (location) => {
  const target = normalize(location);

  const entry = Object.entries(LOCATION_MULTIPLIER).find(
    ([name]) => normalize(name) === target
  );

  return entry?.[1] ?? 1;
};

const getMarketFactor = ({
  material,
  subcategory,
  location,
  dateKey,
}) => {
  const dayNumber = Math.floor(
    Date.parse(`${dateKey}T00:00:00Z`) / 86400000
  );

  const identity = `${material}|${subcategory}|${location}`;
  const volatility = MATERIAL_VOLATILITY[material] || 0.02;

  const phaseA =
    seededUnit(`${identity}|phase-a`) * Math.PI * 2;
  const phaseB =
    seededUnit(`${identity}|phase-b`) * Math.PI * 2;
  const phaseC =
    seededUnit(`${identity}|phase-c`) * Math.PI * 2;
  const phaseD =
    seededUnit(`${identity}|phase-d`) * Math.PI * 2;

  const shortCycle =
    Math.sin(dayNumber / 4.8 + phaseA) * volatility;

  const mediumCycle =
    Math.sin(dayNumber / 14 + phaseB) * volatility * 0.65;

  const longCycle =
    Math.sin(dayNumber / 42 + phaseC) * volatility * 0.4;

  const dailyNoise =
    (seededUnit(`${identity}|${dateKey}|noise`) - 0.5) *
    volatility *
    0.6;

  const macroTrend =
    Math.sin(dayNumber / 85 + phaseD) * 0.012;

  return clamp(
    1 +
      shortCycle +
      mediumCycle +
      longCycle +
      dailyNoise +
      macroTrend,
    0.86,
    1.16
  );
};

const calculateRawPrice = ({
  materialData,
  subcategory,
  location,
  dateKey,
}) => {
  const locationFactor = getLocationFactor(location);
  const subcategoryFactor =
    SUBCATEGORY_MULTIPLIER[subcategory] ?? 1;

  const materialFactor =
    materialData.material === "Copper"
      ? 1.03
      : materialData.material === "PCB"
        ? 1.02
        : 1;

  const currentFactor = getMarketFactor({
    material: materialData.material,
    subcategory,
    location,
    dateKey,
  });

  const previousDateKey = addDays(dateKey, -1);

  const previousFactor = getMarketFactor({
    material: materialData.material,
    subcategory,
    location,
    dateKey: previousDateKey,
  });

  const smoothFactor =
    previousFactor * 0.35 +
    currentFactor * 0.65;

  return (
    materialData.basePrice *
    locationFactor *
    subcategoryFactor *
    materialFactor *
    smoothFactor
  );
};

const calculatePriceForDate = ({
  material,
  subcategory,
  location,
  dateKey,
}) => {
  const materialData = resolveMaterial(material);

  if (!materialData) {
    return null;
  }

  const resolvedSubcategory = resolveSubcategory({
    materialData,
    subcategory,
  });

  if (!resolvedSubcategory) {
    return null;
  }

  const price = calculateRawPrice({
    materialData,
    subcategory: resolvedSubcategory,
    location,
    dateKey,
  });

  const spreadSeed = seededUnit(
    [
      materialData.material,
      resolvedSubcategory,
      location,
      dateKey,
      "spread",
    ].join("|")
  );

  const minPrice =
    price * (1 - (0.06 + spreadSeed * 0.04));

  const maxPrice =
    price * (1 + (0.07 + spreadSeed * 0.05));

  const yesterdayKey = addDays(dateKey, -1);

  const yesterdayPrice = calculateRawPrice({
    materialData,
    subcategory: resolvedSubcategory,
    location,
    dateKey: yesterdayKey,
  });

  const changePercent =
    yesterdayPrice > 0
      ? ((price - yesterdayPrice) / yesterdayPrice) * 100
      : 0;

  let trend = "stable";

  if (changePercent >= 0.5) {
    trend = "rising";
  } else if (changePercent <= -0.5) {
    trend = "falling";
  }

  return {
    price: round(price),
    minPrice: round(minPrice),
    maxPrice: round(maxPrice),
    changePercent: round(changePercent, 2),
    trend,
  };
};

const getDynamicPrice = ({
  material,
  subcategory,
  location = "Meerut",
  date = new Date(),
}) => {
  const materialData = resolveMaterial(material);

  if (!materialData) {
    return null;
  }

  const resolvedSubcategory = resolveSubcategory({
    materialData,
    subcategory,
  });

  if (!resolvedSubcategory) {
    return null;
  }

  const dateKey = getDateKey(date);

  const calculated = calculatePriceForDate({
    material: materialData.material,
    subcategory: resolvedSubcategory,
    location,
    dateKey,
  });

  if (!calculated) {
    return null;
  }

  return {
    id:
      `dynamic-${location}-${materialData.material}-${resolvedSubcategory}-${dateKey}`
        .replace(/\s+/g, "-")
        .toLowerCase(),

    material: materialData.material,
    subcategory: resolvedSubcategory,
    location,

    price: calculated.price,
    minPrice: calculated.minPrice,
    maxPrice: calculated.maxPrice,

    changePercent: calculated.changePercent,
    trend: calculated.trend,

    unit: "kg",

    source:
      "Kabadiwala Connect Dynamic Market Model",

    recordedAt: getRecordedAt(dateKey),
  };
};

const getCurrentPrices = ({
  location = "Meerut",
  material,
} = {}) => {
  const selectedMaterial = material
    ? resolveMaterial(material)
    : null;

  const materialList = selectedMaterial
    ? [selectedMaterial]
    : MATERIALS;

  const prices = [];

  for (const materialData of materialList) {
    for (const subcategory of materialData.subcategories) {
      const price = getDynamicPrice({
        material: materialData.material,
        subcategory,
        location,
      });

      if (price) {
        prices.push(price);
      }
    }
  }

  return prices;
};

const getDynamicPriceHistory = ({
  location = "Meerut",
  material,
  subcategory,
  limit = 30,
} = {}) => {
  if (!material || !subcategory) {
    return [];
  }

  const safeLimit = clamp(
    Number(limit) || 30,
    1,
    365
  );

  const todayKey = getDateKey();
  const history = [];

  for (
    let daysAgo = safeLimit - 1;
    daysAgo >= 0;
    daysAgo -= 1
  ) {
    const dateKey = addDays(todayKey, -daysAgo);

    const calculated = calculatePriceForDate({
      material,
      subcategory,
      location,
      dateKey,
    });

    if (!calculated) {
      continue;
    }

    const materialData = resolveMaterial(material);
    const resolvedSubcategory = resolveSubcategory({
      materialData,
      subcategory,
    });

    history.push({
      id:
        `dynamic-${location}-${materialData.material}-${resolvedSubcategory}-${dateKey}`
          .replace(/\s+/g, "-")
          .toLowerCase(),

      material: materialData.material,
      subcategory: resolvedSubcategory,
      location,

      price: calculated.price,
      minPrice: calculated.minPrice,
      maxPrice: calculated.maxPrice,

      changePercent: calculated.changePercent,
      trend: calculated.trend,

      unit: "kg",

      source:
        "Kabadiwala Connect Dynamic Market Model",

      recordedAt: getRecordedAt(dateKey),
    });
  }

  return history;
};

export {
  MATERIALS,
  getDynamicPrice,
  getCurrentPrices,
  getDynamicPriceHistory,
};
