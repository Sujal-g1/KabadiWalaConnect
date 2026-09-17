import axios from "axios";
import { auth } from "../../config/firebase";


const getAuthToken = async () => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error(
      "User is not authenticated"
    );
  }

  return await user.getIdToken();
};

const createHandover = async (
  lotId,
  handoverData
) => {
  const token = await getAuthToken();

  const response = await fetch(
    axios.post(`${import.meta.env.VITE_API_URL}/api/handovers/lots/${lotId}`),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(handoverData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to create handover"
    );
  }

  return data;
};

const getHandoverByLotId = async (
  lotId
) => {
  const token = await getAuthToken();

  const response = await fetch(
    `${API_URL}/api/handovers/lots/${lotId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to fetch handover"
    );
  }

  return data;
};

const uploadHandoverPhoto = async (
  handoverId,
  file
) => {
  const token = await getAuthToken();

  const formData = new FormData();

  formData.append("photo", file);

  const response = await fetch(
    `${API_URL}/api/handovers/${handoverId}/photos`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to upload handover photo"
    );
  }

  return data;
};

export {
  createHandover,
  getHandoverByLotId,
  uploadHandoverPhoto,
};