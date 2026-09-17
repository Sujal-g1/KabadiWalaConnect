const validateCreateHandover = (data) => {
  const errors = {};

  const actualWeight =
    Number(data.actualWeight);

  if (
    data.actualWeight === undefined ||
    data.actualWeight === null ||
    Number.isNaN(actualWeight) ||
    actualWeight <= 0
  ) {
    errors.actualWeight =
      "Actual weight must be greater than 0";
  }

  if (actualWeight > 100000) {
    errors.actualWeight =
      "Weight is too large";
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
    errors.latitude =
      "Invalid latitude";
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
    errors.longitude =
      "Invalid longitude";
  }

  if (
    data.finalValue !== undefined &&
    data.finalValue !== null
  ) {
    const value =
      Number(data.finalValue);

    if (
      Number.isNaN(value) ||
      value < 0
    ) {
      errors.finalValue =
        "Invalid final value";
    }
  }

  return errors;
};

export {
  validateCreateHandover,
};