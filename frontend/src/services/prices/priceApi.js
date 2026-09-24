import { auth } from "../../config/firebase";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5003";

const getAuthToken = async () => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error(
      "User is not authenticated"
    );
  }

  return user.getIdToken();
};

const getPrices = async ({
  location,
  material,
} = {}) => {
  const token = await getAuthToken();

  const params = new URLSearchParams();

  if (location) {
    params.set(
      "location",
      location
    );
  }

  if (material) {
    params.set(
      "material",
      material
    );
  }

  const query = params.toString();

  const response = await fetch(
    `${API_URL}/api/prices${
      query ? `?${query}` : ""
    }`,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to fetch prices"
    );
  }

  return data;
};

const getPriceHistory = async ({
  location,
  material,
  subcategory,
  limit = 30,
} = {}) => {
  const token =
    await getAuthToken();

  const params =
    new URLSearchParams();

  if (location) {
    params.set(
      "location",
      location
    );
  }

  if (material) {
    params.set(
      "material",
      material
    );
  }

  if (subcategory) {
    params.set(
      "subcategory",
      subcategory
    );
  }

  params.set(
    "limit",
    limit
  );

  const response =
    await fetch(
      `${API_URL}/api/prices/history?${params.toString()}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to fetch price history"
    );
  }

  return data;
};

const calculateValuation = async ({
  material,
  subcategory,
  weight,
  location,
}) => {
  const user =
    auth.currentUser;

  if (!user) {
    throw new Error(
      "User is not authenticated"
    );
  }

  const token =
    await user.getIdToken();

  const response =
    await fetch(
      `${API_URL}/api/prices/valuation`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        body: JSON.stringify({
          material,
          subcategory,
          weight,
          location,
        }),
      }
    );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to calculate valuation"
    );
  }

  return data;
};

export {
  getPrices,
  getPriceHistory,
  calculateValuation,
};
