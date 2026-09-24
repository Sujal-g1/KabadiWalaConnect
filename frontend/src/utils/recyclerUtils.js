export const getDistanceKm = (
  pointA,
  pointB
) => {
  if (
    !pointA ||
    !pointB ||
    !Number.isFinite(pointA.lat) ||
    !Number.isFinite(pointA.lng) ||
    !Number.isFinite(pointB.lat) ||
    !Number.isFinite(pointB.lng)
  ) {
    return Infinity;
  }

  const earthRadiusKm = 6371;

  const dLat =
    ((pointB.lat - pointA.lat) *
      Math.PI) /
    180;

  const dLng =
    ((pointB.lng - pointA.lng) *
      Math.PI) /
    180;

  const lat1 =
    (pointA.lat * Math.PI) /
    180;

  const lat2 =
    (pointB.lat * Math.PI) /
    180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 *
      Math.cos(lat1) *
      Math.cos(lat2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return earthRadiusKm * c;
};

export const getCityFallbackCenter = (
  recyclers,
  city
) => {
  if (!city) {
    return {
      lat: 20.5937,
      lng: 78.9629,
    };
  }

  const normalizedCity =
    city.trim().toLowerCase();

  const matches = recyclers.filter(
    (recycler) =>
      recycler?.location?.city
        ?.toLowerCase() ===
      normalizedCity
  );

  if (!matches.length) {
    return {
      lat: 20.5937,
      lng: 78.9629,
    };
  }

  const lat =
    matches.reduce(
      (sum, recycler) =>
        sum +
        recycler.location.coordinates.lat,
      0
    ) / matches.length;

  const lng =
    matches.reduce(
      (sum, recycler) =>
        sum +
        recycler.location.coordinates.lng,
      0
    ) / matches.length;

  return {
    lat,
    lng,
  };
};