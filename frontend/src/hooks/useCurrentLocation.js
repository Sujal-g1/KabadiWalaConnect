import { useEffect, useState } from "react";

const useCurrentLocation = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    city: "",
    country: "",
    loading: true,
    error: "",
  });

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        loading: false,
        error: "Geolocation not supported",
      }));

      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // console.log("Location found:", {
        //   latitude,
        //   longitude,
        // });

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
            {
              headers: {
                "Accept-Language": "en",
              },
            }
          );

          const data = await response.json();

          const address = data.address || {};

          const city =
            address.city ||
            address.town ||
            address.village ||
            address.municipality ||
            address.county ||
            "";

          const country =
            address.country || "";

          setLocation({
            latitude,
            longitude,
            city,
            country,
            loading: false,
            error: "",
          });

        } catch (error) {
          console.error(
            "Reverse geocoding failed:",
            error
          );

          setLocation({
            latitude,
            longitude,
            city: "",
            country: "",
            loading: false,
            error: "Location found but address unavailable",
          });
        }
      },

      (error) => {
        console.error(
          "Location permission/error:",
          error
        );

        setLocation({
          latitude: null,
          longitude: null,
          city: "",
          country: "",
          loading: false,
          error: "Location unavailable",
        });
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return {
    ...location,
    refreshLocation: getLocation,
  };
};

export default useCurrentLocation;