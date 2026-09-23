const allowedMaterials = [
  "CRT",
  "LCD",
  "PCB",
  "CABLE",
  "BATTERY",
  "MOTOR",
  "MIXED_PLASTIC",
];

const validateCreateLot = (data) => {
  const errors = {};

  if (!data.material?.trim()) {
    errors.material = "Material is required";
  } else if (!allowedMaterials.includes(data.material.trim())) {
    errors.material = "Invalid material";
  }

  if (
    data.subcategory !== undefined &&
    data.subcategory !== null &&
    typeof data.subcategory !== "string"
  ) {
    errors.subcategory = "Invalid subcategory";
  }

  const weight = Number(data.approximateWeight);

  if (
    data.approximateWeight === undefined ||
    data.approximateWeight === null ||
    Number.isNaN(weight) ||
    weight <= 0
  ) {
    errors.approximateWeight =
      "Weight must be greater than 0";
  }

  if (weight > 100000) {
    errors.approximateWeight =
      "Weight is too large";
  }

  if (!data.location?.trim()) {
    errors.location = "Location is required";
  }

  if (
    data.latitude !== undefined &&
    data.latitude !== null &&
    (
      typeof data.latitude !== "number" ||
      data.latitude < -90 ||
      data.latitude > 90
    )
  ) {
    errors.latitude = "Invalid latitude";
  }

  if (
    data.longitude !== undefined &&
    data.longitude !== null &&
    (
      typeof data.longitude !== "number" ||
      data.longitude < -180 ||
      data.longitude > 180
    )
  ) {
    errors.longitude = "Invalid longitude";
  }

  const numericFields = [
    "estimatedRate",
    "minEstimatedValue",
    "maxEstimatedValue",
    "estimatedValue",
  ];

  for (const field of numericFields) {
    if (
      data[field] !== undefined &&
      data[field] !== null
    ) {
      const value = Number(data[field]);

      if (Number.isNaN(value) || value < 0) {
        errors[field] = "Invalid value";
      }
    }
  }

  return errors;
};

export {
  allowedMaterials,
  validateCreateLot,
};