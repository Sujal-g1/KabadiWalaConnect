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

  return await user.getIdToken();
};

const createLot = async (lotData) => {
  const token = await getAuthToken();

  const response = await fetch(
    `${API_URL}/api/lots`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",

        Authorization:
          `Bearer ${token}`,
      },

      body: JSON.stringify(lotData),
    }
  );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to create lot"
    );
  }

  return data;
};

export {
  createLot,
};