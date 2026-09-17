import { auth } from "../../config/firebase.js";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5003";

/**
 * Get Firebase ID token
 */
const getAuthToken = async () => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error(
      "User is not authenticated."
    );
  }

  return await user.getIdToken();
};

/**
 * Safely parse JSON response
 */
const parseResponse = async (
  response
) => {
  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
        "Something went wrong."
    );
  }

  return data;
};

/**
 * Create lot
 */
const createLot = async (
  lotData
) => {
  const token =
    await getAuthToken();

  const response =
    await fetch(
      `${API_URL}/api/lots`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        body: JSON.stringify(
          lotData
        ),
      }
    );

  return await parseResponse(
    response
  );
};

/**
 * Upload lot photo
 */
const uploadLotPhoto = async (
  lotId,
  file
) => {
  if (!lotId) {
    throw new Error(
      "Lot ID is required."
    );
  }

  if (!file) {
    throw new Error(
      "Photo file is required."
    );
  }

  const token =
    await getAuthToken();

  const formData =
    new FormData();

  formData.append(
    "photo",
    file
  );

  const response =
    await fetch(
      `${API_URL}/api/lots/${lotId}/photos`,
      {
        method: "POST",

        headers: {
          Authorization:
            `Bearer ${token}`,
        },

        body: formData,
      }
    );

  return await parseResponse(
    response
  );
};

/**
 * Finalize lot
 *
 * CREATED → AVAILABLE
 */
const finalizeLot = async (
  lotId
) => {
  if (!lotId) {
    throw new Error(
      "Lot ID is required."
    );
  }

  const token =
    await getAuthToken();

  const response =
    await fetch(
      `${API_URL}/api/lots/${lotId}/finalize`,
      {
        method: "POST",

        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return await parseResponse(
    response
  );
};

/**
 * Get collector lots
 */
const getLots = async () => {
  const token =
    await getAuthToken();

  const response =
    await fetch(
      `${API_URL}/api/lots`,
      {
        method: "GET",

        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return await parseResponse(
    response
  );
};

/**
 * Get single lot
 */
const getLotById = async (
  lotId
) => {
  if (!lotId) {
    throw new Error(
      "Lot ID is required."
    );
  }

  const token =
    await getAuthToken();

  const response =
    await fetch(
      `${API_URL}/api/lots/${lotId}`,
      {
        method: "GET",

        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return await parseResponse(
    response
  );
};

export {
  createLot,
  uploadLotPhoto,
  finalizeLot,
  getLots,
  getLotById,
};